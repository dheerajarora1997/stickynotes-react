import React, { useState, useEffect, useRef } from 'react';
import userData from './userData.json';
import 'material-icons';

const pinElement = () => {
  console.log(this);
}

console.log(userData)


export default function Landing() {
  return (
    <>
      <div className={`bg-primary bg-opacity-10 py-3`}>
        <div className="container">
          <div className="row">
            {
              userData.map((element, index) => {
                return (
                  <div className={`col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2 mb-4 ${element.isPinned ? 'order-first' : ' '}`} key={index}>
                    <div className={`bg-primary bg-opacity-10 p-0 rounded position-relative shadow-sm sticky-card`}>
                      <button className={`bg-primary btn btn-link p-0 justify-content-center align-items-center pin-btn ${element.isPinned ? 'bg-opacity-25' : 'bg-opacity-10'}`}>
                        <span className={`material-icons${element.isPinned ? '' : '-outlined'}`}>push_pinn</span>
                      </button>
                      <h3 className={`h6 mb-0 position-absolute ps-4 ms-3 mt-1 text-primary fw-normal ${element.islocked ? 'text-opacity-10' : 'text-opacity-75'}`}>Scratch Pad</h3>
                      <div className="sticky-options">
                        <div className="dropdown dropend">
                          <div className="btn btn link p-1">
                            <span className={`text-primary material-icons-outlined`}> more_vert </span>
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
                      <textarea className={`form-control border-0 bg-primary bg-opacity-10 text-primary`} rows="6"
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