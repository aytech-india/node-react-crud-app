const http = require('http');
const dbConnect = require('./config/db.config');
const nodeRoutes = require('./node.route');
require('dotenv').config();


// connect db
dbConnect();


const PORT = process.env.PORT || 4000;
const server = http.createServer(nodeRoutes);
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
// console.log(server);