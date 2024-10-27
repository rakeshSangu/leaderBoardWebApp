import {Component} from 'react'
import { Link } from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    errorMsg: ""
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickShowPassword = () => {
    this.setState(prevStat => ({
      showPassword: !prevStat.showPassword
    }))
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userObj = {
      username,
      password,
    }
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userObj),
    }
    const response = await fetch('http://localhost:7000/api/auth/v1/login',options)
    const data = await response.json()
    if(response.ok){
      const {token} = data
      localStorage.setItem("user-token",token)
  
      const {history} = this.props
      history.replace('/')

     
    }else{
      const {message} = data
      this.setState({
        errorMsg: message
      })
    }
    
  }

  render() {
    const {username, password,showPassword,errorMsg} = this.state
    return (
      <div className="login-background-section">
        <form className="form-box" onSubmit={this.onSubmitLogin}>
          <div className="input-container">
            <label className="label-ele" htmlFor="username-input">
              Username
            </label>
            <input
              className="login-input"
              type="text"
              id="username-input"
              placeholder="Enter Username"
              onChange={this.onChangeUsername}
              value={username}
            />
          </div>
          <div className="input-container">
            <label className="label-ele" htmlFor="password-input">
              Password
            </label>
            <input
              className="login-input"
              type={showPassword ? "text" : "password"}
              id="password-input"
              placeholder="Enter Password"
              onChange={this.onChangePassword}
              value={password}
            />
            <div className='check-box-container'>
              <input checked={showPassword} onChange={this.onClickShowPassword} id="check-box" className='checkbox-ele' type='checkbox' />
              <label htmlFor='check-box' className='show-password-label'>Show Password</label>
          </div>
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
          {errorMsg !== "" && <p className='error-para'>*{errorMsg}</p>}
          <p>New user? <Link to="/register">Register here</Link></p>
        </form>
      </div>
    )
  }
}

export default Login
