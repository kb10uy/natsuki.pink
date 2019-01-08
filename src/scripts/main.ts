import * as SmoothScroll from 'smooth-scroll';

const smooth = new SmoothScroll('a[href*="#"]', {
    easing: 'easeOutCubic',
    speed: 500,
});
