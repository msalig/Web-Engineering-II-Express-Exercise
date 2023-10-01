const express = require('express');
const fs = require('fs');
const path = require('path'); // Require the 'path' module for file paths
const ejs = require('ejs'); // Require the EJS view engine

const app = express();
const port = process.env.PORT || 3500;

// Set EJS as the view engine
app.set('view engine', 'ejs');
// Set the directory where your EJS templates are located
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
// Middleware for parsing JSON data
app.use(express.json());
// Dummy data (replace with a database later)
const todos = [
	{ id: 1, title: 'Buy groceries', description: 'Milk, eggs, bread', done: false },
	{ id: 2, title: 'Complete homework', description:
		'Math assignment', done: true },
];
// Routes
// Render the To-Do list
app.get('/todo-list', (req, res) => {
	res.render('todo-list', { todos });
});
// List all To-Do items
app.get('/todos', (req, res) => {
	res.json(todos);
});
// Create a new To-Do item
app.post('/todos', (req, res) => {
	const newTodo = {
		id: todos.length + 1,
		title: req.body.title,
		description: req.body.description,
		done: false,
	};
	
	todos.push(newTodo);
	res.status(201).json(newTodo);
});
// Update a To-Do item
app.put('/todos', (req, res) => {
	const updatedTodo = {
		id: req.body.id,
		title: req.body.title,
		description: req.body.description,
		done: req.body.done,
	};
	todos[req.body.id - 1] = updatedTodo;
	res.status(200).json(updatedTodo);
});
// Delete a To-Do item
app.delete('/todos', (req, res) => {
	const index = todos.indexOf(req.body.id);
	if (index > -1) { // only splice array when item is found
		todos.splice(index, 1); // 2nd parameter means remove one item only
	}
	res.status(200).json({"message":"Successful deleted"});
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

// Create a middleware function for logging requests
function logger(req, res, next) {
	const logMessage = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
	
	// Append the log message to a log file
	fs.appendFile('access.log', logMessage, (err) => {
		if (err) {
			console.error('Error writing to log file:', err);
		}
	});
	
	next();
}

app.use(logger);
