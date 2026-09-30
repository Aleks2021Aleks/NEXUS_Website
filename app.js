document.addEventListener("DOMContentLoaded", () => {
    const animatedItems = document.querySelectorAll(
        ".feature-card, .airdrop-card, .token-info, .token-visual, .token-visual-large, .token-content, .roadmap-item, .benefit-card, .tokenomics-card, .step-card, .listing-card, .mission-card, .faq-item, .cta-card"
    );

    animatedItems.forEach((item, index) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(30px)";
        item.style.transition =
            `opacity 0.7s ease ${Math.min(index * 0.04, 0.35)}s,
             transform 0.7s ease ${Math.min(index * 0.04, 0.35)}s`;
    });

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                obs.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12
        }
    );

    animatedItems.forEach((item) => observer.observe(item));


    const header = document.querySelector(".site-header");

    if (header) {
        const updateHeader = () => {
            if (window.scrollY > 30) {
                header.style.background = "rgba(5, 7, 13, 0.94)";
                header.style.boxShadow = "0 10px 40px rgba(0,0,0,0.25)";
            } else {
                header.style.background = "rgba(5, 7, 13, 0.72)";
                header.style.boxShadow = "none";
            }
        };

        window.addEventListener("scroll", updateHeader, {
            passive: true
        });

        updateHeader();
    }


    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });


    const heroVisual = document.querySelector(".hero-visual");
    const heroCoin = document.querySelector(".nxs-hero-coin");

    if (heroVisual && heroCoin && window.matchMedia("(pointer: fine)").matches) {
        heroVisual.addEventListener("mousemove", (event) => {
            const rect = heroVisual.getBoundingClientRect();

            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            heroCoin.style.transform =
                `translate(${x * 18}px, ${y * 18}px)`;
        });

        heroVisual.addEventListener("mouseleave", () => {
            heroCoin.style.transform = "";
        });
    }


    document.querySelectorAll(
        ".feature-card, .benefit-card, .tokenomics-card, .step-card"
    ).forEach((card) => {
        if (!window.matchMedia("(pointer: fine)").matches) {
            return;
        }

        card.addEventListener("mousemove", (event) => {
            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const rotateX =
                ((y / rect.height) - 0.5) * -4;

            const rotateY =
                ((x / rect.width) - 0.5) * 4;

            card.style.transform =
                `translateY(-6px) perspective(700px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });


    const counters = document.querySelectorAll(
        ".hero-stat strong"
    );

    const animateCounter = (element) => {
        const text = element.textContent.trim();

        if (!/^[0-9,]+$/.test(text)) {
            return;
        }

        const target = Number(text.replace(/,/g, ""));

        if (!target) {
            return;
        }

        let start = 0;
        const duration = 1200;
        const startTime = performance.now();

        const update = (currentTime) => {
            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            const eased =
                1 - Math.pow(1 - progress, 3);

            start = Math.floor(target * eased);

            element.textContent =
                start.toLocaleString("en-US");

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent =
                    target.toLocaleString("en-US");
            }
        };

        requestAnimationFrame(update);
    };


    if (counters.length) {
        const counterObserver = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    animateCounter(entry.target);
                    obs.unobserve(entry.target);
                });
            },
            {
                threshold: 0.7
            }
        );

        counters.forEach((counter) => {
            counterObserver.observe(counter);
        });
    }


    const floatingCards =
        document.querySelectorAll(".floating-card");

    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.6}s`;
    });


    document.querySelectorAll(".faq-item").forEach((item) => {
        item.addEventListener("toggle", () => {
            if (item.open) {
                document.querySelectorAll(".faq-item").forEach((other) => {
                    if (other !== item) {
                        other.removeAttribute("open");
                    }
                });
            }
        });
    });


    console.log("NEXUS website initialized");
});
