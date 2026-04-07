# Welcome to the CoworkingHub project

## Project info

**URL**: https://coworkinghub.com

## How can I edit this code?

There are several ways of editing your application.

**Use CoworkingHub**

Simply visit the CoworkingHub project and start working.

Changes made in the project should be committed to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Local development with AdminJS + Express + MySQL

### 1. Start MySQL

```sh
brew services start mysql
```

### 2. Create the local content database (one-time)

```sh
mysql -u root -e "CREATE DATABASE IF NOT EXISTS city_focus_hub_admin CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

### 3. Run backend

```sh
npm run adminjs:dev
```

Backend admin: `http://localhost:3001/admin`

### 4. Run frontend

```sh
cp .env.example .env.local
npm run dev
hi
```

Frontend: `http://localhost:8080`

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Deploy using your preferred hosting platform after running a production build.

## Can I connect a custom domain to this project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read your hosting provider docs for custom domain setup.
