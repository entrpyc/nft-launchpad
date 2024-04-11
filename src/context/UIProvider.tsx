import React, { useState, createContext } from 'react';

export type modalData = {
  price: string,
  src: string,
  id: string,
}

interface UIContextValue {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setModalData: React.Dispatch<React.SetStateAction<modalData>>
  modalData: modalData
}

const defaultValue = {
  modalIsOpen: false,
  setModalIsOpen: () => {},
  modalData: {
    price: '',
    src: '',
    id: '',
  },
  setModalData: () => {},
}

export const UIContext = createContext<UIContextValue>(defaultValue);

interface UIProviderProps {
  children: React.ReactNode;
}

export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState(defaultValue.modalData);

  return <UIContext.Provider value={{
    modalIsOpen, setModalIsOpen,
    modalData, setModalData,
  }}>
    {children}
  </UIContext.Provider>
}