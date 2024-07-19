import e from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

import indexRoutes from './routes/index.js';
import itemRoutes from './routes/items.js';
import categoryRoutes from './routes/categories.js';

const port = process.env.PORT || 5000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const database = `mongodb+srv://${username}:${password}@experiment.1kzizi3.mongodb.net/inventory?retryWrites=true&w=majority&appName=experiment`;
const app = e();

// setup
app.set('view engine', 'ejs');
app.use(e.static('public'));
app.use(e.json());
app.use(e.urlencoded({ extended: true }));

// connect to database and listen
mongoose
  .connect(database)
  .then((result) => {
    console.log(`Connect to db successfully. Listening on port ${port}`);
    app.listen(port);
  })
  .catch((error) => {
    console.log(error);
  });

// routes
app.use('/', indexRoutes);
app.use('/items', itemRoutes);
app.use('/categories', categoryRoutes);

// error
app.use((req, res) => res.status(404).render('404', { title: 'Not found' }));
