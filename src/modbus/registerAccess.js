import { client } from "jsmodbus";
import ModbusRTU from "modbus-serial";

import {
  fetchLMProductInformation as parseProductInformationLM,
  fetchLMDIStatus,
  CHANNEL_LM_INFO,
  CHANNEL_LM_DI_STATUS,
} from "../model/A2750LM.model";

const modbusClient = new ModbusRTU();

const connectServer = ({ ip, port }) => {
  return modbusClient.connectTCP(ip, { port });
};

const startToUpdate = (webContents) => {
  setInterval(() => {
    a2700registerMap.forEach((register) => {
      modbusClient
        .readHoldingRegisters(register.address, register.length)
        .then(({ data: buffer }) => {
          register.data = register.parser(buffer);
          webContents.send(register.channel, register.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
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
];

export { connectServer, startToUpdate };
