//= parts/owl.carousel.min.js
//= parts/lazy/jquery.lazy.min.js
//= parts/lazy/jquery.lazy.plugins.min.js
//= parts/jquery.maskedinput.min.js

$( function() {

    $("input[type='tel']").mask("+7 (999) 999-99-99");

    $.mask.definitions['~'] = '[01234569]';
    $(".phone_mask").mask("+7 (~99) 999-99-99");

    $('.lazy').lazy({
        effect: "fadeIn",
        effectTime: 500,
        threshold: 0
    });

    // Menu btn
    (function () {
        $('.hamburger-menu').on('click', function() {
            $('.bar').toggleClass('animate');
            $('.modal-menu').toggleClass('show');
            if( $(".modal-menu").hasClass("show") ) {
                $(".header .btn-navigation span.feedback-on").hide();
            }else {
                $(".header .btn-navigation span.feedback-on").show();
            }
        });
    })();

    $('.custom-select').each(function() {
        $('.custom-select').select2({
            containerCssClass: 'custom-select-box',
            dropdownCssClass: 'custom-select-dropdown',
            minimumResultsForSearch: -1,

            "language": {
                "noResults": function(){
                    return "Ничего не найдено.";
                }
            }
        });
    });

    $(".carousel-custom-team").owlCarousel({
        items: 2,
        dots: false,
        nav: true,
        lazyLoad: true,
        merge: true,
        margin: 30,
        responsive : {
            0: {
                items: 1
            },
            480: {
                items: 1
            },
            768: {
                items: 2
            },
            991: {
                items: 2
            },
            1200: {
                items: 2
            }
        }
    });

    $(".carousel-custom-smi").owlCarousel({
        items: 3,
        dots: false,
        nav: true,
        lazyLoad: true,
        merge: true,
        margin: 30,
        responsive : {
            0: {
                items: 1
            },
            480: {
                items: 1
            },
            768: {
                items: 2
            },
            991: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    });

    $(".owl-gallery").owlCarousel({
        items: 1,
        width: 100,
        lazyLoad: true,
        dots: false,
        loop: true,
        nav: true,
        merge: true
    });

    $(".carousel-custom-compare").owlCarousel({
        items: 4,
        dots: false,
        nav: true,
        lazyLoad: true,
        mouseDrag: false,
        merge: true,
        margin: 30,
        responsive : {
            0: {
                items: 1
            },
            480: {
                items: 1
            },
            768: {
                items: 2
            },
            991: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    }).on('changed.owl.carousel', function(event) {
        var firstActiveItem = event.item.index;
        var item = $('.carousel-custom-compare .owl-stage .owl-item')[firstActiveItem];
        $('.carousel-custom-compare .owl-stage .owl-item').attr('data-view', '');
        if(item) {
            item.setAttribute('data-view','on');
        }
    }).on("remove.owl.carousel", function() {

        var lengthOwlItems =  document.getElementsByClassName('owl-item').length;
        if( lengthOwlItems === 0 ) {
            $(".carousel-custom-compare").remove();
            $(".owl-none").show();
        }else {
            $(".owl-none").hide();
        }

    });;

    $('.carousel-custom-compare__remove').on("click", function() {
        var countItemCarousel = $(this).parent().attr('data-item');
        $(".carousel-custom-compare").trigger('remove.owl.carousel', countItemCarousel);
        $(".carousel-custom-compare").trigger('refresh.owl.carousel', countItemCarousel);
    });

} );

$('.compare-item .compare-item__box-fix').on('click', function() {
    $('.compare-item__box-fix[data-box="'+ $(this).attr('data-box') +'"]').toggleClass('active');
});


// mobile toggle windows
$("body").on("click", ".goto", function () {
    var togglePage = $(this).data("toggle");
    toggle(togglePage);
});

var winScrollTop;
function toggle(elem) {
    if ($("body").attr("data-page") === elem) {
        $("body").removeAttr("data-page");
        if (winScrollTop) {
            $("body").css({
                top: 0
            });

            $(window).scrollTop(winScrollTop);
        }
    }
    else {
        if (!$("body").attr("data-page")) {
            winScrollTop = $(window).scrollTop();
            $("body").css({
                top: -winScrollTop
            });

            // $("." + elem).find(".modal-inner").scrollTop(0);
        }else {
            if( elem !== 'filter' ) {
                $("." + elem).find(".modal-inner").scrollTop(0);
            }
        }

        $("body").attr("data-page", elem);
    }
}

$('.delimiter').each(function() {
    $(this).focusin( function() {

        var e = $(this).val();
        $(this).val( e.replace(/\s/g, '') );
    });

    $(this).focusout( function() {

        var e = $(this).val();
        $(this).val( $.trim(delimiter(e)) );
    });
});

// Function delimiter numbers
function delimiter(n) {
    n += "";
    n = new Array(4 - n.length % 3).join("U") + n;
    return n.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
}

function showLocation() {
    var $containerUl = $('#selectLocation'),
        $listItem = $('.popup-city');
    if( !$containerUl.data("trigger") ) {
        $containerUl.data("trigger", true);
        $listItem.addClass("show");
        $("body").on("click", bodyClick)
    }

    function bodyClick(ev) {
        if( !$(ev.target).is($containerUl) && !$(ev.target).is($containerUl.find("*")) && $containerUl.data("trigger")  ){
            $containerUl.removeData("trigger");
            $("body").off("click", bodyClick);
            $listItem.removeClass("show");
        }
    }
}

function showCabinet() {

    var $containerUl = $('#btnCabinet'),
        $listItem = $('.popup-cabinet');

    if( !$containerUl.data("trigger") ) {
        $containerUl.data("trigger", true);
        $listItem.addClass("show");
        $("body").on("click", bodyClick)
    }

    function bodyClick(ev) {
        if( !$(ev.target).is($containerUl) && !$(ev.target).is($containerUl.find("*")) && $containerUl.data("trigger")  ){
            $containerUl.removeData("trigger");
            $("body").off("click", bodyClick);
            $listItem.removeClass("show");
        }
    }
}

function showPopup(ths) {
    var $containerUl = $(ths),
        $listItem = $(ths).parent().find('.popup-settings');

    console.log($listItem);

    if( !$containerUl.data("trigger") ) {
        $containerUl.data("trigger", true);
        $listItem.addClass("show");
        $("body").on("click", bodyClick)
    }

    function bodyClick(ev) {
        if( !$(ev.target).is($containerUl) && !$(ev.target).is($containerUl.find("*")) && $containerUl.data("trigger")  ){
            $containerUl.removeData("trigger");
            $("body").off("click", bodyClick);
            $listItem.removeClass("show");
        }
    }
}

function otherLocation() {
    $(".popup-location").removeClass('show');
    showLocation();
}

function closeToasts() {
    $('.toast').toast('hide');
}
