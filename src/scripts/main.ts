import * as SmoothScroll from 'smooth-scroll';

let scrollButtonShown = false;
const scrollToTopButton = document.getElementById('scroll-top') as HTMLElement;
const titlePanel = document.getElementById('title') as HTMLElement;
const smooth = new SmoothScroll('a[href*="#"]', {
    easing: 'easeOutCubic',
    speed: 500,
});

window.addEventListener('scroll', (e) => {
    if (document.documentElement.scrollTop >= 200 && !scrollButtonShown) {
        scrollButtonShown = true;
        scrollToTopButton.classList.add('shown');
    } else if (document.documentElement.scrollTop < 200 && scrollButtonShown) {
        scrollButtonShown = false;
        scrollToTopButton.classList.remove('shown');
    }
});

scrollToTopButton.addEventListener('click', (e) => {
    smooth.animateScroll(titlePanel);
});
