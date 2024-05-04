import { NextResponse } from "next/server"
import sendEmail from "@/lib/mailer.js"


export async function GET() {
    sendEmail();
    const result = "Hello, World! This is CRON route."

    return NextResponse.json({ data: result })
}