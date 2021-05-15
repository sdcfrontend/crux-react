import { memo } from 'react';
import ComparisonCharts from '../components/comparisons/comparison-charts';
import ComparisonControls from '../components/comparisons/comparison-controls';
import MetricsTypePicker from '../components/metrics/metrics-type-picker';

const Compare = () => {
  return (
    <>
      <MetricsTypePicker/>

      <div className="layout-main gap-l">
        <div className="layout-main-body">
          <ComparisonCharts/>
        </div>

        <div className="layout-main-side pad-l-m">
          <ComparisonControls/>
        </div>
      </div>
    </>
  );
}

export default memo(Compare);