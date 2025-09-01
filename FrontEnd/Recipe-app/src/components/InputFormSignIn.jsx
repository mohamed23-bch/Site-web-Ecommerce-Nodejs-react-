import React from 'react'
import { useState } from 'react';
import axios from 'axios';

function InputFormSignIn({ onLoginClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handelSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset les messages
    setSuccess("");
    setIsLoading(true);
    
    try {
      // Envoi des données d'inscription
      const response = await axios.post("http://localhost:5000/user/register", {
        email: email,
        password: password,
        tel: tel,
        Username: username
      });
      
      // Stockage du token et des données utilisateur
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      setSuccess("Inscription réussie ! Vous êtes maintenant connecté.");
      console.log("Registration successful:", response.data);
      
      // Optionnel: Rediriger après 2 secondes
      setTimeout(() => {
        onLoginClick(); // ou fermer le modal
      }, 2000);
      
    } catch (error) {
      // Gestion des différents types d'erreurs
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else if (error.response && error.response.status === 400) {
        setError("Données invalides. Veuillez vérifier vos informations.");
      } else if (error.request) {
        setError("Impossible de contacter le serveur. Vérifiez votre connexion.");
      } else {
        setError("Une erreur inattendue s'est produite.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <form className='input-form' onSubmit={handelSubmit}>
        <h2>Sign Up</h2>
        
        {/* Affichage des messages d'erreur */}
        {error && (
          <div className='alert alert-danger mt-3' style={{color: 'red', backgroundColor: '#ffe6e6', padding: '10px', borderRadius: '5px'}}>
            {error}
          </div>
        )}
        
        {/* Affichage des messages de succès */}
        {success && (
          <div className='alert alert-success mt-3' style={{color: 'green', backgroundColor: '#e6ffe6', padding: '10px', borderRadius: '5px'}}>
            {success}
          </div>
        )}
        
        <input 
          onChange={(e) => setEmail(e.target.value)} 
          className='form-control mt-3' 
          type='email' 
          placeholder='Email' 
          name='email'
          value={email}
          required
          disabled={isLoading}
        />
        <input 
          onChange={(e) => setPassword(e.target.value)} 
          className='form-control mt-3' 
          type='password' 
          placeholder='Password' 
          name='password'
          value={password}
          required
          disabled={isLoading}
        />
        <input 
          onChange={(e) => setTel(e.target.value)} 
          className='form-control mt-3' 
          type='tel' 
          placeholder='Telephone...' 
          name='tel'
          value={tel}
          required
          disabled={isLoading}
        />
        <input 
          onChange={(e) => setUsername(e.target.value)} 
          className='form-control mt-3' 
          type='text' 
          placeholder='Username...' 
          name='username'
          value={username}
          required
          disabled={isLoading}
        />
        <div className='text-center'>
          <button className='button mt-5 w-100' type='submit' disabled={isLoading}>
            {isLoading ? "Inscription en cours..." : "Sign Up"}
          </button>
        </div>
        
        <p onClick={onLoginClick} className='mt-5 text-center' style={{cursor: 'pointer', color: 'blue'}}>
          Already have an account? Login
        </p>
      </form>
    </>
  )
}

export default InputFormSignIn