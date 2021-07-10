import React, { useState } from "react";
import styled from "styled-components";
import useIpcOn from "../Hooks/useIpcOn";
import { CHANNEL_LM_INFO } from "../model/A2750LM.model";

const InfoContainer = styled.div`
  display: block;
`;

const DataContainer = styled.div`
  display: flex;
`;

const Label = styled.label`
  display: block;
  margin-left: 10px;
  margin-bottom: 10px;
  width: 80px;
`;

const Value = styled.label`
  color: Yellow;
  margin-left: 10px;
  margin-top: 5px;
  width: 60px;
  height: 26px;
  border: white 1px solid;
  text-align: center;
`;

const LM = () => {
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

  useIpcOn(CHANNEL_LM_INFO, (evt, ...args) => {
    setInformation(...args);
  });

  return (
    <div>
      <InfoContainer>
        <DataContainer>
          <Label>A2750LM </Label>
          <Label>Information</Label>
        </DataContainer>

        <DataContainer>
          <Label>operation state</Label>
          <Value>{information.operationState}</Value>
        </DataContainer>
        <DataContainer>
          <Label>product code</Label>
          <Value>{information.productCode}</Value>
        </DataContainer>
        <DataContainer>
          <Label>serial number</Label>
          <Value>{information.serialNumber}</Value>
        </DataContainer>
        <DataContainer>
          <Label>hardware revision</Label>
          <Value>{information.hardwareRevision}</Value>
        </DataContainer>
        <DataContainer>
          <Label>module type</Label>
          <Value>{information.moduleType}</Value>
        </DataContainer>
        <DataContainer>
          <Label>power type</Label>
          <Value>{information.powerType}</Value>
        </DataContainer>
        <DataContainer>
          <Label>pcb version</Label>
          <Value>{information.pcbVersion}</Value>
        </DataContainer>
        <DataContainer>
          <Label>application version</Label>
          <Value>{information.applicationVersion}</Value>
        </DataContainer>
        <DataContainer>
          <Label>bootloader version</Label>
          <Value>{information.bootloaderVersion}</Value>
        </DataContainer>
      </InfoContainer>
    </div>
  );
};

export default LM;
