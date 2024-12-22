import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://saimukhesh9870:saimukhesh9870@cluster0.qig04.mongodb.net/food-del').then(()=> console.log("db connected"));
}