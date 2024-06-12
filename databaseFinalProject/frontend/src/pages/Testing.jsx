import React from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function Testing() {
  const TestAPI = () => {
    const csrftoken = cookies.get("csrftoken");

    if (!csrftoken) {
      console.error("CSRF token not found");
      return;
    }

    fetch("/api/api_submitAccount/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken, // CSRF token
      },
      credentials: "same-origin",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) =>
        console.error("There was a problem with the fetch operation:", error)
      );
  };

  return (
    <div>
      <button className="testing" onClick={TestAPI}>
        Testing
      </button>
    </div>
  );
}
