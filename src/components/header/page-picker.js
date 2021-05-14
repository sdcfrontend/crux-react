import { useState, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedSite, setSelectedPage } from "../../slices/ui";
import { selectAllSites, selectPagesBySiteId } from "../../slices/sites";

import Select from '../ui/select'

const Picker = () => {
  const [pagesDefault, setPagesDefault] = useState('Select a site');
  const sites = useSelector(selectAllSites);
  const selectedSite = useSelector(state => state.ui.selectedSite);
  const pages = useSelector(selectPagesBySiteId(selectedSite));
  const selectedPage = useSelector(state => state.ui.selectedPage);

  const dispatch = useDispatch();

  const handleSiteChange = (e) => {
    const nextSite = sites.find(site => site._id === e.target.value);

    dispatch(setSelectedSite(nextSite._id));
    setPagesDefault('Select a page');
  }

  const handlePageChange = (e) => {
    const nextPage = pages.find(page => page._id === e.target.value);

    dispatch(setSelectedPage(nextPage._id));
  }

  return (
    <div className="ui-control ui-control--tight">
      <Select
        options={sites}
        label="name"
        value="_id"
        defaultOption="Sites"
        currentValue={selectedSite}
        handler={handleSiteChange}
      />

      <div className="ui-control-divider">/</div>

      <Select
        options={pages}
        label="name"
        value="_id"
        defaultOption={pagesDefault}
        currentValue={selectedPage}
        handler={handlePageChange}
      />
    </div>
  )
}

export default memo(Picker)