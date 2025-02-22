## Project Structure

```jsx
hackathon/
├── backend/                # Django backend implementation
├── frontend/               # React frontend implementation
│   ├── public/             # Public assets
│   └── src/                # Source files
```

---

## Installation and Setup

### Prerequisites

- Python 3.x
- Django 4.x
- SQLite
- npm

### Backend Setup

1. Navigate to the backend directory:
    
    `cd backend/hackathon`
    
2. Create a virtual environment:

```c
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

1. Install dependencies:
    
    `pip install -r requirements.txt`
    
    ADDED BY MAISSA
    
2. Run migrations:
    
    `python [manage.py](http://manage.py/) migrate`
    
3. Start the development server:
    
    `python [manage.py](http://manage.py/) runserver`
    

### Frontend Setup

1. Navigate to the frontend directory:
    
    `cd frontend`
    
2. Install dependencies:
    
    `npm install`
    
3. Start the development server:
    
    `npm start`
    
4. Access the application at http://localhost:3000/.

---

## Testing

### Dataset Importing

import dataset (csv) that is stored with the zip to get data classified using the model.

### Backend Testing

Run the test suite using:

python [manage.py](http://manage.py/) test

### Frontend Testing

Run tests using:

`npm test`
