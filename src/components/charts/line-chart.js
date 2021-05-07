import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Chart, registerables } from 'chart.js';
import { chartOptions } from '../../lib/defaults';

Chart.register(...registerables);
Chart.defaults.plugins.legend.display = false;
Chart.defaults.font.size = 11;

const LineChart = ({ sitesData, labels }) => {
  const [chartInstance, setChartInstance] = useState(null);
  
  const selectedDevice = useSelector(state => state.ui.selectedDevice);

  const tooltip = useRef();
  const chart = useRef(null);

  const initialDatasets = [
    {
      label: 'Good',
      backgroundColor: '#4db04a',
      categoryPercentage: 1,
    }, {
      label: 'Average',
      backgroundColor: '#e58a2a',
      categoryPercentage: 1,
    }, {
      label: 'Bad',
      backgroundColor: '#e6191d',
      categoryPercentage: 1,
    }
  ];

  const makeScore = density => Math.floor(density * 100);

  const createDataSets = metrics => initialDatasets.map((dataset, index) => (
    {
      ...dataset,
      data: metrics.map(metric => (
        makeScore(metric[selectedDevice].histogram[index].density)
      ))
    }
  ));

  const tooltipOptions = {
    enabled: false,
    external: context => {
      const parentDims = context.chart.ctx.canvas.parentNode.getBoundingClientRect();

      tooltip.current.style.setProperty('left', `${context.tooltip.caretX - Math.abs(parentDims.left)}px`);
      tooltip.current.style.setProperty('top', `${context.tooltip.caretY}px`);
      tooltip.current.style.setProperty('opacity', context.tooltip.opacity);
      tooltip.current.innerHTML = `${context.tooltip.title}<br><b>${context.tooltip.body.reduceRight((a, b, c, d) => `${a + b.lines}, `, []).slice(0, -2)}</b>`;
    }
  };

  const config = {
    type: 'line',
    data: {
      labels,
      datasets: createDataSets(sitesData)
    },
    options: {
      ...chartOptions,
      plugins: {
        tooltip: { ...tooltipOptions }
      },
      grouped: true,
      indexAxis: 'y',
      scales: {
        x: {
          grid: {
            display: false,
          },
          stacked: true
        },
        y: {
          grid: {
            display: false
          },
          stacked: true
        }
      }
    },
  };

  useEffect(() => {
    if (!chartInstance) return;

    chartInstance.data.datasets = createDataSets(sitesData);
    chartInstance.update();
  }, [selectedDevice]);

  useEffect(() => {
    if (chartInstance) chartInstance.destroy();

    chart.current.height = 9 * config.data.labels.length;
    chart.current.width = 140;
    
    const newChartInstance = new Chart(chart.current, config);
    setChartInstance(newChartInstance);
  }, []);

  return (
    <>
    <div className="chart">
      <div ref={tooltip} className="tooltip"></div>
    
      <div className="chart-key gap-s">
        <span className="metric-good">Good (&#60;0.1)</span>
        <span className="metric-average">Average</span>
        <span className="metric-bad">Bad (&#62;0.5)</span>
      </div>

      <div className="chart-wrap">
        <div className="chart-rail">
          <div className="chart-body">
            <canvas ref={chart} width="400" height="150"/>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default LineChart;