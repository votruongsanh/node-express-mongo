const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override')
const app = express();
const port = 3000;

//import route
const route = require('./routes');
//import db
const db = require('./config/db');
//connect to db thông qua mongoose
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
//middleware
app.use(
    express.urlencoded({
        extended: true,
    }),
); //gửi theo dạng form từ client lên server
app.use(express.json()); //gửi từ code javascript từ client lên server như XMLHttpRequest, fetch, axios

//http logger
// app.use(morgan('combined'));

//methodOverride
app.use(methodOverride('_method'))

//template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        }
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'reSource', 'views'));

//Routes init
route(app);

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);
