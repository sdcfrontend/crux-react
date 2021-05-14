import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { maybeFetchRecords } from './slices/records';
import Targets from './pages/targets';
import Compare from './pages/compare';
import NotFound from './pages/not-found';
import Header from './components/header/header';
import Tabs from './components/ui/tabs';
import Settings from './components/ui/settings';

function App() {
  const selectedPage = useSelector(state => state.ui.selectedPage);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(maybeFetchRecords(selectedPage));
  }, [selectedPage])

  return (
    <>
      <Header/>

      { selectedPage
        ? <>
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
        : ''
      }
    </>
  );
}

export default App;
