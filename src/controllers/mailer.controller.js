import nodemailer from "nodemailer";

export const sendEmail = async (req, res) => {
    // console.log(req.body);
    // destructuring req.body:
    const { name, email, phone, subject, message } = req.body;

    // cuerpo del email
    const contentHTML = `
            <html>
            <h1>Mensaje de contacto a ZenshinDojo</h1>
            <hr/>
            <ul>
                <li>Nombre: ${name}</li>
                <li>Email: ${email}</li>
                <li>Teléfono: ${phone}</li>
                <li>Asunto: ${subject}</li>
            </ul>
            <hr/>
            <p>${message}</p>
            </html>
        `;

    // TODO guardar configuración en variable de entorno
    /*const transporter = nodemailer.createTransport({
            host: '',
            port: 26,
            secure: false,
            auth: {
                user: 'test@zenshindojo.com',
                pass: 'contraseña'
            }
        })*/
    // ethereal.mail testing
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: "elias.bergstrom@ethereal.email",
            pass: "wf5erA4duzv5Vuz6WR",
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    // reenvía el correo del smtp server a un correo electrónico personal
    await transporter.sendMail(
        {
            from: "ethereal server <elias.bergstrom@ethereal.email>",
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
