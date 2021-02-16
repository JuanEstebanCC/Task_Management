import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';

import('../styles/dashboard.css');

function Dashboard() {
  const [readDatos, setReadDatos] = useState([
    {
      taskImage: '',
      taskName: '',
      priority: '',
      expDate: '',
    },
  ]);

  const token = localStorage.getItem('token');
  useEffect(() => {
    fetch(`/tasks`)
      .then((response) => response.json())
      .then((data) => setReadDatos(data));
    console.log(readDatos);
  }, []);

  const [datosTask, setDatosTask] = useState({
    taskImage: '',
    taskName: '',
    priority: '',
    expDate: '',
  });
  const handleInputChange = (event) => {
    setDatosTask({
      ...datosTask,
      [event.target.name]: event.target.value,
    });
  };
  const handleTaskImage = (e) => {
    setDatosTask({ ...datosTask, taskImage: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('taskImage', datosTask.taskImage);
    formData.append('taskName', datosTask.taskName);
    formData.append('priority', datosTask.priority);
    formData.append('expDate', datosTask.expDate);

    axios
      .post('/new_task', formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    window.location.reload();
  };

  const [isOpen, setIsOpen] = useState(false);
  const [datos, setdatos] = useState([{}]);
  function toggleModal() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    (async () => {
      await fetch('/user', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
      })
        .then((response) => response.json())
        .then((data) => setdatos(data));
    })();
  }, []);

  return (
    <body className='bg-light'>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        className='mymodal'
        overlayClassName='myoverlay'
        contentLabel='My dialog'>
        <span className='text-center d-flex justify-content-center align-items-center font-weight-bolder h5'>
          Create a new task
        </span>
        <div className='d-flex justify-content-center align-items-center p-4 pb-0  pt-0 m-4'>
          <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <div class='form-row'>
              <div class='col pb-3'>
                <label for='inputState'>Task name</label>
                <input
                  type='text'
                  class='form-control'
                  value={datosTask.taskName}
                  placeholder='Work'
                  onChange={handleInputChange}
                  name='taskName'
                />
              </div>
              <div class='col pb-3'>
                <label class='form-label' for='customFile'>
                  Task image
                </label>
                <input
                  type='file'
                  class='form-control p-1'
                  id='customFile'
                  accept='.png, .jpg, .jpeg'
                  onChange={handleTaskImage}
                  name='taskImage'
                />
              </div>
              <div class='col pb-3'>
                <label for='inputState'>Priority</label>
                <input
                  type='number'
                  class='form-control'
                  placeholder=''
                  value={datosTask.priority}
                  onChange={handleInputChange}
                  name='priority'
                  min='1'
                  max='3'
                  maxlength='1'
                />
                <small id='priorityHelp' className='form-text text-muted'>
                  The priority only accepts a specific range (1 - 3)
                </small>
              </div>
              <div class='col pb-3'>
                <label for='inputState'>Expiration hour</label>
                <input
                  type='time'
                  id='expDate'
                  value={datosTask.expDate}
                  onChange={handleInputChange}
                  min='2020-06-07T00:00'
                  max='2022-06-14T00:00'
                  name='expDate'
                  class='form-control'
                />
              </div>
            </div>
          </form>
        </div>
        <div className='d-flex justify-content-center align-items-center m-2'>
          <button
            type='submit'
            onClick={handleSubmit}
            className=' button-modal-close m-3'>
            Create
          </button>
          <button onClick={toggleModal} className='button-modal-change  m-3'>
            Close
          </button>
        </div>
      </Modal>
      <div className='d-flex justify-content-center pt-2  '>
        <img
          src='https://i.ibb.co/gzX7qFr/logo.png'
          width='120em'
          height='100em'
          className='img-fluid'
          alt='Responsive '
        />
      </div>
      <div className=' d-flex justify-content-center align-items-center  m-5'>
        <div className='m-5 '>
          <div class='card border-light mb-3'>
            <div class='card-header'>
              {datos.full_name}
              <div>
                <button
                  type='button'
                  data-placement='top'
                  data-toggle='tooltip'
                  className=' btn-success btn-sm rounded-lg'
                  onClick={toggleModal}>
                  <i class='fa fa-plus' aria-hidden='true'></i>
                </button>
              </div>
            </div>
            <div class='card-body'>
              {readDatos.map(function (readDato, index, array) {
                return (
                  <div>
                    <h5 class='card-title text-center '>{readDato.taskName}</h5>
                    <div className='d-flex justify-content-center'>
                      <img
                        src={readDato.taskImage}
                        width='120em'
                        height='100em'
                        className='img-fluid'
                        alt='Responsive '
                      />
                    </div>
                    <p class='card-text text-center mt-2 mb-0'>
                      Expiration hour: {readDato.expDate}
                    </p>
                    <p class='card-text text-center '>
                      Priority: {readDato.priority}
                    </p>
                    <br />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <footer className='bg-light'>
        <div>
          <a href='/manage' className='button-manage'>
            💼 Manage
          </a>
        </div>
        <span class='email-user'>{datos.email}</span>
      </footer>
    </body>
  );
}

export default withRouter(Dashboard);
