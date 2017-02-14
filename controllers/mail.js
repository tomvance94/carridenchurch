const EmailHelper = require('sendgrid').mail;
const SendGrid = require('sendgrid')('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');

MailController = module.exports = {}

MailController.send = function(to, from, msgSubject, html){
    let fromEmail = new EmailHelper.Email(from);
    let toEmail = new EmailHelper.Email(to);
    let subject = msgSubject;
    let content = new EmailHelper.Content('text/html', html);
    let mail = new EmailHelper.Mail(fromEmail, subject, toEmail, content);

    let request = SendGrid.emptyRequest({
       method: 'POST',
       path: '/v3/mail/send',
       body: mail.toJSON()
    });

    SendGrid.API(request, function(err, resp){
    	console.log(err);
    	console.log(resp.body.errors);
    });
};
