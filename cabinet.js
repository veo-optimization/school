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

document.addEventListener('DOMContentLoaded', renderUserInfo); 