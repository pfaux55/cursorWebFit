# Development Guide

This guide will help you set up the development environment and understand the project structure.

## Quick Start

1. **Clone and setup**
   ```bash
   git clone <repository-url>
   cd fitness-planner
   ./setup.sh
   ```

2. **Start PostgreSQL (using Docker)**
   ```bash
   docker-compose up -d postgres
   ```

3. **Initialize database**
   ```bash
   npm run db:setup
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

## Development Workflow

### Frontend Development (Next.js)

The frontend is built with Next.js 14 using the App Router. Key directories:

- `client/app/` - Pages and layouts
- `client/components/` - Reusable UI components
- `client/lib/` - Utilities and API functions

**Commands:**
```bash
cd client
npm run dev     # Start development server
npm run build   # Build for production
npm run lint    # Run ESLint
```

### Backend Development (Express.js)

The backend is an Express.js API with Prisma ORM. Key directories:

- `server/src/` - API routes and business logic
- `server/prisma/` - Database schema and migrations

**Commands:**
```bash
cd server
npm run dev         # Start development server with hot reload
npm run build       # Build TypeScript to JavaScript
npm run db:generate # Generate Prisma client
npm run db:push     # Push schema changes to database
npm run db:studio   # Open Prisma Studio (database GUI)
```

## Database Management

### Schema Changes

1. Edit `server/prisma/schema.prisma`
2. Run `npm run db:push` to apply changes
3. Run `npm run db:generate` to update Prisma client

### Viewing Data

Use Prisma Studio for a visual database interface:
```bash
cd server
npm run db:studio
```

Or use pgAdmin (if running via Docker Compose):
- URL: http://localhost:5050
- Email: admin@fitplan.com
- Password: admin

## Code Style

- **TypeScript** is used throughout the project
- **ESLint** and **Prettier** for code formatting
- **Tailwind CSS** for styling with utility classes

### Component Structure

UI components follow this pattern:
```typescript
import * as React from "react"
import { cn } from "@/lib/utils"

interface ComponentProps {
  // Props interface
}

const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, ...props }, ref) => {
    return (
      <element
        ref={ref}
        className={cn("base-styles", className)}
        {...props}
      />
    )
  }
)
Component.displayName = "Component"

export { Component }
```

## API Design

### Request/Response Format

All API endpoints follow REST conventions:

**Success Response:**
```json
{
  "id": "string",
  "data": "object",
  "message": "string (optional)"
}
```

**Error Response:**
```json
{
  "error": "string",
  "details": "array (optional)"
}
```

### Adding New Endpoints

1. Define route in `server/src/index.ts`
2. Add validation schema using Zod
3. Implement business logic
4. Update API client in `client/lib/utils.ts`

## Testing

### Frontend Testing
```bash
cd client
npm run test        # Run Jest tests
npm run test:watch  # Run tests in watch mode
```

### Backend Testing
```bash
cd server
npm run test        # Run Node.js tests
npm run test:e2e    # Run end-to-end tests
```

## Environment Variables

### Development
Copy `.env.example` files and update with your values:

**server/.env**
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/fitness_planner"
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Production
Set these environment variables in your deployment platform:
- `DATABASE_URL` - PostgreSQL connection string
- `NODE_ENV=production`
- `CORS_ORIGIN` - Frontend domain URL

## Deployment

### Vercel (Frontend)
1. Connect your GitHub repository
2. Set build command: `cd client && npm run build`
3. Set output directory: `client/.next`

### Railway (Backend + Database)
1. Connect GitHub repository
2. Add PostgreSQL service
3. Set environment variables
4. Deploy from `server/` directory

## Troubleshooting

### Common Issues

**Database connection errors:**
- Ensure PostgreSQL is running
- Check connection string in `.env`
- Verify database exists

**Module not found errors:**
- Run `npm install` in both client and server directories
- Check TypeScript paths in `tsconfig.json`

**Build errors:**
- Clear `.next` directory: `rm -rf client/.next`
- Clear node_modules: `rm -rf node_modules && npm install`

### Getting Help

1. Check existing issues in the repository
2. Review the main README.md
3. Create a new issue with:
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Node version, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes following the code style
4. Test your changes
5. Submit a pull request

### Commit Messages

Use conventional commit format:
```
feat: add new fitness goal category
fix: resolve database connection issue
docs: update setup instructions
style: improve button component styling
refactor: simplify plan generation logic
test: add unit tests for API endpoints
```