Canal is a full-stack issue tracking application inspired by Jira. It allows users to create projects, manage tickets, and organize development work through a clean web interface. The application was built to strengthen my experience with modern .NET backend development, REST APIs, authentication, and React.

## Features

- User authentication with JWT
- User registration and login
- Create, edit, and delete projects
- Create, update, and manage tickets
- Secure REST API
- SQL Server database using Entity Framework Core
- Responsive React frontend
- Separation of authentication and application APIs

## Tech Stack

### Backend
- C#
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- JWT Authentication

### Frontend
- React
- TypeScript
- Vite
- Bootstrap
- Axios

## Project Structure

```
Canal/
│
├── Canal.Api/             # Main API (Projects & Tickets)
├── Canal.LoginAPI/        # Authentication API
├── Canal.Client/          # React Frontend
└── Database/              # SQL Server
```

## Architecture

The application is separated into two APIs:

### Authentication API
Responsible for:
- User registration
- User login
- JWT token generation
- Password validation

### Main API
Responsible for:
- Project management
- Ticket management
- Protected endpoints
- Business logic

The React frontend communicates with both APIs using JWT bearer authentication.

## Database

The application uses SQL Server with Entity Framework Core Code First migrations.

Example entities include:

- Users
- Projects
- Tickets

Relationships:

- One User → Many Projects
- One Project → Many Tickets

## Getting Started

### Prerequisites

- .NET 8 SDK
- Node.js 20+
- SQL Server
- Visual Studio 2022 or Visual Studio Code

### Clone the Repository

```bash
git clone https://github.com/yourusername/Canal.git
cd Canal
```

### Backend Setup

Restore packages

```bash
dotnet restore
```

Update the connection string in `appsettings.json`.

Run migrations

```bash
dotnet ef database update
```

Start the APIs

```bash
dotnet run
```

### Frontend Setup

Navigate to the client project

```bash
cd Canal.Client
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

## API Authentication

Protected endpoints require a JWT bearer token.

Example Authorization header:

```
Authorization: Bearer <your_token>
```

## Future Improvements

- User roles and permissions
- Comments on tickets
- File attachments
- Due dates
- Email notifications
- Dashboard analytics
- Kanban board
- Search and filtering
- Docker deployment
- Unit and integration testing

## What I Learned

Through building Canal, I gained practical experience with:

- Designing RESTful APIs
- JWT authentication
- Entity Framework Core
- SQL Server database design
- React and TypeScript
- State management
- API integration
- CRUD operations
- Secure backend development
- Full-stack application architecture

## Screenshots

Add screenshots of:

- Login page
- Dashboard
- Project management
- Ticket management
- Authentication flow

## Author

**Justin Abraham**

Junior Software Developer

Backend-focused developer with experience building full-stack applications using C#, ASP.NET Core, SQL Server, React, and TypeScript.
