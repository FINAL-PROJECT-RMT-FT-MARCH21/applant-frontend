import React from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'

class ShoppingCart extends React.Component {
  state = {
    totalPrice: 0,
  }
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
  getTotalPrice() {
    const sum = this.props.userInfo.cart.reduce((accumulator, element) => {
      return accumulator + element.plant.price * element.quantity
    }, 0)
    return sum
  }

  toUpper(word) {
    if (word) return word[0].toUpperCase() + word.slice(1)
  }
  getCartItems() {
    console.log(this.props.userInfo.cart)
    console.log(this.props.userInfo)
    const { cart } = this.props.userInfo
    if (cart.length > 0) {
      return cart.map((item, index) => {
        return (
          <div key={index} className="allItemsCart">
            <img src={item.plant.image} alt={item.plant.commonName} />
            <div className="infoItemCart">
              <b>
                <p>{this.toUpper(item.plant.commonName)}</p>
              </b>
              <p>
                <b>Qty:</b> {item.quantity}
              </p>
              <p>
                <b>Price:</b> {item.plant.price}€
              </p>
              <p>
                <b>Total: </b>
                {item.quantity * item.plant.price}€
              </p>
              <button onClick={() => this.props.deleteFromCart(item.plant._id)}>
                <RiDeleteBinLine className="removeIcon" />
              </button>
            </div>
          </div>
        )
      })
    }
  }
  render() {
    return this.props.userInfo.cart.length === 0 ? (
      <h1>Your cart it's empty</h1>
    ) : (
      <div className="ShoppingCart">
        <h1>Cart</h1>
        {this.getCartItems()}
        <p>
          <b>Total: </b> {this.getTotalPrice()}
        </p>
      </div>
    )
  }
}

export default ShoppingCart
