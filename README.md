# mMusicCast

Simple chromecast emulator written in javascript on top of electron.
### Extra features of this fork:
* 4K Support in YouTube app*  
* AdBlock**  
* Background Playback  
* Fullscreen mode (double-click to toggle)

*- depends on your screen size + zoomFactor property, you might need to switch to fullscreen/fit-to-screen mode before starting casting, to get it. If you used previous versions of mMusicCast before, you might also need to clean app's cache. In Windows, it's located in `%APPDATA%/mMusicCast`  
**- disabled by default, change constant in main.js to enable it. Designed only for YT app.  

### Supported applications:

* YouTube - all platforms
* Spotify - Spotify connect using librespot (requires premium subscription and unix based os)

Currently Spotify playback doesn't give any feedback in the UI. For a future release, the creator of original version plans to display what is playing and add controls.


### Platforms:
* macOS
* linux
* Windows
* raspberryPi


### Install & run
* `npm install`
* `npm start`

Open YouTube or Spotify app on your phone and enjoy streaming ;) 
