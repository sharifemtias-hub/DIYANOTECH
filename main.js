/* =========================================================
   DIYANO
   Main Frontend Controller
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  "use strict";


  /* =======================================================
     MOBILE NAVIGATION
  ======================================================= */

  const menuButton =
    document.querySelector(".menu-btn");

  const navLinks =
    document.querySelector(".nav-links");


  if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {

      const isOpen =
        navLinks.classList.toggle("mobile-open");

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      document.body.classList.toggle(
        "menu-open",
        isOpen
      );

    });


    navLinks
      .querySelectorAll("a")
      .forEach((link) => {

        link.addEventListener("click", () => {

          navLinks.classList.remove(
            "mobile-open"
          );

          menuButton.setAttribute(
            "aria-expanded",
            "false"
          );

          document.body.classList.remove(
            "menu-open"
          );

        });

      });

  }


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");


  if (
    revealElements.length &&
    "IntersectionObserver" in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px"
        }
      );


    revealElements.forEach((element) => {

      revealObserver.observe(element);

    });

  } else {

    revealElements.forEach((element) => {

      element.classList.add("visible");

    });

  }


  /* =======================================================
     3D TILT
  ======================================================= */

  const tiltElements =
    document.querySelectorAll("[data-tilt]");


  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (
    tiltElements.length &&
    !reducedMotion
  ) {

    tiltElements.forEach((element) => {

      element.addEventListener(
        "pointermove",
        (event) => {

          if (window.innerWidth < 900) {
            return;
          }


          const rect =
            element.getBoundingClientRect();


          const x =
            event.clientX - rect.left;

          const y =
            event.clientY - rect.top;


          const centerX =
            rect.width / 2;

          const centerY =
            rect.height / 2;


          const rotateY =
            ((x - centerX) / centerX) * 4;


          const rotateX =
            ((centerY - y) / centerY) * 4;


          element.style.transform =
            `perspective(1200px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;

        }
      );


      element.addEventListener(
        "pointerleave",
        () => {

          element.style.transform = "";

        }
      );

    });

  }


  /* =======================================================
     ACTIVE PRINCIPLE
  ======================================================= */

  const principles =
    document.querySelectorAll(".principle");


  principles.forEach((principle) => {

    principle.addEventListener(
      "mouseenter",
      () => {

        principles.forEach((item) => {

          item.classList.remove("active");

        });

        principle.classList.add("active");

      }
    );

  });


  /* =======================================================
     SMOOTH INTERNAL LINKS
  ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

          const targetId =
            link.getAttribute("href");


          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }


          const target =
            document.querySelector(targetId);


          if (!target) {
            return;
          }


          event.preventDefault();


          target.scrollIntoView({
            behavior:
              reducedMotion
                ? "auto"
                : "smooth",
            block: "start"
          });

        }
      );

    });


  /* =======================================================
     CARD POINTER GLOW
  ======================================================= */

  const interactiveCards =
    document.querySelectorAll(
      ".solution-card, .security-card, .feature-card"
    );


  if (!reducedMotion) {

    interactiveCards.forEach((card) => {

      card.addEventListener(
        "pointermove",
        (event) => {

          const rect =
            card.getBoundingClientRect();


          const x =
            event.clientX - rect.left;

          const y =
            event.clientY - rect.top;


          card.style.background =
            `
            radial-gradient(
              circle at ${x}px ${y}px,
              rgba(139,124,255,0.09),
              rgba(255,255,255,0.025) 42%
            )
            `;

        }
      );


      card.addEventListener(
        "pointerleave",
        () => {

          card.style.background = "";

        }
      );

    });

  }


  /* =======================================================
     NAVBAR SCROLL STATE
  ======================================================= */

  const navbar =
    document.querySelector(".navbar");


  let lastScrollY = 0;


  if (navbar) {

    window.addEventListener(
      "scroll",
      () => {

        const currentScroll =
          window.scrollY;


        if (currentScroll > 30) {

          navbar.classList.add(
            "scrolled"
          );

        } else {

          navbar.classList.remove(
            "scrolled"
          );

        }


        lastScrollY =
          currentScroll;

      },
      {
        passive: true
      }
    );

  }


  /* =======================================================
     ESCAPE KEY
  ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key !== "Escape") {
        return;
      }


      if (
        navLinks &&
        menuButton
      ) {

        navLinks.classList.remove(
          "mobile-open"
        );

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        document.body.classList.remove(
          "menu-open"
        );

      }

    }
  );


  /* =======================================================
     EXTERNAL LINKS
  ======================================================= */

  document
    .querySelectorAll(
      'a[target="_blank"]'
    )
    .forEach((link) => {

      link.setAttribute(
        "rel",
        "noopener noreferrer"
      );

    });


  /* =======================================================
     DEV-SAFE ERROR HANDLING
  ======================================================= */

  window.addEventListener(
    "error",
    (event) => {

      /*
       * Production frontend intentionally does not
       * expose internal error details to customers.
       *
       * Real application errors should be collected
       * by the backend/monitoring layer.
       */

      if (
        typeof console !== "undefined" &&
        console.debug
      ) {

        console.debug(
          "DIYANO frontend event handled."
        );

      }

    }
  );


  /* =======================================================
     READY
  ======================================================= */

  document.documentElement.classList.add(
    "js-ready"
  );

});
