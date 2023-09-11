import mongoose from "mongoose";

const userVerificationSchema = mongoose.Schema(
    {
        userId: String,
        uniqueString: String,
        createdAt: Date,
        expiresAt:Date,
    }
)

const userVerification = mongoose.model("userVerification", userVerificationSchema)

export default userVerification