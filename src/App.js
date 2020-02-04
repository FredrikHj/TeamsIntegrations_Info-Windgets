import React, { useEffect, useState} from 'react';
import './components/css/App.sass';
import { createNewInstance } from './components/data/authentication';
import { runAxiosGet } from './components/data/axiosGet';
import { toDoList } from './components/data/toDoList';

function App() {
  //const [ accessToken, setAccessToken ] = useState('');
  const [ plannerData, updatePlannerData ] = useState(toDoList);
  let refHeightCardContainer = React.createRef();
  let domHeightObj = {};
  let refDomHeightsObj = {};
  let refHeightCardsArr = [];
  let heightCardBoxesArr = [];

/*   let getAuthtoken = () => {
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
 */  useEffect(() => {
    if (!plannerData) return;
  },[]);
/*   console.log(accessToken);
  getAuthtoken();
  runAxiosGet( accessToken ); */
  console.log(plannerData);

  /* The function willl take three argumment = calMaxCardOfContainers(arg1 ,arg2, arg3) ...
    arg 1 = What list
    arg 2 = Nr1 calculating
    arg 3 = Nr2 calculating
  */
  let calcHeightOfCardContainers = () => {

    console.log(domHeightObj);
    let cardBoxesArr = domHeightObj.heightCardBoxesArr;
    for (let index = 0; index < cardBoxesArr.length; index++) {
      const element = cardBoxesArr[index];
      console.log(element);
      
    }

  }
  let setCardOfSide = () => {
    let heightCardContainer = 0;

    //Save it to its space
    refDomHeightsObj['refHeightCardContainer'] = refHeightCardContainer;
    refDomHeightsObj['refHeightCardsArr'] = refHeightCardsArr;
    
    setTimeout(() => {
      let redfCardBoxesArr = refDomHeightsObj.refHeightCardsArr;
      //refHeightCardContainer = refDomHeightsObj.refHeightCardContainer;
      heightCardContainer = refDomHeightsObj.refHeightCardContainer.current.offsetHeight;
      domHeightObj['cardContainer'] = heightCardContainer;
      
      redfCardBoxesArr.map((toDoList, countList) => {
        
        // Createing a array placing the boxes heights. The last index is tot in the list
        heightCardBoxesArr.push([]);
        domHeightObj['heightCardBoxesArr'] = heightCardBoxesArr;
        
        toDoList.map((toDoBoxes, countBoxes) => {
          let presentToDoList = domHeightObj.heightCardBoxesArr[countList];
          presentToDoList.push(refDomHeightsObj.refHeightCardsArr[countList][countBoxes].current.offsetHeight);   
          console.log(
            presentToDoList
          );
          
        })
      });
    }, 1000);
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
              let createBoxName = [];
              
              let getToDoCards = dataLists.toDoCards;

              refHeightCardsArr.push([]);


              return(
                <section key={ listNr } className="toDoCardsListContainer">
                  {
                    getToDoCards.map((cards, cardBoxNr) => {
                      refHeightCardsArr[listNr].push(React.createRef());

                      return(
                        <div key={ cardBoxNr } className="toDoCardBoxes" ref={ refHeightCardsArr[listNr][cardBoxNr] }>
                          <div className="toDoCardHeadLine">{ cards.cardHedline }</div>
                          <hr></hr>
                          <div className="toDoCardHeadContent">{ cards.cardContent }</div>
                        </div>
                      );

                    })
                  }
                  <section key={ listNr } className="toDoHeadLinesBox toDoCardSides">
                    {`Sidan ${'1'} av ${'1'}`}
                  </section>
                </section>
                
              );
            })
          }
        </section>
      </main>
      {setCardOfSide(calcHeightOfCardContainers())}
    </div>
  );
}

export default App;