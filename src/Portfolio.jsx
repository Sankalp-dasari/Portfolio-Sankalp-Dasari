import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Download, Mail, Linkedin, ChevronLeft, ChevronRight, X, Shield, Brain, GraduationCap, Briefcase, User, Home, FolderOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AnimatedSection = ({ children }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  const openProject = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeProject = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  return (
    <div className="portfolio-container">
      <nav className="navbar">
        <div className="navbar-content">
          <h1 className="logo">Portfolio</h1>
          <div className="nav-links">
            {[{ id: 'home', icon: Home, label: 'Home' }, { id: 'about', icon: User, label: 'About' }, { id: 'projects', icon: FolderOpen, label: 'Projects' }, { id: 'experience', icon: Briefcase, label: 'Experience' }, { id: 'education', icon: GraduationCap, label: 'Education' }].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => {
                  setActiveSection(id);
                  const section = document.getElementById(id);
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`nav-button ${activeSection === id ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span className="nav-button-text">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section className="hero-section" id="home">
        <div className="hero-content" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
          <div className="profile-wrapper">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" alt="Profile" className="profile-image" />
          </div>
          <h1 className="hero-title">John Doe</h1>
          <div className="hero-subtitle-container">
            <Shield className="hero-icon-1" size={32} />
            <p className="hero-subtitle">Cybersecurity & AI Student</p>
            <Brain className="hero-icon-2" size={32} />
          </div>
          <p className="hero-description">Passionate about securing the digital world through artificial intelligence...</p>
          <div className="hero-buttons">
            <a href="#" className="button button-primary"><Download size={20} /> <span>Download Resume</span></a>
            <a href="#" className="button button-secondary"><Github size={20} /> <span>GitHub</span></a>
            <a href="#" className="button button-secondary"><Linkedin size={20} /> <span>LinkedIn</span></a>
            <a href="mailto:you@example.com" className="button button-purple"><Mail size={20} /> <span>Contact</span></a>
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <AnimatedSection>
          <h2 className="section-title">About Me</h2>
          <p className="section-description">I’m a cybersecurity and AI enthusiast currently studying at Virginia Tech...</p>
        </AnimatedSection>
      </section>

      <section className="section" id="projects">
        <AnimatedSection>
          <h2 className="section-title">Projects</h2>
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card" onClick={() => openProject(project)}>
                <img src={project.images[0]} alt={project.title} className="project-image" />
                <h3>{project.title}</h3>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <section className="section" id="experience">
        <AnimatedSection>
          <h2 className="section-title">Experience</h2>
          <div className="experience-list">
            {experiences.map((exp, idx) => (
              <div key={idx} className="experience-card">
                <div className="experience-header">
                  <h3 className="experience-title">{exp.title}</h3>
                  <span className="experience-duration">{exp.duration}</span>
                </div>
                <div className="experience-company">{exp.company}</div>
                <p className="experience-description">{exp.description}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <section className="section" id="education">
        <AnimatedSection>
          <h2 className="section-title">Education</h2>
          <div className="education-card">
            <div className="education-header">
              <GraduationCap className="education-icon" size={24} />
              <div>
                <h3 className="education-title">Virginia Tech</h3>
                <p className="education-subtitle">B.S. in Computer Science, Minor in Cryptography — 2022–2026</p>
              </div>
            </div>
            <div className="coursework-section">
              <h4 className="coursework-title">Relevant Coursework</h4>
              <div className="coursework-grid">
                <div className="course-item">Computer Systems</div>
                <div className="course-item">Machine Learning</div>
                <div className="course-item">Cybersecurity Principles</div>
                <div className="course-item">Cryptographic Engineering</div>
                <div className="course-item">Operating Systems</div>
                <div className="course-item">Data Structures & Algorithms</div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {selectedProject && (
        <div className="modal-overlay" onClick={closeProject}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedProject.images[currentImageIndex]} alt="Project Screenshot" className="modal-image" />
            <button className="modal-nav-button modal-prev" onClick={prevImage}><ChevronLeft size={20} /></button>
            <button className="modal-nav-button modal-next" onClick={nextImage}><ChevronRight size={20} /></button>
            <p>{selectedProject.description}</p>
            <button onClick={closeProject}><X size={20} /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
