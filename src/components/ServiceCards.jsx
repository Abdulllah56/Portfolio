import React from 'react';
import { Code2, Server, Layers, Gauge, Pen, Wrench, Check } from 'lucide-react';

export function ServiceCards() {
  return (
    <div className="services-grid">
      <div className="service-card">
        <div className="service-icon">
          <Code2 strokeWidth={1.5} size={20} color="currentColor" />
        </div>
        <h3 className="service-title">Frontend Development</h3>
        <p className="service-description">
          Creating responsive, interactive, and visually stunning user interfaces using modern technologies.
        </p>
        <ul className="service-features">
          <li><Check size={14} strokeWidth={2} /> Responsive Web Design</li>
          <li><Check size={14} strokeWidth={2} /> Interactive UI Components</li>
          <li><Check size={14} strokeWidth={2} /> Performance Optimization</li>
          <li><Check size={14} strokeWidth={2} /> Cross-browser Compatibility</li>
        </ul>
        <div className="service-tech">
          <span className="tech-badge">HTML/CSS</span>
          <span className="tech-badge">JavaScript</span>
          <span className="tech-badge">React</span>
          <span className="tech-badge">Next.js</span>
          <span className="tech-badge">Tailwind</span>
        </div>
        <div className="service-cta">
          <a href="#contact" className="service-btn">
            Get Started
            <span>→</span>
          </a>
        </div>
      </div>

      <div className="service-card">
        <div className="service-icon">
          <Server strokeWidth={1.5} size={20} color="currentColor" />
        </div>
        <h3 className="service-title">Backend Development</h3>
        <p className="service-description">
          Building robust, scalable server-side applications with secure APIs and efficient database management.
        </p>
        <ul className="service-features">
          <li><Check size={14} strokeWidth={2} /> API Design and Development</li>
          <li><Check size={14} strokeWidth={2} /> Database Design & Optimization</li>
          <li><Check size={14} strokeWidth={2} /> Authentication & Security</li>
          <li><Check size={14} strokeWidth={2} /> Server Configuration</li>
        </ul>
        <div className="service-tech">
          <span className="tech-badge">Node.js</span>
          <span className="tech-badge">Express.js</span>
          <span className="tech-badge">MongoDB</span>
          <span className="tech-badge">Mongo DB</span>
          <span className="tech-badge">GitHub</span>
        </div>
        <div className="service-cta">
          <a href="#contact" className="service-btn">
            Get Started
            <span>→</span>
          </a>
        </div>
      </div>

      <div className="service-card">
        <div className="service-icon">
          <Layers strokeWidth={1.5} size={20} color="currentColor" />
        </div>
        <h3 className="service-title">Full-Stack Solutions</h3>
        <p className="service-description">
          Complete end-to-end web application development from concept to deployment.
        </p>
        <ul className="service-features">
          <li><Check size={14} strokeWidth={2} /> Complete Web Applications</li>
          <li><Check size={14} strokeWidth={2} /> Database Integration</li>
          <li><Check size={14} strokeWidth={2} /> User Authentication</li>
          <li><Check size={14} strokeWidth={2} /> Payment Integration</li>
        </ul>
        <div className="service-tech">
          <span className="tech-badge">MERN Stack</span>
          <span className="tech-badge">Next.js</span>
          <span className="tech-badge">MongoDB</span>
          <span className="tech-badge">Deployment</span>
        </div>
        <div className="service-cta">
          <a href="#contact" className="service-btn">
            Get Started
            <span>→</span>
          </a>
        </div>
      </div>

      <div className="service-card">
        <div className="service-icon">
          <Gauge strokeWidth={1.5} size={20} color="currentColor" />
        </div>
        <h3 className="service-title">Website Optimization</h3>
        <p className="service-description">
          Improving website performance, speed, and user experience through modern optimization techniques.
        </p>
        <ul className="service-features">
          <li><Check size={14} strokeWidth={2} /> Performance Auditing</li>
          <li><Check size={14} strokeWidth={2} /> Speed Optimization</li>
          <li><Check size={14} strokeWidth={2} /> SEO Improvements</li>
          <li><Check size={14} strokeWidth={2} /> Mobile Optimization</li>
        </ul>
        <div className="service-tech">
          <span className="tech-badge">Performance</span>
          <span className="tech-badge">SEO</span>
          <span className="tech-badge">Analytics</span>
          <span className="tech-badge">Testing</span>
        </div>
        <div className="service-cta">
          <a href="#contact" className="service-btn">
            Get Started
            <span>→</span>
          </a>
        </div>
      </div>

      <div className="service-card">
        <div className="service-icon">
          <Pen strokeWidth={1.5} size={20} color="currentColor" />
        </div>
        <h3 className="service-title">UI/UX Design</h3>
        <p className="service-description">
          Creating intuitive, user-friendly interfaces that provide exceptional user experiences.
        </p>
        <ul className="service-features">
          <li><Check size={14} strokeWidth={2} /> User Interface Design</li>
          <li><Check size={14} strokeWidth={2} /> User Experience Planning</li>
          <li><Check size={14} strokeWidth={2} /> Wireframing & Prototyping</li>
          <li><Check size={14} strokeWidth={2} /> Responsive Design</li>
        </ul>
        <div className="service-tech">
          <span className="tech-badge">Figma</span>
          <span className="tech-badge">Canva</span>
          <span className="tech-badge">Prototyping</span>
          <span className="tech-badge">Testing</span>
        </div>
        <div className="service-cta">
          <a href="#contact" className="service-btn">
            Get Started
            <span>→</span>
          </a>
        </div>
      </div>

      <div className="service-card">
        <div className="service-icon">
          <Wrench strokeWidth={1.5} size={20} color="currentColor" />
        </div>
        <h3 className="service-title">Maintenance & Support</h3>
        <p className="service-description">
          Ongoing maintenance, updates, and technical support to keep your website running smoothly.
        </p>
        <ul className="service-features">
          <li><Check size={14} strokeWidth={2} /> Regular Updates</li>
          <li><Check size={14} strokeWidth={2} /> Security Monitoring</li>
          <li><Check size={14} strokeWidth={2} /> Bug Fixes</li>
          <li><Check size={14} strokeWidth={2} /> 24/7 Support</li>
        </ul>
        <div className="service-tech">
          <span className="tech-badge">Monitoring</span>
          <span className="tech-badge">Security</span>
          <span className="tech-badge">Updates</span>
          <span className="tech-badge">Support</span>
        </div>
        <div className="service-cta">
          <a href="#contact" className="service-btn">
            Get Started
            <span>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
