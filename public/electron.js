import { app, BrowserWindow } from "electron";
import path from "path";
import isDev from "electron-is-dev";
import { connectServer, startToUpdate } from "../src/modbus/registerAccess";
import { getA2750LMProductInfo } from "../src/model/A2750LM.model";

let mainWindow;
let mClient;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      devTools: isDev,
      preload: __dirname + "/preload.js",
    },
  });
  mainWindow.removeMenu();

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000/"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }

  mainWindow.setResizable(true);
  mainWindow.on("closed", () => (mainWindow = null));
  mainWindow.focus();
  let webContents = mainWindow.webContents;

  connectServer({ ip: "localhost", port: 502 })
    .then(() => {
      console.log("ip: 10.10.23.49:502 connected");
      startToUpdate(webContents);
    })
    .catch(console.error);
}

app.whenReady().then(createWindow);

//app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
