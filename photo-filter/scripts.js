const inputsAll = document.querySelectorAll('.filters input');
const reset = document.getElementsByClassName('btn-reset');
const fullscreen = document.getElementsByClassName('fullscreen');

drawImage();


const fullScreenMode = (event) => {
    if (fullscreen.item(0).classList.contains("openfullscreen")) {
        document.documentElement.requestFullscreen();
        event.target.classList.toggle("openfullscreen")
    } else {
        event.target.classList.toggle("openfullscreen")
        document.exitFullscreen();
    }
}

function propertyUpdate(){
    const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    drawImage();
    this.nextElementSibling.value = this.value;
}

function resetProperties(){
    inputsAll.forEach(input => {
        if (input.valueOf().name != "saturate") {
            const suffix = input.dataset.sizing || '';
            input.valueOf().value = 0;
            document.documentElement.style.setProperty(`--${input.name}`, input.value + suffix);
            input.nextElementSibling.value = input.value;
        }
        else {
            const suffix = input.dataset.sizing || '';
            input.valueOf().value = 100;
            document.documentElement.style.setProperty(`--${input.name}`, input.value + suffix);
            input.nextElementSibling.value = input.value;
        }
        drawImage();
    })
}

// GET TIME OF DAY
function getTimeDay() {
    let date = new Date();
    let hours = date.getHours();
    if (hours >= 6 && hours < 12){
        return "morning";
    }
    else if (hours >= 12 && hours < 18) {
        return "day";
    }
    else if (hours >= 18 && hours < 24) {
        return "evening";
    }
    else if (hours >= 0 && hours < 6) {
        return "night";
    }
}

// ADD IMAGES FROM GITHUB
const base = "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/" + getTimeDay() +"/";
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg',
    '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg',
    '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;
const image_wrapper = document.querySelector('.editor img');
const next_btn = document.querySelector('.btn-next');

function viewImage(src){
    const img = new Image();
    img.src = src;
    img.onload = () =>{
        image_wrapper.setAttribute('src',`${src}`);
        drawImage();
    }
}
function getImage() {
    const index = i % images.length;
    const imageSrc = base + images[index];
    viewImage(imageSrc);
    i++;

    // next_btn.disabled = true;
    // setTimeout(function (){next_btn.disabled = false},1000);
}

// LOAD PICTURE
const fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener('change', function (e) {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        //images.splice(i, 0, img.src);
        image_wrapper.setAttribute('src', img.src);
    }
    reader.readAsDataURL(file);
})

// CANVAS
const canvas = document.querySelector('canvas');

function drawImage() {
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = document.querySelector('.editor img').src;
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        const selectImage = document.querySelector('.editor img');
        ctx.filter = window.getComputedStyle(selectImage)["filter"];
        ctx.drawImage(img, 0, 0);
    }
}


// DOWNLOAD IMAGE
const download = document.querySelector('.btn-save');
download.addEventListener('click', function(e) {
    let link = document.createElement('a');
    link.download = 'download.png';
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
});






next_btn.addEventListener('mousedown', getImage);
fullscreen.item(0).addEventListener('mousedown', fullScreenMode);
reset.item(0).addEventListener('mousedown',resetProperties);
inputsAll.forEach(input => input.addEventListener('change',propertyUpdate));
inputsAll.forEach(input => input.addEventListener('mousemove',propertyUpdate));
