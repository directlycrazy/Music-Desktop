
const { app, BrowserWindow, ipcMain } = require('electron');
const discordrpc = require('discord-rich-presence')('1000807332562870373');
const path = require('path');

function createWindow() {

  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#222222',
      symbolColor: '#545454'
    },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    },
  });


  mainWindow.loadURL('https://music.inspare.cc');



}




app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {


    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

ipcMain.on('update-music', (event, arg) => {
  if (arg) {
    arg = JSON.parse(arg);
    if (arg[3] === null) return;
    console.log(arg);
    discordrpc.updatePresence({
      state: `by ${arg[1]} on ${arg[2]}`,
      details: arg[0],
      startTimestamp: Date.now(),
      endTimestamp: Date.now() + (arg[3] * 1000),
      largeImageKey: 'logo',
      instance: true,
    });
  }
  event.returnValue = true;
});




app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});



