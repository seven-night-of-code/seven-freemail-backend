const guard = async (req, res, next) => {

    try {
        const { email } = req.body.email;

        if (req.body.email === email) {

            res.body
        }
    } catch (error) {
        
    }

}