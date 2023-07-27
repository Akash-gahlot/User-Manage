const jwt = require('jsonwebtoken');

const generateJWT = (email) => {
  const secretKey = 'MI6'; 
  const expiresIn = '5h'; 

  return jwt.sign({ email }, secretKey, { expiresIn });
};

module.exports = { generateJWT };
