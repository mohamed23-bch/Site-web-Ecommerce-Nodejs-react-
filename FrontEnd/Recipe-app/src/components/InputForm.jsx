import React from 'react'
import { useState } from 'react';
import axios from 'axios';

function InputForm({ onSignUpClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handelSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset les messages
    setSuccess("");
    setIsLoading(true);
    
    try {
      // Envoi des données de connexion
      const response = await axios.post("http://localhost:5000/user/signin", {
        email: email,
        password: password
      });
      
      // Stockage du token et des données utilisateur
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      setSuccess("Connexion réussie ! Bienvenue !");
      console.log("Login successful:", response.data);
      
      // Optionnel: Fermer le modal après 1.5 secondes
      setTimeout(() => {
        // Ici vous pouvez fermer le modal ou rediriger
        window.location.reload(); // ou appeler une fonction pour fermer le modal
      }, 1500);
      
    } catch (error) {
      // Gestion des différents types d'erreurs
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else if (error.response && error.response.status === 401) {
        setError("Email ou mot de passe incorrect.");
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
        <h2>Login</h2>
        
        {/* Affichage des messages d'erreur */}
        {error && (
          <div className='alert alert-danger mt-3' style={{color: 'red', backgroundColor: '#ffe6e6', padding: '10px', borderRadius: '5px', border: '1px solid #ffcccc'}}>
            {error}
          </div>
        )}
        
        {/* Affichage des messages de succès */}
        {success && (
          <div className='alert alert-success mt-3' style={{color: 'green', backgroundColor: '#e6ffe6', padding: '10px', borderRadius: '5px', border: '1px solid #ccffcc'}}>
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
        <div className='text-center'>
          <button className='button mt-5 w-100' type='submit' disabled={isLoading}>
            {isLoading ? "Connexion en cours..." : "Login"}
          </button>
        </div>
        <p onClick={onSignUpClick} className='mt-5 text-center' style={{cursor: 'pointer', color: 'blue'}}>
          Don't have an account? Sign Up
        </p>
      </form>
    </>
  )
}

export default InputForm