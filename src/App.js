import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { fetchRecords } from "./slices/records";

import Targets from './pages/targets';
import Compare from './pages/compare';
import NotFound from './pages/not-found';

import Header from './components/header';
import Tabs from './components/tabs';
import Metrics from './components/metrics';
import Settings from './components/settings';

function App() {
  const sitesLoading = useSelector(state => state.sites.loading)
  const selectedPage = useSelector(state => state.ui.selectedPage)

  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedPage) return;

    dispatch(fetchRecords(selectedPage));
  }, [selectedPage]);

  return (
    <>
    <Header/>

    <Router>
        <Tabs/>
        <div className="wrap">
          <div className="flex-col gap-m mar-b-xl ui-panel">
            <Switch>
              <Route path="/" exact>
                <Targets/>
              </Route>
              <Route path="/compare">
                <Compare/>
              </Route>
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
    </Router>
        
    <Settings/>
    </>
  );
}

export default App;
