# Title Management Application

## Table of Contents
- [Objective](#objective)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## Objective
Develop a frontend application that interacts with an Express backend to manage user authentication and create and read (display) titles suggested by users. Additionally, integrate MetaMask for wallet functionality.

## Prerequisites
- Ensure you have the following installed:
  - VSCode
  - Node.js (version 20 or higher)
  - MySQL

- Run the provided backend to interact with the frontend:
  1. Navigate to the backend directory.
  2. Install dependencies.
  3. Run the server.
  4. Access the backend at: [http://localhost:8000](http://localhost:8000)

## Installation
1. Clone the repository.
2. Navigate to the frontend directory.
3. Install frontend dependencies.

## Usage
1. Start the frontend application.
2. Open your browser and go to [http://localhost:3000](http://localhost:3000) to access the application.

## Features
- **User Authentication**: Users can register and log in using JWT for session management.
- **Title Management**: Users can view, add, and delete titles.
- **MetaMask Integration**: Users can connect their cryptocurrency wallet to the application.
- **Responsive UI**: The application is designed to work on various devices.

## API Endpoints
| Method | Endpoint             | Description                               |
|--------|----------------------|-------------------------------------------|
| POST   | /auth/register       | Register a new user                       |
| POST   | /auth/login          | Log in an existing user                   |
| GET    | /titles              | Fetch all titles                          |
| POST   | /titles              | Create a new title                        |
| DELETE | /titles/:id          | Delete a title by ID                      |

## Testing
- Unit tests are written using Jest and React Testing Library.
- Run tests to ensure all tests are passing before submission.

## Documentation
- Code is well-commented for clarity.
- Component structures and functions are documented inline.

## Contributing
1. Fork the repository.
2. Create a new branch for your feature.
3. Make your changes and commit them.
4. Push to your branch.
5. Create a new Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
