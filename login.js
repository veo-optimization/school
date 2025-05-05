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
        // Перевірка емейлу через Google Apps Script Web API
        fetch('https://script.google.com/macros/s/AKfycbz_yzhjspXaf5HFCMxwdca0VMe1Id9TWWwGac7WazCOJNWUIADPA8Z-pZDYQT2jqq70Iw/exec', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email })
        })
        .then(r => r.json())
        .then(data => {
            if (!data.access) {
                alert('Реєстрація дозволена лише для емейлів, які є у списку доступу. Зверніться до адміністратора.');
                return;
            }
            let users = JSON.parse(localStorage.getItem('users') || '[]');
            if (users.find(u => u.email === email)) {
                alert('Користувач з таким e-mail вже існує!');
                return;
            }
            // Зберігаємо масив ролей і ПІБ, які повертає GAS
            users.push({ name: data.name || name, email, password, roles: data.roles || [], role });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Реєстрація успішна! Тепер увійдіть.');
            showLogin();
        })
        .catch(err => {
            alert('Помилка перевірки доступу: ' + err.message);
        });
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