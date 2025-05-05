function renderUserInfo() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    document.getElementById('user-info').innerHTML = `
        <p><b>ПІБ:</b> ${user.name}</p>
        <p><b>E-mail:</b> ${user.email}</p>
        <p><b>Роль:</b> ${roleName(user.role)}</p>
    `;
    document.getElementById('cabinet-actions').style.display = 'block';
    document.getElementById('edit-form').style.display = 'none';
}

function roleName(role) {
    switch(role) {
        case 'teacher': return 'Вчитель';
        case 'assistant': return 'Асистент';
        case 'head': return 'Завуч';
        case 'director': return 'Директор';
        case 'logoped': return 'Логопед';
        case 'psychologist': return 'Психолог';
        default: return role;
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

function showEditForm() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    document.getElementById('edit-name').value = user.name;
    document.getElementById('edit-email').value = user.email;
    document.getElementById('edit-role').value = user.role;
    document.getElementById('edit-password').value = '';
    document.getElementById('edit-form').style.display = 'block';
    document.getElementById('cabinet-actions').style.display = 'none';
}

function cancelEdit() {
    renderUserInfo();
}

document.getElementById('edit-form').onsubmit = function(e) {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    let user = JSON.parse(localStorage.getItem('currentUser'));
    const newName = document.getElementById('edit-name').value.trim();
    const newEmail = document.getElementById('edit-email').value.trim().toLowerCase();
    const newRole = document.getElementById('edit-role').value;
    const newPassword = document.getElementById('edit-password').value;
    if (!newName || !newEmail || !newRole) {
        alert('Заповніть всі поля!');
        return;
    }
    // Перевірка на унікальність e-mail
    if (newEmail !== user.email && users.find(u => u.email === newEmail)) {
        alert('Користувач з таким e-mail вже існує!');
        return;
    }
    // Оновлення користувача у списку
    users = users.map(u => {
        if (u.email === user.email) {
            return {
                name: newName,
                email: newEmail,
                password: newPassword ? newPassword : u.password,
                role: newRole
            };
        }
        return u;
    });
    // Оновлення поточного користувача
    const updatedUser = {
        name: newName,
        email: newEmail,
        password: newPassword ? newPassword : user.password,
        role: newRole
    };
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    alert('Дані профілю оновлено!');
    renderUserInfo();
};

document.addEventListener('DOMContentLoaded', renderUserInfo); 