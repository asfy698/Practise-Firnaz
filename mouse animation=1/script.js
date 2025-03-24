const canvas = document.getElementById("particleCanvas");
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particlesArray = [];

        class Particle {
            constructor(x, y, size, speedX, speedY, color) {
                this.x = x;
                this.y = y;
                this.size = size;
                this.speedX = speedX;
                this.speedY = speedY;
                this.opacity = 1;
                this.color = color;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.opacity -= 0.02;
            }

            draw() {
                ctx.globalAlpha = this.opacity;
                ctx.shadowBlur = 10; // Glow Effect
                ctx.shadowColor = this.color;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        function createParticles(e, burst = false) {
            const numParticles = burst ? 20 : 5;
            for (let i = 0; i < numParticles; i++) {
                let size = Math.random() * 4 + 1;
                let speedX = (Math.random() - 0.5) * 3;
                let speedY = (Math.random() - 0.5) * 3;
                let color = `hsl(${Math.random() * 360}, 100%, 70%)`;

                particlesArray.push(new Particle(e.clientX, e.clientY, size, speedX, speedY, color));
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();

                if (particlesArray[i].opacity <= 0) {
                    particlesArray.splice(i, 1);
                    i--;
                }
            }

            requestAnimationFrame(animateParticles);
        }

        window.addEventListener("mousemove", (e) => createParticles(e));
        window.addEventListener("click", (e) => createParticles(e, true)); // Burst effect on click
        animateParticles();

        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });