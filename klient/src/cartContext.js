import { createContext, useEffect } from "react";
import { useState } from "react";
import Axios from "axios";

export const CartContext = createContext();
export const CartContextProvider = ({ children }) => {
  const [cartSpa, setCartSpa] = useState([]);
  const [cartSport, setCartSport] = useState([]);
  const [cartNocenje, setCartNocenje] = useState([]);

  const addCartSpa = async (inputs) => {
    setCartSpa((prev) => [...prev, inputs]);
  };
  const addCartSport = async (inputs) => {
    setCartSport((prev) => [...prev, inputs]);
  };
  const addCartNocenja = async (inputs) => {
    setCartNocenje((prev) => [...prev, inputs]);
  };
  const deleteCart = async (inputs) => {
    setCartSpa([]);
    setCartSport([]);
    setCartNocenje([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartSpa,
        cartSport,
        cartNocenje,
        addCartSpa,
        addCartSport,
        addCartNocenja,
        deleteCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
