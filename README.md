# Workfolio - Portfolio Website

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 🚀 Next.js 15 with App Router
- 💎 TypeScript for type safety
- 🎨 Tailwind CSS for styling
- 📱 Fully responsive design
- 🌙 Dark/Light theme support
- 📧 Contact form with Gmail integration
- ⚡ Optimized performance
- 🔍 SEO optimized

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd workfolio/headless
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure Gmail SMTP (see Gmail Setup section below)**

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

## Gmail SMTP Setup for Contact Form

The contact form uses Gmail SMTP with Nodemailer for sending emails. Follow these steps:

### 1. Enable 2-Factor Authentication
- Go to your [Google Account settings](https://myaccount.google.com/)
- Navigate to "Security" → "2-Step Verification"
- Enable 2-factor authentication if not already enabled

### 2. Generate App Password
- In Google Account settings, go to "Security"
- Click "2-Step Verification"
- Scroll down and click "App passwords"
- Select "Mail" and "Other (Custom name)"
- Enter "Portfolio Contact Form"
- Copy the 16-character password generated

### 3. Configure Environment Variables
Create or update your `.env.local` file:

```env
# Gmail SMTP Configuration
GMAIL_USER=your-gmail@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Update Portfolio Configuration
In `data/portfolio.ts`, ensure your email is correctly set:

```typescript
export const contactConfig = {
  fromEmail: "your-gmail@gmail.com",
  recipientEmail: "your-gmail@gmail.com",
  // ... other config
};
```

### 5. Features

✅ **Main Contact Email**: You receive detailed contact information with stunning design
✅ **Auto-Reply Email**: Sender gets a professional thank you confirmation
✅ **Email Validation**: Client and server-side validation
✅ **Error Handling**: Comprehensive error handling with user-friendly messages
✅ **Security**: Uses Gmail App Password (not your main password)
✅ **Professional Design**: Beautiful HTML email templates

### 6. Email Templates

The contact form sends two emails:
- **Contact Email**: Sent to you with the inquiry details
- **Auto-Reply**: Sent to the sender confirming receipt

Both emails feature:
- Modern, professional design
- Mobile-responsive layout
- Excellent readability
- Branded styling

### 7. Troubleshooting

**"Invalid login" error:**
- Verify your Gmail address in `GMAIL_USER`
- Ensure you're using the App Password, not your regular password
- Check that 2-factor authentication is enabled

**"Connection refused" error:**
- Check your internet connection
- Verify Gmail SMTP settings (smtp.gmail.com:587)

**Emails not received:**
- Check spam/junk folder
- Verify recipient email in `portfolio.ts`
- Check Gmail quota limits

## Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint

# Type checking
npm run type-check
```

### Project Structure

```
headless/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── contact/       # Contact form API
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── email-templates/   # Email HTML templates
│   ├── sections/         # Page sections
│   └── ui/               # UI components
├── data/                 # Static data
│   └── portfolio.ts      # Portfolio configuration
├── lib/                  # Utility libraries
├── public/              # Static assets
└── types/               # TypeScript types
```

## Customization

### Portfolio Content
Edit `data/portfolio.ts` to customize:
- Personal information
- Projects and experience
- Skills and certifications
- Contact information
- Email templates

### Styling
- Global styles: `app/globals.css`
- Component styles: Tailwind CSS classes
- Theme configuration: `tailwind.config.ts`

### Email Templates
Customize email design in `components/email-templates/contact-email.tsx`:
- HTML structure and styling
- Email subjects and content
- Branding and colors

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
The application works on any platform supporting Node.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Technologies Used

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Email**: Nodemailer + Gmail SMTP
- **Icons**: React Icons
- **Deployment**: Vercel

## License

MIT License - feel free to use this project for your own portfolio!

---

Built with ❤️ by Sumit Jangid
