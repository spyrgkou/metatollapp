import { Component } from "react";
import auth from "./services/authService";

class Logout extends Component {
  async componentDidMount() {
    await auth.logout();

    window.location = "/";
  }

  render() {
    return null;
  }
}

export default Logout;
