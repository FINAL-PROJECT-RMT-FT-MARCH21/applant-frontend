import React from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'
import CheckoutForm from './CheckoutForm'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

class ShoppingCart extends React.Component {

  toUpper(word) {
    if (word) return word[0].toUpperCase() + word.slice(1)
  }
  getCartItems() {
    const { cart } = this.props.userInfo
    if (cart) {
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
    console.log('TOTAL PRICE PROPS DE SHOPPING CART' + this.props.totalPrice)
    const promise = loadStripe(
      'pk_test_51IrpUwINyfw3Ussjr5TrEoNC8GW0dM1LdTMSLYsAIhofMEO44bCM8br241Ywwi96IRkCNMgKI4kMoSI8nugv9CSA0097t9atRk'
    )
    return (
      this.props.userInfo ? 
        (this.props.userInfo.cart.lenght === 0 ?
          <h1>Your cart it's empty</h1>
          :
          <div className="ShoppingCart">
            <h1>Cart</h1>
            {this.getCartItems()}
            <p>
              <b>Total: </b> {this.props.totalPrice}€
              
            <div className="CheckoutForm">
              <Elements stripe={promise}>
                <CheckoutForm />
              </Elements>
            </div>
            </p>
          </div>
        ) 
      : <h1>Login required</h1>
    )
  }
}

export default ShoppingCart
