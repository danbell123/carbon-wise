import React from 'react';

const LoginRegister = () => {
  return (
    <div>
      {/* Login form */}
      <form>
        <h2>Login</h2>
        {/* Add your login form fields here */}
        <button type="submit">Login</button>
      </form>

      {/* Register form */}
      <form>
        <h2>Register</h2>
        {/* Add your register form fields here */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default LoginRegister;
