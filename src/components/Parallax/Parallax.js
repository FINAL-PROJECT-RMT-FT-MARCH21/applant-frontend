import React, { useEffect } from 'react'
import M from 'materialize-css'
import './Parallax.scss'

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
            <h2>Plants made easy</h2>
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
            <h2>Applants</h2>
            <p>helps you discover the best plants for your spaces</p>
          </div>
        </div>
        <div className="parallax-container">
          <div className="parallax">
            <img
              src="https://i.ibb.co/QC40J4G/Parallax4.jpg"
              alt="background-img"
            />
          </div>
          <div className="section white">
            <h2>This is parallax 2</h2>
            <p>demoooooo 2</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Parallax
