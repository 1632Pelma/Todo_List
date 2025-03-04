const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); 
const middlewares = jsonServer.defaults();

// Set up middlewares (e.g., logging, CORS, etc.)
server.use(middlewares);

// Set up the API endpoint using JSON Server router
server.use('/api', router); 

const PORT = process.env.PORT || 5500; 
server.listen(PORT, () => {
    console.log(`JSON Server is running on http://localhost:${PORT}`);
});
