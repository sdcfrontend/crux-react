import { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedMetricsType } from "../../slices/ui";

const MetricsTypePicker = () => {
  const selectedMetricsType = useSelector(state => state.ui.selectedMetricsType);

  const dispatch = useDispatch();

  const handleMetricsTypeChange = (e) => {
    dispatch(setSelectedMetricsType(e.target.value));
  }

  return (
    <div className="ui-control-block flex flex-h-end" data-joined>
      <div className="ui-control text-s">
          <button className={`ui-control-button${selectedMetricsType === 'GOOD_PC' ? ' ui-control--active' : ''}`} onClick={handleMetricsTypeChange} value="GOOD_PC">% in good category</button>
      </div>
      <div className="ui-control text-s">
          <button className={`ui-control-button${selectedMetricsType === '75_PC' ? ' ui-control--active' : ''}`} onClick={handleMetricsTypeChange} value="75_PC">Score at 75pc</button>
      </div>
    </div>
  );
}

export default memo(MetricsTypePicker);