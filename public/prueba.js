state = {
    nombre: ''
}


function1(){
    arguments.forEach((argument)=>{
        this.setState({...this.state}, argument = argument)
    })
}







const name = 'Hector'
function1(name, true, [1, 4, 21])
