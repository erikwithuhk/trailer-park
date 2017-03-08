import React, { Component, PropTypes } from 'react';

const propTypes = {
  currentUser: PropTypes.object,
  logIn: PropTypes.func,
  signUp: PropTypes.func,
  route: PropTypes.object,
  updateUser: PropTypes.func,
};

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.currentUser,
      password: '',
      route: this.props.route || { path: '' },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { currentUser, route } = nextProps;
    if (currentUser) {
      this.setState({ currentUser });
    }
    if (route) {
      this.setState({ currentUser, route });
    }
  }
  createHeader() {
    let headerText;
    switch (this.state.route.path) {
      case 'signup':
        headerText = 'Sign Up';
        break;
      case 'login':
        headerText = 'Log In';
        break;
      case 'profile':
        headerText = 'My Profile';
        break;
      default:
        break;
    }
    return <h2 className="user-form_header">{headerText}</h2>;
  }
  createPasswordInput() {
    const { path } = this.state.route;
    if (path === 'signup' || path === 'login') {
      return (
        <input
          type="password"
          name="password"
          value={this.state.password}
          placeholder="Password"
          onChange={this.handlePasswordChange}
        />
      );
    }
    return null;
  }
  createUsernameInput() {
    const { path } = this.state.route;
    if (path !== 'login') {
      return (
        <input
          type="text"
          name="username"
          onChange={this.handleInputChange}
          placeholder="Username"
          value={this.state.currentUser.username}
        />
      );
    }
    return null;
  }
  createAdditionalFields() {
    const { path } = this.state.route;
    const { currentUser } = this.state;
    if (path !== 'login' && path !== 'signup') {
      return (
        <div>
          <input
            type="text"
            name="firstName"
            onChange={this.handleInputChange}
            placeholder="First Name"
            value={currentUser.firstName}
          />
          <input
            type="text"
            name="lastName"
            onChange={this.handleInputChange}
            placeholder="Last Name"
            value={currentUser.lastName}
          />
          <input
            type="text"
            name="bio"
            onChange={this.handleInputChange}
            placeholder="My Bio"
            value={currentUser.bio}
          />
        </div>
      );
    }
    return null;
  }
  createSubmitButton() {
    const { path } = this.state.route;
    switch (path) {
      case 'login':
        return <input type="submit" value="Log In" />;
      case 'signup':
        return <input type="submit" value="Sign Up" />;
      default:
        return (
          <input
            type="submit"
            value="Update"
            onClick={this.handleUpdateUser}
          />
        );
    }
  }
  handleInputChange(e) {
    const { currentUser } = this.state;
    const target = e.target;
    const key = target.getAttribute('name');
    const value = target.value;
    currentUser[key] = value;
    this.setState({ currentUser });
  }
  handlePasswordChange(e) {
    const password = e.target.value;
    this.setState({ password });
  }
  handleUpdateUser(e) {
    e.preventDefault();
    this.props.updateUser(this.state.currentUser);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { path } = this.state.route;
    let email;
    let password;
    let username;
    switch (path) {
      case 'login':
        email = this.state.currentUser.email;
        password = this.state.password;
        return this.props.logIn({ email, password });
      case 'signup':
        email = this.state.currentUser.email;
        password = this.state.password;
        username = this.state.currentUser.username;
        return this.props.signUp({ email, password, username });
      default:
        return null;
    }
  }
  render() {
    const header = this.createHeader();
    const passwordInput = this.createPasswordInput();
    const usernameInput = this.createUsernameInput();
    const additionalFields = this.createAdditionalFields();
    const submitButton = this.createSubmitButton();
    const { currentUser } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        {header}
        <input
          type="text"
          name="email"
          onChange={this.handleInputChange}
          placeholder="email"
          value={currentUser.email}
        />
        {passwordInput}
        {usernameInput}
        {additionalFields}
        {submitButton}
      </form>
    );
  }
}

UserForm.propTypes = propTypes;

export default UserForm;
