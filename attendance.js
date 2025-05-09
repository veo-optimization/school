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
        students.forEach((name, idx) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${name}</td>
                <td><input type='checkbox' class='present-checkbox' checked data-row='${idx}'></td>
                <td><label class='absent-label'><input type='checkbox' class='absent-checkbox' data-type='ПП' data-row='${idx}' style='display:none;'>ПП</label></td>
                <td><label class='absent-label'><input type='checkbox' class='absent-checkbox' data-type='БП' data-row='${idx}' style='display:none;'>БП</label></td>
                <td><label class='absent-label'><input type='checkbox' class='absent-checkbox' data-type='ХВ' data-row='${idx}' style='display:none;'>ХВ</label></td>
            `;
            tbody.appendChild(tr);
        });
        addCheckboxLogic();
    }
    classSelect.addEventListener('change', renderStudents);
    renderStudents();
    // Відмітити всіх присутніми
    document.getElementById('mark-all-present').onclick = function() {
        document.querySelectorAll('.present-checkbox').forEach(cb => cb.checked = true);
        document.querySelectorAll('.absent-checkbox').forEach(cb => {
            cb.checked = false;
            cb.closest('.absent-label').classList.remove('selected');
        });
    };
    // Додаємо логіку для взаємодії чекбоксів
    function addCheckboxLogic() {
        document.querySelectorAll('.present-checkbox').forEach(cb => {
            cb.addEventListener('change', function() {
                const row = this.getAttribute('data-row');
                if (this.checked) {
                    // Знімаємо всі відсутності
                    document.querySelectorAll(`.absent-checkbox[data-row='${row}']`).forEach(abs => {
                        abs.checked = false;
                        abs.closest('.absent-label').classList.remove('selected');
                    });
                }
            });
        });
        document.querySelectorAll('.absent-checkbox').forEach(cb => {
            cb.addEventListener('change', function() {
                const row = this.getAttribute('data-row');
                // Якщо вибрано хоча б одну відсутність — знімаємо присутність
                if (this.checked) {
                    document.querySelector(`.present-checkbox[data-row='${row}']`).checked = false;
                    this.closest('.absent-label').classList.add('selected');
                } else {
                    this.closest('.absent-label').classList.remove('selected');
                }
            });
        });
    }
    // Зберегти (поки що у localStorage)
    document.getElementById('attendance-form').onsubmit = function(e) {
        e.preventDefault();
        const cls = classSelect.value;
        const date = document.getElementById('attendance-date').value;
        const students = studentsByClass[cls] || [];
        const result = students.map((name, i) => {
            const present = document.querySelector(`.present-checkbox[data-row='${i}']`).checked;
            const absentTypes = Array.from(document.querySelectorAll(`.absent-checkbox[data-row='${i}']`))
                .filter(cb => cb.checked)
                .map(cb => cb.getAttribute('data-type'));
            return { name, present, absent: absentTypes };
        });
        // TODO: Надіслати на Apps Script
        localStorage.setItem(`attendance_${cls}_${date}`, JSON.stringify(result));
        document.getElementById('attendance-result').textContent = 'Збережено!';
    };
}); 