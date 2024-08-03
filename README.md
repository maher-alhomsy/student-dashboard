# Student Dashboard

This project is a student dashboard built using React, Vite, and TypeScript. The application provides users with the ability to sign in and access the dashboard page where they can manage student data. The project utilizes Axios and TanStack React Query for data fetching, React Hook Form and Zod for form handling and validation, and Material-UI (MUI) for the UI components.

## Features

- User Authentication (Sign-In)
- Dashboard to manage student data
- CRUD operations for student data
- Form validation using React Hook Form and Zod
- Responsive UI using Material-UI

## Technologies Used

- React
- Vite
- TypeScript
- Axios
- TanStack React Query
- React Hook Form
- Zod
- Material-UI

## Installation

1. Clone the repository:

```sh
git clone git@github.com:maher-alhomsy/student-dashboard.git
cd student-dashboard
```

2. Install dependencies:

```sh
npm install
```

## Running The Application

1. Start the development server:

```sh
npm run dev
```

## Usage

### Authentication

Users must sign in to access the dashboard. The authentication is handled via an authentication API.

### Dashboard

Once authenticated, users can:

- View the list of students.
- Add a new student.
- Edit an existing student's details.
- Delete a student.

### Forms

Forms are built using react-hook-form and validated using zod. Each form has the necessary validation rules to ensure the integrity of the data.

### Data Fetching

Data fetching is handled using axios and tanstack/react-query. The `useQuery` and `useMutation` hooks are used to fetch and manipulate data respectively.

### Responsive UI

The UI is built using Material-UI (MUI), ensuring that the application is fully responsive and accessible on various devices.
