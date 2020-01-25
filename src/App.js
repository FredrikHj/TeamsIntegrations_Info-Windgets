import React, { useEffect, useState} from 'react';
import './components/css/App.sass';
import { createNewInstance } from './components/data/authentication';
import { runAxiosGet } from './components/data/axiosGet';
import { toDoList } from './components/data/toDoList';

function App() {
  const [ accessToken, setAccessToken ] = useState('');
  const [ plannerData, updatePlannerData ] = useState(toDoList);
 
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