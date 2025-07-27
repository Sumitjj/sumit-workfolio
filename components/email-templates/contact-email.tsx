interface ContactEmailData {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  submittedAt?: Date;
}

interface PortfolioOwner {
  name: string;
  website: string;
  email: string;
  title: string;
}

// Professional stunning contact email template (HTML string)
export const generateContactEmailHtml = (
  data: ContactEmailData,
  portfolioOwner: PortfolioOwner,
  subjects: Record<string, string>
): string => {
  const submissionTime = data.submittedAt || new Date();

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Form Submission</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #1f2937;
      margin: 0;
      padding: 20px;
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f8fafc 100%);
      min-height: 100vh;
    }
    
    .email-container {
      max-width: 700px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 
        0 25px 50px -12px rgba(0, 0, 0, 0.1),
        0 0 0 1px rgba(59, 130, 246, 0.1);
      position: relative;
      border: 1px solid rgba(59, 130, 246, 0.1);
    }
    
    .email-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: linear-gradient(90deg, 
        #3b82f6 0%, 
        #2563eb 25%, 
        #1d4ed8 50%, 
        #1e40af 75%, 
        #1e3a8a 100%);
      animation: priority-flow 3s ease-in-out infinite;
    }
    
    @keyframes priority-flow {
      0%, 100% { 
        opacity: 1;
        transform: translateX(0);
      }
      50% { 
        opacity: 0.8;
        transform: translateX(2px);
      }
    }
    
    .header {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      padding: 60px 40px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    
    .header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
      animation: header-glow 10s ease-in-out infinite;
    }
    
    @keyframes header-glow {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.8; }
    }
    
    .header-content {
      position: relative;
      z-index: 2;
    }
    
    .header h1 {
      margin: 0 0 20px 0;
      font-size: 48px;
      font-weight: 800;
      color: #ffffff;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      letter-spacing: -0.02em;
      font-family: 'Space Grotesk', sans-serif;
    }
    
    .header .subtitle {
      margin: 0 0 30px 0;
      font-size: 18px;
      color: rgba(255, 255, 255, 0.9);
      font-weight: 500;
      font-family: 'Inter', sans-serif;
      letter-spacing: 0.02em;
    }
    
    .priority-badge {
      display: inline-block;
      padding: 12px 28px;
      background: rgba(255, 255, 255, 0.15);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50px;
      font-size: 13px;
      font-weight: 700;
      color: #ffffff;
      font-family: 'Space Grotesk', sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      backdrop-filter: blur(10px);
      animation: priority-pulse 2s ease-in-out infinite;
    }
    
    @keyframes priority-pulse {
      0%, 100% { 
        transform: scale(1);
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
      }
      50% { 
        transform: scale(1.02);
        box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
      }
    }
    
    .content {
      padding: 50px 40px;
      background: #ffffff;
      color: #374151;
    }
    
    .alert-box {
      background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
      border: 2px solid #3b82f6;
      border-left: 6px solid #2563eb;
      color: #1e40af;
      padding: 32px;
      border-radius: 20px;
      margin-bottom: 40px;
      text-align: center;
      position: relative;
    }
    
    .alert-box::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, transparent 100%);
      border-radius: 20px;
      pointer-events: none;
    }
    
    .alert-box h2 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 14px;
      font-family: 'Space Grotesk', sans-serif;
      color: #1e40af;
      position: relative;
      z-index: 1;
    }
    
    .alert-box p {
      font-size: 16px;
      margin: 0;
      font-weight: 500;
      line-height: 1.7;
      color: #1f2937;
      position: relative;
      z-index: 1;
    }
    
    .info-section {
      margin-bottom: 40px;
    }
    
    .section-title {
      font-size: 24px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 28px;
      font-family: 'Space Grotesk', sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      position: relative;
      padding-bottom: 12px;
    }
    
    .section-title::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 80px;
      height: 4px;
      background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
      border-radius: 2px;
    }
    
    .contact-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }
    
    .contact-item {
      background: #f8fafc;
      border: 2px solid #e2e8f0;
      border-radius: 16px;
      padding: 28px;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .contact-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    }
    
    .contact-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(59, 130, 246, 0.15);
      border-color: #3b82f6;
      background: #f0f9ff;
    }
    
    .contact-label {
      display: flex;
      align-items: center;
      font-weight: 600;
      color: #6b7280;
      margin-bottom: 12px;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-family: 'Space Grotesk', sans-serif;
    }
    
    .contact-icon {
      margin-right: 12px;
      font-size: 18px;
      color: #3b82f6;
    }
    
    .contact-value {
      font-size: 18px;
      color: #1f2937;
      font-weight: 600;
      word-break: break-word;
      font-family: 'Inter', sans-serif;
      line-height: 1.5;
    }
    
    .message-section {
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      border: 2px solid #3b82f6;
      border-left: 6px solid #2563eb;
      color: #1f2937;
      padding: 36px;
      border-radius: 20px;
      margin: 40px 0;
      position: relative;
    }
    
    .message-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, transparent 100%);
      border-radius: 20px;
      pointer-events: none;
    }
    
    .message-section .section-title {
      color: #1e40af;
      margin-bottom: 24px;
      position: relative;
      z-index: 1;
    }
    
    .message-section .section-title::after {
      background: linear-gradient(90deg, #1e40af 0%, #3b82f6 100%);
    }
    
    .message-content {
      background: #ffffff;
      padding: 32px;
      border-radius: 16px;
      font-size: 16px;
      line-height: 1.8;
      color: #374151;
      white-space: pre-wrap;
      font-family: 'Inter', sans-serif;
      border: 2px solid #e5e7eb;
      font-weight: 400;
      position: relative;
      z-index: 1;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
    
    .footer {
      background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
      color: #ffffff;
      padding: 50px 40px;
      text-align: center;
    }
    
    .timestamp-box {
      background: rgba(255, 255, 255, 0.1);
      display: inline-block;
      padding: 16px 32px;
      border-radius: 50px;
      font-size: 14px;
      color: #e5e7eb;
      margin-bottom: 40px;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 500;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .action-section {
      margin: 40px 0;
    }
    
    .action-title {
      font-size: 22px;
      color: #ffffff;
      margin-bottom: 32px;
      font-weight: 600;
      font-family: 'Space Grotesk', sans-serif;
    }
    
    .action-links {
      display: flex;
      flex-direction: column;
      gap: 20px;
      max-width: 23rem;
      margin: 0 auto;
    }
    
    .action-link {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      text-decoration: none;
      padding: 20px 24px;
      border-radius: 16px;
      font-weight: 600;
      font-size: 16px;
      transition: all 0.3s ease;
      font-family: 'Inter', sans-serif;
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      text-align: center;
    }
    
    .action-link:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
      box-shadow: 0 8px 32px rgba(255, 255, 255, 0.1);
    }
    
    .action-link .icon {
      margin-right: 12px;
      font-size: 18px;
    }
    
    .action-link.primary {
      background: rgba(59, 130, 246, 0.2);
      border-color: rgba(59, 130, 246, 0.4);
      color: #ffffff;
    }
    
    .action-link.primary:hover {
      background: rgba(59, 130, 246, 0.3);
      border-color: rgba(59, 130, 246, 0.5);
      box-shadow: 0 8px 32px rgba(59, 130, 246, 0.2);
    }
    
    .action-link.secondary {
      background: rgba(5, 150, 105, 0.2);
      border-color: rgba(5, 150, 105, 0.4);
      color: #ffffff;
    }
    
    .action-link.secondary:hover {
      background: rgba(5, 150, 105, 0.3);
      border-color: rgba(5, 150, 105, 0.5);
      box-shadow: 0 8px 32px rgba(5, 150, 105, 0.2);
    }
    
    .divider {
      height: 1px;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(255, 255, 255, 0.2) 20%, 
        rgba(255, 255, 255, 0.4) 50%, 
        rgba(255, 255, 255, 0.2) 80%, 
        transparent 100%);
      margin: 40px 0;
    }
    
    .footer-info {
      font-size: 14px;
      color: #d1d5db;
      font-family: 'Inter', sans-serif;
      line-height: 1.7;
    }
    
    .footer-info p {
      margin-bottom: 8px;
    }
    
    .footer-info p:last-child {
      margin-bottom: 0;
    }
    
    .footer-info a {
      color: #60a5fa;
      text-decoration: none;
      font-weight: 600;
    }
    
    .footer-info a:hover {
      color: #3b82f6;
      text-decoration: underline;
    }
    
    @media only screen and (max-width: 768px) {
      body {
        padding: 15px;
      }
      
      .email-container {
        border-radius: 20px;
      }
      
      .header {
        padding: 40px 30px;
      }
      
      .content, .footer {
        padding: 40px 30px;
      }
      
      .header h1 {
        font-size: 36px;
      }
      
      .contact-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }
      
      .action-links {
        gap: 16px;
        max-width: 100%;
      }
    }
    
    @media only screen and (max-width: 480px) {
      body {
        padding: 10px;
      }
      
      .header, .content, .footer {
        padding: 30px 20px;
      }
      
      .header h1 {
        font-size: 32px;
      }
      
      .contact-item, .alert-box, .message-section {
        padding: 24px;
      }
      
      .contact-grid {
        grid-template-columns: 1fr;
      }
      
      .action-link {
        padding: 18px 20px;
        font-size: 15px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <div class="header-content">
        <h1>🚀 NEW CONTACT!</h1>
        <p class="subtitle">Someone wants to connect with you</p>
        <div class="priority-badge">HIGH PRIORITY</div>
      </div>
    </div>
    
    <div class="content">
      <div class="alert-box">
        <h2>🎉 Exciting News!</h2>
        <p>You've received a new message through your portfolio website. Here are the complete contact details and message information:</p>
      </div>
      
      <div class="info-section">
        <h3 class="section-title">📋 Contact Information</h3>
        
        <div class="contact-grid">
          <div class="contact-item">
            <div class="contact-label">
              <span class="contact-icon">👤</span>
              Full Name
            </div>
            <div class="contact-value">${data.name}</div>
          </div>
          
          <div class="contact-item">
            <div class="contact-label">
              <span class="contact-icon">📧</span>
              Email Address
            </div>
            <div class="contact-value">${data.email}</div>
          </div>
          
          ${data.company ? `
          <div class="contact-item">
            <div class="contact-label">
              <span class="contact-icon">🏢</span>
              Company
            </div>
            <div class="contact-value">${data.company}</div>
          </div>
          ` : ''}
          
          <div class="contact-item">
            <div class="contact-label">
              <span class="contact-icon">🎯</span>
              Inquiry Type
            </div>
            <div class="contact-value">
              ${subjects[data.subject] || subjects.default || data.subject}
            </div>
          </div>
        </div>
      </div>
      
      <div class="message-section">
        <h3 class="section-title">💬 Message Content</h3>
        <div class="message-content">${data.message}</div>
      </div>
    </div>
    
    <div class="footer">
      <div class="timestamp-box">
        📅 Received: ${submissionTime.toLocaleDateString()} at ${submissionTime.toLocaleTimeString()}
      </div>
      
      <div class="action-section">
        <h3 class="action-title">Quick Actions</h3>
        <div class="action-links">
          <a href="mailto:${data.email}?subject=Re: ${subjects[data.subject] || data.subject}" class="action-link primary">
            <span class="icon">📧</span>
            Reply to ${data.name}
          </a>
          
          <a href="${portfolioOwner.website}" class="action-link secondary">
            <span class="icon">🌐</span>
            View Portfolio
          </a>
        </div>
      </div>
      
      <div class="divider"></div>
      
      <div class="footer-info">
        <p><strong>This message was sent from your portfolio contact form</strong></p>
        <p>Website: <a href="${portfolioOwner.website}">${portfolioOwner.website}</a></p>
        <p>© ${new Date().getFullYear()} ${portfolioOwner.name} - All rights reserved</p>
      </div>
    </div>
  </div>
</body>
</html>`;
};

// Professional stunning auto-reply email template (HTML string)
export const generateAutoReplyEmailHtml = (
  name: string,
  portfolioOwner: PortfolioOwner
): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Thank You - Message Received!</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #064e3b;
      margin: 0;
      padding: 20px;
      background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%);
      min-height: 100vh;
    }
    
    .email-container {
      max-width: 700px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 
        0 25px 50px -12px rgba(34, 197, 94, 0.1),
        0 0 0 1px rgba(34, 197, 94, 0.1);
      position: relative;
      border: 1px solid rgba(34, 197, 94, 0.2);
    }
    
    .email-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: linear-gradient(90deg, 
        #10b981 0%, 
        #22c55e 25%, 
        #34d399 50%, 
        #6ee7b7 75%, 
        #a7f3d0 100%);
      animation: success-wave 3s ease-in-out infinite;
    }
    
    @keyframes success-wave {
      0%, 100% { 
        opacity: 1;
        filter: brightness(1);
      }
      50% { 
        opacity: 0.8;
        filter: brightness(1.1);
      }
    }
    
    .header {
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      padding: 60px 40px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    
    .header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
      animation: success-glow 8s ease-in-out infinite;
    }
    
    @keyframes success-glow {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.9; transform: scale(1.01); }
    }
    
    .header-content {
      position: relative;
      z-index: 2;
    }
    
    .header h1 {
      margin: 0 0 20px 0;
      font-size: 48px;
      font-weight: 800;
      color: #ffffff;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      letter-spacing: -0.02em;
      font-family: 'Space Grotesk', sans-serif;
    }
    
    .header .subtitle {
      margin: 0 0 30px 0;
      font-size: 18px;
      color: rgba(255, 255, 255, 0.9);
      font-weight: 500;
      font-family: 'Inter', sans-serif;
      letter-spacing: 0.02em;
    }
    
    .status-badge {
      display: inline-block;
      padding: 12px 28px;
      background: rgba(255, 255, 255, 0.15);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50px;
      font-size: 13px;
      font-weight: 700;
      color: #ffffff;
      font-family: 'Space Grotesk', sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      backdrop-filter: blur(10px);
      animation: confirm-pulse 2s ease-in-out infinite;
    }
    
    @keyframes confirm-pulse {
      0%, 100% { 
        transform: scale(1);
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
      }
      50% { 
        transform: scale(1.02);
        box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
      }
    }
    
    .content {
      padding: 50px 40px;
      background: #ffffff;
      color: #065f46;
    }
    
    .thank-you-section {
      background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
      border: 2px solid #22c55e;
      border-left: 6px solid #16a34a;
      color: #065f46;
      padding: 36px;
      border-radius: 20px;
      margin-bottom: 40px;
      text-align: center;
      position: relative;
    }
    
    .thank-you-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, transparent 100%);
      border-radius: 20px;
      pointer-events: none;
    }
    
    .thank-you-section h2 {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 18px;
      font-family: 'Space Grotesk', sans-serif;
      color: #047857;
      position: relative;
      z-index: 1;
    }
    
    .thank-you-section p {
      font-size: 17px;
      margin-bottom: 16px;
      font-weight: 500;
      line-height: 1.7;
      color: #064e3b;
      position: relative;
      z-index: 1;
    }
    
    .thank-you-section p:last-child {
      margin-bottom: 0;
    }
    
    .info-box {
      background: #f0fdf4;
      border: 2px solid #22c55e;
      border-left: 6px solid #16a34a;
      border-radius: 16px;
      padding: 32px;
      margin: 32px 0;
      position: relative;
    }
    
    .info-box::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(34, 197, 94, 0.03) 0%, transparent 100%);
      border-radius: 16px;
      pointer-events: none;
    }
    
    .info-box h3 {
      font-size: 24px;
      color: #047857;
      margin-bottom: 16px;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      position: relative;
      z-index: 1;
    }
    
    .info-box p {
      margin: 0;
      color: #065f46;
      font-size: 16px;
      line-height: 1.7;
      position: relative;
      z-index: 1;
      font-weight: 500;
    }
    
    .highlight-text {
      background: linear-gradient(135deg, #bbf7d0 0%, #86efac 100%);
      border: 2px solid #34d399;
      color: #064e3b;
      padding: 32px;
      border-radius: 20px;
      text-align: center;
      margin: 32px 0;
      box-shadow: 0 8px 25px rgba(34, 197, 94, 0.1);
      position: relative;
    }
    
    .highlight-text::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(52, 211, 153, 0.05) 0%, transparent 100%);
      border-radius: 20px;
      pointer-events: none;
    }
    
    .highlight-text p {
      font-size: 22px;
      font-weight: 700;
      margin: 0;
      font-family: 'Space Grotesk', sans-serif;
      color: #047857;
      position: relative;
      z-index: 1;
    }
    
    .signature-section {
      background: #f9fafb;
      border: 2px solid #e5e7eb;
      border-left: 6px solid #22c55e;
      color: #374151;
      padding: 32px;
      border-radius: 16px;
      margin: 32px 0;
      position: relative;
    }
    
    .signature-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(34, 197, 94, 0.02) 0%, transparent 100%);
      border-radius: 16px;
      pointer-events: none;
    }
    
    .signature-section .label {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 12px;
      font-family: 'Space Grotesk', sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      position: relative;
      z-index: 1;
    }
    
    .signature-section .name {
      font-size: 28px;
      font-weight: 700;
      color: #047857;
      margin-bottom: 6px;
      font-family: 'Space Grotesk', sans-serif;
      position: relative;
      z-index: 1;
    }
    
    .signature-section .title {
      color: #374151;
      font-size: 16px;
      font-weight: 500;
      position: relative;
      z-index: 1;
    }
    
    .footer {
      background: linear-gradient(135deg, #065f46 0%, #047857 100%);
      color: #ffffff;
      padding: 50px 40px;
      text-align: center;
    }
    
    .footer-links {
      display: flex;
      flex-direction: column;
      gap: 20px;
      max-width: 400px;
      margin: 0 auto 32px auto;
    }
    
    .footer-link {
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid rgba(255, 255, 255, 0.2);
      color: #ffffff;
      text-decoration: none;
      padding: 20px 24px;
      border-radius: 16px;
      font-weight: 600;
      font-size: 16px;
      transition: all 0.3s ease;
      font-family: 'Inter', sans-serif;
      backdrop-filter: blur(10px);
      text-align: center;
    }
    
    .footer-link:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
      box-shadow: 0 8px 32px rgba(255, 255, 255, 0.1);
    }
    
    .footer-link .icon {
      margin-right: 12px;
      font-size: 18px;
    }
    
    .footer-info {
      font-size: 14px;
      color: #d1fae5;
      font-family: 'Inter', sans-serif;
      line-height: 1.7;
    }
    
    .footer-info p {
      margin-bottom: 8px;
      font-weight: 500;
    }
    
    .footer-info p:last-child {
      margin-bottom: 0;
    }
    
    .footer-info strong {
      color: #ffffff;
      font-weight: 600;
    }
    
    @media only screen and (max-width: 768px) {
      body {
        padding: 15px;
      }
      
      .email-container {
        border-radius: 20px;
      }
      
      .header {
        padding: 40px 30px;
      }
      
      .content, .footer {
        padding: 40px 30px;
      }
      
      .header h1 {
        font-size: 36px;
      }
      
      .footer-links {
        gap: 16px;
        max-width: 100%;
      }
    }
    
    @media only screen and (max-width: 480px) {
      body {
        padding: 10px;
      }
      
      .header, .content, .footer {
        padding: 30px 20px;
      }
      
      .header h1 {
        font-size: 32px;
      }
      
      .thank-you-section, .info-box, .highlight-text, .signature-section {
        padding: 24px;
      }
      
      .footer-link {
        padding: 18px 20px;
        font-size: 15px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <div class="header-content">
        <h1>🙏 THANK YOU!</h1>
        <p class="subtitle">Message successfully received and confirmed</p>
        <div class="status-badge">CONFIRMED ✓</div>
      </div>
    </div>
    
    <div class="content">
      <div class="thank-you-section">
        <h2>Hi ${name}! 🎉</h2>
        <p>
          <strong>Thank you for reaching out through my portfolio!</strong> Your message has been successfully received 
          and I'm genuinely excited to learn more about your project, opportunity, or collaboration idea.
        </p>
        <p>
          I truly appreciate your interest in my work and look forward to discussing how we can work together 
          to bring your vision to life with innovative solutions and exceptional results.
        </p>
      </div>
      
      <div class="info-box">
        <h3>⏰ What happens next?</h3>
        <p>
          <strong>Quick Response Guaranteed:</strong> I typically respond to all inquiries within 24 hours during business days. 
          In the meantime, feel free to explore my latest projects, certifications, and technical achievements 
          on the portfolio website to get a better understanding of my capabilities and experience.
        </p>
      </div>
      
      <div class="highlight-text">
        <p>🚀 Looking forward to our conversation and potential collaboration!</p>
      </div>
      
      <div class="signature-section">
        <div class="label">Warm regards,</div>
        <div class="name">${portfolioOwner.name}</div>
        <div class="title">${portfolioOwner.title}</div>
      </div>
    </div>
    
    <div class="footer">
      <div class="footer-links">
        <a href="${portfolioOwner.website}" class="footer-link">
          <span class="icon">🌐</span>
          Explore Portfolio
        </a>
        <a href="mailto:${portfolioOwner.email}" class="footer-link">
          <span class="icon">📧</span>
          Direct Email
        </a>
      </div>
      
      <div class="footer-info">
        <p><strong>© ${new Date().getFullYear()} ${portfolioOwner.name} - Professional Portfolio</strong></p>
        <p>This is an automated confirmation email to acknowledge receipt of your message.</p>
        <p>Your inquiry is important to me and will receive my personal attention.</p>
      </div>
    </div>
  </div>
</body>
</html>`;
};

// Email templates configuration
export const emailTemplates = {
  subjects: {
    replySubject: "🙏 Thank You - Your Message Has Been Received!",
    autoReplySubject: "✅ Message Confirmed - Thank You for Reaching Out!"
  },

  messages: {
    autoReplyMessage: (name: string, ownerName: string) => `
Hi ${name},

Thank you for reaching out through my portfolio! Your message has been successfully received.

I typically respond within 24 hours during business days. In the meantime, feel free to explore my latest projects and certifications.

Looking forward to connecting with you soon!

Best regards,
${ownerName}
    `.trim()
  }
};
