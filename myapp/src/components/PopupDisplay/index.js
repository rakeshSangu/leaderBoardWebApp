import { Component } from "react"

import "./index.css"

class PopupDisplay extends Component {
    state = {
        historyList: []
    }

    componentDidMount = async () => {
        const {user} = this.props
        const apiUrl = `https://leaderboardwebapp-backend.onrender.com/api/user/v1/your-history`
        const userObj = {"username": user}
    
        const option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                },
            body: JSON.stringify(userObj)
        }
        const response= await fetch(apiUrl,option);
        if(response.ok){
            const responseData = await response.json()
            const {data} = responseData
            this.setState({historyList: data})
        }
    }


    render(){
        const {historyList} = this.state
        const {close} = this.props
    return (
        <div className="popup-container">
            <h1 className="popup-heading">test's History</h1>
        {historyList.length>0 && (
            <ul className="history-container">
            {historyList.map(each => (
                <li className="history-list-item">
                    <p>Date: {each.date}</p>
                    <p>Points: {each.pointsAwarded}</p>
                    <hr/>
                </li>
            ))}
        </ul>
        )}
        <button onClick={() => (close())} className="close-btn">Close</button>
        </div>
        )
    }
}
export default PopupDisplay
