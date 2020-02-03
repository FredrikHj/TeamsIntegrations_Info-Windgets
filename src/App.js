import React, { useEffect, useState} from 'react';
import './components/css/App.sass';
import { createNewInstance } from './components/data/authentication';
import { runAxiosGet } from './components/data/axiosGet';
import { toDoList } from './components/data/toDoList';

function App() {
  const [ accessToken, setAccessToken ] = useState('');
  const [ plannerData, updatePlannerData ] = useState(toDoList);
  let refCardContainer = React.createRef();


  
  //React.createRef();

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
  }
  useEffect(() => {
    if (!plannerData) return;
  },[]);
  console.log(accessToken);
  getAuthtoken();
  runAxiosGet( accessToken );
  console.log(plannerData);
  /*   let removeBlankHeadline = (toDoHeadLine) => {
    let removeBlankHeadline = `list${toDoHeadLine.split(' ')[1]}`;
    return removeBlankHeadline;
  } */
  let setElementHeight = () => {
    let refsDomObj = {};
    setTimeout(() => {
      refsDomObj = {
        heightCardContainer: refCardContainer.current.offsetHeight,
      };  
      console.log(refsDomObj);
    }, 1000);

  }
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
        <section id="toDoCardContainer" ref={ refCardContainer }>
          {setElementHeight()}
          {
            plannerData.map((data, cardsNr) => {
              let getToDoCards = data.toDoCards;
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