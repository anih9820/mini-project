import App from "./App";
import Home from "./pages/product-home/product-home";
import { Provider, useDispatch } from 'react-redux';
import store, { persistor } from "../src/store/store"; 
import { setAccessToken, setUser } from "./store/authSlice";
import { useEffect } from "react";

function RootComponent() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const cartId = localStorage.getItem('cartId');

    if (userId) { 
      //const parsedUser = JSON.parse(authData);
      dispatch(setUser({ userId: userId, cartId: cartId }));
    }
  }, [dispatch]); 

  return <App />;
}

export default function Root() {

  return (
    <Provider store={store}>

      <RootComponent />

  </Provider>
  )
}


