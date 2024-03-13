const INCREASE_NUMBER_ANIMATION_SPEED = 50;
let animationInited = false;

function increaseNumberAnimationStep(i, element, endNumber) {
    if (i <= endNumber) {
        if (i === endNumber) {
            element.innerText = i + '+';
        } else {
            element.innerText = i;
        }

        i += 100;
    }

    setTimeout(() => increaseNumberAnimationStep(i, element, endNumber), INCREASE_NUMBER_ANIMATION_SPEED);
}

function initIncreaseNumberAnimation() {
    const elements = document.querySelector('.features__clients-count');
    increaseNumberAnimationStep(0, elements, 5000);
}

document.querySelector('#budget').addEventListener('change', (event) => {
    const otherInput = document.querySelector('.form__other-input');

    if (event.target.value === 'other') {
        const formContainer = document.createElement('div');
        const input = document.createElement('input');

        formContainer.classList.add('form__group', 'form__other-input');
        input.placeholder = 'Введите ваш вариант';
        input.type = 'text';
        formContainer.appendChild(input);
        document.querySelector('form').insertBefore(formContainer, document.querySelector('.form__submit'));
    }

    if (event.target.value !== 'other' && Boolean(otherInput)) {
        document.querySelector('form').removeChild(otherInput);
    }
});

function updateScroll() {
    const countElementPosition = document.querySelector('.features__clients-count').offsetTop;
    const windowBottomPosition = window.scrollY + window.innerHeight;

    if (windowBottomPosition >= countElementPosition && !animationInited) {
        animationInited = true;
        initIncreaseNumberAnimation();
    }

    if (window.scrollY > 0) {
        document.querySelector('header').classList.add('header__scrolled');
    } else {
        document.querySelector('header').classList.remove('header__scrolled');
    }
}

window.addEventListener('scroll', updateScroll);

function addSmoothScroll(anchor) {
    anchor.addEventListener('click', onLinkClick)
}

function onLinkClick(event) {
    event.preventDefault();
    document.querySelector(event.target.getAttribute('href')).scrollIntoView({
        behavior:'smooth'
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    addSmoothScroll(anchor)
});

addSmoothScroll(document.querySelector('.more-button'));
