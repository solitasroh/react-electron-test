import {
  fetchLMProductInformation as parseProductInformationLM,
  fetchLMDIStatus,
  CHANNEL_LM_INFO,
  CHANNEL_LM_PARTNER_INFO,
  CHANNEL_LM_DI_STATUS,
  CHANNEL_LM_DO_STATUS,
  CHANNEL_LD_INFO,
  CHANNEL_LD_PARTNER_INFO,
  fetchLMDOStatus,
  fetchLDInfo,
  parseA2750LDInformation,
} from "../model/A2750LM.model";

export const a2700registerMap = [
  {
    address: 62001,
    length: 11,
    channel: CHANNEL_LM_INFO,
    data: {
      operationState: "", //1w
      productCode: 0, // 1w
      serialNumber: 0, // 2w
      hardwareRevision: 1, // 2w
      pcbVersion: "", // 1w
      applicationVersion: "", // 1w
      bootloaderVersion: "", // 1w
    },
    parser: parseProductInformationLM,
  },
  {
    address: 62031,
    length: 11,
    channel: CHANNEL_LM_PARTNER_INFO,
    data: {
      operationState: "", //1w
      productCode: 0, // 1w
      serialNumber: 0, // 2w
      hardwareRevision: 1, // 2w
      pcbVersion: "", // 1w
      applicationVersion: "", // 1w
      bootloaderVersion: "", // 1w
    },
    parser: parseProductInformationLM,
  },
  {
    address: 62400,
    length: 18,
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
    address: 62450,
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
  {
    address: 62300,
    length: 9,
    channel: CHANNEL_LD_INFO,
    data: {
      operationState: "",
      productCode: "",
      serialNumber: "",
      hardwareRevision: "",
      applicationVersion: "",
      kernelVersion: "",
      bootloaderVersion: "",
      pcbVersion: "",
    },
    parser: parseA2750LDInformation,
  },
  {
    address: 62320,
    length: 9,
    channel: CHANNEL_LD_PARTNER_INFO,
    data: {
      operationState: "",
      productCode: "",
      serialNumber: "",
      hardwareRevision: "",
      applicationVersion: "",
      kernelVersion: "",
      bootloaderVersion: "",
      pcbVersion: "",
    },
    parser: parseA2750LDInformation,
  },
];
