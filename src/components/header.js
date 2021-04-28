import PagePicker from './page-picker';
import DevicePicker from './device-picker';

const Header = ({ sites, currentSite, setCurrentSite, pages, setPages, currentPage, setCurrentPage, requestBody, setRequestBody, currentDevice, setCurrentDevice }) => {
  return (
    <div className="header theme-dark mar-b-xl pad-v-l">
      <div className="wrap">

        <h1 class="display-1 mar-b-s">Performance Dashboard</h1>
        <p class="text-label mar-b-xs">Select a url:</p>
        <div className="ui-control-block">
          <PagePicker
            sites={sites}
            currentSite={currentSite}
            setCurrentSite={setCurrentSite}
            pages={pages}
            setPages={setPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            requestBody={requestBody}
            setRequestBody={setRequestBody}
          />

          <DevicePicker
            currentDevice={currentDevice}
            setCurrentDevice={setCurrentDevice}
            requestBody={requestBody}
            setRequestBody={setRequestBody}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;