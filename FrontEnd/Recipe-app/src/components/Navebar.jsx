import React from 'react'
import logo from '../assets/84263f2c-1cdc-4801-936c-db1409ae3936_removalai_preview.png'
import { useState } from 'react'
import Model from './Model';
import InputForm from './InputForm';
import InputFormSignIn from './InputFormSignIn';
import { useEffect } from 'react';

function Navebar() {
  const [isOpen, setIsOpen] = useState(false);
  let token = localStorage.getItem("token");
  const [Login, setLogin] = useState(token ? true : false)
  const [showSignUp, setShowSignUp] = useState(false); // État pour gérer quel formulaire afficher
  useEffect(()=>{
    setLogin(token ? true : false);

  },[token])
  const checkLogin = () => {
    if(token)
    {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setLogin(true);
    }
    else{
      setIsOpen(true);
      setShowSignUp(false); // Toujours commencer par le formulaire de connexion
    }
    
  }

  const closeModel = () => {
    setIsOpen(false);
    setShowSignUp(false); // Reset quand on ferme
  }

  const toggleToSignUp = () => {
    setShowSignUp(true);
  }

  const toggleToLogin = () => {
    setShowSignUp(false);
  }

  const handelProtectedRoute = (e) =>{
    if (!Login){
      e.preventDefault();
      setIsOpen(true);
    }
  }
  return (
    <>
      <header>
        <nav className='navbar'>
          <div className='logo'>
            <img src={logo} alt="Logo" />
          </div>
          <ul className='nav-links'>
            <li><a href="/">Home</a></li>
            <li onClick={handelProtectedRoute}><a href={Login ? "/myrecipe" : "/"}>My Recipes</a></li>
             <li onClick={handelProtectedRoute}><a href={Login ? "/favrecipe" : "/"}>Favourites</a></li>
            <li><a href="/contact">contact</a></li>
            <button onClick={checkLogin}>{(Login) ? "Logout" : "Login"}</button>
          </ul>
        </nav>
      </header>
      
      {isOpen && (
        <Model onClose={closeModel}>
          {!showSignUp ? (
            <InputForm onSignUpClick={toggleToSignUp} />
          ) : (
            <InputFormSignIn onLoginClick={toggleToLogin} />
          )}
        </Model>
      )}
    </>
  )
}

export default Navebar