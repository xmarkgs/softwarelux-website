/*

File structure:
1. For whom carousel
2. Services change image
3. Contact us modal
4. Header change

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
    $('.openContactModal').click((event) => {
        event.preventDefault();

        function hideModal() {
            $('body').removeClass('no-scroll');
            $('.contact-us-modal').removeClass('active');
            $('.contact-us-modal').removeClass('changeModalOpacity');
        }

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

        $('#cancelForm').click((event) => {
            event.preventDefault();

            $('.contact-us-modal__form input, .contact-us-modal__form textarea').val('');
            $('.contact-us-modal__form input[type="checkbox"]').prop("checked", false);

            hideModal();
        });
    });

    // [4] Header change
    $(document).scroll(() => {
        if ($(document).scrollTop() > 50) {
            $('header').removeClass('header--top');
        } else {
            $('header').addClass('header--top');
        }
    });
});