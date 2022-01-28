/*

File structure:
1. For whom carousel
2. Services change image
3. Modals
4. Header change
5. Mobile menu
6. Scheme item node responsive
7. On-scroll animations
8. Form submission
9. Form submit-btn reactiveness

*/


$(document).ready(() => {

    // [1] For whom carousel
    $('#forWhomCarousel').slick({
        speed: 300,
        autoplay: true,
        autoplaySpeed: 5000,
        // dots: true,
        prevArrow: `<button type="button" class="slick-prev"><svg width="12" height="19.5" viewBox="0 0 16 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4194 13L1.1628 3.74345C0.320733 2.90138 0.320733 1.53612 1.1628 0.694052C2.00487 -0.148016 3.37013 -0.148016 4.2122 0.694052L14.9934 11.4753C15.8355 12.3174 15.8355 13.6826 14.9934 14.5247L4.2122 25.3059C3.37013 26.148 2.00487 26.148 1.1628 25.3059C0.320733 24.4639 0.320733 23.0986 1.1628 22.2566L10.4194 13Z" fill="white"/>
        </svg>
        </button>`,
        nextArrow: `<button type="button" class="slick-next"><svg width="12" height="19.5" viewBox="0 0 16 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4194 13L1.1628 3.74345C0.320733 2.90138 0.320733 1.53612 1.1628 0.694052C2.00487 -0.148016 3.37013 -0.148016 4.2122 0.694052L14.9934 11.4753C15.8355 12.3174 15.8355 13.6826 14.9934 14.5247L4.2122 25.3059C3.37013 26.148 2.00487 26.148 1.1628 25.3059C0.320733 24.4639 0.320733 23.0986 1.1628 22.2566L10.4194 13Z" fill="white"/>
        </svg>
        </button>`,
        appendArrows: $('.for-whom__arrows')
    });

    function changeCarouselCounter(selector, slide, slideCount) {
        $(`${selector}`).text(`${++slide} / ${slideCount}`);
    }
    changeCarouselCounter(
        '.for-whom__counter span', 
        $('#forWhomCarousel').slick('slickCurrentSlide'), 
        $('#forWhomCarousel').slick('getSlick').slideCount
    );

    $('#forWhomCarousel').on('afterChange', (event, slick, currentSlide) => {
        changeCarouselCounter('.for-whom__counter span', currentSlide, slick.slideCount);
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

                $(`.services__item span[data-id="${changeTo}"]`).addClass('serviceImgChanged');
                setTimeout(() => {
                    $(`.services__item span[data-id="${changeTo}"]`).removeClass('serviceImgChanged');
                }, 1000);
                $(`.services__image[data-id="${changeTo}"]`).addClass('active-service');
                currentImage = changeTo;
            }
        }, 5000);
    }
    changeImages();

    $('.services__item span').mouseover((event) => {
        $(`.services__item span`).removeClass('serviceImgChanged');
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
    });

    $('.services__item span').mouseleave(() => {
            imageChangedRecently = false;
    });

    // [3] Modals
    function getScrollbarWidth() {
        let div = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>');
        $('body').append(div);
        let w1 = $('div', div).innerWidth();
        div.css('overflow-y', 'scroll');
        let w2 = $('div', div).innerWidth();
        $(div).remove();
        return (w1 - w2);
    }

    function hideModal(form, submitBtnID) {
        changeScrollPadding(false);
        
        $(`.${form}`).removeClass('active');
        $(`.${form}`).removeClass('changeModalOpacity');
        $(`.${form}--progress`).addClass('display--none');
        $(`.${form}--result`).addClass('display--none');
        $(`.${form}--error`).addClass('display--none');
        $(`.${form}--initial`).removeClass('display--none');
        $(`.${form}__form input, .${form}__form textarea`).val('');
        $(`.${form}__form #${submitBtnID}`).attr('disabled', true);
    }

    function showModal(form) {
        changeScrollPadding(true);
        $(`.${form}`).addClass('active');
        setTimeout(() => {
            $(`.${form}`).addClass('changeModalOpacity');
        }, 10);

        $(`.${form}`).click(() => {
            hideModal(form, $(`.cancelForm[data-form="${form}"]`).data('submitbtnid'));
        });

        $(`.${form}__content`).click((event) => {
            event.stopPropagation();
        });

        $('.modal-close').click(() => {
            hideModal(form, $(`.cancelForm[data-form="${form}"]`).data('submitbtnid'));
        });
    }

    function changeScrollPadding(option) {
        if (option) {
            $('body').addClass('no-scroll');
            $('body').css('padding-right', `${getScrollbarWidth()}px`);
            $('header').css('width', `calc(100% - ${getScrollbarWidth()}px)`);
        } else {
            $('body').removeClass('no-scroll');
            $('body').css('padding-right', `0`);
            $('header').css('width', `100%`);
        }
    }

    $('.cancelForm').click((event) => {
        event.preventDefault();
        hideModal(event.target.dataset.form, event.target.dataset.submitbtnid);
    });

    // Contact us modal init
    $('.openContactModal').click((event) => {
        event.preventDefault();
        showModal('contact-us-modal');
    });
    addSubmitBtnReactiveness('contact-us-modal', 'sendContUsForm');

    // CV modal init
    $('.openCVModal').click((event) => {
        event.preventDefault();
        showModal('cv-modal');
    });
    addSubmitBtnReactiveness('cv-modal', 'sendCVForm');

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
    function doScrollAnimations() {
        $('.animateOnScroll').each(function () {
            let elementTop = $(this).offset().top;
            let windowBottom = $(window).scrollTop() + $(window).height();

            // If the element's top edge is in the field of view, animate it
            if (windowBottom > elementTop + $(this).height() * 0.1) {
                $(this).addClass($(this).attr('data-animation'));
                $(this).addClass('animated');
            }
        });
    }
    doScrollAnimations();

    $(window).scroll(function () {
        doScrollAnimations();
    });

    // [8] Form submission
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

    // [9] Form submit-btn reactiveness
    function addSubmitBtnReactiveness(form, submitBtnID) {
        $(`.${form} .modal__form input, .${form} .modal__form textarea`).on('input', () => {
            let elements = document.querySelectorAll(`.${form} .modal__form input, .${form} .modal__form textarea`);
            let valid = true;
            for (let element of elements) {
                element.checkValidity() ? null : valid = false;
            }
            if (valid) {
                $(`.${form} .modal__form #${submitBtnID}`).removeAttr('disabled');
            } else {
                $(`.${form} .modal__form #${submitBtnID}`).attr('disabled', true);
            }
        });
        $(`.${form} .modal__form #cv-upload-js`).on('input', (event) => {
            $(`.${form} .modal__form .file-info-js`).text(event.currentTarget.value)
        });
    }


});