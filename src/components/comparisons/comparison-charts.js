import { memo } from 'react';
import { useSelector } from 'react-redux';
import ComparisonChart from './comparison-chart';
import { selectRecordIds } from '../../slices/records';

const ComparisonCharts = () => {
  const selectedMetrics = useSelector(state => state.ui.selectedMetrics);
  const selectedPage = useSelector(state => state.ui.selectedPage);
  const recordIds = useSelector(selectRecordIds);

  return (
    selectedMetrics.map(metric => (
      <ComparisonChart key={metric} metric={metric} page={selectedPage} record={recordIds[0]}/>
    ))
  );
}

export default memo(ComparisonCharts);