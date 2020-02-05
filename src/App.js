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
    let listTot = 0;
    let cardBoxesArr = domHeightObj.heightCardBoxesArr;
    for (const indexKey in cardBoxesArr) {
      let intoLists = cardBoxesArr[indexKey];
      intoLists.map((indexValue) => {
        listTot += indexValue;
        
      })
      console.log(listTot);
    }
    
    /* 
    for (let index = 0; index < cardBoxesArr.length; index++) {
      const element = cardBoxesArr[index];
      console.log(element);
      
    } */
  }
  let setCardBoxesHeight = () => {
    let heightCardContainer = 0;
    
    
    setTimeout(() => {
      //Save it to its space
      domHeightObj['cardContainer'] = refHeightCardContainer.current.offsetHeight;      
      refHeightCardsArr.map((toDoList, countList) => {
        
        // Createing an array placing the boxes heights. The last index is tot in the list
        heightCardBoxesArr.push([]);
        domHeightObj['heightCardBoxesArr'] = heightCardBoxesArr;
        
        toDoList.map((toDoBoxes, countBoxes) => {
          console.log(toDoList[countBoxes].current.id);
          domHeightObj.heightCardBoxesArr[countList].push(refHeightCardsArr[countList][countBoxes].current.offsetHeight);   
          
          /* let getListHeightValues = toDoBoxes.current.offsetHeight;
          if (toDoBoxes.current.id === `list${countList}`) {
            domHeightObj.heightCardBoxesArr[countList].shift('cd')
          } */
          //console.log(getListHeightValues);
        
        })
      });
      console.log(domHeightObj);
      //calcHeightOfCardContainers();
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
              let listName = `list${listNr}`;
              
              let getToDoCards = dataLists.toDoCards;

              refHeightCardsArr.push([]);


              return(
                <section key={ listNr } className="toDoCardsListContainer">
                  {
                    getToDoCards.map((cards, cardBoxNr) => {
                      refHeightCardsArr[listNr].push(React.createRef());

                      return(
                        <div key={ cardBoxNr } className="toDoCardBoxes" ref={ refHeightCardsArr[listNr][cardBoxNr]} id={ listName }>
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
      {setCardBoxesHeight()}
    </div>
  );
}

export default App;