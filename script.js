
document.getElementById('year').textContent = new Date().getFullYear();
// set current year
document.getElementById('year').textContent = new Date().getFullYear();

document.body.classList.add('light-theme');

// smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Contact form
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = 'Please fill in your name, email, and message.';
    formStatus.className = 'form-status error';
    return;
  }

  formStatus.textContent = 'Sending your message...';
  formStatus.className = 'form-status';

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error(
        'The contact service is unavailable. Open the portfolio through the Node server at http://localhost:3000, not a static preview.'
      );
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Message could not be sent.');
    }

    formStatus.textContent = data.message || 'Your message was sent successfully.';
    formStatus.className = 'form-status success';
    contactForm.reset();
  } catch (error) {
    formStatus.textContent = error.message || 'Something went wrong. Please try again later.';
    formStatus.className = 'form-status error';
  }
});

// Hover tilt effect
document.querySelectorAll('.project-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (x - cx) / cx;
    const dy = (y - cy) / cy;

    card.style.transform = `perspective(900px) rotateX(${dy * -4}deg) rotateY(${dx * 5}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
