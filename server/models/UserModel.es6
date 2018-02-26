import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs'
/**
 * User Schema
 */
const userSchema = new mongoose.Schema({
    /**
     * @description user's firstname
     */
    firstName: {type: String},

    /**
     * @description user's lastname
     */
    lastName: {type: String},
    /**
     * @description user's email
     */
    email: {type: String},
    /**
     * @description user's password
     */
    password: {type: String},
    /**
     * @description user's role(s)
     */
    role: [{ type : String, enum : ['candidat', 'formateur', 'centre', 'admin']}],
    /**
     * @description user account's state (verified after clicking link in email inbox)
     */
    isVerified: {type: Boolean, default: false}
    },{
    timestamps : true

});
/**
 * @param password
 * @description hash password
 * @return hash password
 */
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

/**
 * @param password
 * @description checking if password is valid
 * @return true|false
 */
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};


/**
 *
 * @type {mongoose.Schema}
 */
exports.userSchema = userSchema;
let User = mongoose.model('User', userSchema);
exports.UserModel = User;



/**
 * @param firstName
 * @param lastName
 * @param email
 * @param password
 * @param role
 * @param isverified
 * @description add user
 * @return Promise
 */
exports.addUser = ({firstName, lastName, email, password, role , isVerified}) => {
    let newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
       isVerified: isVerified
    });
    newUser.password = newUser.generateHash(password);
    newUser.role.push(role);
    return new Promise((resolve, reject) => {
        newUser.save((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};

exports.findUser = (email) => {
    return new Promise((reject, resolve) => {
        User.findOne({email : email}, (res , err) => {
            err ? reject(err) : resolve(res);
        });
    });
};

exports.findUserById = (id) => {
    return new Promise((reject, resolve) => {
        User.findById(id, (res, err) => {
            err ? reject(err) : resolve(res);
        });
    });
};

exports.updateUser = (id, obj) => {
    return new Promise((reject, resolve) => {
        User.findByIdAndUpdate(id, obj, (res, err) => {
            err ? reject(err) : resolve(res);
        });
    });
};

exports.deleteUser = (id) => {
    return new Promise((reject, resolve) => {
        User.findByIdAndRemove(id, (res, err) => {
            err ? reject(err) : resolve(res);
        });
    });
};

exports.updatePassword = (id,pass) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate({_id : id}, {password : pass}, (err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};