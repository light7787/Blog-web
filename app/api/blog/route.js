import { connectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";

const getDatabaseConnection = async () => {
    try {
        await connectDB();
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        throw new Error("Database connection failed");
    }
};

// API Endpoint to get all blogs or a specific blog by ID
export async function GET(request) {
    await getDatabaseConnection(); // Ensure DB connection is established
    try {
        const blogId = request.nextUrl.searchParams.get("id");

        if (blogId) {
            const blog = await BlogModel.findById(blogId);
            return NextResponse.json(blog);
        } else {
            const blogs = await BlogModel.find({});
            return NextResponse.json({ blogs });
        }
    } catch (error) {
        console.error("GET request failed:", error);
        return NextResponse.json({ success: false, msg: "Failed to process GET request" }, { status: 500 });
    }
}

// API Endpoint for uploading blogs
export async function POST(req) {
    await getDatabaseConnection(); // Ensure DB connection is established
    try {
        const formData = await req.formData();
        console.log("Form data received:", formData);

        const image = formData.get('image');
        const imageByteData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByteData);

        const blogData = {
            title: formData.get('title'),
            description: formData.get('description'),
            category: formData.get('category'),
            author: formData.get('author'),
            image: buffer,  // Store the image binary data in MongoDB
            authorImg: formData.get('authorImg')
        };

        console.log("Blog data to be saved:", blogData);

        await BlogModel.create(blogData);
        console.log("Blog saved successfully");

        return NextResponse.json({ success: true, msg: "Blog added" });
    } catch (error) {
        console.error("POST request failed:", error);
        return NextResponse.json({ success: false, msg: "Failed to add blog", error: error.message }, { status: 500 });
    }
}

// API endpoint to DELETE blog
export async function DELETE(request) {
    await getDatabaseConnection(); // Ensure DB connection is established
    try {
        const id = request.nextUrl.searchParams.get('id');

        // Find the blog to delete
        const blog = await BlogModel.findById(id);

        // Delete the blog from MongoDB
        await BlogModel.findByIdAndDelete(id);
        console.log("Blog deleted successfully");

        return NextResponse.json({ msg: "Blog Deleted" });
    } catch (error) {
        console.error("DELETE request failed:", error);
        return NextResponse.json({ success: false, msg: "Failed to delete blog", error: error.message }, { status: 500 });
    }
}
