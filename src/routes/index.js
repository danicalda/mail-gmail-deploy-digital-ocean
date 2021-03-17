const { Router } = require('express');
const nodemailer = require('nodemailer');
const router = Router();

router.post('/send-email', async (req, res) => {
    const { name, email, phone, message } = req.body;

    contentHTML =`
            <h1>User Information</h1>  
            <ul>
                <li>Username: ${name}</li>
                <li>User Email: ${email}</li>
                <li>Phone: ${phone}</li>
            </ul>    
            <p>${message}</p>          
    `;

    const transporter = nodemailer.createTransport({
        host: 'mail.danicalda.com',
        port: 25,
        secure: false,  
        auth: {
            user: 'project@danicalda.com',
            pass: 'Sabadell_01'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const info = await transporter.sendMail({
            from: "'Danicalda Server' <project@danicalda.com", 
            to: 'danielcalderocamp@gmail.com',
            subject: 'WebSite Contact Form',
            html: contentHTML
    });

    console.log('Message sent', info.messageId);

    res.redirect('/success.html');
});

module.exports = router;
