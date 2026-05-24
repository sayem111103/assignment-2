# 🚼DevPulse

## 🚀 Live URL

Experience the live application here: [DevPulse Live URL](example)

## ✨ Features

- **Authentication and Authorization**: jsonwebtoken
- **Roles**: contributor, maintainer
- **Contributor**: Create new issues (bug or feature request), View all issues, Update own issue field
- **maintainer**: All contributor permissions, Update any issue field, Delete any issue, Change issue workflow status independently

## 🛠️ Tech Stack

- **Language**: Typescript
- **Backend**: Node.js/Express
- **Database**: PostgreSQL
- **Security**: bcrypt, jsonwebtoken
- **Deployment**: Vercel

### Prerequisites

Ensure you have the following installed:

- Node.js (LTS runtime (24.x or higher))
- npm

### Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sayem111103/assignment-2.git
   cd DevPulse
   ```
2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add your keys:

   ```env
   NODE_ENV=development
   PORT=5000
   DB=your db connection string
   SALT=12
   ACCESSSECRET=your_access_secret
   REFRESHSECRET=your_refresh_secret
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5000](http://localhost:5000) in your browser to view the app.

### 🌐 API Endpoints Specification

| Method   | Endpoint                  | Description                                                     | Access                                                                    |
| :------- | :------------------------ | :-------------------------------------------------------------- | :------------------------------------------------------------------------ |
| `POST`   | `/api/auth/signup`        | Register a new user account with contributor or maintainer role | Public                                                                    |
| `POST`   | `/api/auth/login`         | Authenticate user and receive JWT token                         | Public                                                                    |
| `POST`   | `/api/issues`             | Create a new bug report or feature request                      | Authenticated users (contributor, maintainer)                             |
| `GET`    | `/api/issues?sort=newest` | Retrieve all issues with optional sorting and filtering         | Public                                                                    |
| `GET`    | `/api/issues/:id`         | Retrieve full details of a specific issue                       | Public                                                                    |
| `PATCH`  | `/api/issues/:id`         | Update issue title, description, or type                        | Maintainer (any issue) OR Contributor (own issue, only if status is open) |
| `DELETE` | `/api/issues/:id`         | Permanently remove an issue from the system                     | Maintainer only                                                           |

## 🗄️ Database Schema

### Users Table

| Field Name   | Type        |
| :----------- | :---------- |
| `id`         | `NUMBER`    |
| `name`       | `VARCHAR`   |
| `email`      | `VARCHAR`   |
| `password`   | `TEXT`      |
| `role`       | `VARCHAR`   |
| `created_at` | `TIMESTAMP` |
| `updated_at` | `TIMESTAMP` |

### Issue Table

| Field Name    | Type        |
| :------------ | :---------- |
| `id`          | `NUMBER`    |
| `title`       | `VARCHAR`   |
| `description` | `TEXT`      |
| `type`        | `VARCHAR`   |
| `status`      | `VARCHAR`   |
| `reporter_id` | `VARCHAR`   |
| `created_at`  | `TIMESTAMP` |
| `updated_at`  | `TIMESTAMP` |
