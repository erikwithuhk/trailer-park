import React from 'react';

const propTypes = {
  handleLogin: React.PropTypes.func,
  handleSignup: React.PropTypes.func,
  buttonText: React.PropTypes.string,
  route: React.PropTypes.element,
};

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(e) {
    const target = e.target;
    const name = target.getAttribute('name');
    const value = target.value;
    const updated = {};
    updated[name] = value;
    this.setState(updated);
  }
  handleSubmit(e) {
    e.preventDefault();
    const formType = this.props.route.path;
    if (formType === 'login') {
      this.props.handleLogin(this.state);
    } else if (formType === 'signup') {
      this.props.handleSignup(this.state);
    }
  }
  render() {
    let headerText;
    if (this.props.route.path === 'signup') {
      headerText = 'Sign Up';
    } else if (this.props.route.path === 'login') {
      headerText = 'Log In';
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2 className="user-form_header">{headerText}</h2>
          <input
            type="text"
            name="email"
            value={this.state.email}
            placeholder="email..."
            onChange={this.handleInputChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            placeholder="password..."
            onChange={this.handleInputChange}
          />
          <input type="submit" value={this.props.buttonText} />
        </form>
      </div>
    );
  }
}

UserForm.propTypes = propTypes;

export default UserForm;
