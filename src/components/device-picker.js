const DevicePicker = ({ currentDevice, setCurrentDevice }) => {
  const handleDeviceChange = (e) => {
    setCurrentDevice(e.target.value);
  }

  return (
    <div className="ui-control-block" data-joined>
      <div className="ui-control">
        <button className={`ui-control-button${currentDevice === 'PHONE' ? ' ui-control--active' : ''}`} onClick={handleDeviceChange} value="PHONE">Mobile</button>
      </div>
      <div className="ui-control">
        <button className={`ui-control-button${currentDevice === 'DESKTOP' ? ' ui-control--active' : ''}`} onClick={handleDeviceChange} value="DESKTOP">Desktop</button>
      </div>
    </div>
  );
}

export default DevicePicker;