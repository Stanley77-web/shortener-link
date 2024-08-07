import express, { Express } from 'express';
import routes from './routes';
import cors from 'cors';
require('dotenv').config();

const PORT = process.env.PORT_NUMBER || 5000;

const app: Express = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers', 
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

routes(app);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});