import { NavLink } from 'react-router-dom'

const Tabs = () => {
  return (
    <div className="ui-control-block mar-b-s gap-xs wrap" data-tabs>
      <div className="ui-control">
        <NavLink to="/" exact className="ui-control-button display-5" activeClassName="ui-control--active">Targets</NavLink>
      </div>
      <div className="ui-control">
        <NavLink to="/compare" className="ui-control-button display-5" activeClassName="ui-control--active">Compare</NavLink>
      </div>
    </div>
  );
}

export default Tabs;