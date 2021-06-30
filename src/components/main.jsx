import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import { isNotEmpty, isNumber } from "./../utils/validate";
import HalfDoughnut from "./common/HalfDoughnut";
import CustomButton from "./common/customButton";
import config from "../services/config.json";
import fakeData from "../services/fakeData.json";
// import http from "../services/httpService";
import socket from "../services/socketService";
import "react-toastify/dist/ReactToastify.css";
import "./css/main.css";

class Main extends Component {
  state = {
    sensors: {
      temperature: {
        id: "temperature",
        title: "Nhiệt độ",
        unit: "độ C",
        datasets: [
          {
            backgroundColor: ["#ff7979"],
            hoverBackgroundColor: ["#eb4d4b"],
            data: [], //  format - data: [60, 40],
          },
        ],
      },
      soilMoisture: {
        id: "soilMoisture",
        title: "Độ ẩm đất",
        unit: "%",
        datasets: [
          {
            backgroundColor: ["#ffbe76"],
            hoverBackgroundColor: ["#f0932b"],
            data: [], //  format - data: [60, 40],
          },
        ],
      },
      humidity: {
        id: "humidity",
        title: "Độ ẩm không khí",
        unit: "%",
        datasets: [
          {
            backgroundColor: ["#7ed6df"],
            hoverBackgroundColor: ["#22a6b3"],
            data: [], //  format - data: [60, 40],
          },
        ],
      },
    },

    customButton: {
      id: "pumpWater",
      label: "Bơm nước",
      isActive: false,
    },
  };

  componentDidMount() {
    // data = await (await http.get(config.apiEndpoint)).data;
    // Fetching data from Server by using socket
    // console.log(0);
    // socket.get(config.apiEndpoint, (responseData) => {
    //   console.log(1);
    //   console.log(responseData);
    //   // if (!isNotEmpty(responseData)) {
    //   //   toast.error("Error: Data is empty");
    //   //   responseData = fakeData;
    //   // }
    //   // if (!isNumber(responseData)) {
    //   //   toast.error("Error: Data is not a number (default valid format)");
    //   //   responseData = fakeData;
    //   // }

    //   // const responseKeys = Object.keys(responseData);
    //   // const responseValues = Object.values(responseData);
    //   // const stateValues = Object.values(this.state);
    //   // for (let i = 0; i < responseKeys.length; i++) {
    //   //   for (let j = 0; j < stateValues.length; j++) {
    //   //     if (stateValues[j].id === responseKeys[i]) {
    //   //       stateValues[j].datasets[0].data[0] = responseValues[i];
    //   //       stateValues[j].datasets[0].data[1] = 100 - responseValues[i];
    //   //     }
    //   //   }
    //   // }

    //   // const propValues = Object.values(responseData);
    //   // const halfDoughnuts = [...this.state.halfDoughnuts];
    //   // halfDoughnuts.forEach((element, index) => {
    //   //   element.datasets[0].data[0] = propValues[index];
    //   //   element.datasets[0].data[1] = 100 - propValues[index];
    //   // });
    // });
    setInterval(() => {
      axios.get("http://192.168.2.100:3001/api/sensors").then(({ data }) => {
        const sensors = { ...this.state.sensors };
        sensors.temperature.datasets[0].data[0] = data.temperature;
        sensors.temperature.datasets[0].data[1] = 100 - data.temperature;

        sensors.humidity.datasets[0].data[0] = data.humidity;
        sensors.humidity.datasets[0].data[1] = 100 - data.humidity;

        const soilMoisture = data.soil_moisture.toFixed(2);
        sensors.soilMoisture.datasets[0].data[0] = soilMoisture;
        sensors.soilMoisture.datasets[0].data[1] = 100 - soilMoisture;

        this.setState({ sensors });
      });
    }, 5000);
  }

  handlePump = async () => {
    // Button auto change to backgroundColor = green when clicked
    const customButton = { ...this.state.customButton };
    if (customButton.isActive) {
      await axios.get("http://192.168.2.100:3001/api/pumpWater?mode=off");
    } else {
      await axios.get("http://192.168.2.100:3001/api/pumpWater?mode=on");
    }

    customButton.isActive = !customButton.isActive;
    this.setState({ customButton });
  };

  render() {
    const { sensors, customButton } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <div className="container-fluid text-center">
          <div className="row">
            <div className="col-12 my-3">
              <h1>Vườn thông minh</h1>
            </div>
            <div className="col-12 container__data">
              <div className="row">
                <div className="col-4">
                  <HalfDoughnut halfDoughnut={sensors.temperature} />
                </div>
                <div className="col-4">
                  <HalfDoughnut halfDoughnut={sensors.humidity} />
                </div>
                <div className="col-4">
                  <HalfDoughnut halfDoughnut={sensors.soilMoisture} />
                </div>
              </div>
            </div>
            <div className="col-12 container__button">
              <div className="row">
                <div className="col-12">
                  <CustomButton
                    customButton={customButton}
                    onClick={this.handlePump}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Main;
