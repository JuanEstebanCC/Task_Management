import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import '../styles/manage.css';

Modal.setAppElement('#root');

function Manage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const [datos, setdatos] = useState([{}]);

  const token = localStorage.getItem('token');

  const [readDatos, setReadDatos] = useState([
    {
      email: '',
      taskImage: '',
      taskName: '',
      priority: '',
      expDate: '',
    },
  ]);

  useEffect(() => {
    fetch(`/tasks`)
      .then((response) => response.json())
      .then((data) => setReadDatos(data));
  }, []);


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

  function toggleModal() {
    setIsOpen(!isOpen);
  }
  function toggleModal2() {
    setIsOpen2(!isOpen2);
    console.log(readDatos);
  }

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


  const handleSubmitEdit = (e) => {
    e.preventDefault();
    console.log();
    const formData = new FormData();

    formData.append('taskImage', datosTask.taskImage);
    formData.append('taskName', datosTask.taskName);
    formData.append('priority', datosTask.priority);
    formData.append('expDate', datosTask.expDate);
    readDatos.forEach((pruebaDato) => {
    axios
      .put(`/edit_task/${pruebaDato._id}`, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    window.location.reload();
    })
  };

  const deleteTask = (event) => {
    event.preventDefault();

    readDatos.forEach((pruebaDato) => {
      console.log('Canción dentro de función flecha anónima: ', pruebaDato._id);
      (async () => {
        const rawResponse = await fetch(`/delete_task/${pruebaDato._id}`, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        const content = await rawResponse.json();
        window.location.reload();
        console.log(content);
      })();
    });
  };
  return (
    <body className='bg-light'>
      <div className='d-flex justify-content-center p-2  '>
        <img
          src='https://i.ibb.co/gzX7qFr/logo.png'
          width='120em'
          height='100em'
          className='img-fluid'
          alt='Responsive '
        />
      </div>
      <div className='d-flex justify-content-center align-items-center m-5 pt-5'>
        <div className='card-manage '>
          <div class='card-header h5'>Edit your task's</div>
          <Modal
            isOpen={isOpen}
            onRequestClose={toggleModal}
            className='mymodal'
            overlayClassName='myoverlay'
            contentLabel='My dialog'>
            <span className='text-center d-flex justify-content-center align-items-center font-weight-bolder h5'>
              Edit your tasks
            </span>
            <div className='d-flex justify-content-center align-items-center p-4 pb-0  pt-0 m-4'>
              <form onSubmit={handleSubmitEdit} encType='multipart/form-data'>
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
                    <label>Expiration hour</label>
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
                onClick={handleSubmitEdit}
                className='button-modal-change m-3'>
                Change
              </button>
              <button onClick={toggleModal} className='button-modal-close m-3'>
                Close
              </button>
            </div>
          </Modal>

          <Modal
            isOpen={isOpen2}
            onRequestClose={toggleModal2}
            contentLabel='My dialog'
            className='mymodal'
            overlayClassName='myoverlay'>
            <div className='text-center font-weight-bold h4'>
              ¿Are you sure?
            </div>
            <div className='d-flex justify-content-center align-items-center m-2'>
              <button onClick={deleteTask} className='button-modal-change m-3'>
                Yes
              </button>
              <button onClick={toggleModal2} className='button-modal-close m-3'>
                No
              </button>
            </div>
          </Modal>
          {readDatos.map(function (readDato, index, array) {
            return (
              <ul class='list-group list-group-flush p-3 m-1'>
                <li class='list-group-item'>
                  <span className='text-task-manage'>{readDato.taskName}</span>
                  <li class='list-inline-item'>
                    <button
                      class=' btn-success btn-sm rounded-lg'
                      type='button'
                      data-toggle='tooltip'
                      onClick={toggleModal}
                      data-placement='top'
                      title='Edit'>
                      <i class='fa fa-pencil' aria-hidden='true'></i>
                    </button>
                  </li>
                  <li class='list-inline-item '>
                    <button
                      class=' btn-danger btn-sm rounded-lg'
                      type='button'
                      data-toggle='tooltip'
                      onClick={toggleModal2}
                      data-placement='top'
                      title='Delete'>
                      <i class='fa fa-trash' aria-hidden='true'></i>
                    </button>
                  </li>
                </li>
              </ul>
            );
          })}
        </div>
      </div>
      <a href='/dashboard' className='button-manage'>
        &#128203; Dashboard
      </a>
      <span class='email-user'>{datos.email}</span>
    </body>
  );
}

export default withRouter(Manage);
