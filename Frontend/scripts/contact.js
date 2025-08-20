document.getElementById('contact-form')?.addEventListener('submit', async e => {
  e.preventDefault();
  const name = e.target['contact-name'].value;
  const email = e.target['contact-email'].value;
  const message = e.target['contact-message'].value;

  try {
    await apiPost('/contact', { name, email, message });
    alert('Message sent! We will contact you soon.');
    e.target.reset();
  } catch (err) {
    alert('Could not send message: ' + err.message);
  }
});
