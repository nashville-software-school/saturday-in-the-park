import React, { Component } from "react"
import ItineraryDialog from "./ItineraryDialog"
import modal from "../helpers/modal"
import "./MyItinerary.css"


class MyItinerary extends Component {

    state = {
      itineraryList: [],
      currentItinerary: {id: null}
    }

    componentDidMount() {
      this.getItems()
      window.addEventListener("keyup", this.modalHandler)
    }

    componentWillUnmount() {
      window.removeEventListener("keyup", this.modalHandler)
    }

    modalHandler = (evt) => {
      if (evt.keyCode === 27) {
        if (modal.isOpen) {
          modal.toggleDialog(false, "#dialog--itinerary")
        }
      }
    }

    getItems = () => {
      // Fetch the data from localhost:8000/itineraryitems
      fetch("http://localhost:8000/itineraryitems", {
          "method": "GET",
          "headers": {
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("kennywood_token")}`
          }
      })
      // Convert to JSON
      .then(response => response.json())

      // Store itinerary items in state variable
      .then((allTheItems) => {
          this.setState({itineraryList: allTheItems})
      })
    }

    deleteItem = (item) => {
      fetch(`http://localhost:8000/itineraryitems/${item.id}`, {
          "method": "DELETE",
          "headers": {
              "Authorization": `Token ${localStorage.getItem("kennywood_token")}`
          }
      })
      .then(this.getItems)
    }


    updateItineraryItem = (starttime) => {
      fetch(`http://localhost:8000/itineraryitems/${this.state.currentItinerary.id}`, {
        "method": "PUT",
        "headers": {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("kennywood_token")}`
        },
        "body": JSON.stringify({
          "starttime": starttime
        })
      })
      .then(() => {
        console.log("Updated!!!! YAY!!!!  🙌🏼")
        modal.toggleDialog(false)
      })
      .then(this.getItems)
    }


    // Create HTML representation with JSX
    render() {
      return (
        <>
          <ItineraryDialog toggleDialog={modal.toggleDialog} callback={(starttime) => {
            this.updateItineraryItem(starttime)
          }} />
          <h2>What I Want to Do on Saturday</h2>
          <div className="itineraryItems">
          {
            this.state.itineraryList.map((item) => {
              return <div>
                {item.attraction.name} in {item.attraction.area.name} at {item.starttime}
                <button onClick={() => {
                  this.deleteItem(item)
                }}>Delete Me</button>
                <button onClick={() => {
                  this.setCurrentItinerary(item)
                  modal.toggleDialog(true)
                }}>Edit Me</button>
              </div>
            })
          }
          </div>
        </>
      )
    }
}

export default MyItinerary
