import React, { createContext, useState } from 'react';

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [checking, setChecking] = useState(Math.floor(Math.random() * 10100));
  const [savings, setSavings] = useState(Math.floor(Math.random() * 10100));
  const [total, setTotal] = useState(savings + checking);
  const [checkingAccountNumber, setCheckingAccountNumber] = useState(
    Math.floor(Math.random() * 10000) + 14300
  );
  const [savingsAccountNumber, setSavingsAccountNumber] = useState(
    Math.floor(Math.random() * 10000) + 34300
  );

  const value = {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    password2,
    setPassword2,
    checking,
    setChecking,
    savings,
    setSavings,
    total,
    setTotal,
    checkingAccountNumber,
    setCheckingAccountNumber,
    savingsAccountNumber,
    setSavingsAccountNumber
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, ContextProvider };
