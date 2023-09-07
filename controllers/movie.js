import Movie from "../models/movieModel.js"
import mongodb from 'mongodb'
import mongoose from "mongoose"
const {ObjectId} = mongodb
const ctrl = {}

ctrl.addMovie = async(req,res) => {
    try {
        if (
            !req.body.title ||
            !req.body.genre ||
            !req.body.description ||
            !req.body.release_date ||
            !req.body.director||
            !req.body.cast
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
            cast: req.body.cast
        }

        const movie = await Movie.create(newMovie)

        return res.status(201).send(movie)
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
        
    }
}

ctrl.getMovie = async (req, res)=> {
    try {
        const movies = await Movie.aggregate([{$lookup: {from: "genres", localField:"genre", foreignField: "_id", as: "genre"}}]);

        return res.status(200).json({
            count : movies.length,
            data: movies
        })
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ messsage: error.message })
        
    }
}

ctrl.updateMovie = async (req,res) => {
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
}

ctrl.deleteMovie = async (req,res) => {
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
}

ctrl.getMovieById = async(req,res) => {
    try {
        const  id = req.params.id
        const movie = await Movie.aggregate([
            {$match : {_id: new mongoose.Types.ObjectId(id)}},
            {$lookup: {from: "genres", localField:"genre", foreignField: "_id", as: "genre"}},
            {$lookup: {from: "casts", localField:"cast", foreignField: "_id", as: "cast"}}
            
        ]);

        return res.status(200).json({movie})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ messsage: error.message })
        
    }
}

export default ctrl