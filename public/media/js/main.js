(function($) {
    'use strict'
    var cbrTheme = {
        init: function() {
            this.config();
            this.events()
        },
        config: function() {
            this.config = {
                $window: $(window),
                $document: $(document),
            }
        },
        events: function() {
            var self = this;
            self.config.$document.on('ready', function() {
                self.scrollTarget();
                self.preLoader();
                self.cartIcon();
                self.mobileNav();
                self.searchIcon();
                self.retinaLogo();
                self.featuredMedia();
                self.relatedPost();
                self.headerFixed();
                self.scrollToTop();
                self.blogGrid();
                self.widgetSpacer()
            });
            self.config.$window.on('load', function() {})
        },
        scrollTarget: function() {
            $('.scroll-target, .one-page #main-nav > ul > li > a').on('click', function() {
                var anchor = $(this).attr('href').split('#')[1];
                $(this).parent().addClass('current-menu-item').siblings().removeClass('current-menu-item');
                if (anchor) {
                    if ($('#' + anchor).length > 0) {
                        var headerHeight = 40;
                        if ($('body').hasClass('header-sticky'))
                            headerHeight = $('#site-header').height();
                        var target = $('#' + anchor).offset().top - headerHeight;
                        $('html,body').animate({
                            scrollTop: target
                        }, 1200, 'easeInOutExpo')
                    }
                }
                return !1
            })
        },
        preLoader: function() {
            if ($().animsition) {
                $('.animsition').animsition({
                    inClass: 'fade-in',
                    outClass: 'fade-in',
                    inDuration: 1500,
                    outDuration: 800,
                    loading: !0,
                    loadingParentElement: 'body',
                    loadingClass: 'animsition-loading',
                    timeout: !1,
                    timeoutCountdown: 5000,
                    onLoadEvent: !0,
                    browser: ['-webkit-animation-duration', '-moz-animation-duration', 'animation-duration'],
                    overlay: !1,
                    overlayClass: 'animsition-overlay-slide',
                    overlayParentElement: 'body',
                    transition: function(url) {
                        window.location.href = url
                    }
                })
            }
        },
        cartIcon: function() {
            $(document).on('woocommerce-cart-changed', function(e, data) {
                if (parseInt(data.items_count, 10) > 0) {
                    $('.shopping-cart-items-count').text(data.items_count)
                }
            })
        },
        mobileNav: function() {
            var menuType = 'desktop';
            $(window).on('load resize', function() {
                var mode = 'desktop';
                var wrapMenu = $('#site-header-inner .wrap-inner');
                if (matchMedia('only screen and (max-width: 991px)').matches)
                    mode = 'mobile';
                if (mode != menuType) {
                    menuType = mode;
                    if (mode == 'mobile') {
                        $('#main-nav').attr('id', 'main-nav-mobi').appendTo('#site-header').hide().children('.menu').find('li:has(ul)').children('ul').removeAttr('style').hide().before('<span class="arrow"></span>')
                    } else {
                        $('#main-nav-mobi').attr('id', 'main-nav').removeAttr('style').appendTo(wrapMenu).find('.sub-menu').removeAttr('style').prev().remove();
                        $('.mobile-button').removeClass('active')
                    }
                }
            });
            $(document).on('click', '.mobile-button', function() {
                $(this).toggleClass('active');
                $('#main-nav-mobi').slideToggle()
            })
            $(document).on('click', '#main-nav-mobi .arrow', function() {
                $(this).toggleClass('active').next().slideToggle()
            })
        },
        searchIcon: function() {
            $('.header-search-icon').on('click', function() {
                var searchForm = $(this).parent().find('.header-search-form'),
                    searchField = $(this).parent().find('.header-search-field'),
                    searchIcon = $(this).parent().find('.search-icon');
                searchForm.stop().fadeToggle(function() {
                    searchField.focus()
                });
                searchIcon.toggleClass("nz-magnifier3 nz-close-button1");
                return !1
            })
        },
        retinaLogo: function() {
            var retina = window.devicePixelRatio > 1 ? !0 : !1;
            var $logo = $('#site-logo img');
            var $logo_retina = $logo.data('retina');
            if (retina && $logo_retina) {
                $logo.attr({
                    src: $logo.data('retina'),
                    width: $logo.data('width'),
                    height: $logo.data('height')
                })
            }
        },
        featuredMedia: function() {
            if ($().slick) {
                $('.blog-gallery').slick({
                    dots: !0,
                    infinite: !0,
                    speed: 300,
                    fade: !0,
                    cssEase: 'linear'
                })
            }
        },
        relatedPost: function() {
            if ($().slick) {
                $('.post-related').slick({
                    infinite: !0,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    responsive: [{
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                        }
                    }, {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    }, {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }]
                })
            }
        },
        headerFixed: function() {
            if ($('body').hasClass('header-fixed')) {
                var nav = $('#site-header');
                if (nav.length) {
                    var offsetTop = nav.offset().top,
                        headerHeight = nav.height(),
                        injectSpace = $('<div />', {
                            height: headerHeight
                        }).insertAfter(nav);
                    $(window).on('load scroll', function() {
                        if ($(window).scrollTop() > offsetTop) {
                            nav.addClass('is-fixed');
                            injectSpace.show()
                        } else {
                            nav.removeClass('is-fixed');
                            injectSpace.hide()
                        }
                        if ($(window).scrollTop() > 400) {
                            nav.addClass('is-small')
                        } else {
                            nav.removeClass('is-small')
                        }
                    })
                }
            }
        },
        scrollToTop: function() {
            $(window).scroll(function() {
                if ($(this).scrollTop() > 800) {
                    $('#scroll-top').addClass('show')
                } else {
                    $('#scroll-top').removeClass('show')
                }
            });
            $('#scroll-top').on('click', function() {
                $('html, body').animate({
                    scrollTop: 0
                }, 1000, 'easeInOutExpo');
                return !1
            })
        },
        blogGrid: function() {
            if ($().masonry) {
                $('.blog-grid').masonry({
                    itemSelector: '.hentry',
                })
            }
        },
        widgetSpacer: function() {
            $(window).on('load resize', function() {
                var mode = 'desktop';
                if (matchMedia('only screen and (max-width: 991px)').matches)
                    mode = 'mobile';
                $('.spacer').each(function() {
                    if (mode == 'mobile') {
                        $(this).attr('style', 'height:' + $(this).data('mobi') + 'px')
                    } else {
                        $(this).attr('style', 'height:' + $(this).data('desktop') + 'px')
                    }
                })
            })
        },
    };
    cbrTheme.init()
})(jQuery)