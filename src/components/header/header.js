import { useSelector } from 'react-redux';
import PagePicker from './page-picker';
import IconOverlay from '../ui/icon-overlay';
import FormFactorPicker from './form-factor-picker';

const Header = () => {
  const sitesLoading = useSelector(state => state.sites.loading);

  const handleClearClick = () => {
    console.log('Cleared')
    window.localStorage.removeItem('crux_root');
  }

  return (
    <div className="header theme-dark mar-b-xl pad-v-l pos-rel">
      <IconOverlay icon="loading" iconAnimation="spin" iconFill="white" overlayBg="var(--shade-5)" showWhen={sitesLoading}/>

      <div className="wrap">

        <h1 className="display-1 mar-b-s">Performance Dashboard</h1>
        <p className="text-label mar-b-xs">Select a url:</p>
        <div className="ui-control-block">
          <PagePicker/>

          <FormFactorPicker/>

          <div className="ui-control">
            <button className="ui-control-button" onClick={handleClearClick}>Clear History</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;