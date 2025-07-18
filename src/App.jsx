import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const Portfolio = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [heroTitle, setHeroTitle] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  const canvasRef = useRef(null);

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

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

    const intervalId = setInterval(drawMatrix, 35);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll animations
  useEffect(() => {
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

    return () => observer.disconnect();
  }, []);

  // Typing effect
  useEffect(() => {
    const typeWriter = (setText, text, speed = 50) => {
        let i = 0;
        let output = '';
        const type = () => {
          if (i < text.length) {
            output += text.charAt(i);
            setText(output);
            i++;
            setTimeout(type, speed);
          }
        };
        setText(''); // clear initial
        type();
      };
      

    setTimeout(() => {
      typeWriter(setHeroTitle, 'Lehar Sai Sankalp Dasari', 100);
    }, 500);
    
    setTimeout(() => {
      typeWriter(setHeroSubtitle, 'Welcome aboard!', 30);
    }, 2000);
  }, []);

  // Smooth scrolling
  const handleNavClick = (e, target) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Project modal functionality
  const projectData = {
    project1: {
      title: 'CarbonQapture',
      description: 'A hybrid quantum-AI framework to simulate and propose novel metal-organic frameworks (MOFs) for carbon dioxide capture, accelerating discovery for climate change mitigation. Our project used a Variational Quantum Eigensolver (VQE) to estimate the ground-state energy of MOFs interacting with CO₂, a key metric for carbon capture efficiency. A machine learning model was trained on simulation results to generate and predict high-performing MOF structures, which were then revalidated through quantum simulations.',
      slides: ["gallery.jpg", "cQ.jpg", "CQ2.jpg"]
    },
    project2: {
      title: 'DNAVault',
      description: 'Developed DNAVault, a secure encryption system designed to protect DNA sequence data against classical and quantum attacks. The system integrates a custom AES-128 encryption mechanism with Kyber key encapsulation, providing end-to-end post-quantum security.',
      slides: ["dnavault.png", "dna2.png", "dna3.png"]
    },
    project3: {
      title: 'FinPoint',
      description: 'We created a real time fraud transaction detection for credit card transactions, as soon as a transaction takes place, our AI trained Model will detect whether the transaction is fraudulent and if it is you will receive a notification that there is a fraudulent transaction reported, it will then go to the blockchain where it will be verified, this would mean large number of transactions at once, duplicate transactions and anomalies will be detected and then registered on the blockchain only if you approved the transaction',
      slides: ["fin2.png", "original.png", "fin3.png"]
    }
  };

  const openProjectModal = (projectId) => {
    setCurrentProject(projectData[projectId]);
    setIsModalOpen(true);
    setCurrentSlide(0);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setCurrentProject(null);
  };

  const changeSlide = (direction) => {
    const totalSlides = 3; // Number of slides
    let newSlide = currentSlide + direction;
    if (newSlide >= totalSlides) newSlide = 0;
    if (newSlide < 0) newSlide = totalSlides - 1;
    setCurrentSlide(newSlide);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isModalOpen) {
        if (event.key === 'ArrowLeft') {
          changeSlide(-1);
        } else if (event.key === 'ArrowRight') {
          changeSlide(1);
        } else if (event.key === 'Escape') {
          closeProjectModal();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, currentSlide]);

  return (
    <div className="App">
      <canvas ref={canvasRef} className="matrix-bg" id="matrix"></canvas>
      
      <nav id="navbar">
        <div className="nav-container">
          <ul className="nav-links">
            <li><a href="#home" onClick={(e) => handleNavClick(e, '#home')}>Home</a></li>
            <li><a href="#skills" onClick={(e) => handleNavClick(e, '#skills')}>Skills</a></li>
            <li><a href="#projects" onClick={(e) => handleNavClick(e, '#projects')}>Projects</a></li>
            <li><a href="#experience" onClick={(e) => handleNavClick(e, '#experience')}>Experience</a></li>
            <li><a href="#education" onClick={(e) => handleNavClick(e, '#education')}>Education</a></li>
            <li>
              <a href="/Sankalp_Dasari_Resume_Jul25.pdf" target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="hero-content fade-in">
          <h1>{heroTitle}</h1>
          <p>{heroSubtitle}</p>
          <div className="cta-buttons">
            <a href="#projects" className="btn btn-primary" onClick={(e) => handleNavClick(e, '#projects')}>View Projects</a>
            <a
  href="https://www.linkedin.com/in/sankalp-dasari/"
  className="btn btn-secondary"
  target="_blank"
  rel="noopener noreferrer"
>
  Get In Touch
</a>

          </div>
        </div>
      </section>

      <section id="skills" className="section">
        <h2 className="section-title fade-in">Technical Skills</h2>
        <div className="skills-grid">
          <div className="skill-category fade-in">
            <h3>Languages</h3>
            <ul className="skill-list">
              <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" className="icon" alt="Python" /> Python</li>
              <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" className="icon" alt="Java" /> Java</li>
              <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" className="icon" alt="C" /> C</li>
              <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" className="icon" alt="JavaScript" /> JavaScript</li>
              <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" className="icon" alt="SQL" /> SQL</li>
              <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" className="icon" alt="TypeScript" /> TypeScript</li>
            </ul>
          </div>
          
          <div className="skill-category fade-in">
            <h3>Frameworks & Libraries</h3>
            <ul className="skill-list">
              <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" className="icon" alt="Angular" /> Angular</li>
              <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" className="icon" alt="NumPy" /> NumPy</li>
              <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" className="icon" alt="OpenCV" /> OpenCV</li>
              <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" className="icon" alt="Pandas" /> Pandas</li>
              <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" className="icon" alt="PyTorch" /> PyTorch</li>
              <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" className="icon" alt="SciKit Learn" /> SciKit Learn</li>
              <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" className="icon" alt="Spring Boot" /> Spring Boot</li>
              <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" className="icon" alt="TensorFlow" /> TensorFlow</li>
            </ul>
          </div>
          
          <div className="skill-category fade-in">
            <h3>Tools</h3>
            <ul className="skill-list">
              <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" className="icon" alt="AWS" /> AWS</li>
              <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg"  className="icon" alt="Apache Kafka" /> Apache Kafka</li>
              <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" className="icon" alt="Docker" /> Docker</li>
              <li><img src="github-white-icon.png" className="icon" alt="GitHub" /> GitHub</li>
              <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-plain.svg" className="icon" alt="Postman" /> Postman</li>
              <li>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/splunk/splunk-original-wordmark.svg" className="icon" alt="Postman" /> Splunk</li>
            </ul>
          </div>
          
          <div className="skill-category fade-in">
            <h3>Operating Systems</h3>
            <ul className="skill-list">
              <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" className="icon" alt="Windows" /> Windows</li>
              <li><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" className="icon" alt="Linux" /> Linux</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="projects" className="section">
        <h2 className="section-title fade-in">Featured Projects</h2>
        <div className="projects-grid">
          <div className="project-card fade-in" onClick={() => openProjectModal('project1')}>
            <div className="project-image"><img src="carbonQapture.png" alt="CarbonQapture" /></div>
            <div className="project-content">
              <h3 className="project-title">CarbonQapture</h3>
              <p className="project-description">A hybrid quantum-AI framework to simulate and propose novel metal-organic frameworks (MOFs) for carbon dioxide capture, accelerating discovery for climate change mitigation. Our project used a Variational Quantum Eigensolver (VQE) to estimate the ground-state energy of MOFs interacting with CO₂, a key metric for carbon capture efficiency. A machine learning model was trained on simulation results to generate and predict high-performing MOF structures, which were then revalidated through quantum simulations.</p>
              
              <div className="project-links">
                <a href="https://github.com/Sankalp-dasari/bitcamp25" onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer"> <img src="github-white-icon.png" className="icon" alt="GitHub" /></a>
                <a href="https://bitcamp25.vercel.app" onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer">🌐</a>
              </div>
              <br />
             <h5>Tags</h5>
              <div className="project-tags">
                <span className="tag">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python logo" className="icon" />Python
                </span>
                <span className="tag">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" alt="NumPy logo" className="icon" />NumPy
                </span>
                <span className="tag">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" alt="Pandas logo" className="icon" />Pandas
                </span>
                <span className="tag">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" alt="PyTorch logo" className="icon" />PyTorch
                </span>
                <span className="tag">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" alt="scikit-learn logo" className="icon" />scikit-learn
                </span>
              </div>
            </div>
          </div>
          
          <div className="project-card fade-in" onClick={() => openProjectModal('project2')}>
            <div className="project-image"><img src="dnavault.png" alt="DNAVault" /></div>
            <div className="project-content">
              <h3 className="project-title">DNAVault</h3>
              <p className="project-description">Developed DNAVault, a secure encryption system designed to protect DNA sequence data against classical and quantum attacks. The system integrates a custom AES-128 encryption mechanism with Kyber key encapsulation, providing end-to-end post-quantum security.
                <br />
                Features:
                <br />
-Custom-built AES-128 block cipher for efficient encryption of DNA sequences.
<br />
-Kyber key exchange, a lattice-based post-quantum cryptographic method standardized by NIST.
<br />
-End-to-end encryption and decryption pipeline supporting DNA sequence datasets (A, G, C, T) with 2-bit binary mapping.


              </p>
              <div className="project-links">
                <a href="https://github.com/Sankalp-dasari/DNAVault" onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer"> <img src="github-white-icon.png" className="icon" alt="GitHub" /></a>
                <a href="https://dna-vault.vercel.app/" onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer">🌐</a>
              </div>
              <br />
              <h5>Tags</h5>
              <div className="project-tags">
                <span className="tag"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" className="icon" alt="Python" />Python</span>
                <span className="tag">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" alt="NumPy logo" className="icon" />NumPy
                </span>
              </div>
            </div>
          </div>

          <div className="project-card fade-in" onClick={() => openProjectModal('project3')}>
            <div className="project-image"><img src="original.png" alt="FinPoint" /></div>
            <div className="project-content">
              <h3 className="project-title">FinPoint</h3>
              <p className="project-description">We created a real time fraud transaction detection for credit card transactions, as soon as a transaction takes place, our AI trained Model will detect whether the transaction is fraudulent and if it is you will receive a notification that there is a fraudulent transaction reported, it will then go to the blockchain where it will be verified, this would mean large number of transactions at once, duplicate transactions and anomalies will be detected and then registered on the blockchain only if you approved the transaction </p>
              <div className="project-links">
                <a href="https://github.com/Ishaannjain/HackViolet" onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer"><img src="github-white-icon.png" className="icon" alt="GitHub" /></a>
              </div>
              <br />
              <h5>Tags</h5>
              <div className="project-tags">
                <span className="tag">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python logo" className="icon" />Python
                </span>
                <span className="tag">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" alt="NumPy logo" className="icon" />NumPy
                </span>
                <span className="tag">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" alt="Pandas logo" className="icon" />Pandas
                </span>
                <span className="tag">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" alt="PyTorch logo" className="icon" />PyTorch
                </span>
                <span className="tag">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" alt="scikit-learn logo" className="icon" />scikit-learn
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="section">
        <h2 className="section-title fade-in">Experience</h2>
        <div className="experience-timeline">
          <div className="experience-item fade-in">
            <div className="experience-content">
              <div className="experience-dot"></div>
              <h3 className="experience-title">AIML Lead</h3>
              <div className="experience-company">IDPro- CarbonQapture</div>
              <div className="experience-location">Blacksburg, VA</div>
              <div className="experience-date">June 2025 - Present</div>
              <p>• Leading AI/ML research to optimize CO₂ capture using MOFs by combining supervised learning with generative design to synthesize 
novel high-performing structures. 
<br />
• Transitioning from neural networks to interpretable models (linear/logistic regression) to identify key MOF features. 
<br />
• Applying Bayesian Information Criterion (BIC) to select optimal models and mitigate overfitting during model refinement. </p>
            </div>
          </div>
          
          <div className="experience-item fade-in">
            <div className="experience-content">
              <div className="experience-dot"></div>
              <h3 className="experience-title">Research and Development- Sensing Sub Team</h3>
              <div className="experience-company">GraVT Design Team</div>
              <div className="experience-location">Blacksburg, VA</div>
              <div className="experience-date">September 2024 - Present</div>
              <p>• Developed real-time rocket tracking system using Image Detection and Machine Learning with OpenCV and TensorFlow. 
                <br />
• Eliminated hardware dependency and rocket weight by replacing altimeters with Computer Vision-based tracking. \
<br />
• Porting ML models to lower-level languages for improved runtime; researching object detection optimization for high-velocity tracking.</p>
            </div>
          </div>

           <div className="experience-item fade-in">
            <div className="experience-content">
              <div className="experience-dot"></div>
              <h3 className="experience-title">Software Engineering Intern</h3>
              <div className="experience-company">Prospect Infosystem Pvt Ltd</div>
              <div className="experience-location">Hyderabad, India</div>
              <div className="experience-date">June 2024 - August 2024</div>
              <p> • Built full-stack web applications using Java (Spring Boot) for RESTful APIs and Angular for frontend, with Postman for API testing. 

                
<br></br>
• Handled backend errors using Splunk data logging, integrating Apache Kafka to build Producer-Consumer message streams in real time 
<br />
• Collaborated in Agile environment, following OOP and version-controlled workflows. </p>
            </div>
          </div>

        </div>
      </section>

      <section id="education" className="section">
        <h2 className="section-title fade-in">Education</h2>
        <div className="education-card fade-in">
          <h3 className="education-title">Bachelor of Science in Computer Science</h3>
          <div className="education-school">Virginia Tech</div>
          <div className="experience-date">Expected Graduation: December 2026</div>
          <p>Minor: Cybersecurity</p>
          
          <h4 style={{color: '#00ffff', marginTop: '1.5rem', marginBottom: '1rem'}}>Relevant Coursework</h4>
          <div className="courses-grid">
            <div className="course-item">Data Structures and Algorithms</div>
            <div className="course-item">Computer Organisation I & II</div>
            <div className="course-item">Intro to Problem Solving In CS</div>
            <div className="course-item">Sofware Design and Data Structures</div>
            <div className="course-item">Applied Combinatorics and Graph Theory</div>
            <div className="course-item">Discrete Mathematics</div>
            <div className="course-item">Multivariable Calculus</div>
            <div className="course-item">Linear Algebra</div>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {isModalOpen && (
  <div className="modal" onClick={(e) => e.target.className === 'modal' && closeProjectModal()}>
    <div className="modal-content">
      <span className="close" onClick={closeProjectModal}>&times;</span>
      <h3>{currentProject?.title}</h3>
      <div className="slideshow-container">
        {currentProject?.slides.map((src, index) => (
          <div key={index} className={`slide ${currentSlide === index ? 'active' : ''}`}>
            <img src={src} alt={`Project Slide ${index + 1}`} />
            <p>Slide {index + 1}</p>
          </div>
        ))}
        <button className="prev" onClick={() => changeSlide(-1)}>&#10094;</button>
        <button className="next" onClick={() => changeSlide(1)}>&#10095;</button>
      </div>
      <p>{currentProject?.description}</p>
    </div>
  </div>
)}


      <footer style={{background: 'rgba(10, 10, 30, 0.95)', borderTop: '1px solid rgba(0, 255, 255, 0.2)', padding: '2rem 0', textAlign: 'center', color: '#00ffff', fontSize: '0.9rem', marginTop: '4rem'}}>
        <div style={{maxWidth: '1000px', margin: '0 auto', padding: '0 2rem'}}>
          <p>&copy; 2025 Sankalp Dasari.</p>
          <div style={{marginTop: '1rem'}}>
            <a href="mailto:sankalpdasari@vt.edu" style={{color: '#00ffff', margin: '0 10px', textDecoration: 'none'}}>Email</a> |
            <a href="https://github.com/Sankalp-dasari" target="_blank" rel="noopener noreferrer" style={{color: '#00ffff', margin: '0 10px', textDecoration: 'none'}}>GitHub</a> |
            <a href="https://www.linkedin.com/in/sankalp-dasari/" target="_blank" rel="noopener noreferrer" style={{color: '#00ffff', margin: '0 10px', textDecoration: 'none'}}>LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
