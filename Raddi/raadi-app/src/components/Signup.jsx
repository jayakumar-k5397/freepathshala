import React from 'react'

export default function Signup() {
  return (
    <>  
   <form action='http://localhost:5000/login' method='post'>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">
      User Name
    </label>
    <input
      type="text"
      className="form-control"
      id="exampleInputEmail1"
      name="name"
      aria-describedby="emailHelp"
    />
    <div id="emailHelp" className="form-text">
      We'll never share your details with anyone else.
    </div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      Password
    </label>
    <input
      type="password"
      className="form-control"
      id="exampleInputPassword1"
      name="password"
    />
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      Password
    </label>
    <input
      type="password"
      className="form-control"
      id="exampleInputPassword1"
      name="password"
    />
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword2" className="form-label">
      Re-enter Password
    </label>
    <input
      type="password"
      className="form-control"
      id="exampleInputPassword2"
      name="password1"
    />
  </div>

  <button type="submit" className="btn btn-primary">
    Submit
  </button>
</form>

    </>
  )
}
