import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const Bar = ({ labelData, bmiData }) => {
  const data = {
    labels: labelData,
    datasets: [
      {
        label: 'Bolts',
        data: bmiData,
        fill: true,
        backgroundColor: (context) => {
          const { ctx, chartArea } = context.chart;
          if (!chartArea) return '#929dd9';
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, '#929dd9');
          gradient.addColorStop(1, '#172b4d');
          return gradient;
        },
        borderColor: '#3F51B5',
        pointRadius: 6,
        pointHoverRadius: 8,
        pointHoverBorderColor: 'white',
        pointHoverBorderWidth: 2
      }
    ]
  };

  const axis = (label, extraTicks = {}) => ({
    title: {
      display: true,
      text: label,
      font: { size: 18 },
      color: 'white'
    },
    grid: { display: false, color: 'white' },
    ticks: { color: 'white', font: { size: 16 }, ...extraTicks }
  });

  const options = {
    responsive: true,
    scales: {
      x: axis('Date'),
      y: { ...axis('Bolt lengths'), beginAtZero: true }
    },
    plugins: {
      tooltip: {
        titleFont: { size: 13 },
        bodyFont: { size: 13 }
      }
    }
  };

  return <Line data={data} options={options} />;
};

Bar.propTypes = {
  labelData: PropTypes.array,
  bmiData: PropTypes.array
};

export default Bar;
