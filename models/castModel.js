import mongoose from "mongoose";

const castSchema = mongoose.Schema(
    {
        castname:{
            type: String,
            required:true,
        }
    }, {
        timestamps:true
    }
)

const Cast = mongoose.model("Cast", castSchema)

export default Cast