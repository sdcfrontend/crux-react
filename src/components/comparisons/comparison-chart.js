import { memo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { metricNiceName } from '../../lib/metrics';
import { selectCombinedComparisonsMetric } from '../../slices/comparisons';

import StackedBarChart from '../charts/stacked-bar-chart'

const ComparisonChart = ({ metric, page, record }) => {
  const comparisonData = useSelector(selectCombinedComparisonsMetric(metric, page, record), shallowEqual);
  console.log('rendering chart')

  return (
    <>
    <div className="ui-panel-divider mar-b-l pad-b-xl">
      <h2 className="display-3 mar-b-xs">{metricNiceName[metric]}</h2>

      <div className="text-supporting text-em mar-b-l">Lower scores best</div>
      <div className="flex gap-m">
        <div className="flex-grow">
          <StackedBarChart chartData={comparisonData}/>
        </div>
      </div>
    </div>
    </>
  );
}

export default memo(ComparisonChart);