import PagePicker from './page-picker';
import DevicePicker from './device-picker';

const Header = () => {
  return (
    <div className="header theme-dark mar-b-xl pad-v-l">
      <div className="wrap">

        <h1 className="display-1 mar-b-s">Performance Dashboard</h1>
        <p className="text-label mar-b-xs">Select a url:</p>
        <div className="ui-control-block">
          <PagePicker/>

          <DevicePicker/>
        </div>
      </div>
    </div>
  );
}

export default Header;