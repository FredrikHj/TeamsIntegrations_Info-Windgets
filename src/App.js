import React, { useEffect } from 'react';
import './App.css';
import * as microsoftTeams from "@microsoft/teams-js";
import { UserAgentApplication } from "msal";
let count = 0;
let auth = '';

/*
Program-ID (klient)
:
f419a7f3-aed6-42a9-9158-a877e14cff63
Katalog-ID (klientorganisation)
:
fbb2c627-4588-4c2f-b6a4-0dfb5dc31330
Objekt-ID
:
3353a44f-98f8-4730-8ca7-5adea4f3f4bf
*/

function App() {
  // Configuration object constructed
const msalConfig = {
  auth: {
      clientId: 'fbb2c627-4588-4c2f-b6a4-0dfb5dc31330',
      promt: 'Account'
  }
}

// create UserAgentApplication instance
const msalObj = new UserAgentApplication(msalConfig);
console.log(msalObj);

function authCallback(error, response) {
  //handle redirect response
}

// (optional when using redirect methods) register redirect call back for Success or Error
msalObj.handleRedirectCallback(authCallback);

var loginRequest = {
  scopes: ["user.read", "mail.send"], // optional Array<string>
  prompt: 'select_account',
};
let accessTokenRequest = {
  scopes: ["user.read", "mail.send"]
}
msalObj.loginPopup(loginRequest).then(function (loginResponse) {               
  return msalObj.acquireTokenSilent(accessTokenRequest);
}).then(function (accessTokenResponse) {
  const token = accessTokenResponse.accessToken;
  console.log(token);
  
}).catch(function (error) {  
  //handle error
});

/*   useEffect(() => {
  
    if (count === 1) {
      microsoftTeams.initialize();
      
      auth = microsoftTeams.authentication.authenticate({
        url: 'http://localhost:3000',
        width: '200px',
        height: '100px',
        successCallback: '',
        failureCallback: ''
      });
      
      return;
    }
    count++;
  },[]);
  console.log(auth);
 */
  return (
    
    <div className="App">

      Teams Integrations 

    </div>
  );
}

export default App;
