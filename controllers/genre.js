import Genre from "../models/genreModel.js";

const ctrl = {}

ctrl.addGenre = async(req,res)=> {
    try {
        const newGenre = {
            genrename: req.body.genrename
        }

        const genre = await Genre.create(newGenre)
        return res.status(201).json({
            message: "success add genre",
            genre
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
}

export default ctrl