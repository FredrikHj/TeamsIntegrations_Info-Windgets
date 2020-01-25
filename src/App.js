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
    let programId = '1a29bb77-9d79-4adf-933f-c95c3d0a62e9';
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
    createNewInstance().loginPopup(loginRequest).then(function (response) {
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
      Teams Integrations 
      {(plannerData.length !== 0) 
        ? plannerData.map((data) => {
            console.log(data);
            return(
                {data}
            )
          })
        : 'Datan laddades inte in!'
      }


    </div>
  );
}

export default App;