import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "$";
    const delivery_fee = 10;
const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState(" ")
    const [showSearch, setShowSearch] = useState(false)// true pr search hoga false pr ni hoga
    const [cartItems, setCartItems] = useState({})
    const [products, setProducts] = useState([])
    const [token, setToken] = useState('')
    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error("Select Product Size");// size na select krne pr ye notification aaega react toastify k throough
            return;
        }

        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1; // cart me already item to +1 hojaega

            } else {
                cartData[itemId][size] = 1 /// first itemm or new entry
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;

        }
        setCartItems(cartData)
        if(token){
                try {
                    await axios.post(backendUrl + '/api/cart/add', {itemId,size},{headers:{token}})//produ is added to cart whenever we are login
                    

                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
        }
    }




    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {        // for item 
            for (const item in cartItems[items]) {/// for  size 
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item]
                    }
                } catch (error) {

                }
            }
        }

        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {

        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData)
        if(token){
            try {
                await axios.post(backendUrl + '/api/cart/update',{itemId, size, quantity},{headers:{token}})
            } catch ({error}) {
               console.log(error)
                    toast.error(error.message) 
            }
        }

    }


    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount
    }



    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

const getUserCart = async (token)=>{
    try {
        const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
        if(response.data.success){
            setCartItems(response.data.cartData)
        }
    } catch (error) {
        console.log(error)
            toast.error(error.message)
    }
}

    useEffect(() => {
        getProductsData()
    },[])

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
                setToken(localStorage.getItem('token'))
                getUserCart(localStorage.getItem('token'))
        }
    })


    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, getCartCount, updateQuantity, getCartAmount, navigate
        , backendUrl, setToken, token,setCartItems
        //through this we can access them in any component
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;