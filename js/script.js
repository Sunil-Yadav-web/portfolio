const aboutMe = document.querySelector('.btn-hero')
const positionFix = document.querySelector('.posi-fix')
const closeIcon = document.querySelector('.close-icon')


aboutMe.addEventListener('click', () => {
    positionFix.classList.remove('show-about-popup')
})

closeIcon.addEventListener('click', () => {
    positionFix.classList.add('show-about-popup')
})