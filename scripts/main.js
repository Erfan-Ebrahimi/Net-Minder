document.addEventListener("DOMContentLoaded", function () {
  // ====================================================================
  // 1. HAMBURGER MENU
  // ====================================================================

  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");

  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", function (e) {
      e.stopPropagation();
      hamburger.classList.toggle("hamburger--active");
      mobileNav.classList.toggle("mobile-nav--active");
    });

    const navLinks = mobileNav.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        hamburger.classList.remove("hamburger--active");
        mobileNav.classList.remove("mobile-nav--active");
      });
    });

    document.addEventListener("click", function (event) {
      if (
        !hamburger.contains(event.target) &&
        !mobileNav.contains(event.target)
      ) {
        hamburger.classList.remove("hamburger--active");
        mobileNav.classList.remove("mobile-nav--active");
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        hamburger.classList.remove("hamburger--active");
        mobileNav.classList.remove("mobile-nav--active");
      }
    });
  }
  // ====================================================================
  // 2. HEADER SCROLL EFFECT
  // ====================================================================

  const header = document.querySelector(".header");
  const headerTop = document.querySelector(".header__top");
  let ticking = false;

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
          header.classList.add("header__scrolled");
        } else {
          header.classList.remove("header__scrolled");
        }

        ticking = false;
      });
      ticking = true;
    }
  });

  // ====================================================================
  // 3. SMOOTH SCROLL FOR NAV LINKS
  // ====================================================================

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#") {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = target.offsetTop - headerHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          if (hamburger && mobileNav) {
            hamburger.classList.remove("hamburger--active");
            mobileNav.classList.remove("mobile-nav--active");
          }
        }
      }
    });
  });

  // ====================================================================
  // 4. ACTIVE NAV LINK INDICATOR
  // ====================================================================

  const navLinks = document.querySelectorAll(".header__nav a");
  window.addEventListener("scroll", function () {
    let current = "";
    const sections = document.querySelectorAll("section[id]");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // ====================================================================
  // 5. BENEFITS SWIPER - اصلاح شده
  // ====================================================================

  if (typeof Swiper !== "undefined") {
    const benefitsSwiperEl = document.querySelector(".benefits__swiper");

    if (benefitsSwiperEl) {
      const benefitsSwiper = new Swiper(".benefits__swiper", {
        effect: "cards",
        grabCursor: true,
      });

      console.log("✅ Benefits Swiper initialized successfully");
    } else {
      console.warn("⚠️ Benefits swiper element not found");
    }
  } else {
    console.error("❌ Swiper library not loaded");
  }

  // ====================================================================
  // 6. PRODUCTS SWIPER
  // ====================================================================

  if (typeof Swiper !== "undefined") {
    const productsSwiperEl = document.querySelector(".clients-slider");

    if (productsSwiperEl) {
      const productsSwiper = new Swiper(".clients-slider", {
        slidesPerView: 8,
        spaceBetween: 10,
        loop: true,
        navigation: {
          nextEl: ".products__nav-arrow--right",
          prevEl: ".products__nav-arrow--left",
        },
        on: {
          init: function () {
            console.log("✅ Products Swiper initialized");
          },
        },
      });
    } else {
      console.warn("⚠️ Products swiper element not found");
    }
  } else {
    console.error("❌ Swiper library not loaded");
  }

  // ====================================================================
  // 6. PRODUCTS SWIPER
  // ====================================================================

  if (typeof Swiper !== "undefined") {
    const productsSwiperEl = document.querySelector(".teams-slider");

    if (productsSwiperEl) {
      const productsSwiper = new Swiper(".teams-slider", {
        slidesPerView: 4,
        spaceBetween: 10,
        loop: true,
        navigation: {
          nextEl: ".products__nav-arrow--right",
          prevEl: ".products__nav-arrow--left",
        },
        on: {
          init: function () {
            console.log("✅ Products Swiper initialized");
          },
        },
      });
    } else {
      console.warn("⚠️ Products swiper element not found");
    }
  } else {
    console.error("❌ Swiper library not loaded");
  }
  // ====================================================================
  // 10. FAQ ACCORDION
  // ====================================================================

  const faqItems = document.querySelectorAll(".faq__item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq__question");

    if (!question) return;

    question.addEventListener("click", function () {
      console.log("FAQ item clicked!");

      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("faq__item--active");
        }
      });

      item.classList.toggle("faq__item--active");
    });
  });
});
