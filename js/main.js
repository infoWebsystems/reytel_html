var _functions = {},
  winWidth,popupTop;
let uploadedFiles = [];

jQuery(function ($) {
  ("use strict");

  /* function on page ready */
  var isTouchScreen =
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i);
  if (isTouchScreen) $("html").addClass("touch-screen");
  var winScr,
    winHeight,
    is_Mac = navigator.platform.toUpperCase().indexOf("MAC") >= 0,
    is_IE =
      /MSIE 9/i.test(navigator.userAgent) ||
      /rv:11.0/i.test(navigator.userAgent) ||
      /MSIE 10/i.test(navigator.userAgent) ||
      /Edge\/\d+/.test(navigator.userAgent),
    is_Chrome =
      navigator.userAgent.indexOf("Chrome") >= 0 &&
      navigator.userAgent.indexOf("Edge") < 0;

  /* check browser */
  winWidth = $(window).width();
  winHeight = $(window).height();

  if (is_Mac) {
    $("html").addClass("mac");
  }
  if (is_IE) {
    $("html").addClass("ie");
  }
  if (is_Chrome) {
    $("html").addClass("chrome");
  }

  _functions.scrollCall = function () {
    winScr = $(window).scrollTop();
  };

  // 🔧 Scroll control
  function removeScroll() {
    popupTop = $(window).scrollTop();
    $("html").css({
      position: "fixed",
      top: -popupTop,
      width: "100%",
    });
  }
  function addScroll() {
    $("html").css({ position: "static" });
    window.scroll(0, popupTop);
  }

  // 💥 Open popup with key
  _functions.openPopup = function (popupKey) {
    $(".popup-content").removeClass("active");
    $(".popup-content[data-rel='" + popupKey + "'], .popup-wrapper").addClass(
      "active"
    );

    removeScroll();
  };

  // ❌ Close popup
  _functions.closePopup = function () {
    $(".popup-wrapper, .popup-content").removeClass("active");
    addScroll();
  };

  // 🟢 Open trigger
  $(document).on("click", ".open-popup", function (e) {
    e.preventDefault();
    const popupKey = $(this).data("rel");
    _functions.openPopup(popupKey);
  });

  // 🔴 Close trigger
  $(document).on(
    "click",
    ".popup-wrapper .btn-close, .popup-wrapper .layer-close, .popup-wrapper .close-popup",
    function (e) {
      e.preventDefault();
      _functions.closePopup();
    }
  );

  $(document).on("click", ".mobile-burger", function (e) {
    e.preventDefault();
    $(".menu").addClass("active");
  });
  $(document).on("click", ".menu .btn-close", function (e) {
    e.preventDefault();
    $(".menu").removeClass("active");
  });

  //FOOTER ACCORDEON
  function isMobile() {
    return $(window).width() <= 768;
  }

  $(".search-toggle").on("click", function (e) {
    e.preventDefault();
    $(".search-box").toggleClass("active");
  });

  $(document).on("click", function (e) {
    if (
      !$(e.target).closest(".search-box").length &&
      !$(e.target).closest(".search-toggle").length
    ) {
      $(".search-box").removeClass("active");
    }
  });

  // Клік по тайтлу
  $(".accordion-mob__title").on("click", function () {
    if (!isMobile()) return;

    const parent = $(this).closest(".accordion-mob");
    const content = parent.find(".accordion-mob__content");

    parent.toggleClass("active");
    content.slideToggle(300);
  });

  // Обробка resize
  function handleResize() {
    if (isMobile()) {
      // Закриваємо все на мобілці
      $(".accordion-mob")
        .removeClass("active")
        .find(".accordion-mob__content")
        .hide();
    } else {
      // Відкриваємо все на десктопі
      $(".accordion-mob")
        .addClass("active")
        .find(".accordion-mob__content")
        .show();
    }
  }

  // Викликаємо при загрузці
  handleResize();

  // Викликаємо при resize
  $(window).on("resize", function () {
    handleResize();
  });

  $(document).on("click", "[data-stars] span", function () {
    const starValue = $(this).data("star");
    const container = $(this).parent();

    container.find("span").removeClass("active");

    for (let i = 1; i <= starValue; i++) {
      container.find(`[data-star="${i}"]`).addClass("active");
    }

    $("#rating-input").val(starValue);
  });

  //review form
  $("#submit-review").on("click", function () {
    const errors = [];
    const rating = $("#rating-input").val();
    const name = $("#review-name").val().trim();
    const email = $("#review-email").val().trim();
    const description = $("#review-description").val().trim();
    const title = $("#review-title").val().trim();

    if (!rating) errors.push("Please select a rating.");
    if (title.length < 3) errors.push("Title is too short.");
    if (description.length < 10)
      errors.push("Description must be at least 10 characters.");
    if (!name) errors.push("Name is required.");
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      errors.push("Invalid email address.");

    if (errors.length) {
      $("#review-errors").html(errors.join("<br>"));
      $("#review-errors").slideDown();
      return;
    } else {
      $("#review-errors").slideUp();
    }

    // FormData for AJAX
    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("name", name);
    formData.append("email", email);

    if (uploadedFiles.length) {
      uploadedFiles.forEach((file, i) => {
        if (file) formData.append("images[]", file);
      });
    }

    // TODO: AJAX endpoint
    console.log("Submitting review...", formData);
    resetReviewForm();
    // Close popup after success
    _functions.closePopup();
  });
  uploadFiles();



    $('#save-engraving').on('click', function (e) {
        e.preventDefault();

        const errorBox = $('.form-error');
        errorBox.hide().text('');

        let errors = [];

        // 1️⃣ engraving text
        if (!$('#engraving-text').val().trim()) {
            errors.push('Please enter engraving text.');
        }

        // 2️⃣ selected inspiration (optional — якщо треба)
        // if (!$('#engraving-selected').val()) {
        //     errors.push('Please select an engraving inspiration.');
        // }

        // 3️⃣ uploaded images
        let uploadedCount = 0;
        $('.upload-preview .preview-item').each(function () {
            uploadedCount++;
        });

        if (uploadedCount === 0) {
            errors.push('Please upload at least one image.');
        }

        // if (uploadedCount > MAX_IMAGES) {
        //     errors.push(`You can upload maximum ${MAX_IMAGES} images.`);
        // }

        // ❌ якщо є помилки
        if (errors.length) {
            errorBox
                .html(errors.join('<br>'))
                .slideDown();
            return;
        }

        // ✅ якщо все ок — сабміт
        $(this).closest('form')[0].submit();
    });  
});

function resetReviewForm() {
  // Inputs
  $("#review-title").val("");
  $("#review-description").val("");
  $("#review-name").val("");
  $("#review-email").val("");

  // Rating
  $("#rating-input").val("");
  $(".review-stars .star").removeClass("active");

  // Errors
  $("#review-errors").hide().empty();

  // Uploaded files reset
  uploadedFiles = [];

  // Preview reset
  $("#image-preview").empty();

  // Drop zone text reset
  $(".dropzone-text").show();

  // File input reset
  $("#review-image-input").val("");
}

$(function () {
  function updateHeaderSpacer() {
    var headerHeight = $(".header").outerHeight();
    $(".header-spacer").height(headerHeight);
    if ($(window).width() <= 1055) {
      $(".main-content nav").css("top", headerHeight + "px");
    }
  }

  // Викликаємо при завантаженні сторінки
  updateHeaderSpacer();

  // І при зміні розміру вікна
  $(window).on("resize", function () {
    updateHeaderSpacer();
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const cardSliders = document.querySelectorAll(".product-card__inner-slider");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("swiper-initialized")
        ) {
          new Swiper(entry.target, {
            slidesPerView: 1,
            // pagination: {
            //   el: entry.target.querySelector(".swiper-pagination"),
            //   clickable: true,
            //   dynamicBullets: true, // ✅ максимум 4 видимих точки
            // },
            navigation: {
              nextEl: entry.target.querySelector(".swiper-button-next"),
              prevEl: entry.target.querySelector(".swiper-button-prev"),
            },
            lazy: {
              loadPrevNext: true,
            },
          });

          entry.target.classList.add("swiper-initialized");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  cardSliders.forEach((slider) => observer.observe(slider));
});

document.querySelectorAll(".rating").forEach((r) => {
  const rating = parseFloat(r.dataset.rating);
  const activeStars = Math.round(rating);

  let html = "";

  for (let i = 0; i < 5; i++) {
    html += `
            <span>
                <img src="./img/icons/${
                  i < activeStars ? "star-active" : "star"
                }.svg" alt="">
            </span>`;
  }
  html += `
            <span class="count">
               ${rating}
            </span>`;

  r.innerHTML = html;
});

$(document).ready(function () {
  const $selectWrapper = $(".custom-popover-select");

  // Якщо блоку немає — нічого не робимо
  if (!$selectWrapper.length) return;

  const $toggleBtn = $selectWrapper.find(".custom-popover-select__toggle");
  const $dropdown = $selectWrapper.find(".custom-popover-select__dropdown");
  const $label = $selectWrapper.find(".custom-popover-select__label");
  const $hiddenInput = $("#selected-size");

  const $tabs = $dropdown.find(".custom-popover-tab");
  const $contents = $dropdown.find(".custom-popover-content");
  const $rows = $dropdown.find(".custom-popover-row");

  // --- Open / close dropdown ---
  $toggleBtn.on("click", function (e) {
    e.stopPropagation();
    $selectWrapper.toggleClass("open");
  });

  // --- Close dropdown when clicking outside ---
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".custom-popover-select").length) {
      $selectWrapper.removeClass("open");
    }
  });

  // --- Tabs switching ---
  $tabs.on("click", function () {
    const target = $(this).data("tab");

    $tabs.removeClass("active");
    $(this).addClass("active");

    $contents.removeClass("active");
    $("#tab-" + target).addClass("active");
  });

  // --- Selecting a size row ---
  $rows.on("click", function () {
    const value = $(this).data("value");
    const text = $(this).find("span").text().trim();

    // set label
    $label.text(text);

    // set input value
    if ($hiddenInput.length) {
      $hiddenInput.val(value);
    }

    // remove previous selections
    $rows.removeClass("selected");
    $(this).addClass("selected");

    // close
    $selectWrapper.removeClass("open");
  });
});

// document.addEventListener("DOMContentLoaded", function () {
//   const selectWrapper = document.querySelector(".custom-popover-select");
//   const toggleBtn = selectWrapper.querySelector(
//     ".custom-popover-select__toggle"
//   );
//   const dropdown = selectWrapper.querySelector(
//     ".custom-popover-select__dropdown"
//   );
//   const label = selectWrapper.querySelector(".custom-popover-select__label");
//   const hiddenInput = document.querySelector("#selected-size");

//   const tabs = dropdown.querySelectorAll(".custom-popover-tab");
//   const contents = dropdown.querySelectorAll(".custom-popover-content");

//   // --- Open / close dropdown ---
//   toggleBtn.addEventListener("click", () => {
//     selectWrapper.classList.toggle("open");
//   });

//   // --- Close dropdown when clicking outside ---
//   document.addEventListener("click", (e) => {
//     if (!selectWrapper.contains(e.target)) {
//       selectWrapper.classList.remove("open");
//     }
//   });

//   // --- Tabs switching ---
//   tabs.forEach((tab) => {
//     tab.addEventListener("click", () => {
//       const target = tab.dataset.tab;

//       tabs.forEach((t) => t.classList.remove("active"));
//       tab.classList.add("active");

//       contents.forEach((c) => c.classList.remove("active"));
//       document.querySelector(`#tab-${target}`).classList.add("active");
//     });
//   });

//   // --- Selecting a size ---
//   const rows = dropdown.querySelectorAll(".custom-popover-row");

//   rows.forEach((row) => {
//     row.addEventListener("click", () => {
//       const value = row.dataset.value;
//       const text = row.querySelector("span").textContent.trim();

//       // set label
//       label.textContent = text;

//       // set input value
//       hiddenInput.value = value;

//       // remove previous selections
//       rows.forEach((r) => r.classList.remove("selected"));
//       row.classList.add("selected");

//       // close dropdown
//       selectWrapper.classList.remove("open");
//     });
//   });
// });

$(document).ready(function () {
  $(".accordeon-item__header").click(function () {
    const $item = $(this).parent(); // поточний елемент
    const $content = $(this).next(".accordeon-item__content");

    // Закриваємо всі інші
    $(".accordeon-item").not($item).removeClass("active");
    $(".accordeon-item__content").not($content).slideUp();

    // Тогл для поточного
    $item.toggleClass("active");
    $content.slideToggle();
  });

  catalogFilters();

  const modal = $(".modal-filter");
  const closeModal = $(".modal-filter .btn-close");

  $(".open-popup-filter").on("click", function (e) {
    e.preventDefault();
    modal.addClass("active");
  });

  closeModal.on("click", function () {
    modal.removeClass("active");
  });

  $(".mobile-button").click(function () {
    $(this).toggleClass("active");
    $(".main-content nav").toggleClass("active");
    $(".header-navigation li").removeClass("active");
    if ($(window).width() <= 1055) {
      $("html").toggleClass("overflow-menu");
    }
  });
  $(".header-navigation > li > a").click(function (e) {
    if (
      $(window).width() <= 768 &&
      $(this).closest("li").find(".sub-menu").length
    ) {
      e.preventDefault();
      $(this).closest("li").addClass("active");
    }
  });
  $(".sub-menu__header").click(function (e) {
    e.preventDefault();
    $(this).closest("li").removeClass("active");
  });

  initHeroSlider();
  initProductsSlider();
});

$(document).ready(function () {
  $(".js-article-toggle").on("click", function (e) {
    e.preventDefault();

    const $btn = $(this);
    const $content = $btn
      .closest(".article-second")
      .find(".article-second__content");

    $content.toggleClass("active");

    // змінюємо текст кнопки
    if ($content.hasClass("active")) {
      $btn.text($btn.data("text-close"));
    } else {
      $btn.text($btn.data("text-open"));
    }
  });
});

function initProductsSlider() {
  $(".product-cards__slider").each(function () {
    const $this = $(this);

    const swiper = new Swiper(this, {
      slidesPerView: 1.4,
      spaceBetween: 6,
      navigation: {
        nextEl: $this
          .closest(".product-cards__wrapper")
          .find(".swiper-button-next")
          .get(0),
        prevEl: $this
          .closest(".product-cards__wrapper")
          .find(".swiper-button-prev")
          .get(0),
      },
      pagination: {
        el: $this.children(".swiper-pagination").get(0),
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2.5,
          spaceBetween: 16,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      },
    });
  });
}

function initHeroSlider() {
  let mainSwiper = null;
  let thumbsSwiper = null;

  function initSwiper() {
    // Тумбси (максимум 4)
    thumbsSwiper = new Swiper(".hero-slider__thumbs", {
      slidesPerView: 4,
      spaceBetween: 8,
      watchSlidesProgress: true,
      slideToClickedSlide: true,
      centeredSlides: false,
      centerInsufficientSlides: false,
      // loop: true,
    });

    // Основний слайдер
    mainSwiper = new Swiper(".hero-slider", {
      slidesPerView: 1,
      spaceBetween: 8,
      // loop: true,
      thumbs: {
        swiper: thumbsSwiper,
      },
    });
  }

  initSwiper();
  $(window).on("resize", initSwiper);
}

function uploadFiles() {
  // У кожного upload-блоку буде свій масив файлів
  const uploadInstances = new Map();

  // Ініціалізація всіх блоків
  function initUploaders() {
    $(".upload-area").each(function () {
      const area = $(this);
      const input = area.find(".upload-input");
      const preview = area.closest(".form-group").find(".upload-preview");

      uploadInstances.set(area[0], {
        files: [],
        area,
        input,
        preview,
      });

      // ============================
      // FILE SELECT (click upload)
      // ============================
      area.find(".upload-trigger").on("click", () => input.trigger("click"));

      input.on("change", function () {
        handleFiles(area, this.files);
      });

      // ============================
      // DRAG & DROP
      // ============================
      area.on("dragover", function (e) {
        e.preventDefault();
        area.addClass("dragover");
      });

      area.on("dragleave", function () {
        area.removeClass("dragover");
      });

      area.on("drop", function (e) {
        e.preventDefault();
        area.removeClass("dragover");

        let dt = e.originalEvent.dataTransfer;
        if (dt && dt.files.length) handleFiles(area, dt.files);
      });
    });
  }

  // ============================
  // HANDLE FILES FOR INSTANCE
  // ============================
  // function handleFiles(area, files) {
  //   const inst = uploadInstances.get(area[0]);

  //   for (let file of files) {
  //     // Валідація типу
  //     if (!file.type.match("image.*")) {
  //       showUploadError(area, "File must be an image");
  //       continue;
  //     }

  //     // Валідація розміру ≤ 15MB
  //     if (file.size > 15 * 1024 * 1024) {
  //       showUploadError(area, "Maximum file size is 15 MB");
  //       continue;
  //     }

  //     let index = inst.files.push(file) - 1;
  //     addPreview(inst, file, index);
  //   }
  // }

function handleFiles(area, files) {
  const inst = uploadInstances.get(area[0]);
  const maxFiles = parseInt(area.data("max-files"), 10) || Infinity;

  let currentCount = inst.files.filter(f => f !== null).length;

  for (let file of files) {

    // ⛔ ліміт
    if (currentCount >= maxFiles) {
      showUploadError(area, `Maximum ${maxFiles} images allowed`);
      break;
    }

    // тип
    if (!file.type.match("image.*")) {
      showUploadError(area, "File must be an image");
      continue;
    }

    // розмір
    if (file.size > 15 * 1024 * 1024) {
      showUploadError(area, "Maximum file size is 15 MB");
      continue;
    }

    inst.files.push(file);
    addPreview(inst, file, inst.files.length - 1);
    currentCount++; // 🔥 КЛЮЧОВЕ
  }
}


  // ============================
  // PREVIEW
  // ============================
  function addPreview(inst, file, index) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const preview = `
      <div class="preview-item" data-index="${index}">
        <img src="${e.target.result}">
        <div class="preview-remove">×</div>
      </div>
    `;

      inst.preview.append(preview);
    };

    reader.readAsDataURL(file);
  }

  // ============================
  // REMOVE FILE
  // ============================
  $(document).on("click", ".preview-remove", function () {
    const item = $(this).closest(".preview-item");
    const index = item.data("index");

    // Який upload-area?
    const previewBox = item.closest(".upload-preview");
    const area = previewBox.closest(".form-group").find(".upload-area")[0];

    const inst = uploadInstances.get(area);

    inst.files[index] = null;
    item.remove();
  });

  // ============================
  // ERROR MESSAGE (inline)
  // ============================
  function showUploadError(area, message) {
    let err = area.closest(".form-group").find(".upload-error");

    if (!err.length) {
      err = $('<div class="upload-error"></div>');
      area.closest(".form-group").append(err);
    }

    err.text(message).slideDown();

    setTimeout(() => err.slideUp(), 4000);
  }

  // Запускаємо
  initUploaders();
}

function catalogFilters() {
  const $selectedFilters = $(".catalog-filter__bottom .selected-filters");
  const $bottom = $(".catalog-filter__bottom");

  function handleSelectedFilters() {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // remove only visually — detach keeps events/data
      if ($selectedFilters.parent().length) {
        $selectedFilters.detach();
      }
    } else {
      // return back inside bottom block if not already there
      if (!$selectedFilters.parent().length) {
        $bottom.prepend($selectedFilters);
      }
    }
  }

  // Initial
  handleSelectedFilters();

  // On resize
  $(window).on("resize", handleSelectedFilters);

  // --------------------------------
  // 🔥 Функція оновлення мобільного UI
  // --------------------------------
  function updateMobileFiltersUI() {
    const selectedCount = $(".selected-tag").length;

    if (selectedCount > 0) {
      $(".modal-filter__header .count").addClass("active");
      $(".selected-filters").addClass("active");
    } else {
      $(".modal-filter__header .count").removeClass("active");
      $(".selected-filters").removeClass("active");
    }

    const baseTitle = "filters";
    $(".modal-filter__header-title").text(
      selectedCount > 0 ? `${baseTitle} (${selectedCount})` : baseTitle
    );
  }

  // --------------------------------
  // Dropdown open/close
  // --------------------------------
  $(".filter-toggle").on("click", function (e) {
    e.stopPropagation();
    const isMobile = window.innerWidth <= 768;
    const dropdown = $(this).next(".filter-dropdown");

    if (!isMobile) {
      $(".filter-dropdown").not(dropdown).hide();
      $(".filter-toggle").not(this).removeClass("active");
    }

    $(this).toggleClass("active");
    dropdown.toggle();
  });

  $(".filter-dropdown").on("click", function (e) {
    e.stopPropagation();
  });

  $(document).on("click", function () {
    $(".filter-dropdown").hide();
    $(".filter-toggle").removeClass("active");
  });

  // --------------------------------
  // Checkbox -> Add/Remove selected tag
  // --------------------------------
  $('input[type="checkbox"]').on("change", function () {
    const value = $(this).data("value");
    const label = value;
    const isMobile = window.innerWidth <= 768;
    if (this.checked) {
      $(".selected-filters").append(`
        <div class="selected-tag" data-value="${value}">
          ${label} <span class="remove-tag"><img src="${
        isMobile ? "./img/icons/close-white.svg" : "./img/icons/remove.svg"
      }"></span>
        </div>
      `);
    } else {
      $(`.selected-tag[data-value='${value}']`).remove();
    }

    updateMobileFiltersUI();
  });

  // --------------------------------
  // Remove tag manually
  // --------------------------------
  $(document).on("click", ".remove-tag", function () {
    const value = $(this).parent().data("value");

    $(`input[data-value='${value}']`).prop("checked", false);
    $(this).parent().remove();

    updateMobileFiltersUI();
  });

  // --------------------------------
  // Clear All
  // --------------------------------
  $(".clear-btn").on("click", function () {
    $('input[type="checkbox"]').prop("checked", false);
    $(".selected-filters").empty();

    updateMobileFiltersUI();
  });

  // --------------------------------
  // Price Range (noUiSlider)
  // --------------------------------
  if (typeof noUiSlider === "undefined") return;

  $(".price-slider").each(function () {
    const sliderComponent = $(this);
    const minInput = sliderComponent.find(".min-price");
    const maxInput = sliderComponent.find(".max-price");
    const track = sliderComponent.find(".range-track")[0];

    if (!track) return;

    const minVal = parseInt(minInput.data("min"));
    const maxVal = parseInt(maxInput.data("max"));

    // Create slider
    noUiSlider.create(track, {
      start: [minVal, maxVal],
      connect: true,
      range: { min: minVal, max: maxVal },
    });

    // Update inputs when slider is moved
    track.noUiSlider.on("update", function (values) {
      minInput.val(Math.round(values[0]));
      maxInput.val(Math.round(values[1]));
    });

    // Update slider when inputs are changed manually
    minInput.on("change", function () {
      track.noUiSlider.set([this.value, null]);
    });

    maxInput.on("change", function () {
      track.noUiSlider.set([null, this.value]);
    });
  });



}

$(document).ready(function () {
  // --------------------------------
  // SORT dropdown
  // --------------------------------
  $(".filters-right .filter-dropdown label").on("click", function () {
    const value = $(this).data("value") || $(this).text().trim();
    const text = $(this).text().trim();

    $(this).closest(".filter-item").find(".sort-input").val(value);

    $(this)
      .closest(".filter-item")
      .find(".filter-toggle")
      .html(
        `Sort by: <span>${text}</span> <img src="./img/icons/caret-down-black.svg" alt="">`
      );

    $(this).parent().hide();
  });

  $(".instagram-box").each(function () {
    const $box = $(this);
    const sliderEl = $box.find(".instagram-box__slider")[0];

    const nextEl = $box.find(".swiper-button-next")[0];
    const prevEl = $box.find(".swiper-button-prev")[0];

    new Swiper(sliderEl, {
      slidesPerView: 1,
      spaceBetween: 0,

      breakpoints: {
        768: {
          slidesPerView: 1.04,
          spaceBetween: 0,
        },
      },

      navigation: {
        nextEl: nextEl,
        prevEl: prevEl,
      },

      loop: false,
    });
  });
});

$(document).ready(function () {
  if (window.innerWidth > 768) return; // тільки мобілка

  let lastScroll = 0;
  const threshold = 65; // поріг 20–30px
  const header = $("header");

  $(window).on("scroll", function () {
    const currentScroll = $(this).scrollTop();

    // якщо скролимо вниз і перевищили поріг
    if (currentScroll - lastScroll > threshold) {
      header.addClass("scrolled-down");
      lastScroll = currentScroll;
    }

    // якщо скролимо вверх
    if (lastScroll - currentScroll > threshold) {
      header.removeClass("scrolled-down");
      lastScroll = currentScroll;
    }
  });
});

$(document).ready(function () {
  // ---------------- Masonry init for visible grids ----------------
  function initMasonry($grid) {
    if ($grid.data("masonry-initialized")) return; // вже інітнули

    $grid.masonry({
      itemSelector: ".review-card",
      columnWidth: ".review-card",
      gutter: 24,
      percentPosition: true,
    });

    // якщо є фото
    if ($.fn.imagesLoaded) {
      $grid.imagesLoaded().progress(function () {
        $grid.masonry("layout");
      });
    }

    $grid.data("masonry-initialized", true);
  }

  // Ініт тільки для активних табів при завантаженні
  $(".tab-content.active .reviews-grid").each(function () {
    initMasonry($(this));
  });

  // ---------------- Tabs switching ----------------
  $(".tab-btn").on("click", function () {
    var tab = $(this).data("tab");

    // buttons active
    $(".tab-btn").removeClass("active");
    $(this).addClass("active");

    // content active
    $(".tab-content").removeClass("active");
    var $activeTab = $("#tab-" + tab).addClass("active");

    // ---- init or update Masonry for visible grids ----
    $activeTab.find(".reviews-grid").each(function () {
      var $grid = $(this);

      // Якщо не інітнуто — інітнемо
      if (!$grid.data("masonry-initialized")) {
        initMasonry($grid);
      } else {
        // якщо вже є — просто оновити layout
        setTimeout(function () {
          $grid.masonry("layout");
        }, 30);
      }
    });
  });

  function updateCartState() {
    const hasItems = $(".cart-item").length > 0;

    $(".cart-body, .cart-footer").toggle(hasItems);
    $(".cart-empty").toggle(!hasItems);
  }

  // open cart by data attribute
  $(document).on("click", "[data-open-cart]", function (e) {
    e.preventDefault();
    $(".cart-drawer, .cart-overlay").addClass("open");
    updateCartState();
  });

  // close cart
  $(document).on("click", ".close-cart, .cart-overlay", function () {
    $(".cart-drawer, .cart-overlay").removeClass("open");
  });

  // remove item
  $(document).on("click", ".remove-item", function () {
    $(this).closest(".cart-item").remove();
    updateCartState();
  });

  // qty buttons
  $(document).on("click", ".qty-plus", function () {
    const input = $(this).siblings("input");
    input.val(+input.val() + 1);
  });

  $(document).on("click", ".qty-minus", function () {
    const input = $(this).siblings("input");
    if (input.val() > 1) {
      input.val(+input.val() - 1);
    } else {
      $(this).closest(".cart-item").remove();
      updateCartState();
    }
  });

  updateCartState();
});

// $(document).ready(function () {
//   const $grid = $("#reviews-grid");

//   // якщо елемента нема — просто виходимо
//   if (!$grid.length) return;

//   // ініціалізація Masonry
//   $grid.masonry({
//     itemSelector: ".review-card",
//     columnWidth: ".review-card",
//     gutter: 24,
//     percentPosition: true,
//   });

//   // якщо підключений imagesLoaded — вмикаємо
//   if (typeof $.fn.imagesLoaded === "function") {
//     $grid.imagesLoaded().progress(function () {
//       $grid.masonry("layout");
//     });
//   }
// });
