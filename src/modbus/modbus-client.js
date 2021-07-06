import ModbusRtu from "modbus-serial";

// Modbus 'state' constants
const MBS_STATE_INIT = "State init";
const MBS_STATE_IDLE = "State idle";
const MBS_STATE_NEXT = "State next";
const MBS_STATE_GOOD_READ = "State good (read)";
const MBS_STATE_FAIL_READ = "State fail (read)";
const MBS_STATE_GOOD_CONNECT = "State good (port)";
const MBS_STATE_FAIL_CONNECT = "State fail (port)";

let state = MBS_STATE_INIT;

export default function connect({ ip, port }) {
  const client = new ModbusRtu();

  client.setID(1);
  client.setTimeout(1000);
  client
    .connectTCP(ip, { port })
    .then(() => {
      state = MBS_STATE_GOOD_READ;
      console.log("connected!");
    })
    .catch(() => {
      state = MBS_STATE_FAIL_CONNECT;
      console.log("connection failed");
    });

  return client;
}
