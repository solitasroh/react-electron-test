import { ipcMain } from "electron";
import ModbusRTU from "modbus-serial";
import { CHANNEL_LM_DO_COMMAND } from "../model/A2750LM.model";
import { a2700registerMap, a2700RegisterMap } from "./registerMap";

const modbusClient = new ModbusRTU();

const connectServer = ({ ip, port }) => {
  ipcMain.on(CHANNEL_LM_DO_COMMAND, (evt, { ch, value }) => {
    const buf = value;
    console.log(buf);
    modbusClient.writeCoil(1348 + (ch - 1), buf);
  });

  return modbusClient.connectTCP(ip, { port });
};

const readRegister = async (register) => {
  return await modbusClient.readHoldingRegisters(
    register.address - 1,
    register.length
  );
};

const readCoil = async (register) => {
  return await modbusClient.readCoils(register.address - 1, register.length);
};

const startToUpdate = (webContents) => {
  const _a2700registerMap = a2700registerMap;
  setInterval(async () => {
    await Promise.all(
      _a2700registerMap.map(async (register) => {
        if (register.fc == 3) {
          const { data } = await readRegister(register);
          console.log(
            `channel: ${register.channel}, address: ${register.address - 1}`
          );
          if (register.parser != null) {
            register.data = register.parser(data);
          }
          webContents.send(register.channel, register.data);
        } else if (register.fc == 1) {
          const { data } = await readCoil(register);
          register.data = register.parser(data);
          webContents.send(register.channel, register.data);
        }
      })
    );
  }, 1500);
};

export { connectServer, startToUpdate };
