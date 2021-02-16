import React, { useState } from 'react';


import { withRouter } from 'react-router-dom';

function SignUp() {
  const [datos, setDatos] = useState({
    email: '',
    password: '',
    full_name: '',
  });
  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const enviarMail = (event) => {
    event.preventDefault();
   
    (async () => {
      const rawResponse = await fetch('/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: datos.email,
          password: datos.password,
          full_name: datos.full_name,
        }),
      });
      const content = await rawResponse.json();
        console.log(content.token);
        localStorage.setItem('token', content.token, { path: '/' });
        window.location.href = '/dashboard';
    })()
    .then(() => {
      fetch('/send_mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: datos.email,
          subject: 'Wellcome to Taskeitor!  ' + datos.full_name,
          username: datos.email,
          password: datos.password,
        }),

        
      });
      console.log('Mail send');
    })

    
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
            <h3 className='text-center pb-4 m-2'>Sign up</h3>
            <form onSubmit={enviarMail}>
              <div className='form-row'>
                <div className='form-group  p-3'>
                  <label className='mb-2' htmlFor='inputEmail4'>
                    Email
                  </label>
                  <input
                    type='email'
                    className='form-control'
                    name='email'
                    onChange={handleInputChange}
                    id='inputEmail4'
                    placeholder='Email'
                  />
                </div>
                <div className='form-group p-3'>
                  <label className='mb-2' htmlFor='inputPassword4'>
                    Password
                  </label>
                  <input
                    type='password'
                    className='form-control'
                    name='password'
                    onChange={handleInputChange}
                    id='inputPassword4'
                    placeholder='Password'
                  />
                </div>
              </div>
              <div className='form-group p-3'>
                <label className='mb-2'>Full name</label>
                <input
                  type='text'
                  className='form-control'
                  name='full_name'
                  onChange={handleInputChange}
                  placeholder='Full Name'
                />
              </div>
              <div className='d-flex justify-content-center'>
                <button type='submit' className='btn btn-primary m-4 h-25 w-25'>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default withRouter(SignUp);
