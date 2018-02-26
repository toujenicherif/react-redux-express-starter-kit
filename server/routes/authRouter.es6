import express from 'express';
import jwt from "jsonwebtoken";
import {addToken, findTokenById, findToken} from "../models/TokenModel.es6";
import {findUser,updateUser,findUserById,updatePassword} from "../models/UserModel.es6";
import bcrypt from "bcrypt-nodejs";
import  {jwtOptions} from '../config/strategy/strategy.jwt';
const router = express.Router();
import mailer from "express-mailer";


router.get('/', (req, res) => {
    res.render('index');
});


router.get('/verify/:token', (req, res) => {
    let token = req.params.token;
    findToken(token).then((result) => {
        let id = result.userId._id;
        let obj = {
            isVerified : true
        };
        updateUser(id,obj).then((active) => {
            findUserById(active._id).then((resultat) => {
                res.render('home', {user: resultat});
            }).catch((erreur) => {
                console.log('erreur erreur erreur erreur');
            });
        }).catch((error) => {
            console.log('erreur : ', err);
        });
    }).catch((err) => {
        console.log('error : ',err);
    });
});

router.post('/resetpassword', (req, res) => {
    let email = req.body.email;
    findUser(email).then((result) => {
        res.mailer.send('reset-email',
            {
                to : result.email,
                subject : 'Reset your password',
                id : result._id
            }, (err) => {
                if (err) {
                    console.log('email not sent', err);
                } else {
                    console.log('email sent successfully');
                }
            });
    }).catch((err) => {
        console.log('erreur : ', err);
    });
    res.redirect('/');
});

router.get('/updatepassword/:id', (req, res) => {
    let id = req.params.id;
    res.render('update', {action : '/changepassword/', id : id});
});

router.post('/changepassword/:id', (req, res) => {
    let id = req.params.id;
    let password = req.body.password;
    let pass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    updatePassword(id, pass)
        .then((result) => {
            findUserById(id).then((user) => {
                res.render('home', {user : user});
            }).catch((err) => {
                console.log('error password did not change', err);
            });
        }).catch((err) => {
        console.log('failed to change password');
        res.send(err);
    });

});

router.route('/').post((req, res) => {
    let password = req.body.password;
    let email_input = req.body.email ;

    let user = findUser(email_input).then((user) => {
        bcrypt.compare(password, user.password, (err, result) => {
            if(result) {
                // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
                let payload = {id: user._id};
                let token = jwt.sign(payload, jwtOptions.secretOrKey);
                addToken({userId :user._id ,token: token}).then((resultat) => {
                    findTokenById(resultat._id).then((natija) => {
                        res.json(natija.userId.role);
                    }).catch((err) => {
                        console.log('fama ghalta ', err);
                    });
                }).catch(err =>{
                    console.log('erreur : ',err);
                });

            } else {
                res.status(401).json({message:"passwords did not match"});
            }
        });
    }).catch((err) => {
        console.log('email does not exist');
        res.status(401).json({message : 'email does not exist'});
    });
});

export default router;