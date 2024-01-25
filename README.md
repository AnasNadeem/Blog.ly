# Blog Application - Blog.ly

### Folder Structure
```
    |- frontend
    |- backend
    Readme.md
```

### How to run this project locally:
### Prequisite
* You should have Python and Node installed on your Machine.
Now Open Terminal or Shell.

### Steps:
1. ```git clone https://github.com/AnasNadeem/Blog.ly.git```
2. ```cd Blog.ly```

#### Backend Setup:
1. ```cd backend```
2. ```python3 -m venv env```
3. If on mac or linux: ```source env/bin/activate```. Windows: ```.\env\scripts\activate```
4. ```python -m pip install -r requirements.txt ```
5. ```uvicorn app.main:app --reload ```

#### Frontend Setup:
1. ```Go back to main directory and cd frontend```
2. ```npm i```
3. ```npm run start```

You should have the server started on port 3000. Enjoy 🎉

### Frontend Pages:

``` 
 Home page - / [List all the posts]
 Single post page - posts/:id [View :id post]
 New post page - /new-post [Create new post]
 Edit post page - /:id/edit [Edit :id post]
```

### Backend Endpoints:

``` 
 Blog [GET] - /posts
 Blog [POST] - /posts
 Blog [GET:id] - /posts/:id
 Blog [PUT:id] - /posts/:id
 Blog [DELETE:id] - /posts/:id
```
