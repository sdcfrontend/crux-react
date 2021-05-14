import { useSelector, useDispatch } from 'react-redux';
import { setSelectedMetrics } from '../../slices/ui';
import { selectRecordIds, selectMetricsByRecordId } from "../../slices/records";

const Settings = () => {
  const selectedMetrics = useSelector(state => state.ui.selectedMetrics);
  const recordIds = useSelector(selectRecordIds);
  const metrics = useSelector(selectMetricsByRecordId(recordIds[0]));

  const dispatch = useDispatch();

  const handleCheck = (e) => {
    e.target.checked
      ? dispatch(setSelectedMetrics([ ...selectedMetrics, e.target.value ]))
      : dispatch(setSelectedMetrics(selectedMetrics.filter(selectedMetric => selectedMetric !== e.target.value)))
  }

  return (
    <div className="ui-panel">
      {metrics.map((metric, i) => (
        <div key={i} className="flex">
          <input onChange={handleCheck} type="checkbox" value={metric.name} checked={`${selectedMetrics.includes(metric.name) ? 'checked': ''}`}/>
          {metric.name}
        </div>
      ))}
    </div>
  );
}

export default Settings;