document.addEventListener('DOMContentLoaded', function() {
    // Приклад класів і учнів (надалі підвантажувати з Google Sheets)
    const classes = ['1-А', '1-Б', '2-А', '2-Б'];
    const studentsByClass = {
        '1-А': ['Іваненко І.І.', 'Петрова О.О.', 'Сидоренко С.С.'],
        '1-Б': ['Коваленко Л.Л.', 'Гнатюк В.В.'],
        '2-А': ['Медик М.М.', 'Адмін А.А.'],
        '2-Б': ['ІТшник І.Т.', 'Гість Г.Г.']
    };
    const classSelect = document.getElementById('attendance-class');
    classes.forEach(cls => {
        const opt = document.createElement('option');
        opt.value = cls;
        opt.textContent = cls;
        classSelect.appendChild(opt);
    });
    // Встановити сьогоднішню дату
    document.getElementById('attendance-date').value = new Date().toISOString().slice(0,10);
    // Відображення учнів
    function renderStudents() {
        const cls = classSelect.value;
        const students = studentsByClass[cls] || [];
        const tbody = document.querySelector('#students-table tbody');
        tbody.innerHTML = '';
        students.forEach(name => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${name}</td><td><input type='checkbox' class='present-checkbox' checked></td>`;
            tbody.appendChild(tr);
        });
    }
    classSelect.addEventListener('change', renderStudents);
    renderStudents();
    // Відмітити всіх присутніми
    document.getElementById('mark-all-present').onclick = function() {
        document.querySelectorAll('.present-checkbox').forEach(cb => cb.checked = true);
    };
    // Зберегти (поки що у localStorage)
    document.getElementById('attendance-form').onsubmit = function(e) {
        e.preventDefault();
        const cls = classSelect.value;
        const date = document.getElementById('attendance-date').value;
        const students = studentsByClass[cls] || [];
        const present = Array.from(document.querySelectorAll('.present-checkbox')).map(cb => cb.checked);
        const result = students.map((name, i) => ({name, present: present[i]}));
        // TODO: Надіслати на Apps Script
        localStorage.setItem(`attendance_${cls}_${date}`, JSON.stringify(result));
        document.getElementById('attendance-result').textContent = 'Збережено!';
    };
}); 