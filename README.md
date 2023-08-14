## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Nice-to-have](#nice-to-have)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)

## Introduction

The Blog Application is designed to provide a platform for users to read, save, and manage blog posts. Unauthenticated users have access to view blog posts and their details, while authenticated users can save posts as favorites, create new posts, edit their own posts, and manage their list of favorite posts.

Keep in mind that there are few things to improve, which I'll be sending during the next
days. Here's a list of things that will change:
- Accesible HTML tags
- Load more button
- Social media share buttons
- CSS details

Things that I won't be able to deliver but must be on the project:
- Search bar for favorites blog posts
- Viewmodel for each page
- Tests for each viewmodel
- Tests for each page
- Good folder structure

## Features

### For Unauthenticated Users

- View available blog posts on the site. :white_check_mark:
- Access full details of each blog post. :white_check_mark:
- Search for specific blog posts. :white_check_mark:
- When marking a post as favorite, an option to sign up or sign in is presented :white_check_mark:

### For Authenticated Users

- Save blog posts as favorites. :white_check_mark:
- View a list of all saved favorite posts. :white_check_mark:
- Search for previously saved favorite posts. :white_check_mark:
- Remove a post from the list of favorites. :white_check_mark:
- Create new blog posts. :white_check_mark:
- Edit existing blog posts. :white_check_mark:

## Prerequisites

Before you begin, ensure you have the following:

- Node.js (v14 or later)
- npm (Node Package Manager)
- Git


## Installation

1. Clone this repository using Git:

   ```bash
   git clone https://github.com/banagabriel/andkit.git
   cd andkit
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Usage

1. Start the application:

   ```bash
   npm run dev
   ```

2. Access the application in your web browser at `http://localhost:3000`.

3. Explore the blog posts, view details, and use the search functionality as an unauthenticated user. To access additional features, sign up or sign in.

4. As an authenticated user, log in to your account to create/edit posts.
