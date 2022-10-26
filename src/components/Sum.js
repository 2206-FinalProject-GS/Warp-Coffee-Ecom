import Confirmation from "./Confirmation";

const Sum = ({cartItems, cartQuantity, setCartQuantity}) => {
    console.log(cartItems, 'filter')

    const sumAll = cartItems.map(item => item.price * item.quantity).reduce((prev, curr) => prev + curr, 0);

    return (
        <div>
 <p className="text-2xl font-medium tracking-tight">Total: ${sumAll}</p>
            <Confirmation sumAll={sumAll} />
        </div>
    )
}

export default Sum