import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Vimeo.Player(document.getElementById('vimeo-player'));

const localStorageKey = 'videoplayer-current-time';

// Функция для сохранения текущего времени воспроизведения в локальное хранилище
const saveCurrentTime = throttle((currentTime) => {
  localStorage.setItem(localStorageKey, currentTime);
}, 1000); // Опция throttle - ограничение частоты вызовов до раз в 1000 мс (1 секунда)

// Инициализация плеера и обработка события timeupdate для сохранения времени
player.on('timeupdate', function (data) {
  const currentTime = data.seconds;
  saveCurrentTime(currentTime);
});

// Восстановление времени воспроизведения при перезагрузке страницы
const storedTime = localStorage.getItem(localStorageKey);
if (storedTime) {
  player.setCurrentTime(storedTime).catch((error) => {
    console.error('Failed to set player currentTime:', error);
  });
}