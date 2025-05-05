// Отримання ID учня з URL
const studentId = new URLSearchParams(window.location.search).get('id');

// Перевірка авторизації
function checkAuth() {
    const password = document.getElementById('password').value;
    const accessInfo = document.getElementById('access-info');
    const editButton = document.getElementById('edit-button');
    
    if (password === 'veo' || localStorage.getItem('password') === password) {
        localStorage.setItem('access', 'admin');
        localStorage.setItem('password', password);
        accessInfo.textContent = `Пароль: ${password}`;
        editButton.style.display = 'block';
        loadStudentData();
    } else {
        alert('Невірний пароль');
    }
}

// Завантаження даних учня
function loadStudentData() {
    // Тут буде логіка завантаження даних учня
    // Наразі просто приклад
    document.getElementById('fullName').value = 'Приклад ПІБ';
    document.getElementById('class').value = '1-А';
    document.getElementById('supportGroup').value = '1';
    document.getElementById('parents').value = 'Приклад ПІБ батьків';
    document.getElementById('contacts').value = '+380000000000';
    document.getElementById('address').value = 'Приклад адреси';
}

// Редагування даних
document.getElementById('edit-button').addEventListener('click', function() {
    const inputs = document.querySelectorAll('#student-form input, #student-form textarea');
    inputs.forEach(input => input.removeAttribute('readonly'));
    this.style.display = 'none';
    document.getElementById('save-button').style.display = 'block';
});

// Збереження даних
document.getElementById('student-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const inputs = document.querySelectorAll('#student-form input, #student-form textarea');
    inputs.forEach(input => input.setAttribute('readonly', true));
    document.getElementById('edit-button').style.display = 'block';
    document.getElementById('save-button').style.display = 'none';
    // Тут буде логіка збереження даних
    alert('Дані збережено');
});

// Ініціалізація
document.addEventListener('DOMContentLoaded', function() {
    const savedAccess = localStorage.getItem('access');
    const savedPassword = localStorage.getItem('password');
    
    if (savedAccess && savedPassword) {
        document.getElementById('password').value = savedPassword;
        checkAuth();
    }
}); 