const express = require('express')
const path = require('path')
const fs = require('fs')

const router = express.Router();
const multer = require('multer')
const verifyToken = require("../middleware/auth");
// Créer le dossier s'il n'existe pas
const uploadDir = './public/images'
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    // Corriger le nom de fichier pour inclure l'extension
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const extension = path.extname(file.originalname)
    cb(null, uniqueName + extension)
  }
})

// Ajouter un filtre pour les images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Seules les images sont autorisées!'), false)
  }
}

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max
  }
})

const Recipe = require('../model/RecipeSchema')

router.get('/', async(req, res) => {
    try{
        const GetRecipe = await Recipe.find()
        res.status(200).json(GetRecipe)
    }catch(err){
        console.log(err)
        res.status(404).json({message : 'Not Found'})
    }
});

router.post('/', upload.single('coverImage'),verifyToken, async (req, res) => {
    try {
        console.log('Body:', req.body);
        console.log('File:', req.file);
        
        if (!req.body) {
            return res.status(400).json({ message: 'Body manquant' });
        }

        let { instruction, ingredients, title } = req.body;
        
        // Parser les ingredients s'ils sont en JSON string
        if (typeof ingredients === 'string') {
            try {
                ingredients = JSON.parse(ingredients);
            } catch (e) {
                // Si ce n'est pas du JSON, le traiter comme une chaîne
                ingredients = ingredients.split(',').map(ing => ing.trim());
            }
        }
        
        if (!instruction || !ingredients || !title) {
            return res.status(400).json({ message: 'Tous les champs sont requis' });
        }

        // Préparer les données de la recette
        const recipeData = {
            title,
            ingredients,
            instruction
        };

        // Ajouter l'image si elle existe
        if (req.file) {
            recipeData.coverImage = req.file.filename; // Stocker seulement le nom du fichier
        }

        console.log('Recipe data to save:', recipeData);

        const newRecipe = await Recipe.create(recipeData);

        res.status(201).json(newRecipe);
    } catch (error) {
        console.error('Erreur création recette:', error);
        
        // Supprimer le fichier uploadé en cas d'erreur
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Erreur suppression fichier:', err);
            });
        }
        
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

router.get("/:id", async(req,res) => {
    const {id} = req.params;
    try{
        const recipe = await Recipe.findById(id)
        if(!recipe){
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.status(200).json(recipe);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.put('/:id', upload.single('coverImage'), async(req,res) => {
    const {id} = req.params
    let { instruction, ingredients, title } = req.body;
    
    try{
        // Parser les ingredients s'ils sont en JSON string
        if (typeof ingredients === 'string') {
            try {
                ingredients = JSON.parse(ingredients);
            } catch (e) {
                ingredients = ingredients.split(',').map(ing => ing.trim());
            }
        }

        const updateData = {
            instruction, 
            ingredients, 
            title 
        };

        // Ajouter l'image si elle existe
        if (req.file) {
            updateData.coverImage = req.file.filename;
        }

        const updatedRecipe = await Recipe.findByIdAndUpdate(id, updateData, {
            new: true, 
            runValidators: true // Corriger la faute de frappe
        });

        if(!updatedRecipe){
            return res.status(404).json({ error: 'Recipe not found' });
        }
        
        res.status(200).json(updatedRecipe)
    }catch(err){
        console.error(err);
        
        // Supprimer le fichier uploadé en cas d'erreur
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Erreur suppression fichier:', err);
            });
        }
        
        res.status(500).json({ error: 'Internal Server Error' });
    }    
})

router.delete('/:id', async(req,res) => {
    const {id} = req.params;
    try{
        const deletedRecipe = await Recipe.findByIdAndDelete(id);
        if (!deletedRecipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        // Supprimer l'image associée si elle existe
        if (deletedRecipe.coverImage) {
            const imagePath = path.join('./public/images', deletedRecipe.coverImage);
            fs.unlink(imagePath, (err) => {
                if (err) console.error('Erreur suppression image:', err);
            });
        }

        res.status(200).json({message: 'Deleted successfully'})
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }   
})

module.exports = router;