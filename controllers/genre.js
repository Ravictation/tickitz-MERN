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

ctrl.getGenre = async (req, res) => {
    try {
        const genre = await Genre.find({});
        if (!genre || genre.length === 0) {
            return res.status(404).json({
                status: "failed",
                message: "genre not found"
            });
        }

        res.status(200).json({
            status: "success",
            data: {
                genre
            }
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: "failed",
            message: "error when getting genre"
        });
    }
};

export default ctrl