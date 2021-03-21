//fullscreen mode
const FULLSCREEN_BTN = document.getElementById("fullscreen")

const fullScreenMode = (event) => {
    if (FULLSCREEN_BTN.classList.contains("openfullscreen")){
        document.documentElement.requestFullscreen();
        event.target.classList.toggle("openfullscreen")
    }
    else {
        event.target.classList.toggle("openfullscreen")
        document.exitFullscreen();
    }
}

FULLSCREEN_BTN.addEventListener("mousedown", fullScreenMode);

// event buttons notes
const NOTES_BTN = document.getElementsByClassName("btn-notes");
const LETTERS_BTN = document.getElementsByClassName("btn-letters");

const selectBtn = (event) => {

    if (event.target.classList.contains("btn-notes")){
        event.target.classList.add("btn-active");
        LETTERS_BTN.item(0).classList.remove("btn-active");
        BUTTONS.forEach((elem) => {
            elem.classList.remove("piano-key-letter");
    })}
    if (event.target.classList.contains("btn-letters")){
        event.target.classList.add("btn-active");
        NOTES_BTN.item(0).classList.remove("btn-active");
        BUTTONS.forEach((elem) => {
            elem.classList.add("piano-key-letter");
        })}
}

LETTERS_BTN.item(0).addEventListener("mousedown", selectBtn);
NOTES_BTN.item(0).addEventListener("mousedown", selectBtn);


// event keys piano
const PIANO = document.getElementById("piano");
const BUTTONS = document.querySelectorAll(".piano-key");

const startSound = (event) => {
    event.target.classList.add("piano-key-active");
    event.target.classList.add("piano-key-active-pseudo");
    let audio = new Audio();
    audio.src = 'assets/audio/' + event.target.dataset.note + '.mp3';
    audio.currentTime = 0;
    audio.autoplay = true;
}
const stopSound = (event) => {
    event.target.classList.remove("piano-key-active");
    event.target.classList.remove("piano-key-active-pseudo");
}

const startSoundKey = (elem) => {
    elem.classList.add("piano-key-active");
    let audio = new Audio();
    audio.src = 'assets/audio/' + elem.dataset.note + '.mp3';
    audio.currentTime = 0;
    audio.autoplay = true;
}
const stopSoundKey = (elem) => {
    elem.classList.remove("piano-key-active");
}

const startCorrespondOver = (event) => {
    if (event.target.classList.contains("piano-key")) {
        event.target.classList.add("piano-key-active");
        startSound(event);
    }
    BUTTONS.forEach((elem) => {
        elem.addEventListener("mouseover", startSound);
        elem.addEventListener("mouseout", stopSound);
    })
}
const stopCorrespondOver = () => {
    BUTTONS.forEach((elem) => {
        elem.classList.remove("piano-key-active");
        elem.classList.remove("piano-key-active-pseudo");
        elem.removeEventListener("mouseover", startSound)
        elem.removeEventListener("mouseout", stopSound)
    })

}

PIANO.addEventListener("mousedown", startCorrespondOver, false);
PIANO.addEventListener("mouseup", stopCorrespondOver);




// key events

const keyDown = (event) => {
    if (event.repeat === false) {
        BUTTONS.forEach((elem) => {
            if (event.code == "Key" + elem.dataset.letter) {
                elem.classList.add("piano-key-active");
                // elem.addEventListener("keydown", startSound);
                event.repeat = false;
                startSoundKey(elem);
            }
        })
    }
}
const  keyUp = (event) => {
    BUTTONS.forEach((elem) => {
        if(event.code == "Key" + elem.dataset.letter) {
            elem.classList.remove("piano-key-active");
            stopSoundKey(elem);
        }
    })
}


window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);