import React, {useState} from 'react';
import useIpcOn from '../Hooks/useIpcOn';
import { ContentBox, ContentField, TitleLabel } from '../components/ContentField';
import { CHANNEL_LM_INFO, CHANNEL_LM_PARTNER_INFO } from '../model/A2750LM.model';

const A2750LMInformation = (partner) => {
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
      <ContentBox>
        <TitleLabel>Accura 2750LM {partner ? "(PARTNER)" : ""}</TitleLabel>
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
      </ContentBox>
    );
  };

  export default A2750LMInformation;