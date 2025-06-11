 // Matrix rain effect
        const canvas = document.getElementById('matrix');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        const matrixArray = matrix.split("");

        const fontSize = 10;
        const columns = canvas.width / fontSize;

        const drops = [];
        for(let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        function drawMatrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ffff';
            ctx.font = fontSize + 'px monospace';

            for(let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(drawMatrix, 35);

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Project modal functionality
        let currentSlide = 0;

        function openProjectModal(projectId) {
            const modal = document.getElementById('projectModal');
            const modalTitle = document.getElementById('modalTitle');
            const modalDescription = document.getElementById('modalDescription');
            
            const projectData = {
                project1: {
                    title: 'Vulnerability Scanner',
                    description: 'This comprehensive vulnerability scanner is built using Python and leverages various security libraries to identify potential security weaknesses in network infrastructure. The tool features automated scanning capabilities, detailed reporting, and integration with popular vulnerability databases.'
                },
                project2: {
                    title: 'AI Chatbot',
                    description: 'An intelligent conversational AI system built using natural language processing techniques and machine learning algorithms. Features include sentiment analysis, context awareness, and integration with multiple platforms.'
                },
                project3: {
                    title: 'E-Commerce Platform',
                    description: 'A full-stack e-commerce solution built with modern web technologies. Features secure payment processing, user authentication, inventory management, and a responsive admin dashboard.'
                }
            };

            modalTitle.textContent = projectData[projectId].title;
            modalDescription.innerHTML = `<p>${projectData[projectId].description}</p>`;
            
            modal.style.display = 'block';
            currentSlide = 0;
            showSlide(currentSlide);
        }

        function closeProjectModal() {
            document.getElementById('projectModal').style.display = 'none';
        }

        function changeSlide(direction) {
            const slides = document.querySelectorAll('.slide');
            slides[currentSlide].classList.remove('active');
            
            currentSlide += direction;
            if (currentSlide >= slides.length) currentSlide = 0;
            if (currentSlide < 0) currentSlide = slides.length - 1;
            
            slides[currentSlide].classList.add('active');
        }

        function showSlide(index) {
            const slides = document.querySelectorAll('.slide');
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        }

        // Resume function
        function openResume() {
            // Replace with your actual resume URL
            window.open('https://your-resume-url.com/resume.pdf', '_blank');
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            const modal = document.getElementById('projectModal');
            if (event.target === modal) {
                closeProjectModal();
            }
        }

        // Keyboard navigation for slideshow
        document.addEventListener('keydown', function(event) {
            const modal = document.getElementById('projectModal');
            if (modal.style.display === 'block') {
                if (event.key === 'ArrowLeft') {
                    changeSlide(-1);
                } else if (event.key === 'ArrowRight') {
                    changeSlide(1);
                } else if (event.key === 'Escape') {
                    closeProjectModal();
                }
            }
        });

        // Resize canvas on window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        // Add typing effect to hero text
        function typeWriter(element, text, speed = 50) {
            let i = 0;
            element.innerHTML = '';
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }

        // Initialize typing effect when page loads
        window.addEventListener('load', () => {
            const heroTitle = document.querySelector('.hero h1');
            const heroSubtitle = document.querySelector('.hero p');
            
            setTimeout(() => {
                typeWriter(heroTitle, 'Lehar Sai Sankalp Dasari', 100);
            }, 500);
            
            setTimeout(() => {
                typeWriter(heroSubtitle, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure magni suscipit dolores fuga in quia quidem ex nihil assumenda! Voluptas impedit quas architecto pariatur suscipit totam ex nobis, ullam perspiciatis!', 30);
            }, 2000);
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const heroContent = document.querySelector('.hero-content');
            
            if (hero && heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Add glitch effect to logo on hover
        document.querySelector('.logo').addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.5s ease-in-out';
        });

        document.querySelector('.logo').addEventListener('animationend', function() {
            this.style.animation = '';
        });

        // Add CSS for glitch effect
        const glitchStyle = document.createElement('style');
        glitchStyle.textContent = `
            @keyframes glitch {
                0% { transform: translate(0); }
                20% { transform: translate(-2px, 2px); }
                40% { transform: translate(-2px, -2px); }
                60% { transform: translate(2px, 2px); }
                80% { transform: translate(2px, -2px); }
                100% { transform: translate(0); }
            }
        `;
        document.head.appendChild(glitchStyle);