import Select from './select';

const Picker = ({ sites, currentSite, setCurrentSite, pages, currentPage, setCurrentPage, requestBody, setRequestBody }) => {  
  const handleSiteChange = (e) => {
    const nextSite = sites.find(site => site._id === e.target.value);

    setCurrentSite(nextSite);
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

  const siteNames = sites.map(site => site.name);
  const pageNames = pages.map(page => page.name);

  console.log(siteNames, pageNames)

  return (
    <div className="ui-control ui-control--tight">
      <Select
        options={sites}
        label="name"
        value="_id"
        currentValue={currentSite?.id}
        handler={handleSiteChange}
      />
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