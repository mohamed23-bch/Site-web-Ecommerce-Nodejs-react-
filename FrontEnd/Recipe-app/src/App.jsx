import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React from 'react';
import Home from './page/Home';
import Navebar from './components/Navebar';
import MyRecipe from './components/MyRecipe';
import FavRecipe from './components/FavRecipe';
import AddRecipe from './components/AddRecipe';

export default function App() {
  return (
    <BrowserRouter>
    <Navebar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myrecipe" element={<MyRecipe />} />
        <Route path="/favrecipe" element={<FavRecipe />} />
        <Route path="/addrecipe" element={<AddRecipe />} />
      </Routes>
    </BrowserRouter>
  );
}