# Play Pedagogy Award Platform

A modern, full-stack web application for managing the Play Pedagogy Award program by Play Scotland. Built with Next.js 16, React, TypeScript, and MongoDB.

<img width="1910" height="906" alt="image" src="https://github.com/user-attachments/assets/bccbc681-a78e-4da0-8d5b-b1e03954224e" />

---

## 🎯 Objective

Deliver a comprehensive digital platform that enables schools to register for the Play Pedagogy Award, access resources, and engage with an AI-powered assistant. The platform provides administrators with tools to manage registrations, FAQs, news, and user communications while maintaining a seamless user experience across all devices.

---

## ✨ Features

### 🌐 Public Website
- **Hero Section** - Compelling introduction to Play Pedagogy Award
- **Award Information** - Detailed program details, process timeline, and benefits
- **Testimonials** - Real feedback from participating schools
- **News & Podcasts** - Latest updates and audio content with modal viewing
- **FAQ Section** - Comprehensive Q&A with accordion interface
- **School Registration** - Simple form to express interest in the award
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Glass Morphism UI** - Modern, elegant design with backdrop blur effects

### 🤖 Gargi AI Assistant
- **Web-Based Chat** - Conversational AI powered by Groq LLaMA models
- **Web Search Integration** - Toggle-enabled Tavily API for real-time information
- **Context-Aware Responses** - Maintains last 3 messages for conversation continuity
- **Multi-Platform** - Desktop floating button, mobile full-screen modal
- **Suggestion Cards** - Quick-start prompts for first-time users
- **2-Line Input** - Textarea with send button inside, web search toggle below
- **Real-Time Streaming** - Smooth message delivery with loading indicators

<img width="1002" height="908" alt="image" src="https://github.com/user-attachments/assets/05fe397f-7777-4689-8324-76a0c9bbf017" />


### 📱 Mobile Navigation
- **Bottom Navigation Bar** - Quick access to Award, FAQs, News, Login, and AI Chat
- **Responsive Layout** - Adapts seamlessly to all screen sizes
- **Touch-Optimized** - Large tap targets and smooth interactions

---

## 🔐 Admin Features

<img width="1915" height="910" alt="image" src="https://github.com/user-attachments/assets/a648b63a-8107-473a-9a82-c323987e5112" />

### 📊 Admin Dashboard
- **Secure Login** - Username/password authentication with MongoDB storage
- **Password Reset** - Self-service password reset with old password verification
- **Success Dialogs** - Custom confirmation messages with redirect functionality

### 📋 Management Tabs

#### 1. **School Registrations**
- View all school registration submissions
- Track registration status and timestamps
- Export registration data

#### 2. **FAQs Management**
- Create, read, update, delete FAQ entries
- Organize by categories
- Real-time updates on public site

#### 3. **News & Podcasts**
- Manage news articles and podcast episodes
- Support for embedded content (YouTube, iframes)
- Thumbnail management
- Dual link type system (URL or HTML embed)

#### 4. **User Logins**
- Monitor admin login activity
- Track user access patterns
- Security audit logs

#### 5. **Messages**
- View contact form submissions
- Manage user inquiries
- Track message status

#### 6. **Gargi AI Chat**
- Admin-specific AI assistant with professional suggestions
- Web search toggle for enhanced responses
- Conversation history management
- Tailored prompts for administrative tasks

<img width="1908" height="899" alt="image" src="https://github.com/user-attachments/assets/f8886b2e-5bc9-4a23-ae5b-9c141ee6d6d8" />

---

## 🔒 Security Features

### Authentication & Authorization
- Secure password hashing and storage
- Session-based admin authentication
- Protected API endpoints with validation
- CORS configuration for API security

### Data Protection
- MongoDB Atlas with encryption at rest
- Environment variable management for sensitive keys
- Input validation on all forms
- SQL injection prevention through parameterized queries

### API Security
- Rate limiting on authentication endpoints
- Timeout protection (5-second limit on GET requests)
- Error handling without exposing sensitive information
- HTTPS-ready configuration

### Dependencies
- **Latest npm packages** - Regular security updates
- **Node.js 18+** - Modern runtime with security patches
- **Next.js 16** - Latest framework with built-in security features
- **TypeScript** - Type safety prevents runtime errors
- **Tailwind CSS v4** - Utility-first CSS with minimal attack surface

---

## 📱 Responsiveness

<img width="368" height="803" alt="image" src="https://github.com/user-attachments/assets/564fe469-a36e-49c5-bc4c-0373a28bf7e5" />


### Breakpoints
- **Mobile** - 320px to 768px (md breakpoint)
- **Tablet** - 768px to 1024px
- **Desktop** - 1024px and above

### Responsive Components
- Flexible grid layouts (1-4 columns based on screen size)
- Adaptive navigation (mobile bottom nav, desktop header)
- Scalable typography and spacing
- Touch-friendly mobile interfaces
- Optimized images with Next.js Image component

### Mobile-First Approach
- Base styles for mobile devices
- Progressive enhancement for larger screens
- Optimized performance for slower connections
- Reduced data usage on mobile networks

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16, React 19, TypeScript, Tailwind CSS v4 |
| **Backend** | Next.js API Routes, Node.js |
| **Database** | MongoDB Atlas |
| **AI/LLM** | Groq (LLaMA 3.1), Tavily API |
| **Authentication** | Custom JWT-based sessions |
| **Deployment** | Docker, Vercel-ready |
| **Package Manager** | npm (latest) |

---

## 🔄 Future Enhancements

### Phase 2
- [ ] Email notifications for registrations
- [ ] SMS alerts for important updates
- [ ] Advanced analytics dashboard
- [ ] User profile management
- [ ] Bookmark/save favorite resources

### Phase 3
- [ ] Multi-language support (Gaelic, other languages)
- [ ] Video tutorials and webinars
- [ ] Certification tracking system
- [ ] Progress dashboard for schools
- [ ] Integration with Google Calendar

### Phase 4
- [ ] AI-powered content recommendations
- [ ] Automated report generation
- [ ] Real-time collaboration tools
- [ ] Mobile app (React Native)
- [ ] Advanced search with filters
- [ ] Social sharing features

### Phase 5
- [ ] Machine learning for predictive analytics
- [ ] Voice-based AI interactions
- [ ] Blockchain-based certificates
- [ ] API marketplace for third-party integrations
- [ ] Custom white-label solutions

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm 9+
- MongoDB Atlas account
- Groq API key
- Tavily API key

### Installation

```bash
# Clone repository
git clone <repository-url>
cd STA

# Install dependencies
npm install

# Create .env.local
cp .env.example .env.local

# Add your API keys
MONGODB_URI=your_mongodb_uri
GROQ_API_KEY=your_groq_key
TAVILY_API_KEY=your_tavily_key
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Development

```bash
npm run dev
# Open http://localhost:3000
```

### Production Build

```bash
npm run build
npm run start
```

### Docker Deployment

```bash
docker build -t play-pedagogy .
docker run -p 3000:3000 \
  -e MONGODB_URI=your_uri \
  -e GROQ_API_KEY=your_key \
  -e TAVILY_API_KEY=your_key \
  play-pedagogy
```

---

## 🔐 Environment Variables

```env
# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/database

# APIs
GROQ_API_KEY=your_groq_api_key
TAVILY_API_KEY=your_tavily_api_key

# Application
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=production
```

---

## 📊 Performance Optimizations

- **Image Optimization** - Next.js Image component with lazy loading
- **Code Splitting** - Automatic route-based code splitting
- **CSS Optimization** - Tailwind CSS purging unused styles
- **API Caching** - ISR (Incremental Static Regeneration) for news/FAQs
- **Database Indexing** - MongoDB indexes on frequently queried fields
- **Minification** - Automatic minification in production builds

---

## 🧪 Testing

```bash
# Run tests
npm run test

# Run with coverage
npm run test:coverage

# E2E testing
npm run test:e2e
```

---

## 📄 License

[MIT License](./MIT) - Free to use and modify for your projects.

---

## 🤝 Support & Contact

- **GitHub Issues** - Report bugs and request features
- **Email** - yogeshjha0707@gmail.com
- **Documentation** - [Full docs]()

---

## 🙌 Credits

Built with ❤️ by Scottish Tech Army:

- **Project Manager** - Wiktor Gancarz
- **Developer** - Yogesh Kumar Jha 
- **Designer** - Saranya S
- **Intelligence Partner** - Uszatki Ltd

**Version:** 1.0.0  
**Last Updated:** December 2025
