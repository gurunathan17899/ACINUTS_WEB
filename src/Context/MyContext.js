import React, {createContext, useState} from 'react';

// Create a context
const MyContext = createContext();

// Create a provider
const MyProvider = ({children}) => {
  const [UserDetails, setUserDetails] = useState({username: "guest",Mobile: 9876543210});
  const [Token, setToken] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJtb2JpbGVfbnVtYmVyIjoiKzkxOTc1MTM2NTEzNCIsImlhdCI6MTczOTI4MTI2MywiZXhwIjoxNzM5MjgzMDYzfQ.YR5rBHfIrp9gI7DpXmO7o7TpY1pFu2jynKSduRTbIog'
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
