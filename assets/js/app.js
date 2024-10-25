let currentImageIndex = 1; // Начальный индекс изображения
const maxImages = 1; // Максимальное количество изображений (например, до 5.png)
const itemsPerPage = 4; // Количество блоков на странице
let currentPage = 1; // Начальная страница

let currentVideoIndex = 1; // Начальный индекс видео
const itemsvidPerPage = 3; // Количество видео на странице
const totalvidPages = 1; // Общее количество страниц (пока 2, так как 6 видео не существует)

const openPopup = document.getElementById('openPopup');
const closePopup = document.getElementById('closePopup');
const popup = document.getElementById('popup');
const overlay = document.getElementById('overlay');
const sliderImage = document.getElementById('sliderImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const blocks = document.querySelectorAll('.other_itemback');
const totalItems = blocks.length;
const totalPages = totalItems > itemsPerPage ? Math.ceil(totalItems / itemsPerPage) : 1; // Страницы зависят от количества блоков
const pageButtons = document.querySelectorAll('.slider_button[data-page]');
const nextButton = document.getElementById('nextPage');
const videoCircles = document.querySelectorAll('.vid_circle'); // Кружочки для навигации
const videos = document.querySelectorAll('.vid'); // Все видео
const contactItems = document.querySelectorAll('.contact_item');

// Добавляем обработчик клика на каждый блок
contactItems.forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault(); // Предотвращаем перезагрузку страницы

        // Убираем класс active у всех contact_item
        contactItems.forEach(i => i.classList.remove('active'));

        // Добавляем класс active к текущему элементу
        this.classList.add('active');
    });
});

openPopup.addEventListener('click', function() {
    popup.style.display = 'block'; // Показываем попап
    overlay.style.display = 'block'; // Показываем затемняющий фон
    document.body.classList.add('body-no-scroll'); // Запрещаем скролл body
});

closePopup.addEventListener('click', function() {
    popup.style.display = 'none'; // Скрываем попап
    overlay.style.display = 'none'; // Скрываем затемняющий фон
    document.body.classList.remove('body-no-scroll'); // Включаем скролл body
});

function changeImage(newIndex) {
    // Плавное исчезновение
    sliderImage.style.opacity = 0;
    setTimeout(() => {
        currentImageIndex = newIndex;
        sliderImage.src = `assets/images/Second-header/${currentImageIndex}.png`;
        // Плавное появление
        sliderImage.style.opacity = 1;
    }, 500); // Время исчезновения совпадает с transition
}

nextBtn.addEventListener('click', function() {
    let newIndex = currentImageIndex + 1;
    if (newIndex > maxImages) newIndex = 1; // Возврат к первому изображению
    changeImage(newIndex);
});

prevBtn.addEventListener('click', function() {
    let newIndex = currentImageIndex - 1;
    if (newIndex < 1) newIndex = maxImages; // Переход к последнему изображению
    changeImage(newIndex);
});

// Функция для показа блоков на текущей странице с плавным затуханием
function showPage(page) {
    blocks.forEach((block, index) => {
        block.classList.remove('show'); // Скрываем все блоки
        // Рассчитываем индекс для показа на всех страницах при нехватке элементов
        const adjustedIndex = index % itemsPerPage;
        if (adjustedIndex < itemsPerPage) {
            setTimeout(() => {
                block.classList.add('show'); // Плавное появление
            }, 100); // Небольшая задержка для анимации
        }
    });
}

// Функция для обновления состояния кнопок
function updateButtons(page) {
    pageButtons.forEach((button) => button.classList.remove('active'));
    const activeButton = document.querySelector(`.slider_button[data-page="${page}"]`);
    if (activeButton) activeButton.classList.add('active');
}

// Клик по кнопкам страниц
pageButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const page = parseInt(button.getAttribute('data-page'));
        currentPage = page;
        showPage(page);
        updateButtons(page);
    });
});

// Клик по кнопке "вперед"
nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
    } else {
        currentPage = 1; // Вернуться к первой странице, если достигнут конец
    }
    showPage(currentPage);
    updateButtons(currentPage);
});

// Инициализация страницы
showPage(currentPage);

// Функция для показа видео на текущей странице с плавным затуханием
function showVideos(page) {
    videos.forEach((video, index) => {
        video.classList.remove('show'); // Скрываем все видео
        // Рассчитываем индекс видео для текущей страницы
        const videoIndex =  index + 1; 

        // Если индекс видео меньше или равен количеству видео, показываем его
        if (videoIndex <= page * itemsvidPerPage) {
            if (videoIndex >= page * itemsvidPerPage -2){
                setTimeout(() => {
                    video.classList.add('show'); // Плавное появление
                }, 100); // Небольшая задержка для анимации
            } 
        }
    });
}

// Функция для обновления активного кружочка
function updateActiveCircle(page) {
    videoCircles.forEach(circle => circle.classList.remove('active')); // Убираем активный класс у всех кружочков
    const activeCircle = document.querySelector(`.vid_circle:nth-child(${page})`);
    if (activeCircle) activeCircle.classList.add('active'); // Добавляем активный класс для текущего кружочка
}

// Обработчик кликов по кружочкам
videoCircles.forEach((circle, index) => {
    circle.addEventListener('click', () => {
        const page = index + 1; // Индекс страницы
        currentVideoIndex = page; // Обновляем текущую страницу
        showVideos(page); // Показываем видео для этой страницы
        updateActiveCircle(page); // Обновляем активный кружочек
    });
});

// Инициализация видео на первой странице
showVideos(currentVideoIndex);
updateActiveCircle(currentVideoIndex);
