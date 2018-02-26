import mongoose from 'mongoose';
const TokenSchema = new mongoose.Schema({

    userId: {type : mongoose.Schema.Types.ObjectId, ref:'User'},
    token: {type : String, required : true  },
    createdAT: {type : Date , required : true ,default : Date.now , expires : 900}


});
let Token = mongoose.model('token', TokenSchema);
exports.TokenSchema = TokenSchema;
exports.TokenModel = Token ;

exports.addToken = ({userId,token })=> {
    const newToken = new Token({
        userId: userId,
        token:token
});
    return new Promise((resolve, reject) => {
        newToken.save((err, res) => {
            err ? reject(err) : resolve(res);
        });
    });
};

exports.findToken = (token) => {
    return new Promise((resolve, reject) => {
        Token.findOne({token : token})
            .populate('userId')
            .exec((err, res) => {
                err ? reject(err) : resolve(res);
            });
    });
};

exports.findTokenById = (id) => {
    return new Promise((resolve, reject) => {
        Token.findOne({_id : id})
            .populate('userId')
            .exec((err, res) => {
                err ? reject(err) : resolve(res);
            });
    });
};
