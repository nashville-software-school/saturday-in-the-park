import React, { Component } from "react"
import modal from "../helpers/modal"


class Attraction extends Component {

  state = {
    starttime: null
  }

  componentDidMount() {
    window.addEventListener("keyup", this.modalHandler)
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.modalHandler)
  }

  modalHandler = (evt) => {
    if (evt.keyCode === 27) {
      if (modal.isOpen) {
        modal.toggleDialog(false, "#dialog--time")
      }
    }
  }

  handleInputChange = (evt) => {
    let stateToChange = {}
    stateToChange[evt.target.name] = evt.target.value
    console.log("this", this)
    this.setState(stateToChange)
  }

  addToItinerary = () => {
    fetch('http://localhost:8000/itineraryitems', {
      "method": "POST",
      "headers": {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("kennywood_token")}`
      },
      "body": JSON.stringify({
        "ride_id": this.props.ride.id,
        "starttime": this.state.starttime
      })
    })
    .then(response => response.json())
    .then(() => {
        console.log("Added")
        this.props.history.push("/myitinerary")
    })
  }

  render() {
    return (
      <>
        <dialog id="dialog--time" className="dialog--time">
          <label htmlFor="starttime">When do you want to ride?</label>
          <input
          onChange={this.handleInputChange}
          type="text" name="starttime" autoFocus required />

          <button onClick={this.addToItinerary}>Add to Itinerary</button>

          <button
            style={{
              position: "absolute",
              top: "0.25em",
              right: "0.25em"
            }}
            id="closeBtn"
            onClick={() => modal.toggleDialog(true, "#dialog--time")}>X</button>
        </dialog>

        <section className="ride">
          <button className="fakeLink ride__link"
            onClick={() => modal.toggleDialog(false, "#dialog--time")}>
            {this.props.ride.name}
          </button>
        </section>
      </>
    )
  }
}

export default Attraction
