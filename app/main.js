const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')
const url = require('url')

// Start the program when app is ready
app.on('ready', function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        show: false, // Show and maximize later
        icon: path.join(__dirname, 'assets', 'icons', 'main_icon.ico'),
        resizable: true,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // Load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'src', 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Create the menu
    const menu = Menu.buildFromTemplate([{
            label: 'File',
            submenu: [{
                // Quit
                label: 'Quit',
                accelerator: 'ctrl+q',
                click() {
                    win.close()
                }
            }, ]
        },
        {
            label: 'Help',
            // Allow opening browser dev tool
            submenu: [{
                label: 'DevTool',
                accelerator: 'Ctrl+D',
                click() {
                    win.webContents.toggleDevTools()
                }
            }]
        }
    ])

    // Set menu
    Menu.setApplicationMenu(menu)

    // Perform actions after window is loaded
    win.webContents.on('did-finish-load', () => {
        // Show and maximize
        win.show()
    })
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// Create python process
function createPyProc() {
    let port = 4242
    let script = path.join(__dirname, 'src', 'pypac', 'pypac.py')
    pyProc = require('child_process').spawn('python', [script, port])
    if (pyProc != null) {
        console.log('child process success')
    }
}

function exitPyProc() {
    pyProc.kill()
}

app.on('ready', createPyProc)
app.on('window-all-closed', exitPyProc)