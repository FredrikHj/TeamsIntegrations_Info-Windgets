import React, { useEffect, useState} from 'react';
import './components/styles/App.sass';

/* import { createNewInstance } from './components/data/authentication';
import { runAxiosGet } from './components/data/axiosGet'; */
import { toDoList } from './components/data/toDoList';
import { ToDoCards } from './components/structure/toDoCards';

import { logDOM } from '@testing-library/react';
/* import { LogLevel, UserAgentApplication } from 'msal';
import style from './components/styles/common.sass'; */

// Generall variables
let cardBoxSpace = 40;

let listIndex = -1;
let count = -1;
const App = () => {
  count++;
  //const [ accessToken, setAccessToken ] = useState('');
  const [ toDoData ] = useState(toDoList);
  const [ domHeightArr ] = useState([]); 
  const [ listCardPagesArr ] = useState([]); 
  const [ heightCardBoxesArr ] = useState([]); 
  const [ currentCardPageArr ] = useState([]); 
  const [ currentShowingCard ] = useState([]); 
  const [ refHeightCardsArr ] = useState([]); 
  const [ currentTodoData ] = useState([]); 
  const [ getVisibleDataArr ] = useState([]); 
  let [ loopList, updateLoopList ] = useState(0); 
  
  const refHeightCardContainer = React.createRef(); 
  let promiseFooterArr = new Promise(success => {
    window.onload = (event) => {
      createHeightArr();
      success();
    };
    
  })
  
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
  */ 
  useEffect(() => {
    //if (!toDoData || !refHeightCardContainerObj.current) return;
  }, [listCardPagesArr]);
  console.log(refHeightCardContainer)
  /*   console.log(accessToken);
  getAuthtoken();
  runAxiosGet( accessToken ); */
  
  let createHeightArr = () => {
    let getNrOfCards = 0;
    console.log(domHeightArr);
    
    domHeightArr.push(refHeightCardContainer.current.offsetHeight);     
    
    //Save it to its space
    /*
    Index 0 = cardContainers height.
    Index 1 = Arrays of the lists and holding the height values of the list cards 
    Index 2 is the tot of the values for the specific list!
    */
    domHeightArr.push(heightCardBoxesArr);
    domHeightArr.push([]);
    
    // Get out the offsetHeight from eatch cardelement and save the values to a common space 
    toDoData.map((item, listIndex) => {
      heightCardBoxesArr.push([]); 
      item.toDoCards.map((item, cardIndex) => {
        domHeightArr[1][listIndex].push(refHeightCardsArr[listIndex][cardIndex].current.offsetHeight+cardBoxSpace /*+style.cardBoxSpace */);
        console.log(domHeightArr[1][listIndex]);
      })
      calcHeighOtfCardBoxes(listIndex)
    })
    
    refHeightCardsArr.map((item, index) => {
      console.log(refHeightCardsArr[index][1].current.offsetHeight);
      
      
    });
  }
  let calcHeighOtfCardBoxes = (listNr) => {
    let getIntoList = domHeightArr[1][listNr];  
    let showCardBoxPage = getIntoList.length;
    
    let savedListTot = 0;
    
    for (let index = 0; index  < getIntoList.length; index++) {
      //Save the tot of a list array at the end as the last index in that array
      savedListTot += getIntoList[index];
      if (index === getIntoList.length - 1) domHeightArr[2].push(savedListTot);
    }
    
    return showCardBoxPage;
  }
  promiseFooterArr.then((data) => {
    calcCardOfSide();
    //setFooterCalc(true);
  })
  
  let calcCardOfSide = () => {
    let maxCardPage = 0;
    let maxCardShowing = 0;
    
    let heightCardContainer = domHeightArr[0]    
    let heightCardBox = domHeightArr[1][0][0];
    maxCardShowing = Math.round(heightCardContainer/heightCardBox);
    console.log(maxCardShowing);
    
    for (let index = 0; index < domHeightArr[1].length; index++) {
      let cardQuantity = domHeightArr[1][index].length;
      maxCardPage = Math.round(cardQuantity/maxCardShowing);
      
      //Update the card / page      
      let setListPage = maxCardPage;
      if (setListPage === 0) setListPage = 1;
      listCardPagesArr.push(setListPage);        
      console.log(listCardPagesArr);
    }    
  }
  let fixShowingCards = (index, cardData) => {   
    let currentSideNr = 1;
    let startCardIndex = 0;
    
    let endCardIndex = 0;
    
    /*  startCardIndex = currentSideNr*0-0; // Start Index 
    endCardIndex = currentSideNr*0;+// End index
    */
    console.log(currentSideNr);
    console.log(startCardIndex);
    console.log(endCardIndex);
    
    //updateLoopList(loopList++);
    return cardData/* .slice(0, 7) */;
  }

  return (
    <div id="appbody">
        Teams Integrations 
      <main>
        <section className="toDoHeadLineContainer">
          {
            toDoData.map((item, index) => {        
              return (
                <section key={ index } className="toDoHeadLinesBox">
                  { item.toDoHeadLine }         
                </section>
              ); 
            })
          }
        </section>  
        {/* Save ref to correspnding created ref in top of the component */}
        <section id="toDoCardContainer" ref={ refHeightCardContainer }> 
          {
            toDoData.map((item, index) => {
              console.log(item);
              
              // Force the push function only pushing the actual elements
              if (refHeightCardsArr.length <= index){
                refHeightCardsArr.push([]);
                currentCardPageArr.push([]);
              };     

              return(
                <ToDoCards key={ index }
                  mainTodoList={ item.toDoCards }
                  fixShowingCards={ fixShowingCards(index, item.toDoCards) }
                  refHeightCardsArr={ refHeightCardsArr }
                  listIndex={ index }
                  currentCardPageArr={ currentCardPageArr }
                />
                );
              })
            }
        </section>
      </main>
      <footer id="toDoCardSidesContainer">
        {
          toDoData.map((item, index) => {
            console.log(listCardPagesArr);
            
            return(
              <section key={ index } className="toDoHeadLinesBox toDoCardSides">
                {`Sid ${currentCardPageArr[index]} av ${listCardPagesArr[index]}`}
              </section>
            );
          })
        }
      </footer>
    </div>
  );
}

export default App;