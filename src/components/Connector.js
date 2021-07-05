import React, { useState } from "react";
const { ipcRenderer } = window.require("electron");
export default function Connector() {
  const payload = "message";
  const [ip, setIp] = useState("0.0.0.0");
  const handleIPChange = ({ target: { value } }) => setIp(value);

  const handleSubmit = (event) => {
    event.preventDefault();
    // ipcRenderer에서의 이벤트 송신
    ipcRenderer.send("CONNECT", ip);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="IP" value={ip} onChange={handleIPChange} />
        <input type="submit" value="connect" />
      </form>
    </div>
  );
}
