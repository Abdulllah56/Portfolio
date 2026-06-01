import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

export function FooterSocials() {
  return (
    <div className="social-links">
      <a href="#" className="social-link" title="GitHub">
        <Github strokeWidth={1.5} size={20} color="currentColor" />
      </a>
      <a href="#" className="social-link" title="LinkedIn">
        <Linkedin strokeWidth={1.5} size={20} color="currentColor" />
      </a>
      <a href="#" className="social-link" title="Twitter">
        <Twitter strokeWidth={1.5} size={20} color="currentColor" />
      </a>
    </div>
  );
}
