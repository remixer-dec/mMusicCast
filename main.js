// import { setTimeout } from 'timers';
const electron = require('electron')
const {adblock} = require('./adblock')
const ADBLOCK_ENABLED = false

// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

const server = require('./server')
var ws;

var WebSocketClient = require('websocket').client;
const WebSocket = require('ws')

const homePageUrl = "http://localhost:8008"

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600, webPreferences:{zoomFactor: 0.2}})
  // Toggle adblock
  if(ADBLOCK_ENABLED) adblock(mainWindow)
  mainWindow.setMenu(null)
  // and load the index.html of the app.
  mainWindow.loadURL(homePageUrl)
  mainWindow.webContents.on('did-finish-load', () => {
    let code = `
      window.addEventListener('dblclick',(e) => {
        /*toggle fullscreen mode on double click*/
        document.webkitIsFullScreen ? document.webkitCancelFullScreen() : document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
      })
      if(window.location.href.match(/youtube\.com/img)) {
        /*allow background playback*/
        window.addEventListener('visibilitychange', (e) => {
          e.stopPropagation();
        }, true);
      }
    `;
    mainWindow.webContents.executeJavaScript(code);
  });
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })



}
const setupWS = () => {
  ws  = new WebSocket("ws://localhost:8008/stage");

  ws.onmessage = function (e) {
      var cmd = JSON.parse(e.data);

      if(cmd.cmd == "show") {

          var url = cmd.url;
          mainWindow.loadURL(url,{userAgent:"Mozilla/5.0 (Unknown; Linux armv7l) AppleWebKit/537.1+ (KHTML, like Gecko) Safari/537.1+ LG Browser/6.00.00(+mouse+3D+SCREEN+TUNER; LGE;43LK5760PTA; 04.25.05; 0x00000001;); LG NetCast.TV-2013 /04.25.05 (LG, 43LK5760PTA, wired)"});
        // window.location = url;
      } else if(cmd.cmd == "idle") {
          // $('#idle_container').fadeIn('slow');
      } else if(cmd.cmd == "close") {
        mainWindow.loadURL(homePageUrl)
      }
  };
}

setTimeout(setupWS,5000)

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
