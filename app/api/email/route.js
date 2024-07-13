import { connectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";


const LoadDB = async () => {
    try {
        await connectDB();
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        throw new Error("Database connection failed");
    }
};

LoadDB();

export async function POST(req) {
    try {
        const email = await req.json();
        await EmailModel.create(email);
        return NextResponse.json({ success: true,msg: "Email added" });
    } catch (error) {
        console.error("POST request failed:", error);
        return NextResponse.json({ success: false, msg: "Failed to add email", error: error.message }, { status: 500 });
    }
}
export async function GET() {
    try {
        const emails = await EmailModel.find({});
        return NextResponse.json({ success: true, data: emails });
    } catch (error) {
        console.error("GET request failed:", error);
        return NextResponse.json({ success: false, msg: "Failed to fetch emails", error: error.message }, { status: 500 });
    }
}