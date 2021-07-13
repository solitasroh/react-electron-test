import React, { useState } from "react";
import styled from "styled-components";
import useIpcOn from "../Hooks/useIpcOn";
import {
  CHANNEL_LM_DI_STATUS,
  CHANNEL_LM_INFO,
  CHANNEL_LM_DO_STATUS,
  CHANNEL_LD_INFO,
  CHANNEL_LD_PARTNER_INFO,
  CHANNEL_LM_PARTNER_INFO,
  CHANNEL_LD_MISMATCH_ALARM,
} from "../model/A2750LM.model";
import { ContentField, DIOField, InfoContainer } from "../components/ContentField";
import A2750LMSetup from "../components/A2750LMSetup";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
  align-items: flex-start;
`;

// const InfoContainer = styled.div`
//   display: inline-block;
//   justify-content: left;
//   background-color: white;
//   align-items: baseline;
//   margin: 10px;
//   border-radius: 5px;
//   padding: 10px;
// `;

const TitleField = styled.label`
  display: flex;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  color: rgba(10, 10, 10, 0.8);
  font-weight: 600;
  font-size: 14px;
`;

const A2750LMInformation = ({ partner }) => {
  const [information, setInformation] = useState({
    operationState: 0,
    productCode: 0,
    serialNumber: 0,
    hardwareRevision: 0,
    pcbVersion: 0,
    applicationVersion: "0.0.000",
    bootloaderVersion: "0.0.000",
  });
  const channel = !partner ? CHANNEL_LM_INFO : CHANNEL_LM_PARTNER_INFO;
  useIpcOn(channel, (evt, ...args) => {
    setInformation(...args);
  });

  return (
    <InfoContainer>
      <TitleField>Accura 2750LM {partner ? "(PARTNER)" : ""}</TitleField>
      <ContentField
        prop="operation state"
        value={information.operationState}
        invalid={information.operationState === "UNIDENIFIED"}
        priority="high"
      />
      <ContentField prop="product code" value={information.productCode} />
      <ContentField prop="serial number" value={information.serialNumber} />
      <ContentField
        prop="hardware revision"
        value={information.hardwareRevision}
      />
      <ContentField prop="pcb version" value={information.pcbVersion} />
      <ContentField
        prop="application version"
        value={information.applicationVersion}
      />
      <ContentField
        prop="bootloader version"
        value={information.bootloaderVersion}
      />
    </InfoContainer>
  );
};
const A2750LMDigitalInput = () => {
  const [diStatus, setDiStatus] = useState({
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
  });

  useIpcOn(CHANNEL_LM_DI_STATUS, (evt, ...args) => {
    setDiStatus(...args);
  });

  return (
    <InfoContainer>
      <TitleField>Digital Input</TitleField>
      <DIOField
        ch={1}
        value={diStatus.channel1}
        on={diStatus.channel1 === "Energized"}
      />
      <DIOField ch={2} value={diStatus.channel2} />
      <DIOField ch={3} value={diStatus.channel3} />
      <DIOField ch={4} value={diStatus.channel4} />
      <DIOField ch={5} value={diStatus.channel5} />
      <DIOField ch={6} value={diStatus.channel6} />
      <DIOField ch={7} value={diStatus.channel7} />
      <DIOField ch={8} value={diStatus.channel8} />
      <DIOField ch={9} value={diStatus.channel9} />
      <DIOField ch={10} value={diStatus.channel10} />
      <DIOField ch={11} value={diStatus.channel11} />
      <DIOField ch={12} value={diStatus.channel12} />
      <DIOField ch={13} value={diStatus.channel13} />
      <DIOField ch={14} value={diStatus.channel14} />
      <DIOField ch={15} value={diStatus.channel15} />
      <DIOField ch={16} value={diStatus.channel16} />
      <DIOField ch={17} value={diStatus.channel17} />
      <DIOField ch={18} value={diStatus.channel18} />
    </InfoContainer>
  );
};
const A2750LDInformation = ({ partner }) => {
  const [ldInfo, setLdInfo] = useState({
    operationState: "",
    productCode: "",
    serialNumber: "",
    hardwareRevision: "",
    applicationVersion: "",
    kernelVersion: "",
    bootloaderVersion: "",
    pcbVersion: "",
  });
  const channel = partner ? CHANNEL_LD_PARTNER_INFO : CHANNEL_LD_INFO;
  useIpcOn(channel, (evt, ...args) => {
    setLdInfo(...args);
  });

  return (
    <InfoContainer>
      <TitleField>Accura 2750LD {partner ? "(PARTNER)" : ""}</TitleField>
      <ContentField
        prop="operationState"
        value={ldInfo.operationState}
        priority="high"
      />
      <ContentField
        prop="productCode"
        value={ldInfo.productCode}
        priority="high"
      />
      <ContentField
        prop="serialNumber"
        value={ldInfo.serialNumber}
        priority="high"
      />
      <ContentField
        prop="hardwareRevision"
        value={ldInfo.hardwareRevision}
        priority="high"
      />
      <ContentField
        prop="applicationVersion"
        value={ldInfo.applicationVersion}
        priority="high"
      />
      <ContentField
        prop="kernelVersion"
        value={ldInfo.kernelVersion}
        priority="high"
      />
      <ContentField
        prop="bootloaderVersion"
        value={ldInfo.bootloaderVersion}
        priority="high"
      />
      <ContentField
        prop="pcbVersion"
        value={ldInfo.pcbVersion}
        priority="high"
      />
    </InfoContainer>
  )
}
const A2750LMAlarm = () => {
  
  const [alarm, setAlarm] = useState({
    alarm: 0
  });

  useIpcOn(CHANNEL_LD_MISMATCH_ALARM, (evt,...args) => {
    console.log(args);
    setAlarm(...args);
    console.log(alarm);
  });

  return (
    <InfoContainer>
      <TitleField>Accura 2750LM Alarm</TitleField>
      <ContentField prop="MissMatch" value={alarm.alarm ? "On" : "Off"} priority="high"/>
    </InfoContainer>
  )
}

const A2750LMDigitalOutput = () => {
  const [doStatus, setDoStatus] = useState({
    channel1: "",
    channel2: "",
    channel3: "",
    channel4: "",
    channel5: "",
    channel6: "",
    channel7: "",
    channel8: "",
    channel9: "",
  });

  useIpcOn(CHANNEL_LM_DO_STATUS, (evt, ...args) => {
    setDoStatus(...args);
  });

  return (
    <InfoContainer>
      <TitleField>Digital Output</TitleField>
      <DIOField ch={1} value={doStatus.channel1} />
      <DIOField ch={2} value={doStatus.channel2} />
      <DIOField ch={3} value={doStatus.channel3} />
      <DIOField ch={4} value={doStatus.channel4} />
      <DIOField ch={5} value={doStatus.channel5} />
      <DIOField ch={6} value={doStatus.channel6} />
      <DIOField ch={7} value={doStatus.channel7} />
      <DIOField ch={8} value={doStatus.channel8} />
      <DIOField ch={9} value={doStatus.channel9} />
    </InfoContainer>
  );
};

const LM = () => {
  return (
    <Container>
      <A2750LMInformation/>
      <A2750LMInformation partner={true}/>
      <A2750LDInformation/>
      <A2750LDInformation partner={true}/>
      <A2750LMDigitalInput/>
      <A2750LMDigitalOutput/>
      <A2750LMAlarm/>
      <A2750LMSetup/>
    </Container>
  );
};
export default LM;
