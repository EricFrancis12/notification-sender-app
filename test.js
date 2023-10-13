const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID = '384888565374-b7d9fh53l599b8kgkanokor3fnivkb68.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04IQtgmEb0NlDCgYIARAAGAQSNwF-L9Ir_YzXAyPso77G0nUGqSigZFXAPdlBACtUC4eR8_ZFULqsWhO2-X6W-fakpH6I7JBHcoo';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'notifsenderapp@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        const mailOptions = {
            from: 'Notification Sender APp <notifsenderapp@gmail.com>',
            to: 'ericerlenmeyer@gmail.com',
            subject: 'hello from gmail API !!!!',
            text: 'Yo - what up bro????',
            html: 'Yo - what up bro????'
        };

        const mailResult = await transport.sendMail(mailOptions);
        return mailResult;
    } catch (err) {
        return err;
    }
}

sendMail()
    .then(result => console.log('Email successfully sent', result))
    .catch(err => console.error(err));
