import { useSelector, useDispatch } from 'react-redux';
import { setSelectedDevice } from "../slices/ui";

const DevicePicker = () => {
  const selectedDevice = useSelector(state => state.ui.selectedDevice);

  const dispatch = useDispatch();

  const handleDeviceChange = (e) => {
    dispatch(setSelectedDevice(e.target.value));
  }

  return (
    <div className="ui-control-block" data-joined>
      <div className="ui-control">
        <button className={`ui-control-button${selectedDevice === 'PHONE' ? ' ui-control--active' : ''}`} onClick={handleDeviceChange} value="PHONE">Mobile</button>
      </div>
      <div className="ui-control">
        <button className={`ui-control-button${selectedDevice === 'DESKTOP' ? ' ui-control--active' : ''}`} onClick={handleDeviceChange} value="DESKTOP">Desktop</button>
      </div>
    </div>
  );
}

export default DevicePicker;