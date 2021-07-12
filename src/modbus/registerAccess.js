import ModbusRTU from "modbus-serial";

import {
  fetchLMProductInformation as parseProductInformationLM,
  fetchLMDIStatus,
  CHANNEL_LM_INFO,
  CHANNEL_LM_DI_STATUS,
  CHANNEL_LM_DO_STATUS,
  fetchLMDOStatus,
} from "../model/A2750LM.model";

const modbusClient = new ModbusRTU();

const connectServer = ({ ip, port }) => {
  return modbusClient.connectTCP(ip, { port });
};

const readRegister = async (register) => {
  return await modbusClient.readHoldingRegisters(
    register.address,
    register.length
  );
};

const startToUpdate = (webContents) => {
  setInterval(async () => {
    await Promise.all(
      a2700registerMap.map(async (register) => {
        const { data } = await readRegister(register);
        console.log(
          `channel: ${register.channel}, address: ${register.address}`
        );
        register.data = register.parser(data);
        webContents.send(register.channel, register.data);
      })
    );
  }, 1500);
};

const a2700registerMap = [
  {
    address: 10000,
    length: 10,
    channel: CHANNEL_LM_INFO,
    data: {
      operationState: "",
      productCode: 0,
      serialNumber: 0,
      hardwareRevision: 1,
      moduleType: "",
      powerType: 0,
      pcbVersion: "",
      applicationVersion: "",
      bootloaderVersion: "",
    },
    parser: parseProductInformationLM,
  },
  {
    address: 10050,
    length: 10,
    channel: CHANNEL_LM_DI_STATUS,
    data: {
      channel1: "",
      channel2: "",
      channel3: "",
      channel4: "",
      channel5: "",
      channel6: "",
      channel7: "",
      channel8: "",
      channel9: "",
      channel10: "",
      channel11: "",
      channel12: "",
      channel13: "",
      channel14: "",
      channel15: "",
      channel16: "",
      channel17: "",
      channel18: "",
    },
    parser: fetchLMDIStatus,
  },
  {
    address: 10070,
    length: 9,
    channel: CHANNEL_LM_DO_STATUS,
    data: {
      channel1: "",
      channel2: "",
      channel3: "",
      channel4: "",
      channel5: "",
      channel6: "",
      channel7: "",
      channel8: "",
      channel9: "",
    },
    parser: fetchLMDOStatus,
  },
];

export { connectServer, startToUpdate };
