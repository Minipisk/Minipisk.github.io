document.addEventListener('DOMContentLoaded', () => {
    // ========== Снежинки ==========
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerHTML = '❄';
        
        // Позиция
        snowflake.style.left = `${Math.random() * 100}vw`;
        
        // Анимация
        const size = Math.random() * 20 + 10;
        const duration = Math.random() * 5 + 5;
        snowflake.style.fontSize = `${size}px`;
        snowflake.style.animationDuration = `${duration}s`;
        snowflake.style.opacity = Math.random() * 0.5 + 0.5;

        document.body.appendChild(snowflake);

        // Автоудаление
        setTimeout(() => snowflake.remove(), duration * 1000);
    }

    setInterval(createSnowflake, 300);

    // ========== Аудио ==========
    const audio = document.getElementById('audio-player');
    const playBtn = document.querySelector('.play-btn');
    const progress = document.querySelector('.progress');

    // Управление плеером
    playBtn.addEventListener('click', () => {
        if(audio.paused) {
            audio.play();
            playBtn.textContent = '⏸';
        } else {
            audio.pause();
            playBtn.textContent = '▶';
        }
    });

    // Обновление прогресса
    audio.addEventListener('timeupdate', () => {
        const percent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = `${percent}%`;
    });

    // Перемотка
    document.querySelector('.progress-bar').addEventListener('click', (e) => {
        const rect = e.target.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        audio.currentTime = pos * audio.duration;
    });

    // ========== Экран входа ==========
    const splash = document.getElementById('splash');
    const profile = document.getElementById('profile');

    splash.addEventListener('click', () => {
        // Анимация исчезновения
        splash.style.opacity = '0';
        setTimeout(() => {
            splash.style.display = 'none';
            profile.style.display = 'block';
            audio.play().catch(() => {});
        }, 500);
    });

    // ========== Счётчик ==========
    let visitCount = localStorage.getItem('visits') || 0;
    visitCount = parseInt(visitCount) + 1;
    localStorage.setItem('visits', visitCount);
    console.log(`Посещений: ${visitCount}`);

    // ========== Адаптация ==========
    function checkMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    if(checkMobile()) {
        document.body.classList.add('mobile');
        document.querySelector('.profile').style.padding = '1rem';
    }
});
