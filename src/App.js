import React, { useEffect, useState} from 'react';
import './App.css';
import * as microsoftTeams from "@microsoft/teams-js";
import { UserAgentApplication } from "msal";
import { logDOM } from '@testing-library/react';
import Axios from 'axios';

function App() {
  const [ accessToken, setAccessToken ] = useState('');

  let loginAuth = () => {
    let programId = 'f419a7f3-aed6-42a9-9158-a877e14cff63';
    // Configuration object constructed
    var msalConfig = {
      auth: {
        clientId: programId,
        authority: `https://login.microsoftonline.com/${programId}`,
        redirectURI: "http://localhost:3000/"
      },
      cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true
      }
    };
    console.log(msalConfig);
    
    return msalConfig;
  }
  let createNewInstance = () => {
    // create UserAgentApplication instance
    const msalObj = new UserAgentApplication(loginAuth());  
    return msalObj;
  }
  let getAuthtoken = () => {
    let loginRequest = {
      scopes: ["user.read"], // optional Array<string>
    };
    createNewInstance().acquireTokenSilent(loginRequest).then(function (tokenResponse) {
      setAccessToken(tokenResponse.accessToken);
      console.log(tokenResponse);
    }).catch(function (error) {
      console.log(error);
    });
  }
    
  useEffect(() => {
    getAuthtoken();
  },[]);
  console.log(accessToken);
  let runAxiosGet = (accessToken) => {
    Axios.get('https://graph.microsoft.com/v1.0/me/', {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    }).then(response => {
      console.log(response);
      
    }).catch(error => {
      console.log(error.response);
    });
  }
  runAxiosGet( accessToken );

/* Axios.get('https://graph.microsoft.com/v1.0/me/', {
  headers: {
    Bearer: accessToken
  }
}).then(response => {
console.log(response);

}).catch(error => {
  console.log(error.response);
}); */

 /*  function authCallback(error, response) {
    //handle redirect response
  }
  // (optional when using redirect methods) register redirect call back for Success or Error
  msalObj.handleRedirectCallback(authCallback);
*/

  return (
    
    <div className="App">

      Teams Integrations 

    </div>
  );
}

export default App;