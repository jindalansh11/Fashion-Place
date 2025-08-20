async function registerUser(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    const data = await apiPost('/users/register', { name, email, password });
    alert('Registration successful! Please login.');
    window.location.href = 'login.html';
  } catch (error) {
    alert('Registration failed: ' + error.message);
  }
}

async function loginUser(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    const data = await apiPost('/users/login', { email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    alert('Login successful!');
    window.location.href = 'index.html';
  } catch (error) {
    alert('Login failed: ' + error.message);
  }
}
