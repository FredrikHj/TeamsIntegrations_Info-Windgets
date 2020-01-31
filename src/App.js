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
    maxIndexSide()
  },[]);
  
  getAuthtoken();
  runAxiosGet( accessToken );
  console.log(plannerData);
/*   let removeBlankHeadline = (toDoHeadLine) => {
    let removeBlankHeadline = `list${toDoHeadLine.split(' ')[1]}`;
    return removeBlankHeadline;
  } */
  let maxIndexSide = () => {    
    let elementName = document.querySelectorAll('.toDoCardBoxes');    
    console.log(elementName);
    //return elementName;
  }
  
  return (    
    <div className="appbody">
      
      <header id="appHeadLineContainer">
        <p id="appHeadLine">Teams Integrations</p>
      </header>

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