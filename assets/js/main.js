
(function ($) {
    const $window = $(window), $body = $('body');
    // Breakpoints.
    breakpoints({
        xlarge: ['1281px', '1680px'],
        large: ['981px', '1280px'],
        medium: ['737px', '980px'],
        small: ['481px', '736px'],
        xsmall: [null, '480px']
    });
    // Play initial animations on page load.
    $window.on('load', function () {
        window.setTimeout(function () {
            $body.removeClass('is-preload');
        }, 100);
    });
    // Touch mode.
    if (browser.mobile) $body.addClass('is-touch');

    // Scrolly links.
    $('.scrolly').scrolly({
        speed: 2000
    });
    // Dropdowns.
    $('#nav > ul').dropotron({
        alignment: 'right', hideDelay: 350
    });
    $('<div id="titleBar">' + '<a href="#navPanel" class="toggle"></a>' + '<span class="title">' + $('#logo').html() + '</span>' + '</div>').appendTo($body);

    // Panel.
    $('<div id="navPanel">' + '<nav>' + $('#nav').navList() + '</nav>' + '</div>')
        .appendTo($body)
        .panel({
            delay: 500,
            hideOnClick: true,
            hideOnSwipe: true,
            resetScroll: true,
            resetForms: true,
            side: 'left',
            target: $body,
            visibleClass: 'navPanel-visible'
        });

    // Parallax.
    // Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
    if (browser.name == 'ie' || browser.mobile) {
        $.fn._parallax = function () {
            return $(this);
        };
    } else {
        $.fn._parallax = function () {
            $(this).each(function () {
                var $this = $(this), on, off;
                on = function () {

                    $this
                        .css('background-position', 'center 0px');

                    $window
                        .on('scroll._parallax', function () {

                            var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);

                            $this.css('background-position', 'center ' + (pos * -0.15) + 'px');

                        });

                };

                off = function () {

                    $this
                        .css('background-position', '');

                    $window
                        .off('scroll._parallax');

                };

                breakpoints.on('<=medium', off);
                breakpoints.on('>medium', on);

            });

            return $(this);

        };

        $window
            .on('load resize', function () {
                $window.trigger('scroll');
            });

    }

    // Spotlights.
    const $spotlights = $('.spotlight');

    $spotlights
        ._parallax()
        .each(function () {

            var $this = $(this), on, off;

            on = function () {

                var top, bottom, mode;

                // Use main <img>'s src as this spotlight's background.
                $this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');

                // Side-specific scrollex tweaks.
                if ($this.hasClass('top')) {

                    mode = 'top';
                    top = '-20%';
                    bottom = 0;

                } else if ($this.hasClass('bottom')) {

                    mode = 'bottom-only';
                    top = 0;
                    bottom = '20%';

                } else {

                    mode = 'middle';
                    top = 0;
                    bottom = 0;

                }

                // Add scrollex.
                $this.scrollex({
                    mode: mode, top: top, bottom: bottom, initialize: function (t) {
                        $this.addClass('inactive');
                    }, terminate: function (t) {
                        $this.removeClass('inactive');
                    }, enter: function (t) {
                        $this.removeClass('inactive');
                    },

                    // Uncomment the line below to "rewind" when this spotlight scrolls out of view.

                    //leave:	function(t) { $this.addClass('inactive'); },

                });

            };

            off = function () {

                // Clear spotlight's background.
                $this.css('background-image', '');

                // Remove scrollex.
                $this.unscrollex();

            };

            breakpoints.on('<=medium', off);
            breakpoints.on('>medium', on);

        });

    // Wrappers.
    var $wrappers = $('.wrapper');

    $wrappers
        .each(function () {

            var $this = $(this), on, off;

            on = function () {

                $this.scrollex({
                    top: 250, bottom: 0, initialize: function (t) {
                        $this.addClass('inactive');
                    }, terminate: function (t) {
                        $this.removeClass('inactive');
                    }, enter: function (t) {
                        $this.removeClass('inactive');
                    },

                    // Uncomment the line below to "rewind" when this wrapper scrolls out of view.

                    //leave:	function(t) { $this.addClass('inactive'); },

                });

            };

            off = function () {
                $this.unscrollex();
            };

            breakpoints.on('<=medium', off);
            breakpoints.on('>medium', on);

        });

    // Banner.
    // var $banner = $('#banner');
    // $banner._parallax();
    $(document).ready(function () {
        $("#carousel").load("assets/pages/carousel.html");
        $("#aboutContent").load("assets/pages/about.html");
        $("#historyContent").load("assets/pages/history.html");
        $("#OrganizationChart").load("assets/pages/ozCt.html");
        $("#team").load("assets/pages/team.html");
        $("#technology").load("assets/pages/technology.html");
        $("#performance").load("assets/pages/performance.html");
        $("#map").load("assets/pages/map.html");
        $(window).scroll(function () {
            var scrollPosition = $(window).scrollTop(); // 스크롤 위치를 가져옵니다.
            var imageStartPosition = 2200; // 이미지가 시작할 위치를 설정합니다.
            var stopPosition = 2800; // 이미지가 멈출 위치를 설정합니다.

            if (scrollPosition > imageStartPosition && scrollPosition < stopPosition) {
                $(".img-xd").css({
                    'top': scrollPosition // 스크롤 위치에 따라 이미지를 내려갑니다.
                });
            } else if (scrollPosition >= stopPosition) {
                $(".img-xd").css({
                    'top': stopPosition // 이미지가 멈출 위치에서 멈춥니다.
                });
            } else {
                $(".img-xd").css({
                    'top': imageStartPosition // 이미지가 페이지의 상단에 고정됩니다.
                });
            }
        });
    });
})(jQuery);