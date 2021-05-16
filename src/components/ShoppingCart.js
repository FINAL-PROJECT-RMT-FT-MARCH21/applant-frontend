import React from 'react'

class ShoppingCart extends React.Component {
  // checkItemCart() {
  //   if (this.props.plants.length === 0) {
  //     return console.log('Loading')
  //   } else {

  //     const allPlants = this.props.plants
  //     //-----populate de las plantas del carrito

  //     const cartItems = this.props.userInfo.cart.map((item) => {
  //       return (
  //         item.plant // para filtrar (populate)
  //       )
  //     })

  //     const plantAddedToCart = cartItems.map((item)=>{
  //       return  allPlants.filter((plant)=>{
  //         return plant._id === item
  //       })
  //     }).flat()
  //     //----- cantidad de las plantas del carrito

  //     const itemCartQuantities = this.props.userInfo.cart.map((item) => {
  //       return item.quantity
  //     })
  //     console.log(this.props.userInfo.cart)
  //     console.log(itemCartQuantities)
  //     console.log(cartItems)
  //     console.log(plantAddedToCart)

  //     // for(let i=0; i<plantAddedToCart.length ; i++){
  //     // return {plant: plantAddedToCart[i], quantity: itemCartQuantities[i] }
  //     // }
  //   }
  // }
  toUpper(word) {
    if (word) return word[0].toUpperCase() + word.slice(1)
  }
  getCartItems() {
    const { cart } = this.props.userInfo
    if (cart.length > 0) {
      return cart.map((item, index) => {
        return (
          <div key={index} className="plant-card">
            <img src={item.plant.image} alt={item.plant.commonName} />

            <h2>{this.toUpper(item.plant.commonName)}</h2>
            <p>Quantity: {item.quantity}</p>
            <p>Price: {item.plant.price}</p>
            <p>Total {item.quantity * item.plant.price}</p>
          </div>
        )
      })
    }
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Shopping cart</h1>
        {this.getCartItems()}
      </div>
    )
  }
}

export default ShoppingCart
