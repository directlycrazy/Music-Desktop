window.addEventListener('DOMContentLoaded', () => {
  let elem = document.createElement('script');
  elem.innerHTML = `
  //discord rich presence
  var prev_song;
  const {ipcRenderer} = require('electron')
  setInterval(() => {
    if (!navigator.mediaSession.metadata) return;
    let data = [navigator.mediaSession.metadata.title, navigator.mediaSession.metadata.artist, navigator.mediaSession.metadata.album, document.getElementById('audio').duration, document.getElementById('song_id').innerHTML]
    if (!data || prev_song && prev_song.join(',') === data.join(',')) return;
    prev_song = data;
    ipcRenderer.send('update-music', JSON.stringify(data))
  }, 1000)
  `;
  document.body.appendChild(elem);
});
