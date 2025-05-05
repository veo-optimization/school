// Генерація випадкових паролів
function generateRandomPasswords() {
    const passwords = new Set();
    while (passwords.size < 30) {
        const password = Math.floor(10000 + Math.random() * 90000).toString();
        passwords.add(password);
    }
    return Array.from(passwords);
}

// Зберігання паролів
const passwords = {
    admin: 'veo',
    observers: generateRandomPasswords()
};

// Перевірка авторизації
function checkAuth() {
    const password = document.getElementById('password').value;
    const accessInfo = document.getElementById('access-info');
    
    if (password === passwords.admin) {
        localStorage.setItem('access', 'admin');
        localStorage.setItem('password', password);
        accessInfo.textContent = `Пароль: ${password}`;
        loadStudents();
    } else if (passwords.observers.includes(password)) {
        localStorage.setItem('access', 'observer');
        localStorage.setItem('password', password);
        loadStudents();
    } else {
        alert('Невірний пароль');
    }
}

// Завантаження списку класів
function loadClassFilter() {
    const classFilter = document.getElementById('class-filter');
    const classes = [];
    
    for (let grade = 1; grade <= 11; grade++) {
        for (let letter of ['А', 'Б', 'В', 'Г', 'Д']) {
            classes.push(`${grade}-${letter}`);
        }
    }
    
    classes.forEach(className => {
        const option = document.createElement('option');
        option.value = className;
        option.textContent = className;
        classFilter.appendChild(option);
    });
}

// Завантаження списку учнів
function loadStudents() {
    const studentsList = document.getElementById('students-list');
    // Тут буде логіка завантаження даних учнів
    // Наразі просто приклад
    studentsList.innerHTML = '<div class="student-card">Приклад картки учня</div>';
}

// Пошук учнів
document.getElementById('search').addEventListener('input', function(e) {
    // Тут буде логіка пошуку
});

// Фільтрація за класом
document.getElementById('class-filter').addEventListener('change', function(e) {
    // Тут буде логіка фільтрації
});

// Ініціалізація
document.addEventListener('DOMContentLoaded', function() {
    loadClassFilter();
    
    // Перевірка збереженого доступу
    const savedAccess = localStorage.getItem('access');
    const savedPassword = localStorage.getItem('password');
    
    if (savedAccess && savedPassword) {
        document.getElementById('password').value = savedPassword;
        checkAuth();
    }
}); 