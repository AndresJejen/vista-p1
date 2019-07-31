import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import MainNavigation from './components/navegacion/navigator';
import AuthContext from './context/Auto-Context';

import Login from './pages/login';
import Dashboard from './pages/dashboard';

import './App.css';

class App extends Component {
  state = {
    token: null,
    userId: null
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout
            }}
          >
            <MainNavigation />
            <main className="main-content">
              <Switch>
                {this.state.token && <Redirect from="/" to="/historico" exact />}
                {this.state.token && (
                  <Redirect from="/login" to="/historico" exact />
                )}
                {!this.state.token && (
                  <Route path="/login" component={Login} />
                )}
                <Route path="/historico" component={Dashboard} />
                {this.state.token && (
                  <Route path="/prediccion" component={Dashboard} />
                )}
                {!this.state.token && <Redirect to="/login" exact />}
              </Switch>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;