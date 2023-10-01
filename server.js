const express = require('express');
const app = express();
const port = process.env.PORT || 3500;
//intializing a route with a get request
app.get('/', (req, res) => {
	res.sendStatus(500);
	res.json({"message":"Error"});
});
//preparing the server to listen on the specified port
//number
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
