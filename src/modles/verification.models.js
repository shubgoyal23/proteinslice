import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const verificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    code: {
        type: String
    }
},{timestamps: true})

verificationSchema.pre("save", async function(next){
    if(!this.isModified("code")) return next()

    this.code = await bcrypt.hash(this.code, 10)
    next()
})

verificationSchema.methods.checkCode = async function(code){
    return await bcrypt.compare(code, this.code)
}

export const Verification = mongoose.model("verification", verificationSchema) 