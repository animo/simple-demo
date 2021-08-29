import { Invitation } from "./components/Invitation";
import { Credential } from "./components/Credential";
import { Home } from "./components/Home";

// Router
import { Switch, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <div>
      <Switch location={location} key={location.pathname}>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/invitation" exact>
          <Invitation />
        </Route>
        <Route path="/credential" exact>
          <Credential />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
