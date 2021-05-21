import React, { useEffect } from 'react'
import M from 'materialize-css'
import './Parallax.scss'

import { RiPlantFill } from "react-icons/ri";

const Parallax = () => {
  useEffect(() => {
    let elements = document.querySelectorAll('.parallax')
    M.Parallax.init(elements)
  }, [])
  return (
    <div className="Parallax">
      <div className="container">
        <div className="parallax-container">
          <div className="parallax">
            <img
              src="https://i.ibb.co/sC3ZQcK/Parallax3.jpg"
              alt="background-img"
            />
          </div>
          <div className="section white">
            <h2><RiPlantFill/> Plants made easy <RiPlantFill/></h2>
            <p>"You can’t buy happiness, but you can buy plants, and that’s pretty much the same thing."</p>
          </div>
        </div>
        <div className="parallax-container">
          <div className="parallax">
            <img
              src="https://i.ibb.co/xSd2qvK/Parallax1.jpg"
              alt="background-img"
            />
          </div>
          <div className="section white">
            <h2><RiPlantFill/> APPLANT <RiPlantFill/></h2>
            <p>helps you find the plant that fits your spaces best</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Parallax
