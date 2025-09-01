import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddRecipe() {
    const [recipe, setRecipe] = useState({
        title: '',
        ingredients: [],
        instruction: ''
    });
    const navigate = useNavigate();

    const onHandleChange = (e) => {
        let val = (e.target.name === "ingredients" 
            ? e.target.value.split(",").map(ingredient => ingredient.trim())
            :(e.target.name === "coverImage") ? e.target.files[0] : e.target.value);
        
        setRecipe(prev => ({ ...prev, [e.target.name]: val }));
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            console.log('Données envoyées:', recipe);
            
            await axios.post("http://localhost:5000/recipe/", recipe, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization':`Bearer ${localStorage.getItem("token")}`
                }
            });
            
            navigate("/");
        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error.response?.data || error.message);
        }
    }

    return (
        <>
            <form onSubmit={onHandleSubmit} className='input-form w-50 m-auto'>
                <input 
                    onChange={onHandleChange} 
                    name='title' 
                    type="text" 
                    className='form-control mt-3' 
                    placeholder='Title'
                    value={recipe.title}
                    required
                />
                <textarea 
                    onChange={onHandleChange} 
                    rows="4" 
                    name='ingredients' 
                    className='form-control mt-3' 
                    placeholder='Ingrédients (séparés par des virgules)'
                    value={recipe.ingredients.join(', ')}
                    required
                />
                <textarea 
                    onChange={onHandleChange} 
                    rows="4" 
                    name='instruction' 
                    className='form-control mt-3' 
                    placeholder='Instructions'
                    value={recipe.instruction}
                    required
                />
                 <input 
                    onChange={onHandleChange} 
                    name='coverImage' 
                    className='form-control mt-3' 
                    placeholder='coverImage'
                    type='file'
                />

                <button className='button mt-5 w-100' type='submit'>
                    Add Recipe
                </button>
            </form>
        </>
    )
}

export default AddRecipe