import React from 'react';
import '../styles/home.css';
import { withRouter } from 'react-router-dom';

function Home() {
  return (
    <div>
      <div className='d-flex justify-content-center pt-5  pb-5'>
        <img
          src='https://i.ibb.co/gzX7qFr/logo.png'
          width='140em'
          height='120em'
          className='img-fluid'
          alt='Responsive '
        />
      </div>
      <div className='d-flex justify-content-center pb-4'>
        <span className='text-main'> Task manager for the day to day</span>
      </div>
      <p className='text-center pb-4 text-justify'>
        Taskeitor is a application for creating, read and manage tasks, regain
        your clarity
        <br /> and peace of mind taking all those tasks out of your head
      </p>
      <div className='d-flex justify-content-center pb-5    '>
        <a href='/login' className='btn m-2'>
          Login
        </a>
        <a href='/signup' className='btn m-2 '>
          Sign up
        </a>
      </div>
      <div className='d-flex justify-content-center pb-5'>
        <img
          src='https://d33wubrfki0l68.cloudfront.net/d87fbff8ef06b0eb6655fbdfa8c2ad5262c098cb/487bf/assets/img/hero-poster.jpg'
          width='800em'
          height='395em'
          alt='Responsive '
        />
      </div>
      <footer>
        <div className='container'>
          <div className='d-flex align-items-center'>
            <div className='footer-single'>
              <img
                src='https://i.ibb.co/gzX7qFr/logo.png'
                width='140em'
                height='120em'
                className='img-fluid'
                alt='Responsive '
              />
            </div>
            <div className='footer-single'>
              This web page is a replica of the original site:
              <a href='https://brutask.com/'> Link</a>
            </div>
            <div className='footer-single'>
              Only for practice and experimentation, we don't have intentions to
              monetize
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default withRouter(Home);
