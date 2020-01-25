import React, { useEffect, useState} from 'react';
import './App.css';
import { UserAgentApplication } from "msal";
import Axios from 'axios';

let toDoList = [
  {
    toDoHeadLine: 'List 1',
    toDoCards: [
      {
        cardHedline: 'Card 1',
        cardContent: 'refvrga',
      },
      {
        cardHedline: 'Card 2',
        cardContent: 'ufyyuj',
      }
    ]
  },
  {
    toDoHeadLine: 'List 2',
    toDoCards: [
      {
        cardHedline: 'Card 1',
        cardContent: 'refvrga',
      },
      {
        cardHedline: 'Card 2',
        cardContent: 'ufyyuj',
      }
    ]
  },
  {
    toDoHeadLine: 'List 3',
    toDoCards: [
      {
        cardHedline: 'Card 1',
        cardContent: 'refvrga',
      },
      {
        cardHedline: 'Card 2',
        cardContent: 'ufyyuj',
      }
    ]
  }
];

function App() {
  const [ accessToken, setAccessToken ] = useState('');
  const [ plannerData, updatePlannerData ] = useState(toDoList);

  let [ reRun, updateReRun ] = useState(0);
  let loginAuth = () => {
    let programId = '1a29bb77-9d79-4adf-933f-c95c3d0a62e9';
    let klientorganisationId = 'fbb2c627-4588-4c2f-b6a4-0dfb5dc31330';
    // Configuration object constructed
    var msalConfig = {
      auth: {
        clientId: programId,
        authority: `https://login.microsoftonline.com/${klientorganisationId}`,
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
      updateReRun(1)
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
      /* if (plannerData === null) {
        updatePlannerData(response.data);
      } */
      
    }).catch(error => {
      console.log(error.response);
    });
  }
    useEffect(() => {
      if (!plannerData) return;
    },[]);
    
  getAuthtoken();
  runAxiosGet( accessToken );
  console.log(plannerData);
  
  return (    
    <div className="App">
      Teams Integrations

      {

        plannerData.map((data) => {
          console.log(data);
          

          return (
          <div>{ data.toDoHeadLine }</div>
          )
        })
      }
    </div>
  );
}

export default App;