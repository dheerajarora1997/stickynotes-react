import React, { useState, useEffect, useRef } from 'react';
import userData from './userData.json';
import 'material-icons';
import 'bootstrap/dist/js/bootstrap';
import '@popperjs/core/dist/cjs/popper'

export default function Landing() {
  let sampleDataArray = [
    {
      "name": "",
      "color": "secondary",
      "position": "blank",
      "size": 4,
      "data": "hello world",
    }];
  let sampleData =
  {
    "name": "",
    "color": "secondary",
    "position": "blank",
    "size": 4,
    "data": "hello world",
  };

  let localStorageNotes = localStorage.getItem('stickyNotes');
  let localNotesCount = (localStorageNotes ? localStorageNotes : '');
  const [stickyNotes, setStickyNotes] = useState(localNotesCount);

  // const handleAdd = (todo) => {
  //   const newTodos = [...todos];
  //   newTodos.push(todo);
  //   setTodos(newTodos);
  // }

  const addStickyNote = (e) => {
    const newData = [...JSON.parse(stickyNotes)];

    newData.push(sampleData);

    setStickyNotes(JSON.stringify(newData));
    // setStickyNotes(parseInt(stickyNotes) + 1);
    // localStorage.setItem(`stickyNote${(parseInt(stickyNotes) + 1)}`, '');
  }

  if (localNotesCount) {
    localStorage.setItem('stickyNotes', stickyNotes);
  }
  else {
    localStorage.setItem('stickyNotes', JSON.stringify(sampleDataArray));
  }

  let localStorageTheme = localStorage.getItem('themeMode');
  let localValue = (localStorageTheme ? localStorageTheme : 'primary');
  const [themeMode, setThemeMode] = useState(localValue);

  if (themeMode === 'primary') {
    localStorage.setItem('themeMode', 'light');
  }
  else {
    localStorage.setItem('themeMode', themeMode);
  }

  const toggleMode = (cls) => {
    setThemeMode(cls);
  }

  let localContent = JSON.parse(stickyNotes);

  return (
    <>
      <div className={`navbar py-2 navbar-light bg-${themeMode} bg-opacity-25`}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-6">
              <h1 className={`h5 text-${themeMode}`}>
                Sticky Notes -
                <span className="fw-light">
                  <a href="https://www.linkedin.com/in/dheerajarora1997/" className={`ps-2 text-decoration-none text-${themeMode}`}>
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
            {localContent.map((element, index) => {
              return (
                <div className={`col-12 col-sm-6 col-md-${element.size} mb-3`} key={index}>
                  <div className={`bg-${element.color} bg-opacity-10 p-0 rounded overflow-hidden position-relative shadow-sm sticky-card`}>
                    <div className={`bg-${element.color} bg-opacity-25 d-flex align-items-center justify-content-between py-2 w-100`}>
                      <h3 className={`h5 my-0 ms-3 text-${element.color} text-opacity-50 fw-normal`}>Scratch Pad</h3>
                      <div className="sticky-options d-flex">
                        <button type="button" className={`small py-1 px-2 bg-${element.color} bg-opacity-25 border-0 text-${element.color} rounded pointer me-3`}>Copy</button>
                        {/* <button type="button" className={`small py-1 px-2 bg-${element.color} bg-opacity-25 border-0 text-${element.color} rounded pointer me-3`}>Delete</button> */}
                        <button type="button" className={`bg-${element.color} bg-opacity-25 text-${element.color} border-0 py-0 px-2 rounded-circle d-flex justify-content-center align-items-center me-1`}>
                          <span className={`material-icons-outlined`}>arrow_back_ios</span>
                        </button>
                        <button type="button" className={`bg-${element.color} bg-opacity-25 text-${element.color} border-0 py-0 px-2 rounded-circle d-flex justify-content-center align-items-center me-3`}>
                          <span className={`material-icons-outlined`}>arrow_forward_ios</span>
                        </button>
                      </div>
                    </div>
                    <textarea className={`form-control border-0 bg-${element.color} bg-opacity-10 text-${element.color}`} rows="6"
                    // value={element.data}
                    ></textarea>
                  </div>
                </div>
              )
            })}
            {localContent.length >= 9 ?
              <div className="col-12">
                <div className={`alert alert-${themeMode} alert-dismissible fade show`} role="alert">
                  <strong>Note : </strong> Only 9 Sticky Notes allowed.
                  <span className="float-end cursor-pointer" data-bs-dismiss="alert">Close</span>
                </div>
              </div> :
              <div className={`col-12 col-sm-6 col-md-4 mb-3 h-100`}>
                <button className={`w-100 h-100 text-${themeMode} bg-${themeMode} bg-opacity-10 border border-${themeMode} rounded position-relative shadow-sm sticky-card-empty text-decoration-none py-5`} onClick={addStickyNote}>
                  <div className="py-3 my-1">
                    <span className={`bg-${themeMode} bg-opacity-25 d-inline-block rounded-circle d-flex justify-content-center align-items-center mx-auto fs-3 mb-1`} style={{ width: '50px', height: '50px' }}>+</span>
                    {localContent == 0 ? <span className="d-block">Create Sticky Note</span> : <span className="d-block">Add New Note</span>}
                  </div>
                </button>
              </div>
            }
          </div>
          <div className="">
          </div>
        </div>
      </div>
    </>
  )
}