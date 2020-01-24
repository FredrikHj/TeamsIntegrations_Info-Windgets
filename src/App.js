import React, { useEffect, useState} from 'react';
import './App.css';
import { UserAgentApplication } from "msal";
import Axios from 'axios';

function App() {
  const [ accessToken, setAccessToken ] = useState('');
  const [ plannerData, updatePlannerData ] = useState([]);
  useEffect(() => {
  },[]);
  
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
    createNewInstance().acquireTokenSilent(loginRequest).then(function (response) {
      setAccessToken(response.accessToken);
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
  }
  
  let runAxiosGet = (accessToken) => {
    Axios.get('https://graph.microsoft.com/v1.0/me/', {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    }).then(response => {
      console.log(response);
      updatePlannerData(response.data);
      
    }).catch(error => {
      console.log(error.response);
    });
  }
  getAuthtoken();
  runAxiosGet( accessToken );
  console.log(plannerData);
  
  return (
    
    <div className="App">
      {
          plannerData.map((data) => {
            console.log(data);
            return(
                {data}
            )
          })
      }
      Teams Integrations 


    </div>
  );
}

export default App;