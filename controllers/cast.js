import Cast from "../models/castModel.js";

const ctrl ={}

ctrl.addCast = async (req,res) => {
    try {
        const newCast = {
            castname: req.body.castname
        }
        const cast = await Cast.create(newCast)
        return res.status(201).json({
            message:"success add cast",
            cast
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: error.message
        })
    }
}

ctrl.getCast = async (req,res) => {
    try {
        const cast = await Cast.find({})
        return res.status(201).json({
            data: cast
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: error.message
        })
    }
}

export default ctrl