// ========================================
// MOBILE MENU
// ========================================

const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");

const mobileMenu =
    document.getElementById("mobileMenu");

mobileMenuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("hidden");

});


// Close mobile menu after clicking a link

const mobileLinks =
    mobileMenu.querySelectorAll("a");

mobileLinks.forEach(link => {

    link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
    });

});


// ========================================
// CONTACT FORM
// ========================================

const contactForm =
    document.getElementById("contactForm");

const successMessage =
    document.getElementById("formSuccess");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const button =
        contactForm.querySelector("button");

    button.disabled = true;

    button.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

    setTimeout(() => {

        button.style.display = "none";

        successMessage.classList.remove("hidden");

        contactForm.reset();

    }, 1000);

});


// ========================================
// PARTICLE BACKGROUND
// ========================================

const canvas =
    document.getElementById("bgCanvas");

const ctx =
    canvas.getContext("2d");

let width;
let height;

let particles = [];

const particleCount = 65;

const maxDistance = 140;


// Mouse

let mouse = {
    x: null,
    y: null,
    radius: 160
};


// ========================================
// RESIZE CANVAS
// ========================================

function resizeCanvas() {

    width = canvas.width =
        window.innerWidth;

    height = canvas.height =
        window.innerHeight;

}

window.addEventListener(
    "resize",
    resizeCanvas
);

resizeCanvas();


// ========================================
// MOUSE MOVE
// ========================================

window.addEventListener(
    "mousemove",
    function(event) {

        mouse.x = event.clientX;
        mouse.y = event.clientY;

    }
);


// ========================================
// MOUSE LEAVE
// ========================================

window.addEventListener(
    "mouseout",
    function() {

        mouse.x = null;
        mouse.y = null;

    }
);


// ========================================
// PARTICLE CLASS
// ========================================

class Particle {

    constructor() {

        this.x =
            Math.random() * width;

        this.y =
            Math.random() * height;

        this.vx =
            (Math.random() - 0.5) * 1.2;

        this.vy =
            (Math.random() - 0.5) * 1.2;

        this.radius =
            Math.random() * 2 + 1.5;

    }


    update() {

        this.x += this.vx;

        this.y += this.vy;


        // Bounce from edges

        if (
            this.x < 0 ||
            this.x > width
        ) {

            this.vx *= -1;

        }


        if (
            this.y < 0 ||
            this.y > height
        ) {

            this.vy *= -1;

        }


        // Mouse interaction

        if (
            mouse.x !== null &&
            mouse.y !== null
        ) {

            let dx =
                mouse.x - this.x;

            let dy =
                mouse.y - this.y;

            let distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (
                distance < mouse.radius &&
                distance > 0
            ) {

                const directionX =
                    dx / distance;

                const directionY =
                    dy / distance;

                const force =
                    (mouse.radius - distance) /
                    mouse.radius;

                this.x -=
                    directionX *
                    force *
                    2;

                this.y -=
                    directionY *
                    force *
                    2;

            }

        }

    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(59, 130, 246, 0.6)";

        ctx.fill();

    }

}


// ========================================
// CREATE PARTICLES
// ========================================

function initParticles() {

    particles = [];

    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        particles.push(
            new Particle()
        );

    }

}


// ========================================
// ANIMATION
// ========================================

function animate() {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    for (
        let i = 0;
        i < particles.length;
        i++
    ) {

        particles[i].update();

        particles[i].draw();


        // Connect particles

        for (
            let j = i + 1;
            j < particles.length;
            j++
        ) {

            let dx =
                particles[i].x -
                particles[j].x;

            let dy =
                particles[i].y -
                particles[j].y;

            let distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (
                distance < maxDistance
            ) {

                ctx.beginPath();

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );


                let opacity =
                    (1 -
                        distance /
                        maxDistance) *
                    0.25;

                ctx.strokeStyle =
                    `rgba(59,130,246,${opacity})`;

                ctx.lineWidth = 1;

                ctx.stroke();

            }

        }


        // Connect particles to mouse

        if (
            mouse.x !== null &&
            mouse.y !== null
        ) {

            let dx =
                particles[i].x -
                mouse.x;

            let dy =
                particles[i].y -
                mouse.y;

            let distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (
                distance < mouse.radius
            ) {

                ctx.beginPath();

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    mouse.x,
                    mouse.y
                );


                let opacity =
                    (1 -
                        distance /
                        mouse.radius) *
                    0.35;

                ctx.strokeStyle =
                    `rgba(6,182,212,${opacity})`;

                ctx.lineWidth = 1;

                ctx.stroke();

            }

        }

    }


    requestAnimationFrame(animate);

}


// ========================================
// START
// ========================================

initParticles();

animate();