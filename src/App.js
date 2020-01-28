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
      scopes: ["user.read", "Group.Read.All", "Group.ReadWrite.All"], // optional Array<string>
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
    <div className="appbody">

      <header id="appHeadLineContainer">
        <p id="appHeadLine">Teams Integrations</p>
      </header>

      <main>
        <section className="toDoHeadLineContainer">
          {
            plannerData.map((data) => {
              console.log(data);

              return (
                <section className="toDoHeadLinesBox">
                  { data.toDoHeadLine }         
                </section>
              ); 
            })
          }
        </section>  
        <section id="toDoCardContainer">
          { 
            plannerData.map((data) => {
              console.log(data);
              let getToDoCards = data.toDoCards;
              
                return(
                  <section className="toDoCardsListContainer">
                    {
                      getToDoCards.map((cards) => {
                        return(
                          <section className="toDoCardBoxes">
                            <div className="toDoCardHeadLine">{ cards.cardHedline }</div>
                            <hr></hr>
                            <div className="toDoCardHeadContent">{ cards.cardContent }</div>
                          </section>
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