const mysql = require("mysql");
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});


//REGISTER
exports.register = (req, res) => {

    const { name, email, password, passwordConfirm } = req.body;

    db.query('SELECT email from students WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            return res.render('register', {
                message: 'Email is already in use'
            })
        } else if (password !== passwordConfirm) {
            return res.render('register', {
                message: 'Passwords do not match'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);

        db.query('INSERT INTO students SET ?', { name: name, email: email, password: hashedPassword }, (error, results) => {

            if (error) {
                console.log(error);
            } else {
                return res.render('login', {
                    message: 'User Registered Successfully'
                });
            }
        });
    });
};


//LOGIN
exports.login = (req, res) => {

    const { email, password } = req.body;

    db.query('SELECT password from students WHERE email = ?', [email], (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            var hashedPassword = results[0]["password"];
            const verified = bcrypt.compareSync(password, hashedPassword);

            if (verified) {
                return res.render('welcome');
            } else {
                return res.render('login', {
                    message: 'Incorrect Password'
                });
            }

        } else {
            return res.render('login', {
                message: 'Email does not exist'
            });
        }

    });

};


//LOGOUT
exports.logout = (req, res) => {
    return res.render('login', {
        message: 'Logged out'
    });
}








//REGISTER TEACHER
exports.registerTeacher = (req, res) => {

    const { name, email, password, passwordConfirm } = req.body;

    db.query('SELECT email from teachers WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            return res.render('registerTeacher', {
                message: 'Email is already in use'
            })
        } else if (password !== passwordConfirm) {
            return res.render('registerTeacher', {
                message: 'Passwords do not match'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);

        db.query('INSERT INTO teachers SET ?', { name: name, email: email, password: hashedPassword }, (error, results) => {

            if (error) {
                console.log(error);
            } else {
                return res.render('loginTeacher', {
                    message: 'User Registered Successfully'
                });
            }
        });
    });
};


//LOGIN TEACHER
exports.loginTeacher = (req, res) => {

    const { email, password } = req.body;

    db.query('SELECT password from teachers WHERE email = ?', [email], (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            var hashedPassword = results[0]["password"];
            const verified = bcrypt.compareSync(password, hashedPassword);

            if (verified) {
                return res.render('welcomeTeacher');
            } else {
                return res.render('loginTeacher', {
                    message: 'Incorrect Password'
                });
            }

        } else {
            return res.render('loginTeacher', {
                message: 'Email does not exist'
            });
        }

    });

};


//LOGOUT TEACHER
exports.logoutTeacher = (req, res) => {
    return res.render('loginTeacher', {
        message: 'Logged out'
    });
}







//ADD RECORD
exports.addRecord = (req, res) => {

    const { name, rollNo, power, strength } = req.body;

    db.query('SELECT rollNo from records WHERE rollNo = ?', [rollNo], (error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            return res.render('welcomeTeacher', {
                message: 'Record with given RollNo Already Exists'
            });
        }

        db.query('INSERT INTO records SET ?', { name: name, rollNo: rollNo, power: power, strength: strength }, (error) => {

            if (error) {
                console.log(error);
            } else {
                return res.render('welcomeTeacher', {
                    message: 'Record Added Successfully'
                });
            }
        });
    });

};


//SHOW RECORD
exports.showRecord = (req, res) => {
    var record;

    db.query('SELECT * from records', (error, results) => {

        if (error) {
            console.log(error);
        }

        if (results.length == 0) {
            return res.render('welcomeTeacher', {
                message: 'No records are available. Please insert new records first'
            });
        } else {
            return res.render('showRecord', { record: results });
        }
    });

};




//EDIT RECORD
exports.editRecord = (req, res) => {

    db.query('SELECT * FROM records WHERE id = ?', [req.params.id], (error, results) => {

        if (error) {
            console.log(error);
        } else {
            return res.render('editRecord', { results });
        }
    });
};

//SEND UPDATE TO DB
exports.updateRecord = (req, res) => {

    const { name, rollNo, power, strength } = req.body;

    db.query('UPDATE records SET name = ?, rollNo = ?, power = ?, strength = ? WHERE id = ?', [name, rollNo, power, strength, req.params.id], (error, results) => {

        if (error) {
            console.log(error);

        } else {

            db.query('SELECT * FROM records WHERE id = ?', [req.params.id], (error, results) => {

                if (error) {
                    console.log(error);
                } else {
                    return res.render('editRecord', { results, message: 'Record Updated Successfully' });
                }
            });
        }
    });
};



//DELETE RECORD
exports.deleteRecord = (req, res) => {

    db.query('DELETE FROM records WHERE id = ?', [req.params.id], (error) => {

        if (error) {
            console.log(error);
        } else {
            res.redirect('/auth/showRecord');
        }
    });
};








//SEARCH RESULT
exports.searchResult = (req, res) => {
    var data;
    const { name, rollNo } = req.body;

    db.query('SELECT * from records WHERE name = ? AND rollNo = ?', [name, rollNo], (error, results) => {

        if (error) {
            console.log(error);
        }

        if (results.length == 0) {
            return res.render('welcome', {
                message: 'Please Enter correct Name and RollNo'
            });
        } else {
            return res.render('showResult', { data: results });
        }
    });

};




//ADD ANOTHER RECORD
exports.addAnotherRecord = (req, res) => {
    res.render('welcomeTeacher');
}


