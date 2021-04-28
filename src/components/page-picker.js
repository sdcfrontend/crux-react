import Select from './select';

const Picker = ({ sites, currentSite, setCurrentSite, pages, setPages, currentPage, setCurrentPage, requestBody, setRequestBody }) => {  
  const handleSiteChange = (e) => {
    const nextSite = sites.find(site => site._id === e.target.value);

    setCurrentSite(nextSite);
    setPages(nextSite.pages);
    setRequestBody({
      ...requestBody,
      origin: nextSite.pages[0].url
    })
  }

  const handlePageChange = (e) => {
    setCurrentPage(e.target.value);
    setRequestBody({
      ...requestBody,
      origin: e.target.value
    })
  }

  return (
    <div className="ui-control ui-control--tight">
      <Select
        options={sites}
        label="name"
        value="_id"
        currentValue={currentSite?.id}
        handler={handleSiteChange}
      />

      <div className="ui-control-divider">/</div>

      <Select
        options={pages}
        label="name"
        value="url"
        currentValue={currentPage}
        handler={handlePageChange}
      />
    </div>
  );
}

export default Picker;