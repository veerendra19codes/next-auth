import { connectToDB } from "@/lib/connectToDB";
import  models  from "@/lib/models";
const User = models.User;
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
    try {
        await connectToDB();

        const {username, email, password } = await req.json();
        console.log("new franchise:", {username, password, email});

        const exists = await User.findOne({username});

        if(exists) {
            return NextResponse.json({message: "Username or Email already exists"},{status:500});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username,
            email,
            password: hashedPassword,
        });

        return NextResponse.json({message:"User registered successfully"}, {status: 201});
    }
    catch(err) {
        console.log("Error while registering user in route.js", err);
        
        return NextResponse.json({message: "Error in registered user in route.js"}, {status: 501});
    }
}
