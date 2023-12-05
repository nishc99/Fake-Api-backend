// app.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 1337;
const postsRoutes = require('./routes/postsRoutes');
const productsRoutes = require('./routes/productsRoutes');
const airlinesRoutes = require('./routes/airlinesRoutes');
const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.use('/jsonplaceholder',postsRoutes);
app.use('/fakestoreapi',productsRoutes);
app.use('/freeTestApi',airlinesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
