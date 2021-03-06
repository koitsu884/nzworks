const { User } = require('../models/user');

module.exports = async function(req, res, next) {
    let user = await User.findOne({_id:req.user._id, is_active:true, 'profile.user_type': 'Business' });
    if(user){
        req.user = user;
        next();
    }
    else {
        res.status(404).send('Request user not found');
    }
}