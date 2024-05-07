import sendEmail from "@/lib/mailer"
import { NextResponse } from "next/server"
// import sendEmail from "@/lib/mailer.js"
import nodemailer from "nodemailer"

export async function GET() {
    console.log("before fn")
    try {
      console.log("cronjob hit")
        var transport = nodemailer.createTransport({
            host: "bulk.smtp.mailtrap.io",
            port: 587,
            auth: {
              user: "api",
              pass: process.env.MAILTRAP_PASSWORD,
            }
          });

          const info = await transport.sendMail({
            from: 'info@talentcornertaskmanager.com',
            to: "me@gmail.com",
            bcc:["veerendragumate@gmail.com","veerendraforwork@gmail.com"],
            subject: "Test Email: This is a Test Message ✔",
            text: "This is a test email message to check the email sending functionality.",
            html: "<p><B>CRON JOBS via Vercel.json(NEXT_AUTH PROJECT)</B></p>",
        });

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
    console.log("after fn")
    const result = "Hello, World! This is CRON route."

    return NextResponse.json({ data: result })
}