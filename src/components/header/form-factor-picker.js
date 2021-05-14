import { useSelector, useDispatch } from 'react-redux';
import { setSelectedFormFactor } from "../../slices/ui";

const FormFactorPicker = () => {
  const selectedFormFactor = useSelector(state => state.ui.selectedFormFactor);

  const dispatch = useDispatch();

  const handleFormFactorChange = (e) => {
    dispatch(setSelectedFormFactor(e.target.value));
  }

  return (
    <div className="ui-control-block" data-joined>
      <div className="ui-control">
        <button className={`ui-control-button${selectedFormFactor === 'PHONE' ? ' ui-control--active' : ''}`} onClick={handleFormFactorChange} value="PHONE">Mobile</button>
      </div>
      <div className="ui-control">
        <button className={`ui-control-button${selectedFormFactor === 'DESKTOP' ? ' ui-control--active' : ''}`} onClick={handleFormFactorChange} value="DESKTOP">Desktop</button>
      </div>
    </div>
  );
}

export default FormFactorPicker;