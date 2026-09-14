const { app, BrowserWindow, shell, Menu } = require('electron')
const path = require('path')

// Uygulamanin acilacagi adres. Degistirmek isterseniz sadece burayi duzenleyin.
const START_URL = 'https://xn--guvenlsube-2ub.com.tr/'

// Bu alan adlari uygulama ICINDE acilir. Digerleri varsayilan tarayicida acilir.
const INTERNAL_HOSTS = ['xn--guvenlsube-2ub.com.tr']

function isInternal(url) {
  try {
    const h = new URL(url).hostname
    return INTERNAL_HOSTS.some((d) => h === d || h.endsWith('.' + d))
  } catch (e) {
    return false
  }
}

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 400,
    minHeight: 500,
    title: 'Guvenli Sube',
    icon: path.join(__dirname, 'build', 'icon.ico'),
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  // Ust menuyu gizle (temiz uygulama gorunumu)
  Menu.setApplicationMenu(null)

  mainWindow.loadURL(START_URL)

  // Site disi baglantilari ve yeni pencere isteklerini varsayilan tarayicida ac
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (isInternal(url)) {
      mainWindow.loadURL(url)
    } else {
      shell.openExternal(url)
    }
    return { action: 'deny' }
  })

  // Site disi bir adrese gidilmek istenirse tarayicida ac, uygulamada tut
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!isInternal(url)) {
      event.preventDefault()
      shell.openExternal(url)
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// Tek ornek: uygulama zaten acikken tekrar acilirsa mevcut pencereyi one getir
const gotLock = app.requestSingleInstanceLock()
if (!gotLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })

  app.whenReady().then(createWindow)

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
}
