(function ($) {
    'use strict';

    var overrideSlickSlide = function () {
        // Slideshow Fade
        $('.slide-fade-series').slick({
            infinite: true,
            dots: false,
            arrows: true,
            autoplay: false,
            autoplaySpeed: 3000,
            fade: true,
            fadeSpeed: 1500,
            prevArrow: '<button type="button" class="slick-prev-1"><i class="elegant-icon arrow_left"></i></button>',
            nextArrow: '<button type="button" class="slick-next-1"><i class="elegant-icon arrow_right"></i></button>',
            appendArrows: '.arrow-cover-1',
        });
    }


    $(document).ready(function () {
        overrideSlickSlide();
    });

})(jQuery);