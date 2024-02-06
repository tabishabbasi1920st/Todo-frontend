import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import SearchThemeContext from "./components/SearchThemeContext/SearchTheme";
import NotFoundPage from "./components/NotFoudPage";
import Profile from "./components/Profile";
import DeleteAccountConfirmation from "./components/DeleteAccountConfirmation";

class App extends Component {
  state = {
    searchInput: "",
  };

  onChangeSearchInput = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  onClearSearchInput = () => {
    this.setState({ searchInput: "" });
  };

  render() {
    const { searchInput } = this.state;
    return (
      <SearchThemeContext.Provider
        value={{
          searchInput,
          onChangeSearchInput: this.onChangeSearchInput,
          onClearSearchInput: this.onClearSearchInput,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/" component={LandingPage} />
          <ProtectedRoute exact path="/home" component={Home} />
          <ProtectedRoute exact path="/user-profile" component={Profile} />
          <ProtectedRoute
            exact
            path="/delete-account"
            component={DeleteAccountConfirmation}
          />
          <NotFoundPage />
        </Switch>
      </SearchThemeContext.Provider>
    );
  }
}
export default App;
