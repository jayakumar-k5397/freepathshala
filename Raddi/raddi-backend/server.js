import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'))
app.use(cors());


// User data (replace with database)
let users = [
    { id: 1, name: 'admin', password: '1235' },
    // Add more users...
  ];


app.post('/login', async (req, res) => {
    const { name, password } = req.body;
  
    try {
        const response = await axios.get('http://localhost:3000/users');
        // res.json(response.data);
        users = response.data
      } catch (error) {
        console.error(error);
        // res.status(500).json({ error: 'Failed to fetch data' });
      }


    // Validate request body
    if (!name || !password) {
      return res.status(400).json({ error: 'Name and password are required' });
    }
  
    // Find user by name
    const user = users.find((user) => user.name.toLowerCase() === name.toLowerCase());
  
    // Check if user exists and password is correct
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid name or password' });
    }
  
    // Return success response with user data
    res.json({ message: 'Logged in successfully', user });
   });

app.listen(5000)