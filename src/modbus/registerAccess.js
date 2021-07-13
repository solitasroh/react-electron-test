import ModbusRTU from "modbus-serial";
import { a2700registerMap, a2700RegisterMap } from "./registerMap";

const modbusClient = new ModbusRTU();

const connectServer = ({ ip, port }) => {
  return modbusClient.connectTCP(ip, { port });
};

const readRegister = async (register) => {
  return await modbusClient.readHoldingRegisters(
    register.address - 1,
    register.length
  );
};

const startToUpdate = (webContents) => {
  const _a2700registerMap = a2700registerMap;
  setInterval(async () => {
    await Promise.all(
      _a2700registerMap.map(async (register) => {
        const { data } = await readRegister(register);
        console.log(
          `channel: ${register.channel}, address: ${register.address - 1}`
        );
        register.data = register.parser(data);
        webContents.send(register.channel, register.data);
      })
    );
  }, 1500);
};

export { connectServer, startToUpdate };
