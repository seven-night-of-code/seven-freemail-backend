
const apiToggle = async (req, res, next) => { 
    const userid = req.params.id 
    const user = await User.findById({ id: userid }, { select: api_status })
    if(user){
        const data = user.data
        if (data.api_status == 'active') {
            data.api_status = 'inactive'
        }
        else {
            data.api_status = 'active'
        }
        await user.save()
        res.status(200).json({
            message: 'api status updated'
        })
    }
    else {
        res.status(404).json({
            message: 'user not found'
        })
    }
}
module.exports = apiToggle