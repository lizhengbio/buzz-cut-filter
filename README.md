# 🔥 Buzz Cut AI Preview

> **Smart Hair Transformation Platform** - Advanced AI-powered buzz cut preview service with safe and reliable face protection technology, letting you see the final result before cutting

A modern AI hair transformation platform using Flux Kontext Pro model and face protection technology to provide users with safe, accurate, high-quality buzz cut preview experiences. Supports multiple hair color options with high-definition preview generation in minutes.

## ✨ Core Features

### 🛡️ **Advanced Face Protection Technology**
- **IP-Adapter FaceID Locking** - Ensures generated results maintain original facial features
- **MediaPipe Hair Segmentation** - Precisely identifies hair regions, editing only the hairstyle
- **Anti-Face-Swap Protection** - Multiple technical safeguards to never alter facial identity
- **Secure Processing Pipeline** - All data automatically deleted after 24 hours

### 🎨 **Smart Buzz Cut Generation**
- **Flux Kontext Pro Model** - Industry-leading AI image generation technology
- **Multiple Hair Color Options** - Black, brown, blonde, gray and more choices
- **High-Resolution Output** - 1024x1024 standard, 4K Pro version
- **Realistic Rendering** - Maintains original photo style and lighting

### 🚀 **Seamless User Experience**
- **Drag & Drop Upload** - Supports JPG, PNG, WEBP formats
- **Instant Preview** - 1-3 minute fast generation
- **Responsive Design** - Perfect adaptation for mobile, tablet, desktop
- **Free Trial**

### 💎 **Flexible Subscription Model**
- **Free Version** - 3 daily uses, 720p with watermark
- **Pro Version** - Unlimited usage, 4K high-definition output
- **Credit System** - Flexible purchase, pay-as-you-use

## 🎯 Target Users

### 👨‍💼 **Haircut Decision Makers**
Users wanting to shave their heads but uncertain about the result, preview the final style through AI

### 📱 **Content Creators**
Short video creators and social media users needing fun, shareable content

### 💡 **Hairline Anxiety Sufferers**
User groups wanting to try bald or buzz cut styles but worried about the outcome

## 🚀 Quick Start

### Online Experience
Visit [Buzz Cut AI Preview](https://your-domain.com) to start using immediately

### Local Deployment

#### Requirements
- Node.js 18+
- npm or yarn or pnpm
- Supabase account
- AI model API keys

#### Installation Steps

1. **Clone Project**
   ```bash
   git clone https://github.com/yourusername/buzz-cut-filter.git
   cd buzz-cut-filter
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following environment variables:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   
   # Payment System
   CREEM_WEBHOOK_SECRET=your_creem_webhook_secret
   CREEM_API_KEY=your_creem_api_key
   CREEM_API_URL=your_creem_api_url
   
   # AI Model APIs
   FLUX_KONTEXT_API_KEY=your_flux_api_key
   KIE_API_KEY=your_kie_api_key
   
   # Application Configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   CREEM_SUCCESS_URL=http://localhost:3000/dashboard
   ```

4. **Database Setup**
   - Run SQL scripts from the migrations folder in Supabase
   - Configure authentication providers and policies

5. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Access Application**
   Open browser and visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Architecture

```
buzz-cut-filter/
├── app/                      # Next.js App Router
│   ├── (auth-pages)/        # Authentication pages
│   ├── api/                 # API routes
│   │   ├── generate/        # Main generation API
│   │   ├── upload-temp-image/ # Image upload
│   │   └── webhooks/        # Payment webhooks
│   ├── dashboard/           # User dashboard
│   └── page.tsx            # Homepage
├── components/              # React components
│   ├── product/            # Core product components
│   │   ├── buzz-cut-simulator.tsx # Main simulator
│   │   ├── color-selector.tsx     # Hair color selection
│   │   ├── image-upload.tsx       # Image upload
│   │   └── result-display.tsx     # Result display
│   ├── home/               # Homepage components
│   └── ui/                 # Base UI components
├── utils/                   # Utility functions
│   ├── flux-kontext-api.ts # Flux API integration
│   ├── image-compression.ts # Image compression
│   └── supabase/           # Supabase utilities
├── hooks/                   # Custom Hooks
│   ├── use-user.ts         # User state
│   ├── use-subscription.ts # Subscription state
│   └── use-toast.ts        # Toast notifications
├── types/                   # TypeScript type definitions
└── config/                  # Configuration files
    └── subscriptions.ts     # Subscription configuration
```

## 🔧 Core Technologies

### AI Model Integration
- **Flux Kontext Pro** - Primary image generation model with high-quality output
- **IP-Adapter FaceID** - Facial identity locking technology
- **MediaPipe** - Hair region segmentation and detection
- **ControlNet** - Precise control of generation areas

### Backend Technology Stack
- **Next.js 14** - App Router + Server Components
- **TypeScript** - Type-safe development experience
- **Supabase** - Authentication, database, file storage
- **Creem** - Payment and subscription management

### Frontend Technology Stack
- **React 18** - Modern React development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI component library
- **Radix UI** - Accessible component foundation

## 🔐 Security & Privacy

### Data Security
- ✅ Uploaded images automatically deleted after 24 hours
- ✅ All API keys encrypted in storage
- ✅ Strict file type and size validation
- ✅ HTTPS encrypted transmission

### Face Protection
- ✅ IP-Adapter FaceID identity locking
- ✅ Edit only hair regions, protect facial features
- ✅ Multiple technologies prevent face swapping
- ✅ Full process monitoring throughout

### Privacy Policy
- ✅ Clear data usage explanation
- ✅ Users have complete control over their data
- ✅ GDPR and other privacy law compliance
- ✅ Transparent processing procedures

## 📊 API Interfaces

### Image Generation API
```typescript
POST /api/generate
Content-Type: application/json

{
  "image_base64": "data:image/jpeg;base64,/9j/4AAQ...",
  "color": "black" | "brown" | "blonde" | "gray",
  "tier": "free" | "pro"
}

// Response
{
  "task_id": "uuid",
  "status": "processing"
}
```

### Status Query API
```typescript
GET /api/generate/[taskId]

// Response
{
  "status": "success" | "processing" | "failed",
  "result_url": "https://cdn.../result.jpg",
  "face_similarity": 0.95,
  "processing_time": 120
}
```

### Image Upload API
```typescript
POST /api/upload-temp-image
Content-Type: multipart/form-data

// Response
{
  "imageUrl": "https://temp.../image.jpg",
  "imageBase64": "data:image/jpeg;base64,..."
}
```

## 🎨 UI Component Guide

### Core Components
- `BuzzCutSimulator` - Main interactive component with complete upload-generate-display workflow
- `ImageUpload` - Drag-and-drop image upload component
- `ColorSelector` - Hair color selection interface supporting multiple colors
- `ResultDisplay` - Result display component with comparison view support

### Page Components
- `Hero` - Homepage hero section showcasing core product value
- `Features` - Feature introduction highlighting technical advantages
- `Pricing` - Subscription and credit package display
- `FAQ` - Frequently asked questions
- `Contact` - Contact us form

## 🚀 Deployment Guide

### Vercel Deployment (Recommended)

1. **Connect GitHub**
   - Push code to GitHub repository
   - Import project in Vercel

2. **Configure Environment Variables**
   - Add all environment variables in Vercel project settings
   - Ensure API keys and database connections are correct

3. **Automatic Deployment**
   - Auto-trigger deployment on main branch pushes
   - Support for preview branches and production environments

### Custom Server Deployment

```bash
# Build project
npm run build

# Start production server
npm start

# Use PM2 for process management
pm2 start npm --name "buzz-cut-ai" -- start
```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📈 Performance Optimization

### Image Processing Optimization
- ✅ Automatic image compression and format conversion
- ✅ WebP format support
- ✅ CDN acceleration and caching
- ✅ Lazy loading and preloading strategies

### User Experience Optimization
- ✅ Smooth upload progress indicators
- ✅ Real-time generation status updates
- ✅ Responsive design for all devices
- ✅ Dark theme support

### Performance Monitoring
- ✅ Web Vitals monitoring
- ✅ Error tracking and reporting
- ✅ API response time monitoring
- ✅ User behavior analytics

## 🤝 Contributing

We welcome contributions of any form!

### Development Process
1. Fork the project to your GitHub account
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Create Pull Request

### Contribution Guidelines
- Follow existing code style and conventions
- Add appropriate tests for new features
- Update relevant documentation
- Ensure all tests pass

### Code Standards
- Use TypeScript for type checking
- Follow ESLint and Prettier configurations
- Component names use PascalCase
- File names use kebab-case

## 📄 License

This project uses the MIT License. See [LICENSE](LICENSE) file for details.

## 🆘 Support & Help

### Get Help
- 📧 Email: support@buzzcut-ai.com
- 💬 Discord: Join our discussion community
- 🐛 Bug Reports: [GitHub Issues](https://github.com/yourusername/buzz-cut-filter/issues)
- 📚 Documentation: [View Documentation](https://docs.buzzcut-ai.com)

### Common Issues
1. **Generation Failed?**
   - Check if image is clear and front-facing
   - Ensure face occupies main portion of image
   - Try different photos or contact support

2. **How to Get Better Results?**
   - Use high-quality, well-lit photos
   - Ensure face is clearly visible
   - Avoid overly edited photos

3. **Payment Issues?**
   - Check payment information accuracy
   - Contact customer service for technical support
   - Review subscription status and credit balance

## 🎉 Acknowledgments

Thanks to the following open source projects and services:

- [Next.js](https://nextjs.org/) - Powerful React application framework
- [Flux Kontext Pro](https://replicate.com/) - Advanced AI image generation model
- [Supabase](https://supabase.com/) - Open source Firebase alternative
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Modern React component library
- [Radix UI](https://www.radix-ui.com/) - Accessible component foundation
- [Creem](https://creem.io/) - Global payment solutions

## 🌟 Project Stats

- ⭐ GitHub Stars: ![GitHub stars](https://img.shields.io/github/stars/yourusername/buzz-cut-filter)
- 🍴 Forks: ![GitHub forks](https://img.shields.io/github/forks/yourusername/buzz-cut-filter)
- 🐛 Issues: ![GitHub issues](https://img.shields.io/github/issues/yourusername/buzz-cut-filter)
- 📦 Version: ![GitHub package.json version](https://img.shields.io/github/package-json/v/yourusername/buzz-cut-filter)

## 📧 Email Configuration

To enable the contact form functionality, you need to configure email settings in your `.env` file:

```env
# Email Configuration (for contact form)
GMAIL_USER=your_gmail_address@gmail.com
GMAIL_APP_PASSWORD=your_gmail_app_password
```

### Setting up Gmail SMTP

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. Use your Gmail address as `GMAIL_USER`
4. Use the generated app password as `GMAIL_APP_PASSWORD`

**Note**: If email credentials are not configured, the contact form will work in demo mode, showing success messages without actually sending emails. This allows for testing and development without requiring email setup.

The contact form will send emails to `support@buzzcutfilter.app` when users submit inquiries and email is properly configured.

---

**🔥 If this project helps you, please give us a star! Your support drives our continuous improvement.**

**🚀 Let AI technology provide the most professional advice for your hairstyle decisions!**