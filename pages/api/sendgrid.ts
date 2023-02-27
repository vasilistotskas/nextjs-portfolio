import sendgrid, { ResponseError } from '@sendgrid/mail'

const apiKey = process.env.SENDGRID_API_KEY || ''
const myEmail = process.env.MY_EMAIL || ''
const myWebSiteEmail = process.env.MY_WEBSITE_EMAIL || ''
const myName = process.env.MY_NAME || ''
const myRole = process.env.MY_ROLE || ''
const myMobile = process.env.MY_MOBILE || ''
const myWebSite = process.env.NEXT_PUBLIC_CANONICAL_URL || ''
const myGithubUrl = process.env.NEXT_PUBLIC_GITHUB_URL || ''
const myInstagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || ''
const myLinkedInUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || ''
const myTwitterUrl = process.env.NEXT_PUBLIC_TWITTER_URL || ''

sendgrid.setApiKey(apiKey)

async function sendEmail(req, res) {
	try {
		await sendgrid.send({
			to: myWebSiteEmail, // Your email where you'll receive emails
			from: myEmail, // your website email address here
			subject: `[Lead from website] : ${req.body.subject} - ${req.body.email}`,
			html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en">
				<head>
					<meta charset="utf-8">
					<title>The HTML5 Herald</title>
					<meta name="description" content="The HTML5 Herald">
					<meta name="author" content="SitePoint">
					<meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
					<link rel="stylesheet" href="css/styles.css?v=1.0">
				</head>
      
				<body>
					<div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';"></div>
					<div class="container" style="margin-left: 20px;margin-right: 20px;">
						<h3>You've got a new mail from ${req.body.fullName}, their email is: ✉️${req.body.email} </h3>
						<div style="font-size: 16px;">
							<p><strong>Message</strong>:</p>
							<p>${req.body.message}</p>
							<br>
						</div>
						<img src="${myWebSite}/static/favicons/mstile-150x150.png" class="logo-image" style="height: 50px;width: 50px;border-radius: 5px;overflow: hidden;">
						<p class="footer" style="font-size: 16px;padding-bottom: 20px;border-bottom: 1px solid #D1D5DB;">Regards<br>${myName}<br>${myRole}<br>${myMobile}</p>
						<div class="footer-links" style="display: flex;justify-content: center;align-items: center;">
							<a title="Website" href="${myWebSite}" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Website</a>
							<a title="Blog" href="${myWebSite}/blog/" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Blog</a>
							<a title="GitHub" href="${myGithubUrl}" style="text-decoration: none;margin: 8px;color: #9CA3AF;">GitHub</a>
							<a title="Instagram" href="${myInstagramUrl}" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Instagram</a>
							<a title="LinkedIn" href="${myLinkedInUrl}" style="text-decoration: none;margin: 8px;color: #9CA3AF;">LinkedIn</a>
							<a title="Twitter" href="${myTwitterUrl}" style="text-decoration: none;margin: 8px;color: #9CA3AF;">Twitter</a>
						</div>
					</div>
				</body>
      </html>`
		})
	} catch (error) {
		const sendGridError = error as ResponseError
		if (sendGridError.response) {
			console.error(sendGridError.response.body)
			return res.status(500).send(sendGridError.response.body)
		}
	}

	return res.status(200).json({ error: '' })
}

export default sendEmail
