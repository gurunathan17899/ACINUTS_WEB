import React, {createContext, useState} from 'react';

// Create a context
const MyContext = createContext();

// Create a provider
const MyProvider = ({children}) => {
  const [UserDetails, setUserDetails] = useState({username: "guest",Mobile: 9876543210});
  const [Token, setToken] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJtb2JpbGVfbnVtYmVyIjoiKzkxOTc1MTM2NTEzNCIsImlhdCI6MTcyMzgyMTM2MywiZXhwIjoxNzIzODIzMTYzfQ.AKnGo8SXjPoA0RlzemAss5OXHqPzITdBb2zwfxukd6s'
  );
  const [UserShippingAddress,setUserShippingAddress] = useState([])
  const [UserOrders,setUserOrders] = useState([])
  
  
  return (
    <MyContext.Provider
      value={{
        UserDetails,
        setUserDetails,
        Token,
        setToken,
        UserShippingAddress,
        setUserShippingAddress,
        UserOrders,
        setUserOrders,
      }}>
      {children}
    </MyContext.Provider>
  );
};

export {MyProvider, MyContext};
