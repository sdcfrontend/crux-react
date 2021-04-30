import Select from './select';

const Picker = ({ sites, currentSite, setCurrentSite, pages, setPages, currentPage, setCurrentPage }) => {  
  const handleSiteChange = (e) => {
    const nextSite = sites.find(site => site._id === e.target.value);

    setCurrentSite(nextSite);
    setPages(nextSite.pages);
    setCurrentPage(nextSite.pages[0]);
  }

  const handlePageChange = (e) => {
    const nextPage = pages.find(page => page._id === e.target.value);
    console.log(nextPage)
    setCurrentPage(nextPage);
  }

  return (
    <div className="ui-control ui-control--tight">
      <Select
        options={sites}
        label="name"
        value="_id"
        currentValue={currentSite?._id}
        handler={handleSiteChange}
      />

      <div className="ui-control-divider">/</div>

      <Select
        options={pages}
        label="name"
        value="_id"
        currentValue={currentPage?._id}
        handler={handlePageChange}
      />
    </div>
  );
}

export default Picker;