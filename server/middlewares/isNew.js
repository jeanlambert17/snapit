import { User } from '../models';

function isNew(req,res,next) {
  let {email,username} = req.body;

  checks(email,username).then((response) => {        
    next();
  }).catch((error) => {        
    res.status(400).send({ 
      status: 400,
      body: error 
    });
  });
}

async function checks(email,username) {
  try {
    await checkEmail(email);
    await checkUsername(username);
    return {}
  } catch(error) {        
    throw error;
  }
}

export function checkEmail(email) {
  return new Promise((res,rej) => {
    User.findOne({ 'email': email },
      (err,user) => {
        if (user) {
          rej('Email already in use');                    
        } else {
          res()
        }                
      }
    );
  });
}

export function checkUsername(username) {
  return new Promise((res,rej) => {
    User.findOne({ 'username': username}, 
      (err,user) => {
        if(user) {
          rej('Username already in use');
        } else {
          res();
        }
      }
    );
  });
}


export default isNew