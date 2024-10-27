
import "./index.css"

import { Component } from 'react';

import Header from "../Header"

class Home extends Component {
    state = {
      friends: [],
    }

  componentDidMount = async () => {
    const response = await fetch('http://localhost:7000/api/user/v1/get-users')
    const listeddata = await response.json()
    const {data} = listeddata
    this.setState({
        friends: data
    })
  }


  claimPoints = async (id,username) => {
    const friendObj = {
        username
    }
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
      body: JSON.stringify(friendObj),
    }

    const response = await fetch(`http://localhost:7000/api/user/v1/claim-points`,options)
    if(response.ok){
        const responseData = await response.json()
        const {message} = responseData
        const addedPoints = parseInt(message[0])
        this.setState(prevState => ({
            friends: prevState.friends.map(each => {
                if(each._id === id){
                    return ({...each,Points: each.Points+addedPoints})
                }else{
                    return each
                }
            })
        }))
    }
  };

  render() {
    const {friends} = this.state
    return (
        <>
        <Header active="home" />
        <div>
            <h1 className="home-heading">Friends List</h1>
            <ul className="friends-list">
            {friends.map((friend) => (
                <li className="friend-list-item" key={friend._id}>
                    <p onClick={() => this.claimPoints(friend._id,friend.username)} className="friend-name">{friend.username}</p>
                    <p className="friend-points">{friend.Points} Points</p>
                </li>
            ))}
            </ul>
        </div>
        <p className="note-para"><span className="note-span">Note: </span>Click on the FriendName to Claim Points</p>
        </>
      
    );
  }

  }
export default Home;
