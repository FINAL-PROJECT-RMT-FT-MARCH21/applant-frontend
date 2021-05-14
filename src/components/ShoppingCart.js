import React from 'react'

class ShoppingCart extends React.Component {
  render() {
    /* this.props.plants.length === 0
      ? console.log('Hola')
      : 
    const allPlants = this.props.plants._id
      const cartItems = this.props.userInfo.cart.plant.filter((item)=>{
          return item === allPlants
      })
      console.log(cartItems) */

    /* const cartItems = this.props.userInfo.cart.map((item, index)=>{
            return(
                <div className="cartItems">
                

                </div>
            )
    }) */
    return (
      <div className="ShoppingCart">
        <h1>This is the shopping card</h1>
      </div>
    )
  }
}

export default ShoppingCart
