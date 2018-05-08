import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';

class Login extends Component {

  state = {
    email: '',
    password: '',
    error: '',
    success: false
  }

  handleInputEmail = (event) => {
    this.setState({email: event.target.value})
  }

  handleInputPassword = (event) => {
    this.setState({password: event.target.value})
  }

  //////easy way to redirect after submitting form:
  componentWillReceiveProps(nextProps){
    if(nextProps.user.login.isAuth){
      this.props.history.push('/user')
    }
  }

  submitForm = (e) => {
    e.preventDefault();
    this.props.dispatch(loginUser(this.state));
  }

  render() {
    let user = this.props.user;
    return (
      <div className="rl_container">
        <form action="" onSubmit={this.submitForm}>
          <h2>Log in Here</h2>
          <div className="form_element">
            <input
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleInputEmail}
            />
          </div>
          <div className="form_element">
            <input
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleInputPassword}
            />
          </div>
          <button type="submit">Log In</button>

          {/* renders message if login didn't work */}
          <div className="error">
            {
              user.login ?
                <div>{user.login.message}</div>
              : null
            }
          </div>
        </form>
      </div>
    );
  }

}

function mapStateToProps(state){
  return {
    user:state.user
  }
}

export default connect(mapStateToProps)(Login);
