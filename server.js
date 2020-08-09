const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path'); //dont need to install because it comes with node (default)
const url = require('url');

dotenv.config({
    path: './.env'
});
const app = express();
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DBNAME

})

const publicDir = path.join(__dirname, './public');
app.use(express.static(publicDir));


console.log(__dirname);
app.set('view-engin', 'hbs');

const cookieParser = require('cookie-parser');
const {
    query
} = require('express');
const {
    worker
} = require('cluster');
app.use(cookieParser());

// set cookies
const setCookiesFn = (res, result) => {
    res.cookie('id', result[0].id);
    res.cookie('name', result[0].name);
    res.cookie('email', result[0].email);

    // let c_id = null;
    // let c_name = null;
    // let c_email = null;

    // if (req.cookies.id) c_id = req.cookies.id;
    // if (req.cookies.email) c_id = req.cookies.email;
    // if (req.cookies.name) c_id = req.cookies.name;

    // res.cookie('id', c_id);
    // res.cookie('name', c_name);
    // res.cookie('email', c_email);

    // return {
    //     c_id,
    //     c_name,
    //     c_email
    // }
};
// delete cookies
const delCookiesFn = (req, res) => {
    if (req.cookies.id) res.clearCookie('id');
    if (req.cookies.name) res.clearCookie('name');
    if (req.cookies.email) res.clearCookie('email');
};

// get all cookies
const getCookiesFn = (req, res) => {
    const c_id = req.cookies.id ? req.cookies.id : null;
    const c_name = req.cookies.name ? req.cookies.name : null;
    const c_email = req.cookies.email ? req.cookies.email : null;

    return {
        c_id,
        c_name,
        c_email
    }
};

//using body parser so we can read data from client side
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
db.connect(err => {
    if (err) console.log(err);
    else console.log("db connected");

});


app.get('/', (req, res) => {


    const {
        c_id,
        c_name,
        c_email
    } = getCookiesFn(req, res);

    const loginStatus = req.param('login') ? req.query.login : null;

    return res.render('index.hbs', {
        c_id,
        c_name,
        c_email,
        loginStatus
    })
});

app.get('/findcolleges/', (req, res) => {
    const {
        c_id,
        c_name,
        c_email
    } = getCookiesFn(req, res);
    const loginStatus = req.param('login') ? req.query.login : null;
    let svist = null;
    let iitkgp = null;
    let ju = null;
    if (c_id) {
        const querySQL = `SELECT * FROM interest WHERE user_id = '${c_id}'`;
        db.query(querySQL, (err, result) => {
            svist = result[0].svist;
            iitkgp = result[0].iitkgp;
            ju = result[0].ju;
            console.log('worlds', svist, ju, iitkgp);

            res.render('findcolleges.hbs', {
                c_id,
                c_name,
                c_email,
                loginStatus,
                svist,
                iitkgp,
                ju
            })
        });

    } else {
        res.render('findcolleges.hbs', {
            c_id,
            c_name,
            c_email,
            loginStatus,
            svist,
            iitkgp,
            ju
        })
    }

});



app.get('/collegeDetails/', (req, res) => {

    const {
        c_id,
        c_name,
        c_email
    } = getCookiesFn(req, res);
    const loginStatus = req.param('login') ? req.query.login : null;
    let svist = null;
    let iitkgp = null;
    let ju = null;
    if (c_id) {
        const querySQL = `SELECT * FROM interest WHERE user_id = '${c_id}'`;
        db.query(querySQL, (err, result) => {
            svist = result[0].svist;
            iitkgp = result[0].iitkgp;
            ju = result[0].ju;
            console.log('worlds', svist, ju, iitkgp);

            res.render('collegeDetails.hbs', {
                c_id,
                c_name,
                c_email,
                loginStatus,
                svist,
                iitkgp,
                ju
            })
        });

    } else {
        res.render('collegeDetails.hbs', {
            c_id,
            c_name,
            c_email,
            loginStatus,
            svist,
            iitkgp,
            ju
        })
    }
});



app.post('/addemail/', (req, res) => {

    const email = req.body.email;
    console.log(email);

    db.query(`SELECT email FROM emails WHERE email = '${email}'`, (err, result) => {
        if (result.length == 0) {
            db.query("INSERT INTO emails SET ?", {
                email: email
            }, (err, restult) => {
                console.log(err, restult);
            });
        }
        return res.render('index.hbs', {
            emailsubmitsuccess: true
        });
    });

    // return res.redirect('/');
});



//login route
app.post('/login/', (req, res) => {


    backURL = req.param('backto');
    console.log("path", backURL);



    let email = req.body.email;
    email = email.toLowerCase();
    console.log(email);
    db.query(`SELECT email FROM user WHERE email = '${email}'  `, (err, result) => {
        if (result.length == 0) {

            if (backURL == null) backURL = 'index.hbs';
            if (backURL == 'home') backURL = 'index.hbs';
            if (backURL == 'findcolleges') backURL = 'findcolleges.hbs';
            if (backURL == 'collegeDetails') backURL = 'collegeDetails.hbs';

            return res.render(backURL, {
                email: email,
                registration: true
            });
            // res.cookie('regEmail', `${email}`);

            // return res.redirect(backURL);

            // db.query("INSERT INTO user SET ?", {
            //     email: email
            // }, (err, result) => {});

        } else if (result.length != 0) {
            const sqlQuery = `SELECT * FROM user WHERE email = '${email}'`;
            db.query(sqlQuery, (err, result) => {
                if (err) console.log(err);

                //set cookies
                setCookiesFn(res, result);

                if (backURL == null) backURL = '/';
                if (backURL == 'home') backURL = '/';
                if (backURL == 'findcolleges') backURL = '/findcolleges';
                if (backURL == 'collegeDetails') backURL = '/collegeDetails';
                return res.redirect(url.format({
                    pathname: backURL,
                    query: {
                        login: true
                    }
                }));
            });
        }
        console.log(err, result);
    });

    // return res.redirect('/');
});

app.get('/logout', (req, res) => {
    delCookiesFn(req, res);
    backURL = req.param('backto');
    if (backURL == 'home') backURL = '/';
    if (backURL == 'findcollege') backURL = '/findcolleges';
    if (backURL == 'collegeDetails') backURL = '/collegeDetails';
    return res.redirect(backURL);
});

app.post('/register/', (req, res) => {

    backURL = req.param('backto');
    if (backURL == 'home') backURL = '/';
    if (backURL == 'findcollege') backURL = '/findcolleges';
    if (backURL == 'collegeDetails') backURL = '/collegeDetails';
    console.log("path", backURL);

    const email = req.body.email;
    console.log(email);
    let name = req.body.name;
    name = name.toLowerCase();
    const phone = req.body.phone;
    const address = req.body.address;

    console.log({
        name,
        email,
        phone,
        address
    });

    //check email is already in db or not
    let sqlQuery = `SELECT email FROM user WHERE email='${email}'`;
    db.query(sqlQuery, (err, result) => {

        if (result.length == 0) {
            sqlQuery = `INSERT INTO user(name,email,mobile,address) VALUES ('${name}','${email}','${phone}','${address}') `;
            db.query(sqlQuery, (err, result) => {
                // console.log(err, result);

                // res.cookie('email', `${email}`)
                // res.cookie('name', `${name}`)
            });

            sqlQuery = `SELECT * FROM user WHERE email = '${email}'`;
            db.query(sqlQuery, (err, result) => {
                if (err) console.log(err);
                setCookiesFn(res, result);
                console.log(result[0].id);
                sqlQuery = `INSERT INTO interest(user_id) VALUES (${result[0].id}) `;
                db.query(sqlQuery, (err, result) => {});

                return res.redirect(url.format({
                    pathname: backURL,
                    query: {
                        login: true
                    }
                }));
            });




        }
        console.log(err, result);
    });


});


app.get('/interest', (req, res) => {
    backURL = req.param('backto');
    console.log("path", backURL);


    const {
        c_id,
        c_name,
        c_email
    } = getCookiesFn(req, res);
    if (!c_id) {
        if (backURL == null) backURL = 'findcolleges.hbs';
        if (backURL == 'findcollege') backURL = 'findcolleges.hbs';
        if (backURL == 'collegeDetails') backURL = 'collegeDetails.hbs';

        return res.render(backURL, {
            doLogin: true
        });
    } else {
        if (backURL == null) backURL = '/findcolleges';
        if (backURL == 'findcollege') backURL = '/findcolleges';
        if (backURL == 'collegeDetails') backURL = '/collegeDetails';
        clg_nm = req.param('collegeName');
        if (req.param('action') == 'set') {
            const querySQL = `UPDATE interest SET ${clg_nm} = 1 WHERE user_id = ${c_id}`;
            db.query(querySQL, (err, result) => {
                console.log(err, result);
            });

        } else {
            const querySQL = `UPDATE interest SET ${clg_nm} = 0 WHERE user_id = ${c_id}`;
            db.query(querySQL, (err, result) => {
                console.log(err, result);
            });
        }
        return res.redirect(backURL);
    }


});


app.listen(5000, () => {
    console.log('server started');
})