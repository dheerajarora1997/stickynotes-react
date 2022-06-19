import React, { useState, useEffect, useRef } from 'react';
import userData from './userData.json';
import 'material-icons';
import 'bootstrap/dist/js/bootstrap';
import '@popperjs/core/dist/cjs/popper'

export default function Landing() {

  let localStorageNotes = localStorage.getItem('stickyNotesCount');
  let localNotesCount = (localStorageNotes ? localStorageNotes : 0);

  const [stickyNotesCount, setStickyNotesCount] = useState(localNotesCount);
  console.log(stickyNotesCount);

  const addStickyNote = (e) => {
    setStickyNotesCount(parseInt(stickyNotesCount) + 1);
    localStorage.setItem(`stickyNote${stickyNotesCount}`, ' ');
  }

  if (stickyNotesCount) {
    localStorage.setItem('stickyNotesCount', stickyNotesCount);
  }
  else {
    localStorage.setItem('stickyNotesCount', 0);
  }

  let localStorageTheme = localStorage.getItem('themeMode');
  let localValue = (localStorageTheme ? localStorageTheme : 'primary');
  const [themeMode, setThemeMode] = useState(localValue);

  if (themeMode === 'primary') {
    localStorage.setItem('themeMode', 'primary');
  }
  else {
    localStorage.setItem('themeMode', themeMode);
  }

  const toggleMode = (cls) => {
    setThemeMode(cls);
  }

  return (
    <>
      <div className={`navbar py-2 navbar-light bg-${themeMode} bg-opacity-25`}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-6">
              <h1 className={`h5 text-${themeMode}`}>
                Sticky Notes -
                <span className="fw-light">
                  <a href="javascript:void(0);" className={`ps-2 text-decoration-none text-${themeMode}`}>
                    By Dheeraj Arora
                  </a>
                </span>
              </h1>
            </div>
            <div className="col-12 col-sm-6 text-end">
              <button className="p-2 ms-1 d-inline-block btn btn-primary" onClick={() => { toggleMode('primary') }}></button>
              <button className="p-2 ms-1 d-inline-block btn btn-secondary" onClick={() => { toggleMode('secondary') }}></button>
              <button className="p-2 ms-1 d-inline-block btn btn-danger" onClick={() => { toggleMode('danger') }}></button>
              <button className="p-2 ms-1 d-inline-block btn btn-warning" onClick={() => { toggleMode('warning') }}></button>
              <button className="p-2 ms-1 d-inline-block btn btn-success" onClick={() => { toggleMode('success') }}></button>
              <button className="p-2 ms-1 d-inline-block btn btn-info" onClick={() => { toggleMode('info') }}></button>
              <button className="p-2 ms-1 d-inline-block btn btn-light" onClick={() => { toggleMode('light') }}></button>
              <button className="p-2 ms-1 d-inline-block btn btn-dark" onClick={() => { toggleMode('dark') }}></button>
            </div>
          </div>
        </div>
      </div>
      <div className={`bg-${themeMode} bg-opacity-10 py-3 min-vh-100`}>
        <div className="container">
          <div className="row">
            {stickyNotesCount}
            {stickyNotesCount >= 9 ?
              <div className="col-12">
                <div className="alert alert-${themeMode} alert-dismissible fade show" role="alert">
                  <strong>Holy guacamole!</strong> You should check in on some of those fields below.
                  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
              </div> :
              <div className={`col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2 mb-4`}>
                <button className={`w-100 h-100 text-${themeMode} bg-${themeMode} bg-opacity-10 border border-${themeMode} rounded position-relative shadow-sm sticky-card-empty text-decoration-none py-5`} onClick={addStickyNote}>
                  <div className="py-1">
                    <span className={`bg-${themeMode} bg-opacity-25 d-inline-block rounded-circle d-flex justify-content-center align-items-center mx-auto fs-3 mb-1`} style={{ width: '50px', height: '50px' }}>+</span>
                    {stickyNotesCount == 0 ? <span className="d-block">Create Sticky Note</span> : <span className="d-block">Add New Note</span>}
                  </div>
                </button>
              </div>
            }

          </div>
          <div className="row">
            {
              userData.map((element, index) => {
                return (
                  <div className={`col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2 mb-4 ${element.isPinned ? 'order-first' : ' '}`} key={index}>
                    <div className={`bg-${themeMode} bg-opacity-10 p-0 rounded position-relative shadow-sm sticky-card`}>
                      <button className={`bg-${themeMode} text-${themeMode} btn btn-link p-0 justify-content-center align-items-center pin-btn ${element.isPinned ? 'bg-opacity-25' : 'bg-opacity-10'}`}
                      >
                        <span className={`material-icons${element.isPinned ? '' : '-outlined'}`}>push_pinn</span>
                      </button>
                      <h3 className={`h6 mb-0 position-absolute ps-4 ms-3 mt-1 text-${themeMode} fw-normal ${element.islocked ? 'text-opacity-10' : 'text-opacity-75'}`}>Scratch Pad</h3>
                      <div className="sticky-options">
                        <div className="dropdown dropend">
                          <div className="btn btn link p-1">
                            <span className={`text-${themeMode} material-icons-outlined`}> more_vert </span>
                          </div>
                          <ul className="dropdown-menu py-0">
                            <li>
                              <button className="dropdown-item" type="button">
                                <span className="material-icons-outlined"> copy_all </span> Copy
                              </button>
                            </li>
                            <li>
                              <button className="dropdown-item" type="button">
                                <span className="material-icons-outlined"> backspace </span> Erease
                              </button>
                            </li>
                            <li>
                              <button className="dropdown-item bg-danger bg-opacity-25 text-white" type="button">
                                <span className="material-icons-outlined"> delete_forever </span> Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <textarea className={`form-control border-0 bg-${themeMode} bg-opacity-10 text-${themeMode}`} rows="6"
                        // value={element.sampleData}
                        readOnly={element.islocked}
                      >{element.islocked}</textarea>
                      {element.islocked}
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}