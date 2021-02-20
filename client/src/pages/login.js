import React, { useState } from 'react';
import '../styles/login.css';
import { withRouter } from 'react-router-dom';

function Login() {
  const [datos, setDatos] = useState({
    email: '',
    password: '',
  });
  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };
  const enviarDatos = (event) => {
    event.preventDefault();

    (async () => {
      const rawResponse = await fetch('/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: datos.email,
          password: datos.password
        }),
      });
      const content = await rawResponse.json();
      console.log(content.token);
      localStorage.setItem('token', content.token, { path: '/' });
      localStorage.setItem('id', content.id, { path: '/' });
      window.location.href = '/dashboard';
    })();
  };

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h4 className='text-center p-2'> "Become new begins"</h4>
            <p className='text-center '>Become you want!</p>
            <img
              src='https://cdn.dribbble.com/users/1537480/screenshots/6111553/ket_heighlights_illustration_4x.png'
              width='680em'
              height='560em'
              alt='Responsive '
            />
          </div>
          <div className='col login-form'>
          <div className='d-flex justify-content-center pt-2  '>
          <img
              src='https://i.ibb.co/gzX7qFr/logo.png'
              width='140em'
              height='120em'
              className='img-fluid'
              alt='Responsive '
            />
            </div>
            <h3 className='text-center pb-2 m-2'>Login</h3>
            <form onSubmit={enviarDatos}>
              <div className='form-group p-4'>
                <label className='mb-2' htmlFor='exampleInputEmail1'>
                  Email address
                </label>
                <input
                  type='email'
                  name='email'
                  onChange={handleInputChange}
                  className='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  placeholder='Enter email'
                />
                <small id='emailHelp' className='form-text text-muted'>
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className='form-group p-4 '>
                <label className='mb-2 ' htmlFor='exampleInputPassword1'>
                  Password
                </label>
                <input
                  name='password'
                  type='password'
                  className='form-control'
                  id='exampleInputPassword1'
                  onChange={handleInputChange}
                  placeholder='Password'
                />
                <div className='d-flex justify-content-center'>
                  <button
                    type='submit'
                    className='btn btn-primary m-4 h-25 w-25'>
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default withRouter(Login);
