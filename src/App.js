import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import defaults from './lib/defaults';
import transformRecords from './lib/transform-records';

import Targets from './pages/targets';
import Compare from './pages/compare';
import NotFound from './pages/not-found';

import Header from './components/header';
import Tabs from './components/tabs';
import Settings from './components/settings';

function App() {
  const [pagesLoading, setPagesLoading] = useState(true);
  const [sites, setSites] = useState([]);
  const [currentSite, setCurrentSite] = useState();
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(false);
  const [currentDevice, setCurrentDevice] = useState(defaults.currentDevice);
  const [chosenMetrics, setChosenMetrics] = useState(defaults.chosenMetrics);
  const [metrics, setMetrics] = useState([]);
  const [metricsLoading, setMetricsLoading] = useState(true);

  useEffect(() => {
    const loadSites = async () => {
      setPagesLoading(true);

      const response = await fetch(`http://localhost:4000/sites`);
      // const response = await fetch('./data/sites.json');
      const data = await response.json();

      setPagesLoading(false);
      setSites(data);
      setCurrentSite(data[0]);
      setPages(data[0].pages);
      setCurrentPage(data[0].pages[0]);
    }

    try {
      loadSites();
    }

    catch (error) {
      setPagesLoading(false);

      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (!currentPage) return;

    const loadSites = async () => {
      setMetricsLoading(true);

      const response = await fetch(`http://localhost:4000/records/${currentPage._id}`);
      const data = await response.json();

      console.log(data)
      transformRecords(data, currentDevice);

      setMetricsLoading(false);
      setMetrics(data[0].devices[currentDevice]);
    }

    try {
      loadSites();
    }

    catch (error) {
      setMetricsLoading(false);

      console.log(error);
    }
  }, [currentPage]);

  return (
    <>
    <Header
      sites={sites}
      currentSite={currentSite}
      setCurrentSite={setCurrentSite}
      pages={pages}
      setPages={setPages}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      currentDevice={currentDevice}
      setCurrentDevice={setCurrentDevice}
    />

    <Router>
        <Tabs/>
        <div className="wrap">
          <div className="flex-col gap-m mar-b-xl ui-panel">
            {pagesLoading
              ? <h4>Loading...</h4>
              : <Switch>
                  <Route path="/" exact>
                    <Targets
                      metrics={metrics}
                      chosenMetrics={chosenMetrics}
                      metricsLoading={metricsLoading}
                    />
                  </Route>
                  <Route path="/compare">
                    <Compare
                      metrics={metrics}
                      chosenMetrics={chosenMetrics}
                      metricsLoading={metricsLoading}
                    />
                  </Route>
                  <Route component={NotFound} />
                </Switch>
            }
          </div>
        </div>
    </Router>
        
    <Settings
      metrics={metrics}
      chosenMetrics={chosenMetrics}
      setChosenMetrics={setChosenMetrics}
    />
    </>
  );
}

export default App;
