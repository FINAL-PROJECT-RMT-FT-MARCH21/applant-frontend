import React from 'react'

class ShoppingCart extends React.Component {

 /*  state= {
    cart: this.props.userInfo.cart
  }
 */

  // showCart(){
  //   const stateCopy = {...this.state}
  //   if (this.props.plants.length === 0) {
  //     return console.log('Loading')
  //   } else {  
  //     const filteredPlants = this.props.plants.map((plnt)=>{
  //       return this.state.cart.filter((cartItem)=>{
  //         return cartItem.plant === plnt._id
  //       })
  //     })
  //     console.log('>>>>>>>>>>>', stateCopy.cart)
  //     stateCopy.cart.plant = filteredPlants
  //   }
  //   this.setState(stateCopy)
  // }
  checkItemCart() {
    if (this.props.plants.length === 0) {
      return console.log('Loading')
    } else {
      
      const allPlants = this.props.plants
      //-----populate de las plantas del carrito
      
      const cartItems = this.props.userInfo.cart.map((item) => {
        return (
          item.plant // para filtrar (populate)
        )
      })
      
      const plantAddedToCart = cartItems.map((item)=>{
        return  allPlants.filter((plant)=>{
          return plant._id === item 
        })
      }).flat() 
      //----- cantidad de las plantas del carrito
      
      const itemCartQuantities = this.props.userInfo.cart.map((item) => {
        return item.quantity
      })
      console.log(this.props.userInfo.cart)      
      console.log(itemCartQuantities)
      console.log(cartItems)
      console.log(plantAddedToCart) 
     
      // for(let i=0; i<plantAddedToCart.length ; i++){
      // return {plant: plantAddedToCart[i], quantity: itemCartQuantities[i] }
      // }
    }
  } 



  render() {

   
   /*  this.props.plants.length === 0 ? console.log('Hola') :
    console.log(this.props.userInfo)
    console.log(this.props.plants) */

    return ( 
      <div>
        <h1>Shopping cart</h1>
        {this.checkItemCart()} 

      </div>
    )
  }
}

export default ShoppingCart