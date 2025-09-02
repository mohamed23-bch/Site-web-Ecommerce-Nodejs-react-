import React, { useState } from 'react';
import AllRecipe from '../components/AllRecipe';
import { useNavigate } from 'react-router-dom';
import Model from '../components/Model';
import InputForm from '../components/InputForm';
import InputFormSignIn from '../components/InputFormSignIn';
import { FaHeart, FaSearch, FaStar, FaUsers, FaUtensils, FaGlobe } from 'react-icons/fa';
import '../App.css'
function Home() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [isOpen, setopen] = useState(false);
  const navigate = useNavigate();

  const toggleToSignUp = () => {
    setShowSignUp(true);
  };

  const toggleToLogin = () => {
    setShowSignUp(false);
  };

  const closeModel = () => {
    setopen(false);
    setShowSignUp(false);
  };

  const addRecipes = () => {
    let token = localStorage.getItem("token");
    if(token) {
      navigate("/addrecipe");
    } else {
      setopen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Hero Section Moderne */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/50 to-amber-100/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Contenu gauche */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-full text-sm font-semibold">
                🍽️ Partagez vos recettes préférées
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                Découvrez et Partagez{' '}
                <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                  des Recettes
                </span>{' '}
                Extraordinaires
              </h1>
              
              <p className="text-lg text-gray-600 max-w-2xl">
                Rejoignez notre communauté de passionnés de cuisine. Partagez vos créations culinaires, 
                découvrez de nouvelles saveurs et inspirez-vous des recettes du monde entier.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={addRecipes}
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold rounded-full hover:from-orange-500 hover:to-orange-600 transform hover:-translate-y-1 transition-all shadow-lg hover:shadow-xl"
                >
                  📖 Partager ma Recette
                </button>
                <button className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-500 font-semibold rounded-full border-2 border-orange-500 hover:bg-orange-500 hover:text-white transform hover:-translate-y-1 transition-all">
                  🔍 Découvrir les Recettes
                </button>
              </div>
              
              {/* Statistiques */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">1000+</div>
                  <div className="text-gray-600 font-medium">Recettes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">500+</div>
                  <div className="text-gray-600 font-medium">Chefs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">50+</div>
                  <div className="text-gray-600 font-medium">Pays</div>
                </div>
              </div>
            </div>
            
            {/* Image droite */}
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600" 
                  alt="Délicieux plat" 
                  className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl"
                />
                
                {/* Cartes flottantes */}
                <div className="absolute -top-4 -left-4 bg-white p-4 rounded-2xl shadow-lg animate-bounce">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🥗</span>
                    <span className="font-semibold text-gray-700">Recettes Saines</span>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-2xl shadow-lg animate-bounce" style={{animationDelay: '1s'}}>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">⭐</span>
                    <span className="font-semibold text-gray-700">Top Rated</span>
                  </div>
                </div>
                
                <div className="absolute top-1/2 -right-8 bg-white p-4 rounded-2xl shadow-lg animate-bounce" style={{animationDelay: '2s'}}>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">👨‍🍳</span>
                    <span className="font-semibold text-gray-700">Chefs Experts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave Separator */}
      <div className="relative">
        <svg className="w-full h-20" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V120Z" fill="#ff9560"/>
        </svg>
      </div>

      {/* Section des recettes avec fond moderne */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Toutes les Recettes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez notre collection de recettes soigneusement sélectionnées par notre communauté de chefs passionnés
            </p>
          </div>
          
          {/* Votre composant AllRecipe existant */}
          <AllRecipe />
        </div>
      </section>

      {/* Modal avec votre logique existante */}
      {isOpen && (
        <Model onClose={closeModel}>
          {!showSignUp ? (
            <InputForm onSignUpClick={toggleToSignUp} />
          ) : (
            <InputFormSignIn onLoginClick={toggleToLogin} />
          )}
        </Model>
      )}
    </div>
  );
}

export default Home;