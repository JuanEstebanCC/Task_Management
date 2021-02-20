import React from 'react';

function logout() {
  function borrarDatosStorage() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('mi_autentificacion');
    window.location.href = '/';
  }

  return (
    <div className='d-flex justify-content-center align-items-center m-5'>
      <button className='button-manage' onClick={borrarDatosStorage}>
        Log out
      </button>
    </div>
  );
}

export default logout;
