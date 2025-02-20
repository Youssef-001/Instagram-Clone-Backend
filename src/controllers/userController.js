const AppError = require('../utils/AppError');
const userService = require('../services/userService');



async function updateProfile(req,res,next)
{
    
    const bio = req.body.bio || "";
    const avatar = req.file.path || "";

    const profile = await userService.updateProfile(req.params.userId, bio, avatar);

    if (!profile)
    {
        return next(new AppError('Profile update failed', 400));
    }

    res.status(204).json({"message": "Profile Updated successfully"});


}


async function updatePassword(req,res,next)
{

}

module.exports = {updateProfile,updatePassword}