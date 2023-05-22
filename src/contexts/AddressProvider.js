import { createContext, useContext, useState } from "react";

const AddressContext = createContext();

export function AddressProvider({ children }) {
  //   const [address, setAddress] = useState({
  //     isAddressModalOpen: false,
  //     currentAddress: {
  //       name: "",
  //       street: "",
  //       city: "",
  //       state: "",
  //       country: "",
  //       pincode: "",
  //       phone: "",
  //     },
  //   });

  const [addressForm, setAddressForm] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phone: "",
  });

  const [editAddressIndex, setEditAddressIndex] = useState([]);

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const [addresses, setAddresses] = useState([
    {
      name: "Chirag",
      street: "Model Town",
      city: "Yamunanagar",
      state: "Haryana",
      country: "India",
      pincode: "135001",
      phone: "9717239115",
    },
  ]);

  return (
    <AddressContext.Provider
      value={{
        editAddressIndex,
        setEditAddressIndex,
        addresses,
        setAddresses,
        addressForm,
        setAddressForm,
        isAddressModalOpen,
        setIsAddressModalOpen,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}

export const useAddress = () => useContext(AddressContext);
