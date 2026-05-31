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
      if (!hamburger.contains(event.target) && !mobileNav.contains(event.target)) {
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
  let ticking = false;

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

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
  // 5. CLIENTS SWIPER
  // ====================================================================

  if (typeof Swiper !== "undefined") {
    const clientsSwiperEl = document.querySelector(".clients-slider");

    if (clientsSwiperEl) {
      const clientsSwiper = new Swiper(".clients-slider", {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        // autoplay: {
        //   delay: 2500,
        //   disableOnInteraction: false,
        // },
        breakpoints: {
          320: { slidesPerView: 2, spaceBetween: 15 },
          480: { slidesPerView: 3, spaceBetween: 20 },
          768: { slidesPerView: 4, spaceBetween: 25 },
          1024: { slidesPerView: 5, spaceBetween: 30 },
          1280: { slidesPerView: 6, spaceBetween: 35 },
        },
      });
      console.log("✅ Clients Swiper initialized");
    }
  }

  // ====================================================================
  // 6. TEAMS SWIPER (اصلاح شده با کلاس‌های صحیح)
  // ====================================================================

  if (typeof Swiper !== "undefined") {
    const teamsSwiperEl = document.querySelector(".teams-slider");

    if (teamsSwiperEl) {
      const teamsSwiper = new Swiper(".teams-slider", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        navigation: {
          nextEl: ".partners-next", // کلاس دکمه بعدی در HTML شما
          prevEl: ".partners-prev", // کلاس دکمه قبلی در HTML شما
        },
        breakpoints: {
          480: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        },
        on: {
          init: function () {
            console.log("✅ Teams Swiper initialized successfully");
          },
        },
      });
    } else {
      console.warn("⚠️ Teams swiper element not found");
    }
  } else {
    console.error("❌ Swiper library not loaded");
  }

  // ====================================================================
  // 7. PARTNERS SWIPER (برای گواهی‌نامه‌ها)
  // ====================================================================

  if (typeof Swiper !== "undefined") {
    const partnersSliders = document.querySelectorAll(".partners-slider");

    partnersSliders.forEach((slider, index) => {
      const container = slider.closest(".partners-container");
      if (container) {
        const prevBtn = container.querySelector(".partners-prev");
        const nextBtn = container.querySelector(".partners-next");

        new Swiper(slider, {
          slidesPerView: 1,
          spaceBetween: 24,
          loop: true,
          navigation: {
            nextEl: nextBtn,
            prevEl: prevBtn,
          },
          breakpoints: {
            320: { slidesPerView: 1, spaceBetween: 16 },
            480: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 24 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
          },
        });
      }
    });
    console.log("✅ Partners Swiper initialized");
  }

  // ====================================================================
  // 8. FAQ ACCORDION
  // ====================================================================

  const faqItems = document.querySelectorAll(".faq__item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq__question");

    if (!question) return;

    question.addEventListener("click", function () {
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("faq__item--active");
        }
      });
      item.classList.toggle("faq__item--active");
    });
  });
});
