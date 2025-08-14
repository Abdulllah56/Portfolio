(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  function getApiBase() {
    // Optional: set window.CONTACT_API_BASE in production to override
    if (window.CONTACT_API_BASE) return window.CONTACT_API_BASE;

    const host = window.location.hostname;
    
    // For production deployment, use same origin (no separate backend needed)
    if (host.includes('vercel.app') || host.includes('netlify.app') || host.includes('herokuapp.com') || 
        (!host.includes('localhost') && !host.includes('127.0.0.1'))) {
      // Production: Use same origin for API calls (serverless functions)
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

    // Validate required fields
    if (!firstname && !lastname) {
      alert('Please enter your name.');
      return;
    }
    if (!email) {
      alert('Please enter your email address.');
      return;
    }
    if (!message) {
      alert('Please enter a message.');
      return;
    }

    const payload = {
      name: [firstname, lastname].filter(Boolean).join(' ') || 'Anonymous',
      email,
      subject,
      // Include phone in message body so you receive it
      message: phone ? `${message}\n\nPhone: ${phone}` : message,
    };

    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]') || form.querySelector('input[type="submit"]');
    const originalText = submitButton?.textContent || submitButton?.value;
    if (submitButton) {
      submitButton.disabled = true;
      if (submitButton.textContent !== undefined) {
        submitButton.textContent = 'Sending...';
      } else {
        submitButton.value = 'Sending...';
      }
    }

    try {
      const apiUrl = `${getApiBase()}/api/contact`;
      console.log('Sending contact form to:', apiUrl);
      console.log('Payload:', payload);
      
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      const responseText = await res.text();
      console.log('Raw response:', responseText);

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        throw new Error('Invalid server response');
      }

      if (!res.ok) {
        throw new Error(result.error || `Request failed with status ${res.status}`);
      }

      console.log('Form submitted successfully:', result);
      form.reset();
      
      // Show success message in UI instead of alert
      const successMessage = document.getElementById('successMessage');
      if (successMessage) {
        successMessage.style.display = 'block';
        // Hide success message after 5 seconds
        setTimeout(() => {
          successMessage.style.display = 'none';
        }, 5000);
      }
      
    } catch (error) {
      console.error('Error submitting contact form:', error);
      
      // Show error message in UI instead of alert
      const errorMessage = document.getElementById('errorMessage');
      if (errorMessage) {
        // Set custom error message based on error type
        if (error.message.includes('Failed to fetch')) {
          errorMessage.textContent = '❌ Network error. Please check your internet connection and try again.';
        } else if (error.message.includes('authentication failed')) {
          errorMessage.textContent = '❌ There was a server configuration issue. Please try again later.';
        } else {
          errorMessage.textContent = `❌ Error sending message: ${error.message}. Please try again later.`;
        }
        
        errorMessage.style.display = 'block';
        // Hide error message after 5 seconds
        setTimeout(() => {
          errorMessage.style.display = 'none';
        }, 5000);
      }
    } finally {
      // Reset button state
      if (submitButton) {
        submitButton.disabled = false;
        if (submitButton.textContent !== undefined) {
          submitButton.textContent = originalText || 'Send Message';
        } else {
          submitButton.value = originalText || 'Send Message';
        }
      }
    }
  });
})();