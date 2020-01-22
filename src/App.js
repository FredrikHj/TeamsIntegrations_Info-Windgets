import React, { useEffect } from 'react';
import './App.css';
import * as microsoftTeams from "@microsoft/teams-js";
let count = 0;
let auth = '';

function App() {
  useEffect(() => {
  
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

  return (
    
    <div className="App">

      Teams Integrations 

    </div>
  );
}

export default App;
