import nodemailer from "nodemailer";

export const sendEmail = async (req, res) => {
    // console.log(req.body);
    // destructuring req.body:
    const { name, email, phone, subject, message } = req.body;

    // cuerpo del email
    const contentHTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>message</title>
            </head>
            <body>
            <h1>Mensaje de contacto a ZenshinDojo</h1>
            <hr/>
            <ul>
                <li>Nombre: ${name}</li>
                <li>Email: ${email}</li>
                <li>Telefono: ${phone}</li>
                <li>Asunto: ${subject}</li>
            </ul>
            <hr/>
            <p>${message}</p>
            </body>            
            </html>
        `;

    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    // reenvía el correo del smtp server a un correo electrónico personal
    await transporter.sendMail(
        {
            from: "user:test@zenshindojo.com",
            to: "trufa80@gmail.com",
            subject: "Website Contact Form",
            text: contentHTML,
        },
        (err, info) => {
            if (err) {
                console.log("Error occurred. " + err.message);
                return process.exit(1);
            }

            console.log("Message sent: %s", info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        }
    );

    // console.log(contentHTML);
    res.json({ message: "Gracias por su mensaje. En breve nos pondremos en contacto con usted." });
};
