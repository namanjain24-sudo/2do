# 2do

## Project Overview

2do is a simple task management application built using Django and Django REST framework. It allows users to create, update, delete, and manage their tasks. The application also includes user authentication, password reset via OTP, and JWT-based authentication.

## Tech Stack

- **Backend Framework**: Django, Django REST framework
- **Authentication**: JWT (JSON Web Tokens) using `djangorestframework_simplejwt`
- **Database**: SQLite (default, can be changed to any other database)
- **Email Service**: SMTP (for sending OTP emails)
- **CORS Handling**: `django-cors-headers`

## Project Architecture

- **Models**: Defines the data structure for tasks (Todo).
- **Serializers**: Converts complex data types (like querysets) to native Python datatypes that can then be easily rendered into JSON.
- **Views**: Contains the logic for handling requests and returning responses.
- **URLs**: Maps URLs to views.
- **Authentication**: Uses JWT for secure authentication and authorization.
- **Email Service**: Sends OTP for password reset using SMTP.

## Setup and Run

To set up and run the project, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/namanjain24-sudo/2do.git
    cd 2do
    ```

2. **Run the setup and run script**:
    ```sh
    ./setup_and_run.sh
    ```

    This script will:
    - Create a virtual environment.
    - Install the required packages from `requirements.txt`.
    - Run the Django development server.

3. **Access the application**:
    Open your web browser and go to `http://127.0.0.1:8000/`.

## How to Contribute

1. **Fork the repository**:
    Click on the "Fork" button at the top right corner of the repository page.

2. **Clone your forked repository**:
    ```sh
    git clone <your_forked_repository_url>
    cd 2do
    ```

3. **Create a new branch**:
    ```sh
    git checkout -b feature/your-feature-name
    ```

4. **Make your changes**:
    Implement your feature or bug fix.

5. **Commit your changes**:
    ```sh
    git add .
    git commit -m "Add your commit message"
    ```

6. **Push to your forked repository**:
    ```sh
    git push origin feature/your-feature-name
    ```

7. **Create a pull request**:
    Go to the original repository and click on the "New Pull Request" button. Provide a description of your changes and submit the pull request.

## Endpoints

- **User Registration**: `POST /create_user`
- **User Login**: `POST /signin_user`
- **Password Reset Request (OTP)**: `POST /otprequest`
- **Password Reset**: `POST /forgot_password`
- **User Logout**: `POST /logout_user`
- **Todo List**: `GET /todos`
- **Create Todo**: `POST /todos`
- **Delete Todo**: `DELETE /todos`
- **Complete Todo**: `PUT /todos`

## License

This project is licensed under the MIT License.