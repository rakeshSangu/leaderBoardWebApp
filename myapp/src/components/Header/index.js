import "./index.css"

import { Component } from "react"

import {Link} from "react-router-dom"

class Header extends Component{
    state = {
        userinfo: {}
    }

    componentDidMount = async () => {
        const token = localStorage.getItem("user-token")
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": token
            }
        }
    
        const response = await fetch(`https://leaderboardwebapp-backend.onrender.com/api/user/v1/get-users-info`,options)
        if(response.ok){
            const responseData = await response.json()
            const {data}= responseData
            this.setState({
                userinfo: data
            })
        }
    }

    render(){
        const {userinfo} = this.state
        const {active} = this.props
        const {username,email,Points} = userinfo
        return (
            <div className="navbar">
                <div className="user-info-container">
                    <p className="navbar-username">{username}</p>
                    <p className="nav-para">email: <span className="email-span">{email}</span></p>
                    <p className="nav-para">Points: <span className="points-span">{Points}</span></p>
                </div>
                <div className='header-section'>
                    <Link to="/login" className='header-para'>Login</Link>
                    <Link to="/register" className='header-para'>Register</Link>
                    <Link to="/" className={active === "home" ? 'header-para active': 'header-para'}>Home</Link>
                    <Link to="/leaderboard" className={active === "leaderBoard" ? 'header-para active': 'header-para'}>LearderBoard</Link>
                </div>
            </div>
    )
    }
}
export default Header
