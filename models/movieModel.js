import mongoose from "mongoose";

const movieSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        genre: [{
            type:  mongoose.Types.ObjectId,
            required: true,
        }],
        description: {
            type: String,
            required: true,
        },
        release_date: {
            type: Number,
            required: true,
        },
        director : {
            type: String,
            required: true,
        },
        cast : [{
            type:  mongoose.Types.ObjectId,
            required: true,
        }],
       
        
        
    },
    {
        timestamps: true,
    }
)

const Movie = mongoose.model('Movie', movieSchema)

export default Movie