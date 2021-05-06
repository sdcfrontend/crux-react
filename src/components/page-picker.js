import { useSelector, useDispatch } from 'react-redux';
import { setSelectedSite, setSelectedPage } from "../slices/ui";
import { selectAllSites, selectPagesBySiteId } from "../slices/sites";

import Select from './select'

const Picker = () => {
  const sites = useSelector(selectAllSites);
  const selectedSite = useSelector(state => state.ui.selectedSite);
  const pages = useSelector(selectPagesBySiteId(selectedSite));
  const selectedPage = useSelector(state => state.ui.selectedPage);

  const dispatch = useDispatch();

  const handleSiteChange = (e) => {
    const nextSite = sites.find(site => site._id === e.target.value);
    console.log(nextSite)

    dispatch(setSelectedSite(nextSite._id))
    dispatch(setSelectedPage(nextSite?.pages[0]))
  }

  const handlePageChange = (e) => {
    const nextPage = pages.find(page => page._id === e.target.value)

    dispatch(setSelectedPage(nextPage._id))
  }

  return (
    <div className="ui-control ui-control--tight">
      <Select
        options={sites}
        label="name"
        value="_id"
        currentValue={selectedSite}
        handler={handleSiteChange}
      />

      <div className="ui-control-divider">/</div>

      <Select
        options={pages}
        label="name"
        value="_id"
        currentValue={selectedPage}
        handler={handlePageChange}
      />
    </div>
  )
}

export default Picker