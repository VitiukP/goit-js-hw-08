import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
// Функция для сохранения текущего времени воспроизведения
const saveCurrentTime = throttle(time => {
  localStorage.setItem('videoplayer-current-time', time);
}, 1000);
// Отслеживание события timeupdate
player.on('timeupdate', data => {
  saveCurrentTime(data.seconds);
});
// Установка времени воспроизведения при перезагрузке страницы
const savedTime = localStorage.getItem('videoplayer-current-time');
if (savedTime) {
  player.setCurrentTime(savedTime);
}