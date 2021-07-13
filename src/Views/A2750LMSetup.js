import React from "react";
import styled from "styled-components";
import { ContentBox } from "../components/ContentField";

const FormBox = styled.form`
  display: inline-block;
  flex-direction: column;
  justify-content: right;
  background-color: white;
  align-items: baseline;
  margin: 10px;
  border-radius: 5px;
  padding: 10px;
`;
const Label = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  color: grey;
  width: 100px;
  height: 24px;
  padding-left: 1px;
  font-size: 10px;
`;
const Container = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 5px;
  border-bottom: 0.5px solid rgba(100, 100, 100, 0.2);
`;
const SubmitContainer = styled.div`
  display: flex;

  justify-content: right;
  align-items: flex-end;
  padding: 5px;
  border-bottom: 0.5px solid rgba(100, 100, 100, 0.2);
`;
const Select = styled.select`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  width: 100px;
  height: 24px;
  font-weight: ${(props) => (props.priority === "high" ? 600 : 400)};
  color: ${(props) => (props.invalid ? "red" : "rgba(10,10,10,1)")};
  border: 0px;
`;

const Apply = styled.input.attrs("submit")`
  margin: 5px;
  display: inline-block;
  justify-content: center;
`;

function A2750LMSetup() {
  return (
    <FormBox>
      <Container>
        <Label>operation mode</Label>
        <Select>
          <option value="1">StandAlone</option>
          <option value="2">2-active</option>
        </Select>
      </Container>
      <Container>
        <Label>digital operation</Label>
        <Select>
          <option value="1">AND</option>
          <option value="2">OR </option>
        </Select>
      </Container>
      <Container>
        <Label>analog deadband</Label>
        <input type="text"></input>
      </Container>
      <Container>
        <Label>alarm threshold</Label>
        <input type="text"></input>
      </Container>
      <SubmitContainer>
        <Apply type="submit" value="submit"></Apply>
      </SubmitContainer>
    </FormBox>
  );
}

export default A2750LMSetup;
