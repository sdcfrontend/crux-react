import { useState, useEffect, useRef, memo } from 'react';
import { useSelector } from 'react-redux';
import { Chart, registerables } from 'chart.js';
import { chartOptions } from '../../lib/defaults';

Chart.register(...registerables);
Chart.defaults.plugins.legend.display = false;
Chart.defaults.font.size = 11;

const BarChart = ({ chartData }) => {
  console.log('chart')
  const [chartInstance, setChartInstance] = useState(null);
  
  const selectedFormFactor = useSelector(state => state.ui.selectedFormFactor);

  const tooltip = useRef();
  const chart = useRef(null);

  const initialDatasetObject = {
    label: 'Good',
    backgroundColor: '#4db04a',
    categoryPercentage: 1,
  };

  const createDataSets = pages => pages.map(page => (
    {
      ...initialDatasetObject,
      data: [page[selectedFormFactor].percentiles.p75]
    }
  ))

  const createLabels = sites => sites.map(site => site.url);

  const tooltipOptions = {
    enabled: false,
    external: context => {
      tooltip.current.style.setProperty('left', `${context.tooltip.caretX}px`);
      tooltip.current.style.setProperty('top', `${context.tooltip.caretY}px`);
      tooltip.current.style.setProperty('opacity', context.tooltip.opacity);
      tooltip.current.innerHTML = `${context.tooltip.title}<br><b>${context.tooltip.body.reduceRight((a, b) => `${a + b.lines}, `, []).slice(0, -2)}</b>`;
    }
  };

  const config = {
    type: 'bar',
    data: {
      labels: createLabels(chartData),
      datasets: createDataSets(chartData)
    },
    options: {
      ...chartOptions,
      plugins: {
        tooltip: { ...tooltipOptions }
      },
      grouped: false,
      indexAxis: 'y',
      scales: {
        x: {
          grid: {
            display: false,
          },
          stacked: false
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

    chartInstance.data.datasets = createDataSets(chartData);
    chartInstance.update();
  }, [selectedFormFactor]);

  useEffect(() => {
    if (chartInstance) chartInstance.destroy();

    chart.current.height = 9 * config.data.labels.length;
    chart.current.width = 140;
    
    const newChartInstance = new Chart(chart.current, config);
    setChartInstance(newChartInstance);
  }, [chartData]);

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

export default memo(BarChart);