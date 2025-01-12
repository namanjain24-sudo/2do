#!/bin/bash

# Create a virtual environment named 'venv'
python3 -m venv venv

# Activate the virtual environment
source venv/bin/activate

# Install the required packages from requirements.txt
pip install -r requirements.txt

# navigating to backend
cd server_side

# Run the Django migrations
python manage.py migrate

# Run the Django development server
python manage.py runserver
