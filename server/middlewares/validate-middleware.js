const Validate = (schema) => async(req,res,next) => {
    try{
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody; //req.body should get the parsed data cause we need to send the validated data to db and we send/pass it using req.body
        next(); //now it will goto Register/Login router.route and then to thier respective controllers
    }catch(err){
        console.log(err);
        //const message = err.errors[0].message;
        //res.status(400).send(message);
        const status = 422;
        const message = "missing input fields";
        const extraDetails = err.errors[0].message;
        const error = {
            status,
            message,
            extraDetails
        };
        next(error); //now it goto error-middleware
    }
};
module.exports = Validate;