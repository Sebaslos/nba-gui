import {app, BrowserWindow, ipcMain} from 'electron'
import path from 'path'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 768,
        useContentSize: true,
        width: 1024
    })

    mainWindow.loadURL(winURL)

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

function createImportWindow() {
    // const modalPath = path.join('file://', __static, '../src/renderer/modals/import.html')
    const modalPath = path.join('file://', __static, '/modals/import.html')
    let win = new BrowserWindow({
        width: 600, height: 500, parent: mainWindow, modal: true, show: false
    })
    win.on('close', function () {
        win = null
    })
    win.loadURL(modalPath)
    win.once('ready-to-show', () => {
        win.show()
    })
}

ipcMain.on('open-import-window', () => {
    createImportWindow()
})

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})
