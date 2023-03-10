import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navBar";
import Home from "./components/home";
import LoginForm from "./components/loginForm";
import PassesPerStation from "./components/passesPerStation";
import PassesAnalysis from "./components/passesAnalysis";
import PassesCost from "./components/passesCost";
import ChargesBy from "./components/chargesBy";
import NotFound from "./components/notFound";
import auth from "./components/services/authService";
import "./App.css";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({user});
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <NavBar user={user} />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/passesperstation" element={<ProtectedRoute />}>
              <Route path="/passesperstation" element={<PassesPerStation />} />
            </Route>
            <Route path="/passesanalysis" element={<ProtectedRoute />}>
              <Route path="/passesanalysis" element={<PassesAnalysis />} />
            </Route>
            <Route path="/passescost" element={<ProtectedRoute />}>
              <Route path="/passescost" element={<PassesCost />} />
            </Route>
            <Route path="/chargesby" element={<ProtectedRoute />}>
              <Route path="/chargesby" element={<ChargesBy />} />
            </Route>
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
