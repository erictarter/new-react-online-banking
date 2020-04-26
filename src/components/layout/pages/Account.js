import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import React, { useContext, useState } from 'react';
import Nav from '../Nav';
import Showcase from '../Showcase';
import Footer from '../Footer';

// GLOBAL STATE

const Account = () => {
  const {
    firstName,
    lastName,
    checking,
    setChecking,
    savings,
    setSavings,
    total,
    setTotal
  } = useContext(Context);

  // COMPONENT STATE

  const [transferAmount, setTransferAmount] = useState(0);
  const [leavingInnerText, setLeavingInnerText] = useState('Savings');
  const [enteringInnerText, setEnteringInnerText] = useState('Checking');
  const [cap, setCap] = useState(0);
  const [alertTxt, setAlertText] = useState('Insufficient Funds!');
  const [checkingAmount, setCheckingAmount] = useState(
    parseInt(localStorage.getItem('checking'))
  );
  const [savingsAmount, setSavingsAmount] = useState(
    parseInt(localStorage.getItem('savings'))
  );

  const totalAmount = localStorage.getItem('total');
  const fName = localStorage.getItem('firstName');
  const lName = localStorage.getItem('lastName');
  const sAccountNum = localStorage.getItem('savingsAccountNumber');
  const cAccountNum = localStorage.getItem('checkingAccountNumber');

  // adds commas to numbers == 100 and over

  const thousands_separators = num => {
    var num_parts = num.toString().split('.');
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return num_parts.join('.');
  };

  // Function Shows Menu Options on Small Screens

  const showMenu = () => {
    const accountMenu = document.getElementById('account-menu');

    if (accountMenu.classList.contains('show')) {
      accountMenu.classList.remove('scale-0');
      accountMenu.classList.remove('hidden');
      accountMenu.classList.remove('show');
    } else {
      accountMenu.classList.add('scale-0');
      accountMenu.classList.add('hidden');
      accountMenu.classList.add('show');
    }
  };

  // Switches Account info to Savings

  const showSavings = () => {
    const row1 = document.getElementById('row-1');
    const row2 = document.getElementById('row-2');
    const row3 = document.getElementById('row-3');
    const header = document.getElementById('account-info-header');

    header.innerHTML =
      'Savings Account Info  <button class="py-2 px-4 bg-indigo-400 text-white rounded text-sm transition-colors duration-200 ease-out hover:bg-indigo-300 focus:outline-none" id="general-info">General Info</button';

    row1.innerHTML = `
    <p className='account-type'>Account Holder</p>
    <p className='amount'>${fName} ${lName}</p>
    `;
    row2.innerHTML = `
    <p className='account-type'>Account Number</p>
    <p className='amount'>#${sAccountNum}</p>
    `;
    row3.innerHTML = `
    <p className='account-type'>Amount in Savings</p>
    <p className='amount'> \$${thousands_separators(savingsAmount)}</p>
    `;

    // Switches back to default info

    document.getElementById('general-info').addEventListener('click', () => {
      header.innerHTML = `
      General Account Info
      `;

      row1.innerHTML = `
      <p className='account-type'>Checking</p>
      <p className='amount'>$${thousands_separators(checkingAmount)}</p>
      `;
      row2.innerHTML = `
      <p className='account-type'>Saving</p>
      <p className=''>$${thousands_separators(savingsAmount)}</p>
      `;
      row3.innerHTML = `
      <p className='account-type'>Total</p>
      <p className='amount'>$${thousands_separators(totalAmount)}</p>
      `;
    });
  };

  // Switches to Checking info

  const showChecking = () => {
    const row1 = document.getElementById('row-1');
    const row2 = document.getElementById('row-2');
    const row3 = document.getElementById('row-3');
    const header = document.getElementById('account-info-header');

    header.innerHTML = `Checking Account Info  <button class="py-2 px-4 bg-indigo-400 text-white rounded text-sm transition-colors duration-200 ease-out hover:bg-indigo-300 focus:outline-none" id='general-info'>General Info</button`;

    row1.innerHTML = `
    <p className='account-type'>Account Holder</p>
    <p className='amount'>${fName} ${lName}</p>
    `;
    row2.innerHTML = `
    <p className='account-type'>Account Number</p>
    <p className='amount'>#${cAccountNum}</p>
    `;
    row3.innerHTML = `
    <p className='account-type'>Amount in Checking</p>
    <p className='amount'> \$${thousands_separators(checkingAmount)}</p>


    `;

    console.log(checkingAmount);
    console.log(typeof checkingAmount);

    // Switches back to default info

    document.getElementById('general-info').addEventListener('click', () => {
      header.innerHTML = `
      General Account Info
      `;

      row1.innerHTML = `
      <p className='account-type'>Checking</p>
      <p className='amount'>$${thousands_separators(checkingAmount)}</p>
      `;
      row2.innerHTML = `
      <p className='account-type'>Saving</p>
      <p className=''>$${thousands_separators(savingsAmount)}</p>
      `;
      row3.innerHTML = `
      <p className='account-type'>Total</p>
      <p className='amount'>$${thousands_separators(totalAmount)}</p>
      `;
    });
  };

  // SHOW TRANSFER POPUP

  const transferPopup = () => {
    const transferPopup = document.getElementById('transfer-popup');
    transferPopup.classList.remove('hidden');
    transferPopup.classList.remove('scale-0');
  };

  // EXIT TRANSFER POPUP

  const exitPopup = () => {
    const transferPopup = document.getElementById('transfer-popup');
    setTimeout(() => {
      transferPopup.classList.add('hidden');
    }, 300);

    transferPopup.classList.add('scale-0');
  };

  // SWITCH INNER TEXT OF POPUP

  const switchInnerText = () => {
    const leaving = document.getElementById('leaving');
    const entering = document.getElementById('entering');

    if (leaving.innerText === 'Savings') {
      setLeavingInnerText('Checking');
      setEnteringInnerText('Savings');
    } else {
      setLeavingInnerText('Savings');
      setEnteringInnerText('Checking');
    }

    console.log(leavingInnerText);
  };

  // DECIDE WHERE TO ADD AND DETRACT AMOUNTS

  const transferMoney = () => {
    const confirmTransactionContainer = document.getElementById(
      'confirm-transaction-container'
    );
    const leaving = document.getElementById('leaving');
    const intTransferAmound = parseInt(transferAmount);

    if (leaving.innerText === 'Saving') {
      setCap(savingsAmount);
    } else {
      setCap(checkingAmount);
    }

    if (intTransferAmound > 0 && intTransferAmound <= cap) {
      confirmTransactionContainer.classList.remove('hidden');
    } else {
      // alert('Insufficient Funds!');
      alertMsg();
    }
  };

  const alertMsg = () => {
    const intTransferAmound = parseInt(transferAmount);
    const alertMsg = document.getElementById('alert-msg');

    if (intTransferAmound < 0) {
      setAlertText('Amount Must Be Above $0.00');
    } else {
      setAlertText('Insufficient Funds!');
    }

    alertMsg.classList.remove('transform');
    setTimeout(() => {
      alertMsg.classList.add('transform');
    }, 2000);
  };

  const confirmTransaction = () => {
    const leaving = document.getElementById('leaving');
    const entering = document.getElementById('entering');
    const transferPopup = document.getElementById('transfer-popup');
    const confirmTransactionContainer = document.getElementById(
      'confirm-transaction-container'
    );
    const inputValue = document.getElementById('input-value');
    const intTransferAmound = parseInt(transferAmount);

    if (leaving.innerText === 'Savings') {
      setSavingsAmount(savingsAmount - intTransferAmound);
      setCheckingAmount(checkingAmount + intTransferAmound);
    } else {
      setCheckingAmount(checkingAmount - intTransferAmound);
      setSavingsAmount(savingsAmount + intTransferAmound);
    }
    localStorage.removeItem('checking');

    transferPopup.classList.add('hidden');
    confirmTransactionContainer.classList.add('hidden');
    setTimeout(() => {
      localStorage.setItem('checking', `${checkingAmount}`);

      inputValue.value = 0;
    }, 100);
  };

  const cancelTransaction = () => {
    const confirmTransactionContainer = document.getElementById(
      'confirm-transaction-container'
    );
    confirmTransactionContainer.classList.add('hidden');
  };

  return (
    <div>
      <div>
        {/* LOGO */}

        <div className='logo-container flex justify-center relative'>
          <div className='logo ml-12 md:ml-2 md:absolute md:left-0 top-0'></div>
        </div>

        {/* NAV */}

        <div className='nav-container text-gray-700 text-xl md:border-b flex flex-row justify-center items-center md:flex md:flex-row md:justify-end md:mt-12 pt-5 pb-0 px-4'>
          <div className='home'>
            <button className='nav-item md:mr-2 rounded-sm transition-colors duration-300 ease-out hover:text-gray-600 hover:bg-indigo-100'>
              <Link href='' className='px-2' to='/'>
                <i className='fas fa-arrow-circle-left'></i> Back Home
              </Link>
            </button>
          </div>
          <div className='about'>
            <button className='nav-item md:mr-2 rounded-sm transition-colors duration-300 ease-out hover:text-gray-600 hover:bg-indigo-100'>
              <a href='' className='px-2'>
                About
              </a>
            </button>
          </div>{' '}
          <div className='contact'>
            <button className='nav-item rounded-sm md:pr-2 nav-item transition-colors duration-300 ease-out hover:text-gray-600 hover:bg-indigo-100'>
              <a href='' className='px-2'>
                Contact
              </a>
            </button>
          </div>{' '}
          <div className='profile'>
            <button
              className='nav-item rounded-sm px-2 md:hidden md:pr-2 nav-item transition-colors duration-300 ease-out hover:text-gray-600 hover:bg-indigo-100 focus:outline-none'
              onClick={showMenu}
            >
              <i className='fas fa-align-justify'></i>
            </button>
          </div>{' '}
        </div>

        {/* MENU ITEMS */}

        <div
          className='account-menu show hidden transform scale-0 md:transform scale-1 text-gray-700 text-3xl md:text-xl flex flex-col justify-center items-center md:flex md:flex-row md:justify-between md:mt-5 pt-5 pb-0 px-4'
          id='account-menu'
        >
          <div className='checkings'>
            <button
              className='nav-item md:mr-2 rounded-sm transition-colors duration-300 ease-out hover:text-gray-600 hover:bg-indigo-100 focus:outline-none'
              onClick={showChecking}
            >
              <i className='fas fa-money-check-alt'></i> Checking <br />
            </button>
          </div>
          <div className='savings'>
            <button
              className='nav-item md:mr-2 rounded-sm transition-colors duration-300 ease-out hover:text-gray-600 hover:bg-indigo-100 focus:outline-none'
              onClick={showSavings}
            >
              <i className='fas fa-piggy-bank'></i> Savings <br />
            </button>
          </div>
          <div className='transfers'>
            <button
              className='nav-item md:mr-2 rounded-sm transition-colors duration-300 ease-out hover:text-gray-600 hover:bg-indigo-100 focus:outline-none'
              onClick={transferPopup}
            >
              <i className='fas fa-exchange-alt'></i> Transfer
            </button>
          </div>{' '}
          <div className='settings'>
            <button className='nav-item md:mr-2 rounded-sm transition-colors duration-300 ease-out hover:text-gray-600 hover:bg-indigo-100 focus:outline-none'>
              <i className='fas fa-cog'></i> Settings
            </button>
          </div>{' '}
        </div>

        {/*TRANSFER POPUP  */}

        <div
          className='transfer-popup relative w-100 h-64 mx-20 mt-10 transform scale-0 hidden border-2 shadow-lg border-indigo-300 flex flex-col items-center justify-center transition-transform duration-100 ease-in'
          id='transfer-popup'
        >
          <div
            className='exit-transfer-popup absolute top-0 right-0 text-3xl pr-3 cursor-pointer transition-colors duration-200 ease-out hover:text-indigo-300'
            id='exit-transfer-popup'
            onClick={exitPopup}
          >
            <i className='fas fa-times'></i>
          </div>

          <div
            className='switch text-4xl cursor-pointer transition-colors duration-200 ease-out hover:text-indigo-200'
            onClick={switchInnerText}
          >
            <i className='fas fa-exchange-alt'></i>
          </div>
          <div
            className='select-transfer md:text-2xl text-lg'
            id='select-transfer'
          >
            From:{' '}
            <span className='text-blue-500' id='leaving'>
              {leavingInnerText}
            </span>{' '}
            -- To:{' '}
            <span className='text-blue-500' id='entering'>
              {enteringInnerText}
            </span>
          </div>
          <div className='transfer-amount text-2xl mb-2' id='transfer-amount'>
            <input
              id='input-value'
              className='input-value px-2 my-2 focus:outline-none'
              type='number'
              placeholder='enter amount'
              onChange={e => {
                setTransferAmount(e.target.value);
              }}
            />
          </div>
          <button
            className='transfer-btn bg-indigo-200 cursor-pointer rounded mb-2 px-4 py-2 text-lg border border-indigo-300 transition-colors duration-500 ease-in-out hover:bg-indigo-500 hover:text-white focus:outline-none'
            onClick={transferMoney}
          >
            Transfer Money
          </button>

          {/*INSUFFICIENT FUNDS ALERT POPUP */}
          <div
            className='alert-message absolute top-0 flex justify-center items-center w-64 h-20 bg-red-400 text-white border border-gray-400 shadow-md transform scale-0 transition-transform duration-300 ease-out'
            id='alert-msg'
          >
            <div className='exit-alert' id='exit alert'></div>
            <div className='message text-xl'>{alertTxt}</div>
          </div>

          {/* CONFIRM TRANSACTION */}
          <div
            className='confirm-transaction-container hidden absolute text-2xl flex justify-center items-center w-full h-full bg-white border-2 hidden'
            id='confirm-transaction-container'
          >
            <div
              className='confirm-transaction-container'
              id='confirm-transaction-container'
            >
              <button
                className='confirm-transaction-btn bg-blue-600 text-white rounded mx-3 py-3 px-6 border-2 transition-colors duration-200 ease-in hover:bg-blue-400 focus:outline-none'
                id='confirm-transaction-btn'
                onClick={confirmTransaction}
              >
                <i className='fas fa-check'></i> Confirm Transaction
              </button>
              <button
                className='confirm-transaction-btn bg-red-600 text-white rounded mx-3 py-3 px-8 border-2 transition-colors duration-200 ease-in hover:bg-red-400 focus:outline-none'
                id='confirm-transaction-btn'
                onClick={cancelTransaction}
              >
                {' '}
                <i className='fas fa-times'></i> Cancel Transaction
              </button>
            </div>
          </div>
        </div>

        {/*ACOUNT INFO  */}

        <div className='account-summery mb-10' id='account-container'>
          <h1
            className='account-summery text-2xl text-blue-700 text-center pt-10 pb-10'
            id='account-info-header'
          >
            General Account Info
          </h1>
          <div className='summery-container border border-2 max-w-full md:mb-20 p-4 md:mb-40'>
            <div
              className='summery-checking flex flex-row justify-between py-2'
              id='row-1'
            >
              <p className='account-type'>Checking</p>
              <p className='amount'>${thousands_separators(checkingAmount)}</p>
            </div>

            <div
              className='summery-savings flex flex-row justify-between py-2'
              id='row-2'
            >
              <p className='account-type'>Saving</p>
              <p className=''>${thousands_separators(savingsAmount)}</p>
            </div>
            <div
              className='total-balance flex flex-row justify-between py-2'
              id='row-3'
            >
              <p className='account-type'>Total</p>
              <p className='amount'>${thousands_separators(totalAmount)}</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Account;
