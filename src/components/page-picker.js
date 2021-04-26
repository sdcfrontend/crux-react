import Select from './select';

const Picker = ({ sites, currentSite, setCurrentSite, pages, currentPage, setCurrentPage, currentDevice, setCurrentDevice, requestBody, setRequestBody }) => {  
  const handleSiteChange = (e) => {
    const nextSite = sites.find(site => site.id === e.target.value);

    setCurrentSite(nextSite);
    setRequestBody({
      ...requestBody,
      origin: nextSite.pages[0]
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
        value="id"
        currentValue={currentSite?.id}
        handler={handleSiteChange}
      />
      <Select
        options={pages}
        currentValue={currentPage}
        handler={handlePageChange}
      />
    </div>
  );
}

export default Picker;