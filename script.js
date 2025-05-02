document.addEventListener('DOMContentLoaded', () => {
    const splash = document.getElementById('splash');
    const main = document.getElementById('main');
    const playBtn = document.getElementById('play-btn');
    const playIcon = document.getElementById('play-icon');
    const progress = document.getElementById('progress');
    
    const audio = new Audio('assets/music.mp3');
    let isPlaying = false;
    
    // Скрытие заставки
    splash.addEventListener('click', () => {
        splash.style.opacity = '0';
        setTimeout(() => {
            splash.style.display = 'none';
            main.style.display = 'flex';
            audio.play().then(() => {
                isPlaying = true;
                playIcon.src = 'assets/pause.jpg';
            }).catch(e => console.log(e));
        }, 500);
    });
    
    // Управление плеером
    playBtn.addEventListener('click', () => {
        if(isPlaying) {
            audio.pause();
            playIcon.src = 'assets/play.jpg';
        } else {
            audio.play();
            playIcon.src = 'assets/pause.jpg';
        }
        isPlaying = !isPlaying;
    });
    
    // Прогресс бар
    audio.addEventListener('timeupdate', () => {
        const percent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = `${percent}%`;
    });
    
    // Перемотка
    document.querySelector('.progress-container').addEventListener('click', (e) => {
        const rect = e.target.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        audio.currentTime = pos * audio.duration;
    });
    
    // Снежинки
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.innerHTML = '❄';
        snowflake.style.position = 'absolute';
        snowflake.style.color = 'white';
        snowflake.style.fontSize = `${Math.random() * 20 + 10}px`;
        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.top = '-20px';
        snowflake.style.opacity = Math.random() * 0.5 + 0.3;
        snowflake.style.animation = `fall ${Math.random() * 5 + 5}s linear forwards`;
        snowflake.style.pointerEvents = 'none';
        snowflake.style.zIndex = '1';
        
        document.body.appendChild(snowflake);
        
        setTimeout(() => {
            snowflake.remove();
        }, 10000);
    }
    
    setInterval(createSnowflake, 300);
    
    // Анимация падения снежинок
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fall {
            to {
                transform: translateY(100vh);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Счетчик посещений
    let visits = localStorage.getItem('visits') || 0;
    visits = parseInt(visits) + 1;
    localStorage.setItem('visits', visits);
    console.log(`Посещений: ${visits}`);
});
