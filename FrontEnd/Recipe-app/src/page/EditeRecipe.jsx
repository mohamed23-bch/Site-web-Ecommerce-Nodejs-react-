import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditeRecipe() {
    const [recipe, setRecipe] = useState({
        title: '',
        ingredients: [],
        instruction: '',
        coverImage: null
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/recipe/${id}`);
                const res = response.data;
                setRecipe({
                    title: res.title,
                    ingredients: res.ingredients,
                    instruction: res.instruction,
                    coverImage: res.coverImage ? res.coverImage : null
                });
            } catch (error) {
                console.error('Erreur lors de la récupération:', error);
            }
        }
        
        getRecipe();
    }, [id]);

    const onHandleChange = (e) => {
        let val;
        
        if (e.target.name === "ingredients") {
            val = e.target.value.split(",").map(ingredient => ingredient.trim());
        } else if (e.target.name === "coverImage") {
            val = e.target.files[0];
        } else {
            val = e.target.value;
        }
        
        setRecipe(prev => ({ ...prev, [e.target.name]: val }));
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Créer un FormData pour gérer le fichier
            const formData = new FormData();
            formData.append('title', recipe.title);
            formData.append('ingredients', JSON.stringify(recipe.ingredients));
            formData.append('instruction', recipe.instruction);
            if (recipe.coverImage && recipe.coverImage instanceof File) {
                formData.append('coverImage', recipe.coverImage);
            }

            console.log('Données envoyées:', recipe);
            
            // Utiliser PUT pour la modification au lieu de POST
            await axios.put(`http://localhost:5000/recipe/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
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
                    value={Array.isArray(recipe.ingredients) ? recipe.ingredients.join(', ') : ''}
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
                    placeholder='Cover Image'
                    type='file'
                    accept='image/*'
                />

                <button className='button mt-5 w-100' type='submit'>
                    Edit Recipe
                </button>
            </form>
        </>
    )
}

export default EditeRecipe;