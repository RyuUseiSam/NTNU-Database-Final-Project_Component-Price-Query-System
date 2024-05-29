import React from "react";

export default function Testing() {
  const TestAPI = () => {
    fetch("api/testAPI", {
      // Sending a POST request
      //
    })
      // Converting received data to JSON if the server returned data
      .then((response) => response.json()) // it's optional, you can comment it, if you don't need to convert the response to JSON
      .then((data) => console.log(data));
  };

  /*  ----------- EXAMPLE ------------ */
  // const login = (event) => {
  //   event.preventDefault();
  //   fetch("/api/login/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "X-CSRFToken": cookies.get("csrftoken"), //CSRF token
  //     },
  //     credentials: "same-origin",
  //     body: JSON.stringify({ username: 'admin', password: 'admin }),
  //   })
  //     .then(isResponseOk)
  //     .then((data) => {
  //       console.log(data);
  //       setisAuthenticated(true);
  //       setUsername("");
  //       setPassword("");
  //       setError("");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setError("Invalid username or password");
  //     });
  // };

  return (
    <div>
      <button className="testing" onClick={TestAPI}>
        Testing
      </button>

      {/* EXAMPLE */}
      {/* <button className="login" onClick={login}>
        Login
      </button> */}
    </div>
  );
}
