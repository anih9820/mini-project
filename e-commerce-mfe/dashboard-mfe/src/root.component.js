import App from "./App";
import SellerDashboard from "./pages/dashboard/SellerDashboard";
import { Provider, useDispatch } from 'react-redux';
import store, { persistor } from "../src/store/store"; 
import { setAccessToken, setUser } from "./store/authSlice";
import { useEffect } from "react";

function RootComponent() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    //const cartId = localStorage.getItem('');

    if (userId) { 
      dispatch(setUser({ userId: userId }));
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


