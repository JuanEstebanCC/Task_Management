import React from 'react';
import '../styles/login.css';
import { withRouter } from 'react-router-dom';

function Login() {
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
            <h3 className='text-center p-5 m-2'>Login</h3>
            <form>
              <div className='form-group p-4'>
                <label className="mb-2" htmlFor='exampleInputEmail1'>Email address</label>
                <input
                  type='email'
                  className='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  placeholder='Enter email'
                />
                <small id='emailHelp' className='form-text text-muted'>
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className='form-group p-4  '>
                <label className="mb-2" htmlFor='exampleInputPassword1'>Password</label>
                <input
                  type='password'
                  className='form-control'
                  id='exampleInputPassword1'
                  placeholder='Password'
                />
                <div className='d-flex justify-content-center'>
                  <button type='submit' className='btn btn-primary m-4 h-25 w-25'>
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
