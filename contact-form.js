(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  function getApiBase() {
    // Optional: set window.CONTACT_API_BASE in production to override
    if (window.CONTACT_API_BASE) return window.CONTACT_API_BASE;

    const host = window.location.hostname;
    
    // For Vercel deployment, use same origin (no separate backend needed)
    if (host.includes('vercel.app') || host.includes('netlify.app') || host.includes('herokuapp.com') || 
        (!host.includes('localhost') && !host.includes('127.0.0.1'))) {
      // Production: Use same origin for API calls
      return window.BACKEND_URL || '';
    }
    
    if (host === 'localhost' || host === '127.0.0.1') {
      // Local development API server port
      return 'http://localhost:3001';
    }

    // Default: same origin
    return '';
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const firstname = document.getElementById('firstName')?.value?.trim() || '';
    const lastname = document.getElementById('lastName')?.value?.trim() || '';
    const email = document.getElementById('email')?.value?.trim() || '';
    const phone = document.getElementById('phone')?.value?.trim() || '';
    const subject = document.getElementById('subject')?.value?.trim() || '';
    const message = document.getElementById('message')?.value?.trim() || '';

    const payload = {
      name: [firstname, lastname].filter(Boolean).join(' ') || 'Anonymous',
      email,
      subject,
      // Include phone in message body so you receive it
      message: phone ? `${message}\n\nPhone: ${phone}` : message,
    };

    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton?.textContent;
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    try {
      const apiUrl = `${getApiBase()}/api/contact`;
      console.log('Sending to:', apiUrl);
      
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Request failed with status ${res.status}`);
      }

      const result = await res.json().catch(() => ({}));
      console.log('Form submitted successfully:', result);
      form.reset();
      alert('Message sent successfully! Please check your email for confirmation.');
      
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Error sending message. Please try again later.');
    } finally {
      // Reset button state
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalText || 'Send Message';
      }
    }
  });
})();