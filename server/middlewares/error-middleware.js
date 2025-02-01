const errorMiddleware = (err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "backend error";
    const extraDetails = err.extraDetails || "error from the backend";
    return res.status(status).json({message,extraDetails}); //if errors occurs sending it from backend and we will fetch this error message in frontend and alert it as req.data = await response.json.
};

module.exports = errorMiddleware;