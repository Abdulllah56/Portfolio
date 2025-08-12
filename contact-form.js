(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  function getApiBase() {
    // Optional: set window.CONTACT_API_BASE in production to override
    // e.g., <script>window.CONTACT_API_BASE = 'https://your-api-domain.com';</script>
    if (window.CONTACT_API_BASE) return window.CONTACT_API_BASE;

    const host = window.location.hostname;
    const protocol = window.location.protocol;
    
    // Production detection
    if (host.includes('vercel.app') || host.includes('netlify.app') || host.includes('herokuapp.com') || 
        (!host.includes('localhost') && !host.includes('127.0.0.1'))) {
      
      // If on Vercel, use specific backend URL
      if (host.includes('vercel.app')) {
        return window.BACKEND_URL || 'https://abdullah-developer-portfolio-backend.vercel.app';
      }
      
      // Production: Use environment variable or default backend URL
      return window.BACKEND_URL || 'https://your-backend-domain.herokuapp.com';
    }
    
    if (host === 'localhost' || host === '127.0.0.1') {
      // Local development API server port
      return 'http://localhost:3001';
    }

    // Default: same origin (useful if you reverse-proxy /api to the server in production)
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

    try {
      const res = await fetch(`${getApiBase()}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Request failed with status ${res.status}`);
      }

      const result = await res.json().catch(() => ({}));
      console.log('Form submitted:', result);
      form.reset();
      alert('Message sent. Please check your email for confirmation.');
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Error sending message. Please try again later.');
    }
  });
})();