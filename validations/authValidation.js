const registerValidation = (body) => {
  const { name, email, password, phoneNo } = body;
  if (!name || !email || !password || !phoneNo ) {
    return { status: 400, success: false, message: 'Please provide required fields' };
  } else {
    return { success: true };
  }
};

const verifyEmailValidation = (body) => {
    const { email, otp } = body;
    if(!email || !otp) { 
        return { status: 400, success: false, message: 'PLease provide required fields' };
    } else {
    return { success: true };
  }
};

const loginValidation = (body) => {
    const { email, password } = body;
    if(!email || !password) { 
        return { status: 400, success: false, message: 'PLease provide required fields' };
    } else {
       return { success: true }; 
    }
}

module.exports = { registerValidation, verifyEmailValidation, loginValidation };