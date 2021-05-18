import React from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'
import CheckoutForm from './CheckoutForm'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

class ShoppingCart extends React.Component {
  state = {
    totalPrice: 0,
  }
  
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
    const promise = loadStripe(
      'pk_test_51IrpUwINyfw3Ussjr5TrEoNC8GW0dM1LdTMSLYsAIhofMEO44bCM8br241Ywwi96IRkCNMgKI4kMoSI8nugv9CSA0097t9atRk'
    )
    return this.props.userInfo.cart.length === 0 ? (
      <h1>Your cart it's empty</h1>
    ) : (
      <div className="ShoppingCart">
        <h1>Cart</h1>
        {this.getCartItems()}
        <p>
          <b>Total: </b> {this.getTotalPrice()}
          
         <div className="CheckoutForm">
          <Elements stripe={promise}>
            <CheckoutForm />
          </Elements>
        </div>
        </p>
      </div>
    )
  }
}

export default ShoppingCart
