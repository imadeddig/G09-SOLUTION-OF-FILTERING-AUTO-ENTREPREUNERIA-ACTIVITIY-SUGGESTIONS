# G09-SOLUTION-OF-FILTERING-AUTO-ENTREPREUNERIA-ACTIVITIY-SUGGESTIONS
 Project Structure
 hackathon/
 ├── backend/
 ├── frontend/
 │   ├── public/
 │   └── src/
                # Django backend implementation
               # React frontend implementation
             # Public assets
                # Source files
 Installation and Setup
 Prerequisites
 Python 3.x
 Django 4.x
 SQLite
 npm
 Backend Setup
 7
 TECHNICAL REPORT FOR DEVELOPING A SOLUTION OF FILTERING AUTO ENTREPREUNERIA ACTIVITIY SUGGESTIONS
Navigate to the backend directory:
 cd backend/hackathon
 Create a virtual environment:
 python -m venv venv
 source venv/bin/activate  # On Windows: venv\Scripts\activate
  Install dependencies:
 pip install -r requirements.txt
 ADDED BY MAISSA
  Run migrations:
 python 
manage.py
 migrate
  Start the development server:
 python 
manage.py
 Frontend Setup
 runserver
 Navigate to the frontend directory:
 cd frontend
  Install dependencies:
 npm install
  Start the development server:
 npm start
 Access the application at 
http://localhost:3000/.
 Testing
 Dataset Importing
 import dataset (csv) that is stored with the zip to get data classified using the 
model.
 Backend Testing
 Run the test suite using:
 python 
manage.py test
 8
 TECHNICAL REPORT FOR DEVELOPING A SOLUTION OF FILTERING AUTO ENTREPREUNERIA ACTIVITIY SUGGESTIONS
Frontend Testing
 Run tests using:
 npm tes
