/* =========================================================
   DIYANO TECHNOLOGIES
   AI-POWERED ASSISTANT PLATFORM
   app.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const header = document.getElementById("siteHeader");
    const mobileMenu = document.getElementById("mobileMenu");
    const navigation = document.getElementById("mainNavigation");

    const floatingNexa = document.getElementById("floatingNexa");

    const revealElements =
        document.querySelectorAll(".reveal");

    const aiWindow =
        document.querySelector(".ai-window");

    const quickCommandButtons =
        document.querySelectorAll(".quick-commands button");

    const nexModeButtons =
        document.querySelectorAll(".nexa-mode-selector button");


    /* =====================================================
       HEADER SCROLL EFFECT
       ===================================================== */

    const handleHeaderScroll = () => {
        if (!header) return;

        if (window.scrollY > 25) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    handleHeaderScroll();

    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    if (mobileMenu && navigation) {

        mobileMenu.addEventListener("click", () => {

            const isOpen =
                navigation.classList.toggle("active");

            mobileMenu.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            mobileMenu.textContent =
                isOpen ? "✕" : "☰";
        });


        /*
         * Close menu after clicking navigation link
         */

        navigation
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener("click", () => {

                    navigation.classList.remove("active");

                    mobileMenu.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    mobileMenu.textContent = "☰";
                });
            });


        /*
         * Close menu when clicking outside
         */

        document.addEventListener("click", event => {

            if (
                navigation.classList.contains("active") &&
                !navigation.contains(event.target) &&
                !mobileMenu.contains(event.target)
            ) {

                navigation.classList.remove("active");

                mobileMenu.setAttribute(
                    "aria-expanded",
                    "false"
                );

                mobileMenu.textContent = "☰";
            }
        });
    }


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

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

                if (!target) return;

                event.preventDefault();

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight -
                    15;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            });
        });


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "revealed"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }
                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );

        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("revealed");
        });
    }


    /* =====================================================
       AI WINDOW COMMANDS
       ===================================================== */

    const commandResponses = {

        "Understand something":
            "I can break complex information into a clear explanation and highlight what matters most.",

        "Make a decision":
            "I can compare the available options, identify trade-offs and help you make a better-informed decision.",

        "Automate a task":
            "I can turn a repeatable process into a structured workflow while keeping important actions under your control.",

        "Explain this":
            "Give me the information and I can explain what happened, why it matters and what you should consider next."
    };


    const addAssistantMessage = message => {

        const chat =
            document.querySelector(".ai-chat");

        if (!chat) return;

        const messageElement =
            document.createElement("div");

        messageElement.className =
            "chat-message assistant";

        messageElement.innerHTML = `
            <span class="assistant-label">
                NEXA
            </span>

            ${escapeHTML(message)}
        `;

        chat.appendChild(messageElement);

        /*
         * Keep the UI clean
         */

        while (chat.children.length > 6) {
            chat.removeChild(chat.firstElementChild);
        }

        /*
         * Small entrance animation
         */

        messageElement.style.opacity = "0";
        messageElement.style.transform =
            "translateY(8px)";

        requestAnimationFrame(() => {

            messageElement.style.transition =
                "opacity .35s ease, transform .35s ease";

            messageElement.style.opacity = "1";
            messageElement.style.transform =
                "translateY(0)";
        });
    };


    quickCommandButtons.forEach(button => {

        button.addEventListener("click", () => {

            const command =
                button.textContent.trim();

            const response =
                commandResponses[command] ||
                "I am ready to help you understand, decide, create or automate.";

            addAssistantMessage(response);

            /*
             * Visual feedback
             */

            button.style.transform =
                "scale(.97)";

            setTimeout(() => {
                button.style.transform = "";
            }, 120);
        });
    });


    /* =====================================================
       NEXA MODE SELECTOR
       ===================================================== */

    nexModeButtons.forEach(button => {

        button.addEventListener("click", () => {

            nexModeButtons.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            const mode =
                button.textContent.trim();

            updateNexaMode(mode);
        });
    });


    const updateNexaMode = mode => {

        const consoleInput =
            document.querySelector(".console-input");

        if (!consoleInput) return;

        const modeMessages = {

            "Assist":
                "Nexa is ready to assist you.",

            "Explain":
                "Nexa is ready to explain information clearly.",

            "Act":
                "Nexa can prepare controlled actions for your approval.",

            "Automate":
                "Nexa is ready to structure repeatable workflows."
        };

        consoleInput.textContent =
            modeMessages[mode] ||
            "Nexa is ready.";
    };


    /* =====================================================
       FLOATING NEXA
       ===================================================== */

    if (floatingNexa) {

        floatingNexa.addEventListener("click", () => {

            const nexSection =
                document.getElementById("nexa");

            if (!nexSection) return;

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            const position =
                nexSection.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                20;

            window.scrollTo({
                top: position,
                behavior: "smooth"
            });
        });
    }


    /* =====================================================
       AI WINDOW PARALLAX
       ===================================================== */

    if (
        aiWindow &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        const interfaceContainer =
            document.querySelector(".hero-interface");

        if (interfaceContainer) {

            interfaceContainer.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        interfaceContainer.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;

                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;

                    const rotateY =
                        ((x - centerX) / centerX) * 2.2;

                    const rotateX =
                        ((centerY - y) / centerY) * 1.7;

                    aiWindow.style.transform =
                        `
                        perspective(1200px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-2px)
                        `;
                }
            );

            interfaceContainer.addEventListener(
                "mouseleave",
                () => {

                    aiWindow.style.transform =
                        `
                        perspective(1200px)
                        rotateX(0deg)
                        rotateY(-2deg)
                        translateY(0)
                        `;
                }
            );
        }
    }


    /* =====================================================
       BUTTON RIPPLE EFFECT
       ===================================================== */

    document
        .querySelectorAll(".button")
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    const ripple =
                        document.createElement("span");

                    ripple.style.position =
                        "absolute";

                    ripple.style.width = "10px";
                    ripple.style.height = "10px";

                    ripple.style.borderRadius =
                        "50%";

                    ripple.style.background =
                        "rgba(255,255,255,.25)";

                    ripple.style.pointerEvents =
                        "none";

                    ripple.style.transform =
                        "scale(0)";

                    ripple.style.opacity = "1";

                    ripple.style.left =
                        `${event.offsetX - 5}px`;

                    ripple.style.top =
                        `${event.offsetY - 5}px`;

                    ripple.style.transition =
                        "transform .5s ease, opacity .5s ease";

                    button.style.overflow =
                        "hidden";

                    button.appendChild(ripple);

                    requestAnimationFrame(() => {

                        ripple.style.transform =
                            "scale(22)";

                        ripple.style.opacity =
                            "0";
                    });

                    setTimeout(() => {
                        ripple.remove();
                    }, 550);
                }
            );
        });


    /* =====================================================
       SECURITY SCORE ANIMATION
       ===================================================== */

    const securityRing =
        document.querySelector(".security-ring");

    const securityScore =
        document.querySelector(".security-score-text strong");

    if (
        securityRing &&
        securityScore &&
        "IntersectionObserver" in window
    ) {

        let started = false;

        const securityObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting &&
                            !started
                        ) {

                            started = true;

                            animateSecurityScore();
                        }
                    });

                },
                {
                    threshold: 0.5
                }
            );

        securityObserver.observe(
            securityRing
        );
    }


    function animateSecurityScore() {

        const target = 98;

        let current = 0;

        const duration = 1200;

        const startTime =
            performance.now();

        const animate = currentTime => {

            const progress =
                Math.min(
                    (currentTime - startTime) /
                    duration,
                    1
                );

            const eased =
                1 - Math.pow(1 - progress, 3);

            current =
                Math.round(
                    target * eased
                );

            securityScore.textContent =
                `${current}%`;

            securityRing.style.background =
                `
                conic-gradient(
                    var(--success)
                    0 ${current}%,
                    rgba(255,255,255,.07)
                    ${current}% 100%
                )
                `;

            if (progress < 1) {
                requestAnimationFrame(
                    animate
                );
            }
        };

        requestAnimationFrame(
            animate
        );
    }


    /* =====================================================
       ROADMAP ACTIVE STATE
       ===================================================== */

    const roadmapItems =
        document.querySelectorAll(
            ".roadmap-item"
        );

    if (
        roadmapItems.length &&
        "IntersectionObserver" in window
    ) {

        const roadmapObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "active"
                            );
                        }
                    });

                },
                {
                    threshold: 0.35
                }
            );

        roadmapItems.forEach(item => {
            roadmapObserver.observe(item);
        });
    }


    /* =====================================================
       PRICE CARD INTERACTION
       ===================================================== */

    document
        .querySelectorAll(".price-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    const card =
                        button.closest(
                            ".price-card"
                        );

                    if (!card) return;

                    const title =
                        card.querySelector("h3");

                    const plan =
                        title
                            ? title.textContent.trim()
                            : "selected plan";

                    /*
                     * Enterprise / custom plan
                     * goes to contact section.
                     */

                    const contact =
                        document.getElementById(
                            "contact"
                        );

                    if (!contact) return;

                    event.preventDefault();

                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;

                    const position =
                        contact.getBoundingClientRect().top +
                        window.scrollY -
                        headerHeight -
                        20;

                    window.scrollTo({
                        top: position,
                        behavior: "smooth"
                    });

                    /*
                     * Optional visual feedback
                     */

                    console.log(
                        `DIYANO plan selected: ${plan}`
                    );
                }
            );
        });


    /* =====================================================
       INTERACTIVE CAPABILITY CARDS
       ===================================================== */

    document
        .querySelectorAll(".capability")
        .forEach(card => {

            card.addEventListener(
                "mouseenter",
                () => {

                    card.style.zIndex = "4";
                }
            );

            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.zIndex = "";
                }
            );
        });


    /* =====================================================
       DYNAMIC CURRENT YEAR
       ===================================================== */

    document
        .querySelectorAll("[data-current-year]")
        .forEach(element => {

            element.textContent =
                new Date().getFullYear();
        });


    /* =====================================================
       KEYBOARD ACCESSIBILITY
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            /*
             * ESC closes mobile menu
             */

            if (
                event.key === "Escape" &&
                navigation &&
                navigation.classList.contains("active")
            ) {

                navigation.classList.remove(
                    "active"
                );

                if (mobileMenu) {

                    mobileMenu.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    mobileMenu.textContent =
                        "☰";
                }
            }
        }
    );


    /* =====================================================
       HELPER
       ===================================================== */

    function escapeHTML(value) {

        const div =
            document.createElement("div");

        div.textContent =
            value;

        return div.innerHTML;
    }


    /* =====================================================
       INITIAL STATE
       ===================================================== */

    /*
     * Prevent flash on already visible
     * elements near the top.
     */

    setTimeout(() => {

        revealElements.forEach(element => {

            const rect =
                element.getBoundingClientRect();

            if (
                rect.top <
                window.innerHeight * 0.92
            ) {

                element.classList.add(
                    "revealed"
                );
            }
        });

    }, 80);


    console.log(
        "%cDIYANO",
        "font-size:24px;font-weight:800;"
    );

    console.log(
        "%cNexa AI Platform initialized.",
        "font-size:12px;color:#8b7cff;"
    );
});
