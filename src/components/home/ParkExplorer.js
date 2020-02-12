import React, { Component} from "react"
import AreaList from "./AreaList"
import "./Explorer.css"
import Attractions from "./Attractions"
import { isAuthenticated } from "../helpers/simpleAuth"

class ParkExplorer extends Component {

    state = {
      areas: [],
      attractions: []
    }

    componentDidMount() {
      this.getParkAreas()
    }

    getAttractions = (areaId) => {
      if (isAuthenticated()) {
        fetch(`http://localhost:8000/attractions?area=${areaId}`, {
          "method": "GET",
          "headers": {
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("kennywood_token")}`
          }
        })
        .then(response => response.json())
        .then((allAttractions) => {
          this.setState({attractions: allAttractions})
        })
      }
    }

    getParkAreas = () => {

      if (isAuthenticated()) {
        fetch('http://localhost:8000/parkareas', {
          "method": "GET",
          "headers": {
              "Accept": "application/json",
              "Authorization": `Token ${localStorage.getItem("kennywood_token")}`
          }
        })
        .then(response => response.json())
        .then( areas => this.setState({areas: areas}))
      }
    }

    render() {
      return (
          <>
            <main className="explorer">
              <AreaList areas={this.state.areas} getAttractions={this.getAttractions} />
              <Attractions attractions={this.state.attractions} {...this.props} />
            </main>
          </>
      )
    }
}

export default ParkExplorer
