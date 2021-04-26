const DevicePicker = ({ currentDevice, setCurrentDevice, requestBody, setRequestBody }) => {
  const handleDeviceChange = (e) => {
    setCurrentDevice(e.target.value);
    setRequestBody({
      ...requestBody,
      formFactor: e.target.value
    })
  }

  return (
    <div className="ui-control">
      <button className="ui-control-button" onClick={handleDeviceChange} value="ALL_FORM_FACTORS" disabled={currentDevice === 'ALL_FORM_FACTORS'}>All</button>
      <button className="ui-control-button" onClick={handleDeviceChange} value="PHONE" disabled={currentDevice === 'PHONE'}>Phone</button>
      <button className="ui-control-button" onClick={handleDeviceChange} value="DESKTOP" disabled={currentDevice === 'DESKTOP'}>Desktop</button>
      <button className="ui-control-button" onClick={handleDeviceChange} value="TABLET" disabled={currentDevice === 'TABLET'}>Tablet</button>
    </div>
  );
}

export default DevicePicker;