import express from "express"
import { Movie } from "../models/movieModel.js"

const router = express.Router()



router.post('/', async(req,res)=> {
    try {
        if (
            !req.body.title ||
            !req.body.genre ||
            !req.body.description ||
            !req.body.release_date ||
            !req.body.director
        ) {
            return res.status(400).send({
                message: 'input all required fields: title, genre, description, release_date, director'
            })
        }
        const newMovie = {
            title: req.body.title,
            genre: req.body.genre,
            description: req.body.description,
            release_date: req.body.release_date,
            director: req.body.director,
            harga: req.body.harga
        }

        const movie = await Movie.create(newMovie)

        return res.status(201).send(movie)
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
        
    }
})

router.get('/', async(req,res)=>{
    try {
        const movies = await Movie.find({});

        return res.status(200).json({
            count : movies.length,
            data: movies
        })
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ messsage: error.message })
        
    }
})

router.put('/:id', async(req,res)=> {
    try {
       if (
        !req.body.title||
        !req.body.genre||
        !req.body.description
       ) {
        return res.status(400).send({
            message: 'send all required fields title, genre , description'
        })
       }

       const {id} = req.params
       const result = await Movie.findByIdAndUpdate(id, req.body)
       if (!result){
        return res.status(404).json({message: 'movie not found'})
       }
       return res.status(200).send({ message: 'movie updated succesfully'})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message:error.message})
        
    }
})

router.delete('/:id', async(req,res)=> {
    try {
       const {id} = req.params
       const result = await Movie.findByIdAndDelete(id)
       if (!result){
        return res.status(404).json({message: 'movie not found'})
       }
       return res.status(200).send({ message: 'movie deleted succesfully'})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message:error.message})
        
    }
})
router.get('/:id', async(req,res)=>{
    try {
        const { id } = req.params
        const movie = await Movie.findById(id);

        return res.status(200).json({movie})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ messsage: error.message })
        
    }
})

export default router