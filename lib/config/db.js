import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://chinu123:XiT4kAaPF4rRyWEJ@cluster0.2gsdhxf.mongodb.net/blog-app?retryWrites=true&w=majority&appName=Cluster0');
    console.log("DB Connected")
}

