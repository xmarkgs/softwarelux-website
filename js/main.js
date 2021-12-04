/*

File structure:
1. For whom carousel
2. Services change image
3. Contact us modal
4. Header change
5. Mobile menu
6. Scheme item node responsive
7. On-scroll animations
8. Form preventDefault

*/


$(document).ready(() => {

    // [1] For whom carousel
    $('#forWhomCarousel').slick({
        speed: 300,
        autoplay: true,
        autoplaySpeed: 5000,
        dots: true,
        prevArrow: `<button type="button" class="slick-prev"><svg width="16" height="26" viewBox="0 0 16 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4194 13L1.1628 3.74345C0.320733 2.90138 0.320733 1.53612 1.1628 0.694052C2.00487 -0.148016 3.37013 -0.148016 4.2122 0.694052L14.9934 11.4753C15.8355 12.3174 15.8355 13.6826 14.9934 14.5247L4.2122 25.3059C3.37013 26.148 2.00487 26.148 1.1628 25.3059C0.320733 24.4639 0.320733 23.0986 1.1628 22.2566L10.4194 13Z" fill="white"/>
        </svg>
        </button>`,
        nextArrow: `<button type="button" class="slick-next"><svg width="16" height="26" viewBox="0 0 16 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4194 13L1.1628 3.74345C0.320733 2.90138 0.320733 1.53612 1.1628 0.694052C2.00487 -0.148016 3.37013 -0.148016 4.2122 0.694052L14.9934 11.4753C15.8355 12.3174 15.8355 13.6826 14.9934 14.5247L4.2122 25.3059C3.37013 26.148 2.00487 26.148 1.1628 25.3059C0.320733 24.4639 0.320733 23.0986 1.1628 22.2566L10.4194 13Z" fill="white"/>
        </svg>
        </button>`,
    });

    // [2] Services change image
    let currentImage = 1;
    let imageChangedRecently = false;

    function changeImages() {
        let services = document.querySelectorAll('.services__image');

        setInterval(() => {
            if (!imageChangedRecently) {
                for (let image of services) {
                    image.classList.remove('active-service');
                }

                let changeTo;
                if (+currentImage >= 4) {
                    changeTo = 1;
                } else {
                    changeTo = +currentImage + 1;
                }

                $(`.services__image[data-id="${changeTo}"]`).addClass('active-service');
                currentImage = changeTo;
            }
        }, 5000);
    }
    changeImages();

    $('.services__item span').hover((event) => {
        let services = document.querySelectorAll('.services__image');
        let showService = event.target.dataset.id;
        currentImage = showService;

        for (let image of services) {
            if (image.dataset.id === showService) {
                image.classList.add('active-service');
            } else {
                image.classList.remove('active-service');
            }
        }

        imageChangedRecently = true;
        setTimeout(() => {
            imageChangedRecently = false;
        }, 5000);
    });

    // [3] Contact us modal
    function getScrollbarWidth() {
        var div = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>');
        $('body').append(div);
        var w1 = $('div', div).innerWidth();
        div.css('overflow-y', 'scroll');
        var w2 = $('div', div).innerWidth();
        $(div).remove();
        return (w1 - w2);
    }

    function hideModal() {
        changeScrollPadding(false);
        $('body').removeClass('no-scroll');
        $('.contact-us-modal').removeClass('active');
        $('.contact-us-modal').removeClass('changeModalOpacity');
        $('.contact-us-modal--progress').addClass('display--none');
        $('.contact-us-modal--result').addClass('display--none');
        $('.contact-us-modal--error').addClass('display--none');
        $('.contact-us-modal--initial').removeClass('display--none');
        $('.contact-us-modal__form input, .contact-us-modal__form textarea').val('');
    }

    function changeScrollPadding(option) {
        if (option) {
            $('body').css('padding-right', `${getScrollbarWidth()}px`);
            $('header').css('width', `calc(100% - ${getScrollbarWidth()}px)`);
        } else {
            $('body').css('padding-right', `0`);
            $('header').css('width', `100%`);
        }
    }

    $('.openContactModal').click((event) => {
        event.preventDefault();

        changeScrollPadding(true);
        $('body').addClass('no-scroll');
        $('.contact-us-modal').addClass('active');
        setTimeout(() => {
            $('.contact-us-modal').addClass('changeModalOpacity');
        }, 10);

        $('.contact-us-modal').click(() => {
            hideModal();
        });

        $('.contact-us-modal__content').click((event) => {
            event.stopPropagation();
        });

        $('.modal-close').click((event) => {
            hideModal();
        });
    });

    $('#cancelForm').click((event) => {
        event.preventDefault();
        hideModal();
    });

    // [4] Header change
    $(document).scroll(() => {
        if ($(document).scrollTop() > 50) {
            $('header').removeClass('header--top');
        } else {
            $('header').addClass('header--top');
        }
    });

    // [5] Mobile menu
    function showMobileMenu(option) {
        if (option) {
            $('.mobile-menu').addClass('menu-active');
            $('body').addClass('no-scroll');
            changeScrollPadding(true);
            setTimeout(() => {
                $('.mobile-menu__content').addClass('menu-slide-in');
            }, 10);
        } else {
            $('body').removeClass('no-scroll');
            changeScrollPadding(false);
            $('.mobile-menu').removeClass('menu-active');
            $('.mobile-menu__content').removeClass('menu-slide-in');
        }
    }

    $('.openMobileMenu').click(() => {
        showMobileMenu(true);
    });

    $('.mobile-menu').click(() => {
        showMobileMenu(false);
    });

    $('.mobile-menu__content').click((event) => {
        event.stopPropagation();
    });

    $('.mobile-menu .menu-link, .mobile-menu .openContactModal, .mobile-menu__mail, .closeMobileMenu').click(() => {
        showMobileMenu(false);
    });

    // [6] Scheme item node responsive
    function howWeWorkInit() {
        if (window.innerWidth <= 1150) {
            $('.scheme__item__node').css('width', `calc(((${window.innerWidth - getScrollbarWidth()}px - 48px) / 2) - 406px + 9px)`);
            $('.scheme__col--right .scheme__item__node').css('left', `${-16 - (((window.innerWidth - getScrollbarWidth() - 48) / 2) - 406 + 9)}px`);
        } else {
            $('.scheme__item__node').removeAttr('style');
        }
    }
    howWeWorkInit();

    $(window).resize(() => {
        howWeWorkInit();
    });

    // [7] On-scroll animations
    function doScrollAnimations () {
        $('.animateOnScroll').each(function () {
            let elementTop = $(this).offset().top;
            let windowBottom = $(window).scrollTop() + $(window).height();

            // If the element's top edge is in the field of view, animate it
            if (windowBottom > elementTop+$(this).height()*0.1) {
                $(this).addClass($(this).attr('data-animation'));
                $(this).addClass('animated');
            }
        });
    }
    doScrollAnimations();

    $(window).scroll(function () {
        doScrollAnimations();
    });

    // [8] Form preventDefault
    $('.contact-us-modal__form').ajaxForm({
        url: 'mailer.php', 
        type: 'post',
        beforeSerialize: () => {
            $('.contact-us-modal--initial').addClass('display--none');
            $('.contact-us-modal--progress').removeClass('display--none');
        },
        success: () => {
            $('.contact-us-modal--progress').addClass('display--none');
            $('.contact-us-modal--result').removeClass('display--none');
            setTimeout(() => {
                hideModal();
            }, 2500);
        },
        error: () => {
            $('.contact-us-modal--progress').addClass('display--none');
            $('.contact-us-modal--error').removeClass('display--none');
        }
    });
});