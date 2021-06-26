import modbus from "jsmodbus";
import net from "net";

export default function connect({ ip, port }) {
  const socket = new net.Socket();
  const client = new modbus.client.TCP(socket, 1);
  const options = { host: ip, port: port };
}
