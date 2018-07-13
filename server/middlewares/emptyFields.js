export default (req,res,next) => {
   const body = req.body;
   const keys = Object.keys(body);
   
   if(keys.some(key => body[key] == '' || body[key] == null || body[key] == undefined)) {
      res.status(422).send({ 
         status: 422, 
         body: 'Can\'t process request with empty fields'
      });
   }
   next();
}