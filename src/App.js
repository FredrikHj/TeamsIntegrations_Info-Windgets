import React, { useEffect, useState} from 'react';
import './components/css/App.sass';
import { createNewInstance } from './components/data/authentication';
import { runAxiosGet } from './components/data/axiosGet';
import { toDoList } from './components/data/toDoList';

function App() {
  const [ accessToken, setAccessToken ] = useState('');
  const [ plannerData, updatePlannerData ] = useState(toDoList);
  let refHeightCardsObj = {}
  let createBoxName = [];
  let refHeightCardContainer = React.createRef();

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
  let setCardOfSide = () => {
    console.log(refHeightCardsObj);

/*     setTimeout(() => {
      refsDomObj = {
        heightCardContainer: refCardContainer.current.offsetHeight,
      };  
      console.log(refsDomObj);
    }, 1000); */

  }
  
  return (
    
    <div id="appbody">

      Teams Integrations 

      <main>
        <section className="toDoHeadLineContainer">
          {
            plannerData.map((dataLists, listNr) => {
              console.log(listNr);
              
              return (
                <section key={ listNr } className="toDoHeadLinesBox">
                  { dataLists.toDoHeadLine }         
                </section>
              ); 
            })
          }
        </section>  
        <section id="toDoCardContainer" ref={ refHeightCardContainer }>
          {
            plannerData.map((dataLists, listNr) => {

              let getToDoCards = dataLists.toDoCards;
              let listName = `list${listNr+1}`;

              return(
                <section key={ listNr } className="toDoCardsListContainer">
                  {
                    getToDoCards.map((cards, cardBoxNr) => {
                      
                      let cardBoxName = `toDoCardBoxes${cardBoxNr}`;
                      console.log(cardBoxName);
                      createBoxName.push(React.createRef());

                      refHeightCardsObj[listName] = createBoxName;

                      return(
                        <div key={ cardBoxNr } className="toDoCardBoxes" /* ref={ createBoxName[cardBoxName] } */>
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
        <footer id="toDoCardSidesContainer">
          {
            plannerData.map((dataLists, listNr) => {
              console.log(listNr);
              return(
                <section key={ listNr } className="toDoHeadLinesBox toDoCardSides">
                  {`Sidan ${'1'} av ${'1'}`}
                </section>
              );
            })
          }
        </footer>
      </main>
      {setCardOfSide()}
    </div>
  );
}

export default App;