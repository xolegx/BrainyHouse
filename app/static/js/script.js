function updateDateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    const day = now.getDate();
    const monthIndex = now.getMonth();
    const weekIndex = now.getDay();    
    const month = monthsOfYear[monthIndex];
    const dayOfWeek = daysOfWeek[weekIndex];
    const year = now.getFullYear();
    document.getElementById('month').textContent = month;
    document.getElementById('weekday').textContent = dayOfWeek;
    document.getElementById('day').textContent = day;
    document.getElementById('year').textContent = year;
    document.getElementById('time').textContent = time;
}


function toggleCalendar() {
    const calendar = document.getElementById('calendar_');
    if (calendar) {
        if (calendar.style.display === 'none') {
            calendar.style.display = 'block'; // Показываем календарь
        } else {
            calendar.style.display = 'none'; // Скрываем календарь
        }
    } else {
        console.error("Календарь не найден!");
    }
}



function updateSidebarRight(roomName) {
    // Очищаем правую боковую панель перед добавлением новых данных
    sidebar_right.innerHTML = '';

    // Получаем данные для выбранной комнаты
    const roomData = fetch_json[roomName];
    
    if (roomData) {
        // Создаем элемент заголовка для комнаты
        const roomHeader = document.createElement('h2');
        roomHeader.innerText = roomName;
        sidebar_right.appendChild(roomHeader);

        // Обрабатываем освещение
        const lightingData = roomData['Освещение'];
        if (lightingData) {
            const lightingHeader = document.createElement('h3');
            lightingHeader.innerText = 'Освещение';
            sidebar_right.appendChild(lightingHeader);

            for (const lamp in lightingData) {
                const lampInfo = document.createElement('p');
                lampInfo.innerText = `${lamp}: Статус - ${lightingData[lamp][0] ? 'Включена' : 'Выключена'}, Яркость - ${lightingData[lamp][1]}`;
                sidebar_right.appendChild(lampInfo);
            }
        }

        // Обрабатываем микроклимат
        const climateData = roomData['Микроклимат'];
        if (climateData) {
            const climateHeader = document.createElement('h3');
            climateHeader.innerText = 'Микроклимат';
            sidebar_right.appendChild(climateHeader);

            for (const param in climateData) {
                const paramInfo = document.createElement('p');
                paramInfo.innerText = `${param}: ${climateData[param]}`;
                sidebar_right.appendChild(paramInfo);
            }
        }
    } else {
        sidebar_right.innerText = 'Данные о комнате не найдены';
    }
}



document.addEventListener('DOMContentLoaded', (event) => {
    const calendar = document.getElementById('calendar_');
    if (calendar) {
        calendar.style.display = 'none'; // Скрываем календарь при загрузке страницы
    }
});

// Календарь
const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const monthsOfYear = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();
const currentDay = currentDate.getDate();

// Установить месяц и год
document.querySelector('.calendar__month').innerText = monthsOfYear[currentMonth];
document.querySelector('.calendar__year').innerText = currentYear;

// Создать сетку дней
let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
let week = document.createElement('div');
week.classList.add('calendar__day-numbers-row');

// Заполнить пустые ячейки для дней до понедельника
let firstDayOfMonth = new Date(currentYear, currentMonth, 1);
let emptyDays = (firstDayOfMonth.getDay() + 6) % 7; 

for (let i = 0; i < emptyDays; i++) {
    let emptyDay = document.createElement('span');
    emptyDay.classList.add('calendar__day-number', 'calendar__day-number--empty');
    week.append(emptyDay);
}

// Заполнение дней месяца
for (let i = 1; i <= daysInMonth; i++) {
    let day = document.createElement('span');
    day.classList.add('calendar__day-number');
    day.innerText = i;
    
    const dayOfWeek = new Date(currentYear, currentMonth, i).getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) { // 0 - воскресенье, 6 - суббота
        day.classList.add('calendar__day-number--weekend');
    }

    if (i === currentDay) {
        day.classList.add('calendar__day-number--current');
    }

    week.append(day);

    // Проверка на конец недели (суббота)
    if ((new Date(currentYear, currentMonth, i).getDay() + 6) % 7 === 6 || i === daysInMonth) {
        document.querySelector('.calendar__day-numbers').append(week);

        // Создание новой строки для следующей недели
        if (i !== daysInMonth) {
            week = document.createElement('div');
            week.classList.add('calendar__day-numbers-row');
        }
    }
}


// Получаем все кнопки комнат
const roomButtons = document.querySelectorAll('.rooms .button');
const othersButtons = document.querySelectorAll('.others .button');

// Получаем элемент правой боковой панели
const sidebar_right = document.querySelector('.sidebar-right');

const fetch_json = {
    'Детская':{
        'Освещение': {
            'Лампа1': [1, 50, "fff"],
            'Лампа2': [0, 0],
        },
        'Микроклимат': {
            'Температура': 26,
            'Влажность': 60,
            'CO2': 450            
        }
        },
    'Кухня':{
        'Освещение': {
            'Лампа1': [0, 10],
            'Лампа2': [1, 60],
            'Лампа3': [0, 100]},
        'Микроклимат': {
            'Температура': 25,
            'Влажность': 68,
            'CO2': 550
        }
        },
    'Спальня':{
        'Освещение': {
            'Лампа1': [0, 35],
            'Лампа2': [0, 20, 'afa'],
            'Лампа3': [0, 10]},
        'Микроклимат': {
            'Температура': 22,
            'Влажность': 41,
            'CO2': 600
        }
        },
    'Ванная':{
        'Освещение': {
            'Лампа1': [0, 50],
        },
        'Микроклимат': {
            'Температура': 28,
            'Влажность': 80,
            'Вентилятор': 50,
            'Теплый пол': 22
        }
        },
    'Прачечная':{
        'Освещение': {
            'Лампа1': [1, 100],
        },
        'Микроклимат': {
            'Температура': 24,
            'Влажность': 88,
            'Вентилятор': 50
        }
        }}
        ;
console.log(fetch_json)
// Добавляем обработчик событий на каждую кнопку
roomButtons.forEach(button => {
    button.addEventListener('click', () => {
        const roomName = button.innerText; // Получаем имя комнаты
        updateSidebarRight(roomName); // Обновляем правую боковую панель
    });
});
othersButtons.forEach(button => {
    button.addEventListener('click', () => {
        const roomName = button.innerText; // Получаем имя комнаты
        updateSidebarRight(roomName); // Обновляем правую боковую панель
    });
});



updateDateTime();
setInterval(updateDateTime, 1000);

