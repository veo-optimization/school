document.addEventListener('DOMContentLoaded', function() {
    const authBlock = document.getElementById('auth-block');
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
        authBlock.innerHTML = `<span style="font-weight:500;">👤 ${user.name}</span> | <a href="cabinet.html">Кабінет</a> | <a href="#" id="logout-link">Вийти</a>`;
        document.getElementById('logout-link').onclick = function() {
            localStorage.removeItem('currentUser');
            location.reload();
            return false;
        };
    } else {
        authBlock.innerHTML = `<a href="login.html" class="button-link"><i class="fa-solid fa-right-to-bracket"></i> Вхід / Реєстрація</a>`;
    }
}); 