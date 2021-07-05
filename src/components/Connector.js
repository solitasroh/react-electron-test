import React from "react";
const { ipcRenderer } = window.require("electron");
export default function Connector() {
  const payload = "message";

  const handleSubmit = (event) => {
    event.preventDefault();
    // ipcRenderer에서의 이벤트 송신
    ipcRenderer.send("CONNECT", payload);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="IP" />
        <input type="submit" value="connect" />
      </form>
    </div>
  );
}
