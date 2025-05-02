// Снежинки
function createSnow() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.innerHTML = '❄';
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
    snowflake.style.opacity = Math.random();
    snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
    document.body.appendChild(snowflake);
    
    setTimeout(() => {
        snowflake.remove();
    }, 5000);
}

setInterval(createSnow, 100);

// Плеер
const audio = document.getElementById('main-audio');
const playBtn = document.querySelector('.play-btn');
const progressBar = document.querySelector('.progress');
const currentTimeEl = document.querySelector('.current-time');

playBtn.addEventListener('click', () => {
    if(audio.paused) {
        audio.play();
        playBtn.textContent = '❚❚';
    } else {
        audio.pause();
        playBtn.textContent = '▶';
    }
});

audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progress + '%';
    
    // Форматирование времени
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);
    currentTimeEl.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
});

// Клик по прогресс-бару
document.querySelector('.progress-bar').addEventListener('click', (e) => {
    const percent = e.offsetX / e.target.offsetWidth;
    audio.currentTime = percent * audio.duration;
});

// Защитный экран
document.getElementById('splash').addEventListener('click', function() {
    this.style.opacity = '0';
    setTimeout(() => {
        this.style.display = 'none';
        audio.play();
        playBtn.textContent = '❚❚';
    }, 300);
    
    // Анимация появления элементов
    document.querySelectorAll('.profile > *').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.animation = `fadeIn 0.5s ease ${i * 0.2}s forwards`;
    });
});

// Счётчик посещений
if(localStorage.visitCount) {
    localStorage.visitCount = Number(localStorage.visitCount) + 1;
} else {
    localStorage.visitCount = 1;
}
console.log(`Посещений: ${localStorage.visitCount}`);

// Определение устройства
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if(isMobile) {
    document.body.classList.add('mobile');
} else {
    document.body.classList.add('desktop');
}
