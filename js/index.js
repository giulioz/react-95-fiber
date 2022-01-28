const SerialPort = require("serialport");
const Delimiter = require("@serialport/parser-delimiter");

const port = new SerialPort("/dev/ttys008");
const parser = new Delimiter({ delimiter: "\f" });
port.pipe(parser);

parser.on("data", (data) => {
  const text = data.toString("utf-8");
  console.log(text, data);
});

// port.write(process.argv[2], "ascii");

function setWindowSize(x, y, w, h) {
  port.write(`setWindowSize|${x}|${y}|${w}|${h}`, "ascii");
}
// setWindowSize(0, 0, 256, 256);

function addButton(text, x, y, w, h, id) {
  port.write(`addButton|${text}|${x}|${y}|${w}|${h}|${id}`, "ascii");
}
addButton("Test ABC", 10, 10, 50, 30, 3);
