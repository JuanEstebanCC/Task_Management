import React from 'react';
import '../styles/signup.css';
import { withRouter } from 'react-router-dom';

function SignUp() {
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
            <h3 className='text-center p-5 m-2'>Sign up</h3>
            <form>
              <div class='form-row'>
                <div class='form-group  p-3'>
                  <label className="mb-2"  for='inputEmail4'>Email</label>
                  <input
                    type='email'
                    class='form-control'
                    id='inputEmail4'
                    placeholder='Email'
                  />
                </div>
                <div class='form-group p-3'>
                  <label className="mb-2"  for='inputPassword4'>Password</label>
                  <input
                    type='password'
                    class='form-control'
                    id='inputPassword4'
                    placeholder='Password'
                  />
                </div>
              </div>
              <div class='form-group p-3'>
                  <label className="mb-2" >Full name</label>
              <input type="text" class="form-control" placeholder="Full Name"/>
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
