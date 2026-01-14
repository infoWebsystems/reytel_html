jQuery(function ($) {
  "use strict";

  let mainSwiper = null;
  let thumbsSwiper = null;

  function initSwiper() {
    if (window.innerWidth < 1023 && !mainSwiper) {
      // Тумбси (максимум 4)
      thumbsSwiper = new Swiper(".product-detail__thumbs", {
        slidesPerView: 4,
        spaceBetween: 8,
        slideToClickedSlide: true,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        // slideActiveClass: "swiper-slide-thumb-active",
      });

      // Основний слайдер
      mainSwiper = new Swiper(".product-detail__slider", {
        slidesPerView: 1,
        spaceBetween: 8,
        breakpoints: {
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
        },
        thumbs: {
          swiper: thumbsSwiper,
        },
        on: {
          slideChange: function () {
            // Прокручуємо тумби до активного слайду
            if (thumbsSwiper) {
              thumbsSwiper.slideTo(this.activeIndex);
            }
          },
        },
      });

      // Якщо тумби можуть додаватися динамічно, оновлюємо thumbsSwiper
      // (наприклад після ajax або додавання нових елементів)
      thumbsSwiper.update();
    } else if (window.innerWidth >= 1023 && mainSwiper) {
      // Знищуємо обидва
      mainSwiper.destroy(true, true);
      thumbsSwiper.destroy(true, true);

      mainSwiper = null;
      thumbsSwiper = null;
    }
  }

  // Ініціалізація
  initSwiper();
  $(window).on("resize", initSwiper);

  // Автоматичне відтворення відео
  const videos = document.querySelectorAll(".product__video");
  videos.forEach((video) => {
    video.play().catch(() => {});
  });

  const mainSlider = new Swiper(".more-offer__slider", {
    slidesPerView: 4,
    spaceBetween: 12,
    navigation: {
      nextEl: ".more-offer__header .swiper-button-next",
      prevEl: ".more-offer__header .swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 2.3,
      },
      768: {
        slidesPerView: 3,
      },
      1280: {
        slidesPerView: 4,
      },
    },
  });

  $(document).ready(function () {
    var $content = $(".product-detail__content .sticky-content");
    var $container = $(".product-detail__content");
    var $header = $(".header");

    if ($content.length === 0 || $container.length === 0) return;

    function isDesktop() {
      return window.innerWidth > 1023;
    }

    function getStickyOffset() {
      var headerHeight = $header.length ? $header.outerHeight() : 0;
      var gap = 20;
      return headerHeight + gap;
    }

    function resetSticky() {
      $content.removeClass("is-sticky");
      $content.css({ top: "", position: "" });
    }

    function updateSticky() {
      if (!isDesktop()) {
        resetSticky();
        return;
      }

      var stickyOffset = getStickyOffset();
      var scrollTop = $(window).scrollTop();

      var containerTop = $container.offset().top;
      var containerHeight = $container.outerHeight();
      var contentHeight = $content.outerHeight();

      var maxTop = containerHeight - contentHeight;

      if (
        scrollTop + stickyOffset >= containerTop &&
        scrollTop + stickyOffset <= containerTop + maxTop
      ) {
        $content.addClass("is-sticky");
        $content.css("top", stickyOffset + "px");
      } else if (scrollTop + stickyOffset >= containerTop + maxTop) {
        $content.removeClass("is-sticky");
        $content.css("top", maxTop + "px");
      } else {
        $content.removeClass("is-sticky");
        // $content.addClass("is-sticky");
        // $content.css("top", 0);
        $content.css("top", maxTop + "px");
      }
    }

    // scroll + resize
    $(document).on("scroll", updateSticky);
    $(window).on("resize", updateSticky);

    // ResizeObserver для змін висоти (акордеон, варіанти і т.д.)
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(updateSticky);
    });

    ro.observe($container[0]);

    updateSticky();
  });

  // $(document).ready(function () {
  //   const $gallery = $("#engraving-gallery");
  //   const $items = $gallery.find(".gallery-item");
  //   const $hidden = $("#engraving-selected");

  //   $items.on("click", function () {
  //     // зняти active з усіх
  //     $items.removeClass("active");

  //     // додати active на вибране
  //     $(this).addClass("active");

  //     // взяти id (або src, якщо треба)
  //     const selectedId = $(this).data("id");

  //     // записати у hidden input
  //     $hidden.val(selectedId);
  //   });

  //   stickyBottomInfoProduct();
  // });

  $(document).ready(function () {
    // THUMB SLIDER
    const engravingThumbs = new Swiper(".engraving-thumbs", {
      slidesPerView: 4,
      spaceBetween: 8,
      watchSlidesProgress: true,
      slideToClickedSlide: true,
      centerInsufficientSlides: true,
      loop: true,
    });

    // MAIN SLIDER
    const engravingSwiper = new Swiper(".engraving-swiper", {
      slidesPerView: 3,
      spaceBetween: 46,
      centeredSlides: true,
      loop: true,
      thumbs: {
        swiper: engravingThumbs,
      },
      navigation: {
        nextEl: ".engraving-next",
        prevEl: ".engraving-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1.8,
          centeredSlides: true,
        },
        700: {
          slidesPerView: 3,
          centeredSlides: true,
        },
      },
    });

    engravingSwiper.on("slideChange", function () {
      const activeSlide = engravingSwiper.slides[engravingSwiper.activeIndex];
      const id = $(activeSlide).data("id");

      $("#engraving-selected").val(id);
    });

    $(document).on("click", ".gallery-item", function () {
      $(".gallery-item").removeClass("active");
      $(this).addClass("active");

      const index = $(this).closest(".swiper-slide").index();
      engravingSwiper.slideTo(index, 300); // центруємо

      $("#engraving-selected").val($(this).data("id"));
    });

    // ------------------- SELECT LOGIC -------------------
    const $hidden = $("#engraving-selected");

    $(document).on("click", ".gallery-item", function () {
      $(".gallery-item").removeClass("active");

      $(this).addClass("active");

      const selectedId = $(this).data("id");
      $hidden.val(selectedId);
    });

    stickyBottomInfoProduct();
  });
});

function stickyBottomInfoProduct() {
  const $sticky = $(".product-sticky");
  const $buttons = $(".product-detail__content-buttons");
  const $footer = $(".footer");

  if ($sticky.length === 0 || $buttons.length === 0) return;

  let lastScrollTop = 0;

  function updateSticky() {
    const scrollTop = $(window).scrollTop();
    const buttonsBottom = $buttons.offset().top + $buttons.outerHeight();

    // координати футера
    const footerTop = $footer.offset().top;
    const windowBottom = scrollTop + $(window).height();

    const footerVisible = windowBottom >= footerTop;

    const scrollingDown = scrollTop > lastScrollTop;
    lastScrollTop = scrollTop;

  
    if (scrollTop >= buttonsBottom && !footerVisible && !scrollingDown) {
      $sticky.addClass("active");
    } else {
      $sticky.removeClass("active");
    }
  }

  $(window).on("scroll resize", updateSticky);
  updateSticky();
}
