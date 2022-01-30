const SerialPort = require("serialport");
const Delimiter = require("@serialport/parser-delimiter");

const port = new SerialPort("/dev/ttys014");
port.on("data", console.log);

const parser = new Delimiter({ delimiter: "\r" });
port.pipe(parser);

parser.on("data", (data) => {
  const text = data.toString("utf-8");
  console.log(text, data);
});

function setMousePos(x, y) {
  port.write(`mp|${x}|${y}\r`, "ascii");
}

function setWindowSize(id, x, y, w, h) {
  port.write(`setWSize|${id}|${x}|${y}|${w}|${h}\r`, "ascii");
}

function addChildWindow(id, type, text, x, y, w, h, eventId) {
  port.write(
    `addChildW|${id}|${type}|${text}|${x}|${y}|${w}|${h}|${eventId}\r`,
    "ascii"
  );
}

function setWindowText(id, text) {
  port.write(`setWText|${id}|${text}\r`, "ascii");
}

// setWindowSize(0, 20, 20, 10, 10);

// addChildWindow(5, "Button", "Test ABC", 10, 10, 50, 30, 3);

// addChildWindow(5, "Static", "0", 10, 10, 70, 20, 3);
// setWindowText(5, "AAA");

let t = 0;
setInterval(() => {
  setWindowText(5, t);
  t++;
}, 10);

// setMousePos(0, 0);

// let t = 0;
// setInterval(() => {
//   const x = 640 / 2 + Math.cos(t) * 200;
//   const y = 480 / 2 + Math.sin(t) * 200;
//   setMousePos(Math.round(x), Math.round(y));
//   t += 0.1;
// }, 10);
