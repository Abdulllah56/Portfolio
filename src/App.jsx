import React from 'react';
import { Greeting } from './components/Greeting';
import { ServiceCards } from './components/ServiceCards';
import { ContactSection } from './components/ContactSection';
import { FooterSocials } from './components/FooterSocials';

export default function App() {
  return (
    <div className="portfolio-app">
      <header>
        <Greeting />
      </header>
      <main>
        <section id="services">
          <ServiceCards />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </main>
      <footer>
        <FooterSocials />
      </footer>
    </div>
  );
}
