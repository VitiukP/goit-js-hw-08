import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const saveCurrentTime = throttle(time => {
    localStorage.setItem('videoplayer-current-time', time);
}, 1000);

player.on('timeupdate', data => {
    saveCurrentTime(data.seconds);
});

const savedTime = localStorage.getItem('videoplayer-current-time');
if (savedTime) {
    player.setCurrentTime(savedTime);
}