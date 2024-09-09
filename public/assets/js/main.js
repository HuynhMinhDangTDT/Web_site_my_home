function PageFunction() {
    var self = this;
    var ww = wh = 0;

    this.init = function() {

        var search_page = $('.wrap-search-page');
        if ($('.banner-main').length > 0) {
            $('.wrap-search-page').addClass('black');
        } else {
            $('header').addClass('black');
        }

        var menu_mb = $('header .menu');
        var header_top = $('header .top');
        var ele_header = $('header');
        var menu_sub = $('header .sub');
        var menu_sub_list = $('header .sub-list');
        var html_body = $('html,body');
        $(document).on('click', '#nav-icon', function() {
            var that = $(this);
            if (!that.hasClass('open')) {
                that.addClass('open');
                menu_mb.addClass('open');
                header_top.addClass('open');
                ele_header.addClass('open');
                html_body.addClass('modal-open');
            } else {
                that.removeClass('open');
                header_top.removeClass('open');
                ele_header.removeClass('open');
                menu_mb.removeClass('open');
                menu_mb.removeClass('open-sub');
                menu_sub.removeClass('open');
                menu_sub.removeClass('opens-sub');
                menu_sub_list.removeClass('open');
                html_body.removeClass('modal-open');
            }
            return false;
        });

        $(document).on('click', 'header .bottom .menu > ul > li a', function() {
            var w = $(window).width();
            if (w < 1025) {
                var that = $(this);
                var next = that.next('.sub');
                if (next.length > 0) {
                    if (next.hasClass('open')) {
                        return true;
                    }
                    $("header .bottom .menu > ul > li .sub").removeClass('open');
                    menu_mb.addClass('open-sub');
                    next.addClass("open");
                    menu_mb.scrollTop(0);
                    return false;
                } else {
                    return true;
                }
            }
        });

        $(document).on('click', '.item-sub > ul > li a', function() {
            var w = $(window).width();
            if (w < 1025) {
                var that = $(this);
                var next = that.next('.sub-list');
                var prent_sub = that.parents('.sub');
                if (next.length > 0) {
                    if (next.hasClass('open')) {
                        return true;
                    }
                    $(".sub-list").removeClass('open');
                    prent_sub.addClass('open-sub');
                    next.addClass("open");
                    menu_sub.scrollTop(0);
                    return false;
                } else {
                    return true;
                }
            }
        });

        // $(document).on('click','header .tt-mb .back',function(){
        //     var that = $(this);
        //     var parent_sub = that.parents('.sub');
        //     var parent_sub_list = that.parents('.sub-list');
        //
        //     parent_sub.removeClass('open-sub');
        //     parent_sub_list.removeClass('open');
        //     if(parent_sub_list.length > 0){
        //         return false;
        //     }else{
        //         parent_sub.removeClass('open');
        //         menu_mb.removeClass('open-sub');
        //     }
        //     return false;
        // });

        $(document).on('click', 'header .top-search', function() {
            if (search_page.is(':hidden')) {
                search_page.fadeIn();
            } else {
                search_page.fadeOut();
            }
            return false;
        });

        $(document).on('click', '.wrap-search-page .link', function() {
            search_page.fadeOut();
            return false;
        });

        if ($(".banner-parallax").length > 0) {
            $(".banner-parallax").each(function() {
                var that = $(this);
                var link_banner = that.attr('data-image-src');
                that.css('background-image', 'url(' + link_banner + ')');
            });
        }

        if ($('.banner-bottom').length > 0) {
            var numStore = $('.store-wrap .banner-bottom').length;
            var bottomSwipes = [];

            for (var i = 0; i <= numStore; i++) {
                var wrapEle = '.banner-bottom-' + i;
                var containerEle = '.banner-bottom-' + i + ' .swiper-container';
                var banner_bottom = new Swiper(containerEle, {
                    autoplay: 5000,
                    disableOnInteraction: false,
                    nextButton: '.banner-bottom-' + i + ' .swiper-button-next',
                    prevButton: '.banner-bottom-' + i + ' .swiper-button-prev',
                    pagination: '.banner-bottom-' + i + ' .swiper-pagination',
                    paginationClickable: true
                });

                bottomSwipes.push(banner_bottom);

                // $(wrapEle)
                //     .mouseover(function () {
                //         bottomSwipes[i].stopAutoplay();
                //     })
                //     .mouseout(function () {
                //         bottomSwipes[i].startAutoplay();
                //     });
            }

        }

        if ($('.swiper-dsc').length > 0) {
            var swiper_dsc = new Swiper('.swiper-dsc .swiper-container', {
                slidesPerView: 1,
                autoplay: 5000,
                nextButton: '.swiper-dsc .swiper-button-next',
                prevButton: '.swiper-dsc .swiper-button-prev',
                pagination: '.swiper-dsc .swiper-pagination',
                paginationClickable: true
            });

            $(".swiper-dsc")
                .mouseover(function() {
                    swiper_dsc.stopAutoplay();
                })
                .mouseout(function() {
                    swiper_dsc.startAutoplay();
                });
        }

        self.fixMenu();
        self.clickAccordion();
    };

    this.clickAccordion = function() {
        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            });
        }
    }

    this.scrollPage = function(ele) {
        $("html, body").stop().animate({
            scrollTop: ele.offset().top
        }, "slow");
    }

    this.fixMenu = function() {
        var header_bottom = $('header .bottom');
        var header_top = $('header .top');
        var search_page = $('.wrap-search-page');
        $(window).scroll(function() {
            var st = $(window).scrollTop();
            var top_ele = header_top.height();
            if (st > top_ele) {
                header_bottom.addClass('fix');
                header_top.addClass('fix');
                search_page.addClass('fix');
            } else {
                header_bottom.removeClass('fix');
                header_top.removeClass('fix');
                search_page.removeClass('fix');
            }
        });
    }

    this.homePage = function() {
        var banner_main = new Swiper('.banner-main .swiper-container', {
            nextButton: '.banner-main .swiper-button-next',
            prevButton: '.banner-main .swiper-button-prev',
            pagination: '.banner-main .swiper-pagination',
            paginationClickable: true,
            autoplay: 11000,
            disableOnInteraction: false,
        });

        $(".banner-main .swiper-container")
            .mouseover(function() {
                banner_main.stopAutoplay();
            })
            .mouseout(function() {
                banner_main.startAutoplay();
            });

        var swiper_product = new Swiper('.swiper-product .swiper-container', {
            slidesPerView: 1,
            initialSlide: 1,
            pagination: '.swiper-product .swiper-pagination',
            paginationClickable: true,
            spaceBetween: 40,
            slideToClickedSlide: true
        });

    }

    this.productPage = function() {
        var sliders = [];
        $('.swiper-living-room').each(function(i, v) {
            var that = $(this);
            var ele_slide = that.find('.swiper-slide');
            $(this).addClass('s' + i);
            if (ele_slide.length > 0) {
                var slider = new Swiper('.s' + i + ' .swiper-container', {
                    slidesPerView: 1,
                    initialSlide: 1,
                    pagination: '.s' + i + ' .swiper-pagination',
                    paginationClickable: true,
                    spaceBetween: 40,
                    slideToClickedSlide: true
                });

                sliders.push(slider);
            }
        });

        var text_readmore = $('.js-article').attr('data-textmore');
        var text_close = $('.js-article').attr('data-textclose');
        $('.js-article').readmore({
            speed: 75,
            collapsedHeight: 55,
            moreLink: '<a href="#" class="link mt20">' + text_readmore + '</a>',
            lessLink: '<a href="#" class="link mt20">' + text_close + '</a>'
        });
    }

    this.producDishestPage = function() {
        var swiper_living_room = new Swiper('.swiper-living-room .swiper-container', {
            slidesPerView: 1,
            initialSlide: 1,
            pagination: '.swiper-living-room .swiper-pagination',
            paginationClickable: true,
            spaceBetween: 40,
            slideToClickedSlide: true
        });

        var swiper_dining_room = new Swiper('.swiper-dining-room .swiper-container', {
            slidesPerView: 1,
            initialSlide: 1,
            pagination: '.swiper-dining-room .swiper-pagination',
            paginationClickable: true,
            spaceBetween: 40,
            slideToClickedSlide: true
        });

        var swiper_bed_room = new Swiper('.swiper-bed-room .swiper-container', {
            slidesPerView: 1,
            initialSlide: 1,
            pagination: '.swiper-bed-room .swiper-pagination',
            paginationClickable: true,
            spaceBetween: 40,
            slideToClickedSlide: true
        });

        var swiper_work_room = new Swiper('.swiper-work-room .swiper-container', {
            slidesPerView: 1,
            initialSlide: 1,
            pagination: '.swiper-work-room .swiper-pagination',
            paginationClickable: true,
            spaceBetween: 40,
            slideToClickedSlide: true
        });
    }

    this.productDetailPage = function() {
        $('content').addClass('ct-product');
        var check_mb = true;
        ww = $(window).width();

        if (ww < 768) {
            check_mb = true;
        } else {
            check_mb = false;
        }

        function callZoom() {
            ww = $(window).width();
            if (ww < 768) {
                if (check_mb) {
                    console.log(1111);
                    $('.zoomContainer').remove();
                    $("#img_01").removeData('elevateZoom');
                    $("#img_01").elevateZoom({
                        gallery: 'gallery_01',
                        galleryActiveClass: 'active',
                        imageCrossfade: false,
                        loadingIcon: 'http://www.elevateweb.co.uk/spinner.gif',
                        responsive: true,
                        zoomType: 'inner'
                    });
                }
                check_mb = false;
            } else {
                if (ww > 768) {
                    if (!check_mb) {
                        console.log(2222);
                        $('.zoomContainer').remove();
                        $("#img_01").removeData('elevateZoom');
                        $("#img_01").elevateZoom({
                            gallery: 'gallery_01',
                            galleryActiveClass: 'active',
                            imageCrossfade: false,
                            loadingIcon: 'http://www.elevateweb.co.uk/spinner.gif',
                            responsive: true
                        });
                    }
                    check_mb = true;
                }
            }
        }

        callZoom();
        $(window).resize(function() {
            callZoom();
        });

        var wrap_swiper = new Swiper('.wrap-swiper .swiper-container', {
            slidesPerView: 5,
            spaceBetween: 20,
            nextButton: '.wrap-swiper .swiper-button-next',
            prevButton: '.wrap-swiper .swiper-button-prev',
            slideToClickedSlide: true
        });

        if ($('#gallery_01 a').length < 6) {
            $('.wrap-swiper .swiper-button-next, .wrap-swiper .swiper-button-prev').hide();
        }
        $('#gallery_01 a').eq(0).trigger('click');
    }

    this.showExtend = function() {
        var text_open = $('.js-extend').attr('data-textdetail');
        var text_close = $('.js-extend').attr('data-textclose');
        $(document).on('click', '.item-careet .link', function() {
            var that = $(this);
            var parent = that.parents('.item-careet');
            if (!parent.hasClass('open')) {
                parent.addClass('open');
                that.text(text_close);
            } else {
                parent.removeClass('open');
                that.text(text_open);
            }
            return false;
        });

        $("#accordiondemo h3").click(function() {
            $accordion = $(this).next();
            if ($accordion.is(':hidden') === true) {
                $("#accordiondemo .accordion").slideUp();
                $accordion.slideDown();
            } else {
                $accordion.slideUp();
            }
        });
    }
}

var PageFunction = new PageFunction();

$(document).ready(function() {
    PageFunction.init();
});