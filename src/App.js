import { Component } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./main/main";
import Login from "./Login/Login";
import NotFound from "./NotFound/NotFound";
import Learning from "./Components/Learning/Learning";
class App extends Component {
  
  render() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" exact component={Login} />
          <Route path="/job" exact component={() => (!user ? <Login/> : <Main/>)} />
          <Route path="/leaning" exact component={() => (!user ? <Login/> : <Learning/>)} />
          <Route component={NotFound}></Route>
        </Switch>
      </Router>
    );
  }
}
export default App;
