# Job-Seeker
A job seeking platform facilitating the job application by an employee and posted by a company. 

## Project Overview
The project is built with a view to leveraging the ability to apply for a job by an employee and post a job by a company. The proect is built utilizing ReactJs at the frontend, ExpressJs at the backend and MongoDB as a database. The project is confined by a strong authentication, an intuitive frontend and a fully functional backend. Employees and Companys can perform various actions via several APIs from their perspectives.
Utilized JWT, Cookies, axios for seamless api management. Used Postman for API testing.

## Technologies Used
- Frontend: ReactJs, TailwindCSS, Vite
- Backend: NodeJs, ExpressJs
- Database: MongoDB
- Middleware: body-parser, cors, multer


## Setup Instructions

1. **Clone the repository:**
    ```bash
    git clone https://github.com/tanbiranjum/job-application-mern.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd job-application-mern
    ```

3. **Checkout to the desired branch:**
    ```bash
    git checkout dev
    ```

4. **Setup Frontend:**
    1. Navigate to the frontend directory:
        ```bash
        cd client
        ```
    2. Install frontend dependencies:
        ```bash
        npm install
        ```
5. **Setup Backend:**
    1. Navigate to the backend directory:
        ```bash
        cd ../server
        ```
    2. Install backend dependencies:
        ```bash
        npm install
        ```

6. **Run the Application:**

    **Backend:**
    1. Navigate to the backend directory:
        ```bash
        cd server
        ```
    2. Start the backend server:
        ```bash
        npm start
        ```

    **Frontend:**
    1. Open a new terminal and navigate to the frontend directory:
        ```bash
        cd ../client
        ```
    2. Start the frontend development server:
        ```bash
        npm run dev
        ```

The frontend development server should be running on `http://localhost:5173/`.

## Branch Information
- **dev**: Contains the main application code.

  Choose the appropriate branch based on your preference and follow the setup instructions accordingly.



## Learnings and Challenges

### What I Learned

1. **Express Framework**: Gained a deeper understanding of setting up and configuring an Express server.
2. **Routing and CRUD Operations**: Implemented RESTful API endpoints for CRUD operations.
3. **MongoDB Integration**: Set up and interacted with a MongoDB database.
4. **Error Handling**: Implemented middleware for robust error handling.
5. **Middleware Utilization**: Understood the role and correct usage of middleware in an Express application.
6. **JWT token**: Implemented the JWT token based authentication and authorization and verification purposes.

### Challenges Faced

1. **Database Setup**: Faced challenges with setting up and populating the MongoDB database sometimes.
2. **Merging**: Faced difficulties sometimes while merging on the Github. Sometimes conflicts arose.
3. **Middleware Integration**: Configured middleware correctly to handle errors and verification, yet faced some difficulties here.
4. **Debugging**: Repeatedly debugged issues related to database queries and server responses.
5. **Scalability Considerations**: Considered the challenges of scaling the application for production.
