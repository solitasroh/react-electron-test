import React from "react";
import styled from "styled-components";
const { ipcRenderer } = window.require("electron");

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

const fetchLMInfo = () => {
  ipcRenderer.on("FETCH_LM_INFO", (evt, args) => {});
  ipcRenderer.send("REQ_FETCH_LM_INFO");
};

export default function A2750LM() {
  fetchLMInfo();

  const lm_product_info = {
    operationState: "Operation",
    ProductCode: "1",
    serialNumber: "102010",
    hardwareRevision: 1,
    moduleType: 2,
    powerType: 3,
    pcbVersion: 1,
    applicationVersion: 10100,
    bootloaderVersion: 10100,
  };

  return (
    <div>
      <InfoContainer>
        <DataContainer>
          <Label>A2750LM </Label>
          <Label>Information</Label>
        </DataContainer>

        <DataContainer>
          <Label>operation state</Label>
          <Value>{lm_product_info.operationState}</Value>
        </DataContainer>
        <DataContainer>
          <Label>product code</Label>
          <Value>{lm_product_info.ProductCode}</Value>
        </DataContainer>
        <DataContainer>
          <Label>serial number</Label>
          <Value>{lm_product_info.serialNumber}</Value>
        </DataContainer>
        <DataContainer>
          <Label>hardware revision</Label>
          <Value>{lm_product_info.hardwareRevision}</Value>
        </DataContainer>
        <DataContainer>
          <Label>module type</Label>
          <Value>{lm_product_info.moduleType}</Value>
        </DataContainer>
        <DataContainer>
          <Label>power type</Label>
          <Value>{lm_product_info.powerType}</Value>
        </DataContainer>
        <DataContainer>
          <Label>pcb version</Label>
          <Value>{lm_product_info.pcbVersion}</Value>
        </DataContainer>
        <DataContainer>
          <Label>application version</Label>
          <Value>{lm_product_info.applicationVersion}</Value>
        </DataContainer>
        <DataContainer>
          <Label>bootloader version</Label>
          <Value>{lm_product_info.bootloaderVersion}</Value>
        </DataContainer>
      </InfoContainer>
    </div>
  );
}
