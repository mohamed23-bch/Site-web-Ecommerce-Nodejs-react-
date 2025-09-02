import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HiHeart } from 'react-icons/hi';
import { HiPencil } from 'react-icons/hi';
import { AiFillDelete } from 'react-icons/ai';

function MyRecipe() {
  const [Recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyrecipes = async () => {  
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        const { data } = await axios.get("http://localhost:5000/recipe");
        console.log("Toutes les recettes:", data);
        console.log("User ID:", user._id || user.id);
        
        // Essayer avec user._id ET user.id pour être sûr
        const Myrecipe = data.filter(recipe => 
          recipe.createdBy === user._id || recipe.createdBy === user.id
        );
        
        console.log("Mes recettes filtrées:", Myrecipe);
        setRecipe(Myrecipe);
      } catch (error) {
        console.error("Erreur lors du chargement des recettes:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMyrecipes();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }
  
  const onDeleteRecipes = async(id)=>{
    await axios.delete(`http://localhost:5000/recipe/${id}`)
    .then((res)=> console.log(res))
    setRecipe(prev => prev.filter(r => r._id !== id))
  }

  return (
    <>
      <div className='recipes-container'>
        <h2>My Recipe</h2>
        {Recipe.length === 0 ? (
          <p>No Recipes Found.</p>
        ) : (
          <div className='row'>
            {Recipe?.map((recipe, index) => (
              <div className='col-lg-3 col-md-6 col-sm-12 mb-4' key={recipe._id || index}>
                <div className='recipes-card'>
                  <img 
                    className='w-100' 
                    src={`http://localhost:5000/public/images/${recipe.coverImage}`}
                    alt={recipe.title}
                  />
                  <h4>{recipe?.title}</h4>
                  <p>
                    {Array.isArray(recipe?.ingredients) 
                      ? recipe.ingredients.join(', ') 
                      : recipe?.ingredients
                    }
                  </p>
                  <small>{recipe?.instruction}</small>
                  
                    <HiHeart className='icons' />
                    <div className='mt-2 icons-down'>
                    <AiFillDelete onClick={()=> onDeleteRecipes(recipe._id)} className='iconse'/>
                    <a href={`/editrecipe/${recipe._id}`}><HiPencil className='iconse'/></a>
                    </div>
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default MyRecipe;