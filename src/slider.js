"use strict";

//Slider Poze
let slider = tns({
    container: '.my-slider',
    mode: 'gallery',
    items: 1,
    slideBy: 'page',
    autoplay: true,
    speed: 300,
    // animateIn: "jello",
    // animateOut: "rollOut",
    autoplayButtonOutput: false,
    controls: false
});
slider.play();