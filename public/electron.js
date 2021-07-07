import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import isDev from "electron-is-dev";
import connect from "../src/modbus/modbus-client";

let mainWindow;

function createWindow() {
  console.log(path.resolve(__dirname, "/preload.js"));
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

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }

  mainWindow.setResizable(true);
  mainWindow.on("closed", () => (mainWindow = null));
  mainWindow.focus();

  const client = connect({ ip: "10.10.23.49", port: 502 });
  console.log(client);
}

app.on("ready", createWindow);

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

const client = null;

ipcMain.on("CONNECT", (evt, ip) => {
  console.log(`payload ${ip}...`);

  client = connect({ ip, port: 502 });
  console.log(client);
});

ipcMain.on("FETCH_LM_INFO", async (evt, payload) => {
  const val = await client.readHoldingRegister(10000, 8);
  const lm_product_info = {
    operationState: val.data[0],
    ProductCode: val.data[1],
    serialNumber: val.data[2],
    hardwareRevision: val.data[3],
    moduleType: val.data[4],
    powerType: val.data[5],
    pcbVersion: val.data[6],
    applicationVersion: val.data[7],
    bootloaderVersion: val.data[8],
  };

  evt.replay("FETCH_LM_INFO", lm_product_info);
});
