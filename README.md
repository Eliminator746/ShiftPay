
---

# ShiftPay

ShiftPay is a full-stack web application that allows users to perform random cash transfers among themselves. Users can sign up, sign in, and send money to other users within the platform.

## Technologies Used

### Backend

- Express.js: Backend framework for routing and API handling.
- CORS: Cross-Origin Resource Sharing middleware for handling cross-origin requests.
- JSON Web Token (JWT): Used for user authentication and authorization.
- Mongoose: MongoDB object modeling for Node.js.
- Zod: A TypeScript-first schema declaration and validation library.
```json
"dependencies": {
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "express": "^4.21.1",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.8.0",
    "zod": "^3.23.8"
  }
```

### Frontend

- React: Frontend library for building the user interface.
- Tailwind CSS: Utility-first CSS framework for styling.
- Axios: HTTP client for making API requests.
- React Router DOM: Library for routing in React applications.

## Dependencies

```json
 "dependencies": {
    "axios": "^1.7.7",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.28.0"
  },
```

## Dev Dependencies

```json
"devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.20",
    "eslint": "^8.55.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.14",
    "vite": "^5.0.8"
  }
```

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/Eliminator746/ShiftPay.git
   ```

2. Navigate to the project directory:

   ```bash
   cd swiftpay
   ```

3. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

4. Set up environment variables:

   Create a `.env` file in the `backend` directory and add the following:

   ```plaintext
   PORT=3000
   DATABASEURL_URI=your-mongodb-url
   JWT_SECRET=your-jwt-secret
   ```

5. Install frontend dependencies:

   ```bash
   cd frontend
   npm install
   ```

6. Start the backend server:

   ```bash
   cd backend
   node index.js
   ```

7. Start the frontend development server:

   ```bash
   cd frontend
   npm run dev
   ```

8. Access the web app in your browser:

   Open http://localhost:5173/signup in your browser to view the application.


## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to customize the README.md file further with additional information or instructions specific to your project.
