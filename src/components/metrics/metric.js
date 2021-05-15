import { useSelector } from 'react-redux';
import { metricNiceName } from '../../lib/metrics';
import { selectRecordIds, selectMetricByRecordId } from '../../slices/records';
import DataBadge from './data-badge';

const Metric = ({ metric, showBadge }) => {
  const recordIds = useSelector(selectRecordIds);
  const metricData = useSelector(selectMetricByRecordId(recordIds[0], metric))

  return (
    <>
    <div className="ui-panel-divider mar-b-l pad-b-xl">
      <h2 className="display-3 mar-b-xs">{metricNiceName[metric]}</h2>

      <div className="text-supporting text-em mar-b-l">Lower scores best</div>
      <div className="flex gap-m">
        <div className="flex-grow">
          <h3 className="display-3">CHART</h3>
        </div>
        {showBadge && <DataBadge metric={metricData[0]}/>}
      </div>
    </div>
    </>
  );
}

export default Metric;