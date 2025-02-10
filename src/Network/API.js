import {ServerURL} from './Config';
import axios from 'axios';

export const GenerateBearerToken = mobile_number => {
  return axios
    .post(`${ServerURL}/getNewToken`, {
      mobile_number: mobile_number,
    })
    .then(function (response) {
      // handle success
      console.log('res' + JSON.stringify(response));
      return response;
    })
    .catch(function (error) {
      // handle error
      console.log(error + 'here' + JSON.stringify(error));
    });
};

export const SingUpAPI = (mobile_number, username) => {
  //const headers = {Authorization: `Bearer ${token}`};
  console.log('mobile no:' + `+91${mobile_number}`);
  return axios
    .post(`${ServerURL}/signup`, {
      mobile_number: `+91${mobile_number}`,
      user_name: username,
    })
    .then(function (response) {
      // handle success
      console.log('res' + JSON.stringify(response));
      return response;
    })
    .catch(function (error) {
      // handle error
      console.log(error + 'here' + JSON.stringify(error));
    });
};

export const SingInAPI = mobile_number => {
  return axios
    .post(`${ServerURL}/signin`, {
      mobile_number: `+91${mobile_number}`,
    })
    .then(function (response) {
      // handle success
      console.log('res' + JSON.stringify(response));
      return response;
    })
    .catch(function (error) {
      // handle error
      console.log(error + 'here' + JSON.stringify(error));
    });
};

export const GetProductList = () => {
  //const headers = {Authorization: `Bearer ${token}`};
  return axios
    .get(`${ServerURL}/getItemlist`)
    .then(function (response) {
      // handle success
      //console.log('res' + JSON.stringify(response));
      return response;
    })
    .catch(function (error) {
      // handle error
      console.log(error + 'here' + JSON.stringify(error));
    });
};

export const GetUserCartList = token => {
  // Define headers
  const headers = {
    Authorization: `Bearer ${token}`, // Replace `token` with your actual token variable
    'Content-Type': 'application/json',
  };

  return axios
    .post(`${ServerURL}/getCartList`, {}, {headers: headers})
    .then(function (response) {
      // handle success
      console.log('res:', JSON.stringify(response));
      return response;
    })
    .catch(function (error) {
      // handle error
      console.log('error:', error, 'details:', JSON.stringify(error));
    });
};

export const AddItemToCartList = (token, itemcode, UOM, QTY, price) => {
  // /console.log("add to cart param;"+ user_id + " "+ itemcode+ " "+UOM+" "+ QTY+ " "+price)
  const headers = {Authorization: `Bearer ${token}`};
  return axios
    .post(
      `${ServerURL}/addToCart`,
      {
        itemcode: itemcode,
        UOM: UOM,
        QTY: QTY,
        Price: price,
      },
      {headers: headers},
    )
    .then(function (response) {
      // handle success
      console.log('res' + JSON.stringify(response));
      return response;
    })
    .catch(function (error) {
      // handle error
      console.log(error + 'here' + JSON.stringify(error));
    });
};

export const DeleteCartItem = (token, itemcode, uom) => {
  const headers = {Authorization: `Bearer ${token}`};
  return axios
    .post(
      `${ServerURL}/deleteCartItem`,
      {
        itemcode: itemcode,
        uom: uom,
      },
      {headers: headers},
    )
    .then(function (response) {
      // handle success
      console.log('res' + JSON.stringify(response));
      return response;
    })
    .catch(function (error) {
      // handle error
      console.log(error + 'here' + JSON.stringify(error));
    });
};

export const AddShippingAddress = (
  token,
  house_no,
  street,
  city,
  state,
  pincode,
  landmark,
  Contact_NO,
  user_name,
  isprimary,
  District,
) => {
  const headers = {Authorization: `Bearer ${token}`};

  //console.log("usr:",house_no,street,city,state,pincode,landmark,Contact_NO,user_name,isprimary)

  return axios
    .post(
      `${ServerURL}/addShippingAddress`,
      {
        house_no: house_no,
        street: street,
        city: city,
        state: state,
        pincode: pincode,
        landmark: landmark,
        Contact_NO: Contact_NO,
        user_name: user_name,
        isprimary: isprimary,
        District: District,
      },
      {headers: headers},
    )
    .then(function (response) {
      // handle success
      console.log('res:', JSON.stringify(response));
      return response.data;
    })
    .catch(function (error) {
      // handle error
      console.log('error:', error, 'details:', JSON.stringify(error));
    });
};

export const GetUserShippingAddress = token => {
  // Define headers
  const headers = {
    Authorization: `Bearer ${token}`, // Replace `token` with your actual token variable
    'Content-Type': 'application/json',
  };

  return axios
    .post(`${ServerURL}/getShippingAddresses`, {}, {headers: headers})
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log('error:', error, 'details:', JSON.stringify(error));
    });
};

export const saveOrder = (
  token,
  Shipping_Address_Code,
  Total_Amount,
  Expected_Delivery_Date,
  payment_method,
  Delivery_Status,
  Items,
  remarks,
  deliveryAddress,
  deliveryContactno,
  DeliveryCharge,
  Bill_Amount,
) => {
  console.log('heress');
  const headers = {Authorization: `Bearer ${token}`};
  return axios
    .post(
      `${ServerURL}/saveOrder`,
      {
        Shipping_Address_Code: Shipping_Address_Code,
        Total_Amount: Total_Amount,
        Expected_Delivery_Date: Expected_Delivery_Date,
        payment_method: payment_method,
        Delivery_Status: Delivery_Status,
        items: Items,
        Remarks: remarks,
        Delivery_Address: deliveryAddress,
        Delivery_ContactNo: deliveryContactno,
        DeliveryCharge: DeliveryCharge,
        Bill_Amount: Bill_Amount,
      },
      {headers: headers},
    )
    .then(function (response) {
      // handle success
      console.log('res' + JSON.stringify(response));
      return response;
    })
    .catch(function (error) {
      // handle error
      console.log(error + 'here' + JSON.stringify(error));
    });
};

export const getUserOrders = token => {
  // Define headers
  const headers = {
    Authorization: `Bearer ${token}`, // Replace `token` with your actual token variable
    'Content-Type': 'application/json',
  };

  return axios
    .post(`${ServerURL}/getUserOrders`, {}, {headers: headers})
    .then(function (response) {
      // handle success
      console.log('res:', JSON.stringify(response));
      return response;
    })
    .catch(function (error) {
      // handle error
      console.log('error:', error, 'details:', JSON.stringify(error));
    });
};

export const getCurrentLocation = (lat, lng) => {
  const API_KEY = 'd4ce3761c83f43dfa0b45aa1c280bda7';
  return axios
    .get(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat},${lng}&key=${API_KEY}&limit=1`,
    )
    .then(function (response) {
      console.log('res:', JSON.stringify(response));
      return response;
    })
    .catch(function (error) {
      console.log('error:', error, 'details:', JSON.stringify(error));
    });
};

export const getAddressBasedonPincode = pincode => {
  return axios
    .get(`https://api.postalpincode.in/pincode/${pincode}`)
    .then(function (response) {
      //   console.log('res:', JSON.stringify(response));
      return response;
    })
    .catch(function (error) {
      console.log('error:', error, 'details:', JSON.stringify(error));
    });
};

export const CancelOrder = (token, Order_ID, cancellation_Reason) => {
  const headers = {Authorization: `Bearer ${token}`};
  return axios
    .put(
      `${ServerURL}/cancelOrder`,
      {
        Order_ID: Order_ID,
        Remarks_For_Cancellation: cancellation_Reason,
      },
      {headers: headers},
    )
    .then(function (response) {
      // handle success
      console.log('res' + JSON.stringify(response));
      return response;
    })
    .catch(function (error) {
      // handle error
      console.log(error + 'here' + JSON.stringify(error));
    });
};

export const deleteShippingAddress = (token, Address_Code) => {
  const headers = {Authorization: `Bearer ${token}`};
  return axios
    .post(
      `${ServerURL}/deleteShippingAddress`,
      {
        Address_Code: Address_Code,
      },
      {headers: headers},
    )
    .then(function (response) {
      // handle success
      console.log('res' + JSON.stringify(response));
      return response;
    })
    .catch(function (error) {
      // handle error
      console.log(error + 'here' + JSON.stringify(error));
    });
};

export const UpdateShippingAddress = (
  token,
  Address_Code,
  house_no,
  street,
  city,
  state,
  pincode,
  landmark,
  Contact_NO,
  user_name,
  isprimary,
  District,
) => {
  console.log('dist:' + District);
  // Define headers
  const headers = {
    Authorization: `Bearer ${token}`, // Replace `token` with your actual token variable
    'Content-Type': 'application/json',
  };

  return axios
    .put(
      `${ServerURL}/updateShippingAddress`,
      {
        Address_Code: Address_Code,
        house_no: house_no,
        street: street,
        city: city,
        state: state,
        pincode: pincode,
        landmark: landmark,
        Contact_NO: Contact_NO,
        user_name: user_name,
        isprimary: isprimary,
        District: District,
      },
      {headers: headers},
    )
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log('error:', error, 'details:', JSON.stringify(error));
    });
};

export const StoreFCMTokenServer = (userId, mobile_number, fcmtoken) => {
  //const headers = {Authorization: `Bearer ${token}`};
  console.log('started to store fcm token');
  const headers = {
    'Content-Type': 'application/json',
  };
  console.log('fcm token');
  return axios
    .post(
      `${ServerURL}/register-token`,
      {
        userId: userId,
        mobile_number: mobile_number,
        fcmtoken: fcmtoken,
      },
      {headers},
    )
    .then(function (response) {
      // handle success
      console.log('store fcm token res' + JSON.stringify(response));
      return response;
    })
    .catch(function (error) {
      // handle error
      console.log('fcm token error' + JSON.stringify(error));
    });
};

export const Delete_Account = user_id => {
  return axios
    .put(`${ServerURL}/deleteAccount`, {
      user_id: user_id,
      isActive: 0,
    })
    .then(function (response) {
      console.log('res' + JSON.stringify(response));
      return response;
    })
    .catch(function (error) {
      console.log(error + 'here' + JSON.stringify(error));
    });
};


export const getPaytmToken = () => {
  // Define headers
  const headers = {
    'Content-Type': 'application/json',
  };

  return axios
    .post(`${ServerURL}/create-payment-request`, {}, {headers: headers})
    .then(function (response) {
      // handle success
      console.log('res:', JSON.stringify(response));
      return response;
    })
    .catch(function (error) {
      // handle error
      console.log('error:', error, 'details:', JSON.stringify(error));
    });
};