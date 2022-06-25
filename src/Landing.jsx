import React, { useState, useEffect, useRef } from 'react';
import 'material-icons';

export default function Landing() {
  let sampleData = {
    "name": "",
    "color": "primary",
    "position": "blank",
    "size": 4,
    "data": "",
  };

  const [myState, setMyState] = useState(localStorage.getItem('stickyNotes') ? (JSON.parse(localStorage.getItem('stickyNotes'))) : [{ ...sampleData }]);

  const addStickyNote = (e) => {
    const newData = [...myState];
    newData.push({ ...sampleData });
    setMyState(newData);
  }

  let updateContent = (e, index) => {
    let oldContent = [...myState];
    oldContent[index].data = e.target.value;
    setMyState(oldContent);
  }

  let decreaseSize = (e, index) => {
    let oldContent = [...myState];
    if (oldContent[index].size > 4) {
      oldContent[index].size = oldContent[index].size - 2;
      setMyState(oldContent);
    }
  }

  let increaseSize = (e, index) => {
    let oldContent = [...myState];
    if (oldContent[index].size < 12) {
      oldContent[index].size = oldContent[index].size + 2;
      setMyState(oldContent);
    }
  }
  const copyDeleteFunction = (e, index) => {
    console.log(e, index);
    if (myState[index]?.data != '') {
      navigator.clipboard.writeText(myState[index].data);
      console.log(myState[index].data);
    }
    else {
      let oldContent = [...myState];
      oldContent.splice([index], 1);
      setMyState(oldContent);
      localStorage.setItem('stickyNotes', JSON.stringify(oldContent));
    }
  }

  useEffect(() => {
    localStorage.setItem('stickyNotes', JSON.stringify(myState));
  }, [myState])

  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(myState)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  };

  return (
    <>
      <div className={`navbar py-2 navbar-light bg-primary bg-opacity-25`}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-6 col-sm-6">
              <h1 className={`h5 text-primary my-0`}>
                <a href="/" className="text-decoration-none">Sticky Notes</a>
              </h1>
            </div>
            <div className="col-6 col-sm-6 text-end">
              <button className="btn btn-primary" onClick={exportData}>Export Data</button>
              <a href="https://www.linkedin.com/in/dheerajarora1997/" target="_blank" className={`btn btn-primary ms-2`}>
                Dheeraj Arora <small className="material-icons"> launch </small>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={`bg-primary bg-opacity-10 py-3 min-vh-100`}>
        <div className="container">
          <p>
            <strong>Note : </strong><span>Your entire data set will be kept in your browser local storage.</span>
          </p>
          <div className="row">
            {myState?.map((element, index) => {
              return (
                <div className={`col-12 col-sm-6 col-md-${element.size} mb-3`} key={index}>
                  <div className={`bg-${element.color} bg-opacity-10 p-0 rounded overflow-hidden position-relative shadow-sm sticky-card`}>
                    <div className={`bg-${element.color} bg-opacity-25 d-flex align-items-center justify-content-between py-2 ps-3 pe-2 w-100`}>
                      <h3 className={`h6 my-0 text-${element.color} text-opacity-75 fw-normal`}>Sticky Note</h3>
                      <div className="sticky-options d-flex">

                        {
                          <button type="button" className={`small py-1 px-2 bg-${element.color} bg-opacity-25 border-0 text-${element.color} rounded pointer me-0 me-md-3 ${myState.length === 1 && element.data == '' ? 'd-none' : ''}`} onClick={(e) => { copyDeleteFunction(e, index) }}>{element.data ? 'copy' : 'Delete'}</button>
                        }
                        <button type="button" className={`bg-${element.color} bg-opacity-25 text-${element.color} border-0 py-0 px-2 rounded-circle d-md-flex d-none justify-content-center align-items-center me-1`} style={{ minHeight: '30px' }}
                          onClick={(e) => { decreaseSize(e, index) }}
                          disabled={element.size === 4 ? 'disabled' : ''}
                        >
                          <span className={`material-icons-outlined flip-icon`}>start</span>
                        </button>
                        <button type="button" className={`bg-${element.color} bg-opacity-25 text-${element.color} border-0 py-0 px-2 rounded-circle d-md-flex d-none justify-content-center align-items-center me-1`} style={{ minHeight: '30px' }}
                          onClick={(e) => { increaseSize(e, index) }}>
                          <span className={`material-icons-outlined`}>start</span>
                        </button>
                      </div>
                    </div>
                    <textarea className={`form-control border-0 bg-${element.color} bg-opacity-10 rounded-0 text-${element.color}`}
                      rows={`${element.size > 8 ? 12 : 7}`}
                      onChange={(e) => { updateContent(e, index) }}
                      value={element.data}
                      placeholder="Enter some Text"
                    ></textarea>
                  </div>
                </div>
              )
            })}
            {myState.length >= 9 ?
              <div className="col-12">
                <div className={`alert alert-primary fade show`} role="alert">
                  <strong>Note : </strong> Only 9 Sticky Notes allowed.
                </div>
              </div> :
              <div className={`col-12 col-sm-6 col-md-4 mb-3 h-100`}>
                <button className={`w-100 h-100 text-primary bg-primary bg-opacity-10 border border-primary rounded position-relative shadow-sm sticky-card-empty text-decoration-none py-5 mt-1`} onClick={addStickyNote}>
                  <div className="py-3 my-2">
                    <span className={`bg-primary bg-opacity-25 d-inline-block rounded-circle d-flex justify-content-center align-items-center mx-auto fs-3 mb-1`} style={{ width: '50px', height: '50px' }}>+</span>
                    {myState == 0 ? <span className="d-block">Create Sticky Note</span> : <span className="d-block">Add New Note</span>}
                  </div>
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}