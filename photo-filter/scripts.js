const inputsAll = document.querySelectorAll('.filters input');
const reset = document.getElementsByClassName('btn-reset');


function propertyUpdate(){
    const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
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
    })
}

reset.item(0).addEventListener('mousedown',resetProperties);
inputsAll.forEach(input => input.addEventListener('change',propertyUpdate));
inputsAll.forEach(input => input.addEventListener('mousemove',propertyUpdate));
