import { Resend } from 'resend';


interface MailData {
	from: string;
	to: string;
	subject: string;
	html: string;
}

const resend = new Resend(process.env.RESEND_API_KEY || '');

export const sendMail = async (Data: MailData) => {

	const { data, error } = await resend.emails.send({
		from: Data.from,
		to: Data.to,
		subject: Data.subject,
		html: Data.html,
	});

	if (error) {
		throw new Error(`Failed to send email: ${error.message}`);
	}
	console.log('Email sent successfully ID:', data);
};
