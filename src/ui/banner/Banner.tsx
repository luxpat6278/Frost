import React from "react"
import "./Banner.css"
import mainBanner from "../../images/mainBanner.png"

const Banner: React.FC = () => {
  return (
    <div className="banner-component">
      <img className="main-banner" src={mainBanner} alt="main-banner" />
    </div>
  )
}

export default Banner

