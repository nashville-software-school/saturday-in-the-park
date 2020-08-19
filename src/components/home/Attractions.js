import React from "react"
import Attraction from "./Attraction"
import "./Attractions.css"

const Attractions = props => {
    return (
        <>
            <article className="explorerList">
                {
                    props.attractions.map((ride, i) =>
                        <Attraction key={i} ride={ride} {...props} />)
                }
            </article>
        </>
    )
}

export default Attractions
