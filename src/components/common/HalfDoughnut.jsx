import React from "react";
import PropTypes from "prop-types";
import { Doughnut } from "react-chartjs-2";

const HalfDoughnut = ({ halfDoughnut }) => {
  return (
    <React.Fragment>
      <Doughnut
        data={halfDoughnut}
        options={{
          responsive: true,
          legend: {
            display: true,
            position: "bottom",
          },
          title: {
            // display: true,
            display: false,
            text: `${halfDoughnut.title}: ${halfDoughnut.datasets[0].data[0]}%`,
            fontSize: 20,
          },
          animation: {
            animateScale: true,
            animateRotate: true,
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                let dataset = data.datasets[tooltipItem.datasetIndex];
                let total = dataset.data.reduce(function (
                  previousValue,
                  currentValue
                ) {
                  return previousValue + currentValue;
                });
                let currentValue = dataset.data[tooltipItem.index];
                let percentage = Math.floor((currentValue / total) * 100 + 0.5);
                return percentage + "%";
              },
            },
          },
          rotation: 1 * Math.PI,
          circumference: 1 * Math.PI,
        }}
      />
      <p>{`${halfDoughnut.title}: ${
        halfDoughnut.datasets[0].data[0] !== undefined
          ? `${halfDoughnut.datasets[0].data[0]} ${halfDoughnut.unit}`
          : "Không nhận được dữ liệu"
      }`}</p>
    </React.Fragment>
  );
};

HalfDoughnut.propTypes = {
  halfDoughnut: PropTypes.object.isRequired,
};

export default HalfDoughnut;
