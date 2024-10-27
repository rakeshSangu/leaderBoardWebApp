import { Component } from 'react';
import { FaUserAlt } from "react-icons/fa";

import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import "./index.css"

import Header from "../Header"
import PopupDisplay from '../PopupDisplay';


const tabsList = [
    {
        id: "daily",
        displayText: "Daily"
    },{
        id: "weekly",
        displayText: "Weekly"
    },{
        id: "monthly",
        displayText: "Monthly"
    }
]

class LeaderBoard extends Component {
    state = {
      leadersList: [],
      activeTabId: tabsList[0].id
    };
  

  componentDidMount = () => {
      this.getUserInfo()
  }

  getUserInfo = async () => {
    const {activeTabId} = this.state
    
    const apiUrl = `https://leaderboardwebapp-backend.onrender.com/api/user/v1//your-${activeTabId}-history`
    const response= await fetch(apiUrl);
    
    if(response.ok){
        const responseData =  await response.json()
        console.log(responseData)
        const {data} = responseData

        if(activeTabId===tabsList[1].id){
            const modifiedData = data.map(each => ({
                _id: each._id,
                totalPointsAwarded: each.totalPoints
            }))
            this.setState({
                leadersList: modifiedData
            })
        }else{
            this.setState({
                leadersList: data
            })
        }
        
    }
  }



  onChangeActiveTab = (id) => {
    this.setState({
        activeTabId: id
    },this.getUserInfo)
  }

  renderTabsView = () => {
    const {activeTabId} = this.state
    return (
        <ul className='tabs-list-container'>
            {tabsList.map(each => (
                <li onClick={() => (this.onChangeActiveTab(each.id))} className={activeTabId===each.id ? "tab-item active-tab" : "tab-item"} key={each.id}>{each.displayText}</li>
            ))}
        </ul>
    )
  }

  renderTopLeadersView = () => {
    const {leadersList} = this.state
    leadersList.sort(function(a,b){return b.totalPointsAwarded - a.totalPointsAwarded})
    const orderedList = [leadersList[1],leadersList[0],leadersList[2]]
    return (
        <ul className='top-3-leader-container'>
            {orderedList.map(each => (
                <li className='top-list-item' key={each._id}>
                    <p className='top-name'>{each._id}</p>
                    <p className='top-points-para'>{each.totalPointsAwarded}</p>
                    <p className='rupees-para'>Prize: Rs.{each.totalPointsAwarded}/-</p>
                </li>
            ))}
        </ul>
    )
  }


  renderAllUsersView = () => {
    const {leadersList} = this.state
    return (
        <ul className='all-list-container'>
            {leadersList.map(each => {
                const rank = leadersList.indexOf(each)
                return (
                    <li className='leader-board-list_item' key={each._id}>
                        <div className='list-item-user-contaiiner'>
                            <FaUserAlt className='user-icon' />
                            

                            <Popup 
                            trigger={
                                    <button className='user-name-button'>
                                        <p className='details-para'>{each._id} <br/> Rank: {rank+1}</p>
                                    </button>
                                    }
                            modal 
                            >
                                {close => {
                                    return (
                                        <PopupDisplay close={close}  user={each._id} />
                                    )
                                }}
                            </Popup>

                        </div>
                        <p className='list-prize'>Prize: Rs.{each.totalPointsAwarded}</p>
                        <p className='list-points'>{each.totalPointsAwarded}</p>
                    </li>
                )
            })}
        </ul>
    )
  }

  render() {
    const {leadersList} = this.state
    
    return (
      <>
        <Header active="leaderBoard" />
        <div className="leader-full-container">
            <div className='leader-top-box'>
                LEADERBOARD
            </div>
            {leadersList.length>2 && (
                <div className='leader-bottom-container'>
                    {this.renderTabsView()}
                    {this.renderTopLeadersView()}
                    <hr/>
                    {this.renderAllUsersView()}
                </div>
            )}
        </div>
      </>
    );
  }
}

export default LeaderBoard;
