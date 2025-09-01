import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios';
import { HiHeart } from "react-icons/hi2";

function AllRecipe() {
    const [Recipe, setRecipe] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:5000/recipe")
        .then(res=>{setRecipe(res.data)})
    },[])
  return (
    <>
    <div className='recipes-container'>
    <h2>All Recipe</h2>
    <div className='cards-warpper'>
        {Recipe?.map((Recipe,index)=>(
            <div className='recipes-card' key={index}>
              <img className='w-100' src={`http://localhost:5000/public/images/${Recipe.coverImage}`}></img>
               <h4> {Recipe?.title}</h4>
               <p> {Recipe?.ingredients}</p>
               <small>{Recipe?.instruction}</small>
               <div className='icons'><HiHeart />
              </div>
            </div>
        ))}
    </div>
    </div>
    </>
  )
}

export default AllRecipe