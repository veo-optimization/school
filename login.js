function showRegister() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'block';
}
function showLogin() {
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
}

// Реєстрація
const regForm = document.getElementById('register-form');
if (regForm) {
    regForm.onsubmit = function(e) {
        e.preventDefault();
        const name = document.getElementById('reg-name').value.trim();
        const email = document.getElementById('reg-email').value.trim().toLowerCase();
        const password = document.getElementById('reg-password').value;
        const role = document.getElementById('reg-role').value;
        if (!name || !email || !password || !role) {
            alert('Заповніть всі поля!');
            return;
        }
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(u => u.email === email)) {
            alert('Користувач з таким e-mail вже існує!');
            return;
        }
        users.push({ name, email, password, role });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Реєстрація успішна! Тепер увійдіть.');
        showLogin();
    }
}

// Вхід
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.onsubmit = function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim().toLowerCase();
        const password = document.getElementById('login-password').value;
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            alert('Невірний e-mail або пароль!');
            return;
        }
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'cabinet.html';
    }
} 