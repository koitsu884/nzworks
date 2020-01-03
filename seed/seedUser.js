const { User } = require('../models/user');

module.exports.createAdminUser = async function () {
    console.log("createAdminUser");
    let adminUser = await User.findOne({ is_admin: true });
    if (adminUser) {
        console.log("Admin user already exists");
        return;
    }

    //MUST CHANGE PASSWORD AFTER CREATING ADMIN
    user = new User({
        name: 'Admin',
        email: 'nzoshigoto@gmail.com',
        verified: true,
        password: 'P@ss1234!!',
        is_admin: true,
        profile: { user_type: 'Business' }
    });
    await user.save();
    console.log("Admin user created");
}