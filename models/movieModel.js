import mongoose from "mongoose";

const movieSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        genre: {
            type: String,
            required: true,
        },
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
        harga : {
            type: Array
        }
       
        
        
    },
    {
        timestamps: true,
    }
)

export const Movie = mongoose.model('Movie', movieSchema)