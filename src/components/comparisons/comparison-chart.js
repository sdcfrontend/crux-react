import { memo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { metricNiceName } from '../../lib/metrics';
import { selectCombinedComparisonsMetric } from '../../slices/comparisons';
import StackedBarChart from '../charts/stacked-bar-chart'
import BarChart from '../charts/bar-chart'

const ComparisonChart = ({ metric, page, record }) => {
  const comparisonData = useSelector(selectCombinedComparisonsMetric(metric, page, record), shallowEqual);
  const selectedMetricsType = useSelector(state => state.ui.selectedMetricsType);

  return (
    <>
    <div className="ui-panel-divider mar-b-l pad-b-xl">
      <h2 className="display-3 mar-b-xs">{metricNiceName[metric]}</h2>

      <div className="text-supporting text-em mar-b-l">Lower scores best</div>
      <div className="flex gap-m">
        <div className="flex-grow">
          {selectedMetricsType === 'GOOD_PC' && <StackedBarChart chartData={comparisonData}/>}
          {selectedMetricsType === '75_PC' && <BarChart chartData={comparisonData}/>}
        </div>
      </div>
    </div>
    </>
  );
}

export default memo(ComparisonChart);