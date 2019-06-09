# Academy Publications

A web application for students where students and professors can publish different types of articles. Articles will go through a series of steps before being published.

## Configuration

In the project root add .env with specified variables:

#### Server port:

`PORT='_'`

#### DB link with username and password:

`DB_LINK='_'`

#JWT configuration

`JWT_SECRET='_'`

`JWT_EXPIRES_IN='_'`

#### AWS S3 configuration

`AWS_REGION='_'`

`ACCESS_KEY_ID='_'`

`SECRET_KEY_ID='_'`

`MANUSCRIPTS_BUCKET_NAME='_'`

# Available Scripts

In the project directory, you can run:

### `npm i`

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:2000](http://localhost:2000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

Server is running on the port : [http://localhost:1000](http://localhost:1000) <br>
Client is running on the port : [http://localhost:2000](http://localhost:2000)

# ! Atention

This code is compatible with `mac os`.

If are running app from a `windows` change in packages :

<code>
"scripts": {
"start": "concurrently \"nodemon src/server/index.js\" \"set PORT=2000 react-scripts start\"",
},
</code>

If are running app from a `ubuntu` change in packages :

<code>
"scripts": {
"start": "concurrently \"nodemon src/server/index.js\" \"export PORT=2000 react-scripts start\"",
},
</code>
