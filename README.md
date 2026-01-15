# ⏱️ Mini Time Tracker

A full-stack time tracking application built with Next.js and NestJS.

## 🚀 Tech Stack

### Frontend
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn/ui** - UI components
- **React Hot Toast** - Notifications

### Backend
- **NestJS** - Node.js framework
- **Prisma** - ORM
- **SQLite** - Database
- **TypeScript** - Type safety

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/time-tracker.git
cd time-tracker
```

### Setup Backend
```bash
cd server-side
npm install
npx prisma migrate dev --name init
npm run start:dev
```

Backend runs on `http://localhost:3001`

### Setup Frontend
```bash
cd client-side
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

## ✨ Features

- ✅ Add time entries with date, project, hours, and description
- ✅ View entries grouped by date
- ✅ Calculate daily and grand totals
- ✅ Delete entries with confirmation
- ✅ Flexible time input format (1,30 or 1:30 or 1.5)
- ✅ 24-hour daily limit validation
- ✅ Responsive design


## 🛠️ Development

### Project Structure
```
time-tracker/
├── client-side/         # Next.js frontend
└── server-side/         # NestJS backend
```

### API Endpoints
- `GET /time-entries` - Get all entries
- `POST /time-entries` - Create entry
- `DELETE /time-entries/:id` - Delete entry
