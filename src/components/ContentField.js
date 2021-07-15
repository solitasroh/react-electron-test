import React from "react";
import styled from "styled-components";
import { CHANNEL_LM_DO_COMMAND } from "../model/A2750LM.model";
const { ipcRenderer } = window.require("electron");

export const ContentBox = styled.div`
  display: inline-block;
  justify-content: left;
  background-color: white;
  align-items: baseline;
  margin: 10px;
  border-radius: 5px;
  padding: 10px;
`;

export const TitleLabel = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  color: rgba(10, 10, 10, 0.8);
  font-weight: 600;
  font-size: 14px;
`;

const Container = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 5px;
  border-bottom: 0.5px solid rgba(100, 100, 100, 0.2);
`;



const Title = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  color: grey;
  width: 100px;
  height: 24px;
  padding-left: 1px;
  font-size: 10px;
`;

const Value = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  width: 100px;
  height: 24px;
  font-weight: ${(props) => (props.priority === "high" ? 600 : 400)};
  color: ${(props) => (props.invalid ? "red" : "rgba(10,10,10,1)")};
`;

const DIValue = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  width: 100px;
  height: 24px;
  font-weight: ${(props) => (props.priority === "high" ? 600 : 400)};
  color: ${(props) => (props.on ? "rgba(104,212,109,1.0)" : "grey")};
`;

const ContentField = ({ prop, value, invalid, priority }) => {
  return (
    <Container>
      <Title>{prop}</Title>
      <Value invalid={invalid} priority={priority}>
        {value}
      </Value>
    </Container>
  );
};

const DIOField = ({ ch, value, on, priority }) => {
  const setCommand = () => {
    console.log(`command = ${ch}`);

    const data = {
      ch,
      value: value === "Close" ? 0 : 1,
    };

    ipcRenderer.send(CHANNEL_LM_DO_COMMAND, data);
  };
  return (
    <Container>
      <Title>channel {ch}</Title>
      <DIValue on={value === "Energized" || value === "Close"} priority="high">
        {value}
      </DIValue>
      <button onClick={setCommand}>set</button>
    </Container>
  );
};

export { ContentField, DIOField };
