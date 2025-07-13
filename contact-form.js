document.getElementById("contactForm").addEventListener("submit", async(e) => {
    e.preventDefault()

    const data = {
        firstname: document.getElementById("firstName").value,
        lastname: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
    }

    try {
        const response = await fetch('http://127.0.0.1:5502/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        
        const result = await response.json()
        console.log('Form submitted:', result)
        document.getElementById('contactForm').reset()
        alert('Message sent successfully!')
        
    } catch (error) {
        console.error('Error:', error)
        alert('Error sending message')
    }
})