import PagePicker from './page-picker';
import DevicePicker from './device-picker';

const Header = ({ sites, currentSite, setCurrentSite, pages, setPages, currentPage, setCurrentPage, requestBody, setRequestBody, currentDevice, setCurrentDevice }) => {
  return (
    <div className="header mar-xl">
        <div className="wrap wrap-padding">
            <h1>Performance Dashboard</h1>
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

              <div className="ui-control-divider"></div>


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