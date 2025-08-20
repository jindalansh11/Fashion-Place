document.getElementById('newsletter-form')?.addEventListener('submit', async e => {
  e.preventDefault();
  const email = e.target['newsletter-email'].value;
  try {
    await apiPost('/newsletter/subscribe', { email });
    alert('Subscribed successfully!');
    e.target.reset();
  } catch (err) {
    alert('Subscription failed: ' + err.message);
  }
});
