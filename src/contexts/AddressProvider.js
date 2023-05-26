import { createContext, useContext, useState } from "react";
import { addAddressService } from "../services/address-services/addAddressService";

const AddressContext = createContext();

export function AddressProvider({ children }) {
  const [addressForm, setAddressForm] = useState({
    _id: "",
    name: "",
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phone: "",
  });

  const [editAddressIndex, setEditAddressIndex] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  return (
    <AddressContext.Provider
      value={{
        editAddressIndex,
        setEditAddressIndex,
        addressForm,
        setAddressForm,
        isAddressModalOpen,
        setIsAddressModalOpen,
        isEdit,
        setIsEdit,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}

export const useAddress = () => useContext(AddressContext);
