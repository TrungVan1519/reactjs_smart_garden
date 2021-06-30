import socketIOClient from "socket.io-client";

const getSocketData = (apiEndpoint, callback) => {
  const socket = socketIOClient(apiEndpoint);

  // socket.emit("returnSensorsData");
  socket.on("returnSensorsData", (response) => {
    console.log(1);
    callback(response.data);
  });
};

const pumpWaterRequest = (apiEndpoint, callback) => {
  const socket = socketIOClient(apiEndpoint);

  socket.emit("pumpWaterRequest");
  socket.once("pumpWaterResponse", (response) => callback(response.data));
};

export default {
  get: getSocketData,
  pumpWater: pumpWaterRequest,
};
