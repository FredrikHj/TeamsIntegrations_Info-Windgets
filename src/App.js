import React, { useEffect, useState} from 'react';
import './components/css/App.sass';
import { createNewInstance } from './components/data/authentication';
import { runAxiosGet } from './components/data/axiosGet';
import { toDoList } from './components/data/toDoList';

function App() {
  const [ accessToken, setAccessToken ] = useState('');
/*         authority: `https://login.microsoftonline.com/${'clientId'}`,
        redirectURI: "http://localhost:3000/"
      },
      cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true
      }
    };
    return msalConfig;
  } */
  let createNewInstance = () => {
    // create UserAgentApplication instance
    const msalObj = new UserAgentApplication(loginAuth());
    console.log(msalObj);
    
    return msalObj;
  }
  let getAuthtoken = () => {
    let loginRequest = {
      scopes: ["user.read", "mail.send"] // optional Array<string>
    };
    createNewInstance().acquireTokenSilent(loginRequest).then(function (response) {
      setAccessToken(response.accessToken);
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });

  useEffect(() => {
    if (!plannerData) return;
    maxIndexSide()
  },[]);
  console.log(accessToken);

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

      <main>
        <section className="toDoHeadLineContainer">
          {
            plannerData.map((data, taskNr) => {
              console.log(taskNr);
              
              return (
                <section key={ taskNr } className="toDoHeadLinesBox">
                  { data.toDoHeadLine }         
                </section>
              ); 
            })
          }
        </section>  
        <section id="toDoCardContainer">
          { 
            plannerData.map((data, cardsNr) => {
              let getToDoCards = data.toDoCards;
              //let cardName = 
              return(
                <section key={ cardsNr } className="toDoCardsListContainer">
                    {
                      getToDoCards.map((cards, cardContentNr) => {
                        //let cardName = `${removeBlankHeadline(data.toDoHeadLine)}Card${cardContentNr}`;
                        return(
                          <div key={ cardContentNr } className="toDoCardBoxes">
                            <div className="toDoCardHeadLine">{ cards.cardHedline }</div>
                            <hr></hr>
                            <div className="toDoCardHeadContent">{ cards.cardContent }</div>
                          </div>
                        );
                      })
                    }
                  </section>
                );
                
              })
            }
        </section>
      </main>
    </div>
  );
}
export default App;