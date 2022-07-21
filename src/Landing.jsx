import React, { useState, useEffect, useRef } from 'react';
import { ReactSortable } from "react-sortablejs";
import 'material-icons';

export default function Landing() {
  let sampleData = {
    "name": "Sticky Note",
    "color": "primary",
    "position": "blank",
    "size": 4,
    "data": "",
  };
  const isMobile = window.innerWidth;

  const noteBorder = {
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderWidth: isMobile > 767 ? '0 10px 0 10px' : '0',
  };

  const [myState, setMyState] = useState(localStorage.getItem('stickyNotes') ? (JSON.parse(localStorage.getItem('stickyNotes'))) : [{ ...sampleData }]);

  const refTextArea = useRef([]);
  refTextArea.current = myState.map((element, i) => refTextArea[i] ?? React.createRef());

  const refcopyButton = useRef([]);
  refcopyButton.current = myState.map((element, i) => refcopyButton[i] ?? React.createRef());

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
  let updateName = (e, index) => {
    let oldContent = [...myState];
    oldContent[index].name = e.target.value;
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
    if (myState[index]?.data !== '') {
      navigator.clipboard.writeText(myState[index].data);
      refTextArea.current[index].current.select();
      refcopyButton.current[index].current.textContent = 'Copied !';
      setTimeout(() => {
        refcopyButton.current[index].current.textContent = 'Copy';
      }, 500);
    }
    else {
      let oldContent = [...myState];
      oldContent.splice([index], 1);
      setMyState(oldContent);
      localStorage.setItem('stickyNotes', JSON.stringify(oldContent));
    }
  }

  const changeColor = (e, index) => {
    let oldContent = [...myState];
    switch (oldContent[index].color) {
      case 'primary':
        oldContent[index].color = 'secondary';
        break;
      case 'secondary':
        oldContent[index].color = 'success';
        break;
      case 'success':
        oldContent[index].color = 'danger';
        break;
      case 'danger':
        oldContent[index].color = 'warning';
        break;
      case 'warning':
        oldContent[index].color = 'light';
        break;
      case 'light':
        oldContent[index].color = 'dark';
        break;
      case 'dark':
        oldContent[index].color = 'info';
        break;
      default:
        oldContent[index].color = 'primary';
    }
    setMyState(oldContent);
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
            <div className="col-12 col-sm-4">
              <h1 className={`h5 text-primary my-0`}>
                <a href="/" className="text-decoration-none">Sticky Notes</a>
              </h1>
            </div>
            <div className="col-12 col-sm-8 text-end">
              <button className="btn bg-primary bg-opacity-75 text-white" onClick={exportData}>Export Data</button>
              <a href="https://www.linkedin.com/in/dheerajarora1997/" target="_blank" className={`btn bg-primary bg-opacity-75 text-white ms-2`} rel="noreferrer">
                Dheeraj Arora <small className="material-icons"> launch </small>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={`bg-primary bg-opacity-10 py-3 min-vh-100`}>
        <div className="container">
          <div className="row align-items-center mb-2">
            <div className="col-9">
              <p className="my-2">
                <strong>Note : </strong><span>Your entire data set will be kept in your browser local storage.</span>
              </p>
            </div>
            <div className={`col-3 text-end ${myState.length >= 9 ? 'd-none' : ''}`}>
              <button className={`h-100 text-primary bg-primary bg-opacity-25 border border-primary rounded position-relative shadow-sm sticky-card-empty text-decoration-none py-1`} onClick={addStickyNote}>
                <div className="d-flex align-items-center justify-content-center">
                  <span className={`bg-primary bg-opacity-25 d-inline-block rounded-circle d-flex justify-content-center align-items-center me-2 fs-5`} style={{ width: '25px', height: '25px' }}>+</span>
                  {myState === 0 ? <span className="d-block">Create Sticky Note</span> : <span className="d-block">Add New Note</span>}
                </div>
              </button>
            </div>
          </div>
          <ReactSortable className="row gx-0" list={myState} setList={setMyState} animation={200} handle=".dragHadle" >
            {myState?.map((element, index) => {
              return (
                <div className={`col-12 col-sm-6 col-md-${element.size} mb-3`} style={noteBorder} key={index}>
                  <div className={`rounded overflow-hidden position-relative sticky-card`}>
                    <div className={`bg-${element.color} bg-opacity-25 d-block py-2 px-3 w-100 shadow-sm`}>
                      <div className="row align-items-center w-100 g-0">
                        <div className="col-7">
                          <h3 className={`h6 my-1 my-md-0 text-${element.color} text-opacity-75 fw-normal d-flex align-items-center position-relative`}>
                            <span className={`material-icons-outlined dragicon ${isMobile > 768 ? 'dragHadle' : ''}`}> drag_indicator </span>
                            <input type="text" className={`border-0 py-1 m-0 w-100 ps-1 text-${element.color}`} style={{ background: 'none', }} maxLength="18"
                              value={element.name} onChange={(e) => { updateName(e, index) }}
                            />
                          </h3>
                        </div>
                        <div className="col-5 text-end">
                          <div className="sticky-options d-flex justify-content-end">
                            {
                              <button type="button" className={`small nowrap py-1 px-2 bg-${element.color} bg-opacity-25 border-0 text-${element.color} rounded pointer me-0 me-md-2 ${myState.length === 1 && element.data === '' ? 'd-none' : ''}`} onClick={(e) => { copyDeleteFunction(e, index) }} ref={refcopyButton.current[index]}>{element.data ? 'Copy' : 'Delete'}</button>
                            }
                            <button type="button" className={`bg-${element.color} bg-opacity-25 text-${element.color} border-0 py-0 px-2 rounded-circle d-md-flex d-none justify-content-center align-items-center me-1`} style={{ minHeight: '30px' }} data-bs-toggle="tooltip" data-bs-placement="top" title="Decrease Size" onClick={(e) => { decreaseSize(e, index) }} disabled={element.size === 4 ? 'disabled' : ''}
                            >
                              <span className={`material-icons-outlined flip-icon`}>start</span>
                            </button>
                            <button type="button" className={`bg-${element.color} bg-opacity-25 text-${element.color} border-0 py-0 px-2 rounded-circle d-md-flex d-none justify-content-center align-items-center`} style={{ minHeight: '30px' }} data-bs-toggle="tooltip" data-bs-placement="top" title="Increase Size" onClick={(e) => { increaseSize(e, index) }}>
                              <span className={`material-icons-outlined`}>start</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <textarea ref={refTextArea.current[index]} className={`form-control border-0 bg-${element.color} bg-opacity-10 rounded-0 text-${element.color}`} rows={`${element.size > 8 ? 12 : 7}`} onChange={(e) => { updateContent(e, index) }} value={element.data} placeholder="Enter some Text"></textarea>
                    <button className={`btn color-btn border-0 py-2 text-${element.color} bg-${element.color} bg-opacity-25 `} onClick={(e) => { changeColor(e, index) }}>
                      <span className="material-icons-outlined">color_lens</span>
                    </button>
                  </div>
                </div>
              )
            })}
          </ReactSortable>
          <div className="row justify-content-center">
            {myState.length >= 9 ?
              <div className="col-12">
                <div className={`alert alert-primary fade show`} role="alert">
                  <strong>Note : </strong> Only 9 Sticky Notes allowed.
                </div>
              </div> :
              <div className={`col-12 col-sm-6`}>
                <button className={`w-100 h-100 text-primary bg-primary bg-opacity-10 border border-primary rounded position-relative shadow-sm sticky-card-empty text-decoration-none py-2 mt-1`} onClick={addStickyNote}>
                  <div className="d-flex align-items-center justify-content-center">
                    <span className={`bg-primary bg-opacity-25 d-inline-block rounded-circle d-flex justify-content-center align-items-center me-2 fs-4`} style={{ width: '35px', height: '35px' }}>+</span>
                    {myState === 0 ? <span className="d-block">Create Sticky Note</span> : <span className="d-block">Add New Note</span>}
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