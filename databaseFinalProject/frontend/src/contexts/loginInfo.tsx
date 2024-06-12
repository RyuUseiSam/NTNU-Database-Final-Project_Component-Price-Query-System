import React, { createContext, useContext, useState } from 'react';

type loginInfoProps = {
    children: React.ReactNode;
};

type loginInfoType = {
    userName: string;
    isLoggedIn: boolean;
    setUserName: (userName: string) => void;    
    login: (username: string, password: string) => void;
    logout: () => void;

};

const loginInfoContext = createContext({} as loginInfoType);

export function useLoginInfo() {
    return useContext(loginInfoContext);
}

export function loginInfo({ children }: loginInfoProps) {
    const [userName, setUserName] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // const login = (event) => {
    //     event.preventDefault();
    //     fetch("/api/login/", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "X-CSRFToken": cookies.get("csrftoken"), //CSRF token
    //       },
    //       credentials: "same-origin",
    //       body: JSON.stringify({ username: username, password: password }),
    //     })
    //       .then(isResponseOk)
    //       .then((data) => {
    //         console.log(data);
    //         setisAuthenticated(true);
    //         setUsername("");
    //         setPassword("");
    //         setError("");
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //         setError("Invalid username or password");
    //       });
    //   };
    const isResponseOk = (response) => {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            throw Error(response.statusText);
        }
    };

    const login = (
        username: string,
        password: string
    ) => {
        // For django, we need the code below and send a POST request to the server to login
        fetch('/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            body: JSON.stringify({ username: 'username', password: 'password' }),
        })
            .then(isResponseOk)
            .then((data) => {
                console.log(data);
                setIsLoggedIn(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const logout = () => {
        // For django, we need the code below and send a POST request to the server to logout
        fetch('/api/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
        })
            .then(isResponseOk)
            .then((data) => {
                console.log(data);
                setIsLoggedIn(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }




    return (
        <loginInfoContext.Provider
            value={{
                isLoggedIn,
                userName,
                setUserName,
                login,
                logout,
             }}>
            {children}
        </loginInfoContext.Provider>
    )

}