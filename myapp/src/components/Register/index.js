import {Component} from 'react'
import { Link } from 'react-router-dom'

import './index.css'

class Register extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    username: '',
    password: '',
    showPassword: false,
    errorMsg: "",
    registeredSuccessfully: false
  }

  onChangeFirstname = event => {
    this.setState({firstName: event.target.value})
  }

  onChangeLastname = event => {
    this.setState({lastName: event.target.value})
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
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
    const {firstName,lastName,email,username, password} = this.state

    if(firstName === "" || lastName==="" || email ==="" || username==="" || password===""){
        this.setState({
            errorMsg: "Please enter all the details"
        })
    }
    else{
        const userObj = {
            firstName,
            lastName,
            email,
            username,
            password,
          }
      
          console.log(userObj)
          
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userObj),
          }
          const response = await fetch('http://localhost:7000/api/auth/v1/register',options)
          const data = await response.json()
          if(response.ok){
            const {message} = data
            this.setState({
                errorMsg: message + ", go to Login",
                registeredSuccessfully: true,
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                username: ''
            })
            
          
          }else{
            const {message} = data
            this.setState({
              errorMsg: message,
              registeredSuccessfully: false
            })
          }
    }
    
  }

  render() {
    console.log(localStorage.getItem("user-token"))
    const {firstName,lastName,email,username, password,showPassword,errorMsg,registeredSuccessfully} = this.state
    return (
      <div className="login-background-section">
        <form className="form-box" onSubmit={this.onSubmitLogin}>
          <div className="input-container">
            <label className="label-ele" htmlFor="firstname-input">
              Firstname
            </label>
            <input
              className="login-input"
              type="text"
              id="firstname-input"
              placeholder="Enter Firstname"
              onChange={this.onChangeFirstname}
              value={firstName}
            />
          </div>
          <div className="input-container">
            <label className="label-ele" htmlFor="lastname-input">
              Lastname
            </label>
            <input
              className="login-input"
              type="text"
              id="lastname-input"
              placeholder="Enter Lastname"
              onChange={this.onChangeLastname}
              value={lastName}
            />
          </div>
          <div className="input-container">
            <label className="label-ele" htmlFor="email-input">
              Email
            </label>
            <input
              className="login-input"
              type="text"
              id="email-input"
              placeholder="Enter Email"
              onChange={this.onChangeEmail}
              value={email}
            />
          </div>
          <div className="input-container">
            <label className="label-ele" htmlFor="username-input">
              Username
            </label>
            <input
              className="login-input"
              type="text"
              id="username-input"
              placeholder="Enter Username"
              value={username}
              onChange={this.onChangeUsername}
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
          <button className="register-button" type="submit">
            Register
          </button>
          {errorMsg !== "" && <p className={registeredSuccessfully ? 'error-para success-para':'error-para'}>*{errorMsg}</p>}
          <p>Already Registered? <Link to="/login">Login</Link></p>
        </form>
      </div>
    )
  }
}

export default Register
