const DevicePicker = ({ currentDevice, setCurrentDevice, requestBody, setRequestBody }) => {
  const handleDeviceChange = (e) => {
    setCurrentDevice(e.target.value);
    setRequestBody({
      ...requestBody,
      formFactor: e.target.value
    })
  }

  return (
    <div className="ui-control-block" data-joined>
      <div class="ui-control">
        <button className="ui-control-button" onClick={handleDeviceChange} value="PHONE" data-active={currentDevice === 'PHONE'}>Mobile</button>
      </div>
      <div class="ui-control">
        <button className="ui-control-button" onClick={handleDeviceChange} value="DESKTOP" data-active={currentDevice === 'DESKTOP'}>Desktop</button>
      </div>
    </div>
  );
}

export default DevicePicker;