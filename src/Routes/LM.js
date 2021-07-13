import React, { useState } from "react";
import styled from "styled-components";
import useIpcOn from "../Hooks/useIpcOn";
import {
  CHANNEL_LM_DI_STATUS,
  CHANNEL_LM_INFO,
  CHANNEL_LM_DO_STATUS,
  CHANNEL_LM_PARTNER_INFO,
  CHANNEL_LD_INFO,
  CHANNEL_LD_PARTNER_INFO,
} from "../model/A2750LM.model";
import { ContentField, DIOField } from "../components/ContentField";
import A2750LMSetup from "../Views/A2750LMSetup";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
  align-items: flex-start; ;
`;

const InfoContainer = styled.div`
  display: inline-block;
  justify-content: left;
  background-color: white;
  align-items: baseline;
  margin: 10px;
  border-radius: 5px;
  padding: 10px;
`;

const TitleField = styled.label`
  display: flex;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  color: rgba(10, 10, 10, 0.8);
  font-weight: 600;
  font-size: 14px;
`;

const A2750LMInformation = ({ isPartner }) => {
  const [information, setInformation] = useState({
    operationState: 0,
    productCode: 0,
    serialNumber: 0,
    hardwareRevision: 0,
    moduleType: 0,
    powerType: 0,
    pcbVersion: 0,
    applicationVersion: "0.0.000",
    bootloaderVersion: "0.0.000",
  });
  const channel = isPartner ? CHANNEL_LM_PARTNER_INFO : CHANNEL_LM_INFO;
  useIpcOn(channel, (evt, ...args) => {
    setInformation(...args);
  });

  return (
    <InfoContainer>
      <TitleField>Accura 2750LM {isPartner ? "(PARTNER)" : ""}</TitleField>
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
      <ContentField prop="module type" value={information.moduleType} />
      <ContentField prop="power type" value={information.powerType} />
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
        prop="Channel01"
        value={diStatus.channel1}
        on={diStatus.channel1 === "Energized"}
      />
      <DIOField prop="Channel02" value={diStatus.channel2} />
      <DIOField prop="Channel03" value={diStatus.channel3} />
      <DIOField prop="Channel04" value={diStatus.channel4} />
      <DIOField prop="Channel05" value={diStatus.channel5} />
      <DIOField prop="Channel06" value={diStatus.channel6} />
      <DIOField prop="Channel07" value={diStatus.channel7} />
      <DIOField prop="Channel08" value={diStatus.channel8} />
      <DIOField prop="Channel09" value={diStatus.channel9} />
      <DIOField prop="Channel10" value={diStatus.channel10} />
      <DIOField prop="Channel11" value={diStatus.channel11} />
      <DIOField prop="Channel12" value={diStatus.channel12} />
      <DIOField prop="Channel13" value={diStatus.channel13} />
      <DIOField prop="Channel14" value={diStatus.channel14} />
      <DIOField prop="Channel15" value={diStatus.channel15} />
      <DIOField prop="Channel16" value={diStatus.channel16} />
      <DIOField prop="Channel17" value={diStatus.channel17} />
      <DIOField prop="Channel18" value={diStatus.channel18} />
    </InfoContainer>
  );
};

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
      <DIOField prop="Channel01" value={doStatus.channel1} />
      <DIOField prop="Channel02" value={doStatus.channel2} />
      <DIOField prop="Channel03" value={doStatus.channel3} />
      <DIOField prop="Channel04" value={doStatus.channel4} />
      <DIOField prop="Channel05" value={doStatus.channel5} />
      <DIOField prop="Channel06" value={doStatus.channel6} />
      <DIOField prop="Channel07" value={doStatus.channel7} />
      <DIOField prop="Channel08" value={doStatus.channel8} />
      <DIOField prop="Channel09" value={doStatus.channel9} />
    </InfoContainer>
  );
};

const A2750LDInformation = ({ isPartner }) => {
  const [info, setInfo] = useState({
    operationState: "",
    productCode: "",
    serialNumber: "",
    hardwareRevision: "",
    applicationVersion: "",
    kernelVersion: "",
    bootloaderVersion: "",
    pcbVersion: "",
  });
  const channel = isPartner ? CHANNEL_LD_PARTNER_INFO : CHANNEL_LD_INFO;
  useIpcOn(channel, (evt, ...args) => {});
  return (
    <InfoContainer>
      <TitleField>Accura 2750LD {isPartner ? "(PARTNER)" : ""}</TitleField>
      <ContentField prop="operationStatus" value={info.operationState} />
      <ContentField prop="productCode" value={info.productCode} />
      <ContentField prop="serialNumber" value={info.serialNumber} />
      <ContentField prop="hardwareRevision" value={info.hardwareRevision} />
      <ContentField prop="applicationVersion" value={info.applicationVersion} />
      <ContentField prop="kernelVersion" value={info.kernelVersion} />
      <ContentField prop="bootloaderVersion" value={info.bootloaderVersion} />
      <ContentField prop="pcbVersion" value={info.pcbVersion} />
    </InfoContainer>
  );
};

const LM = () => {
  return (
    <Container>
      <A2750LMInformation></A2750LMInformation>
      <A2750LMInformation isPartner={true}></A2750LMInformation>
      <A2750LDInformation isPartner={false}></A2750LDInformation>
      <A2750LDInformation isPartner={true}></A2750LDInformation>
      <A2750LMDigitalInput></A2750LMDigitalInput>
      <A2750LMDigitalOutput></A2750LMDigitalOutput>
      <A2750LMSetup></A2750LMSetup>
    </Container>
  );
};

export default LM;
