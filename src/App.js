import React, { useEffect, useState} from 'react';
import './components/styles/App.sass';

/* import { createNewInstance } from './components/data/authentication';
import { runAxiosGet } from './components/data/axiosGet'; */
import { toDoList } from './components/data/toDoList';
import { ToDoCards } from './components/structure/toDoCards';

import { logDOM } from '@testing-library/react';
/* import { LogLevel, UserAgentApplication } from 'msal';
import style from './components/styles/common.sass'; */
  let test = 10;
  
// Generall variables
let cardBoxSpace = 40;

let listIndex = -1;
let count = -1;
const App = () => {
  count++;
  //const [ accessToken, setAccessToken ] = useState('');
  const [ toDoData, setToDoData ] = useState(toDoList);
  console.log("TCL: App -> toDoData", toDoData)
  const [ refHeightCardContainer, setRefHeightCardContainer ] = useState(React.createRef()); 
  const [ domHeightArr, setDomHeightArr ] = useState([]); 
  const [ listCardPagesArr, setListCardPagesArr ] = useState([]); 
  const [ showingCards, setShowingCards ] = useState([]); 
  const [ refHeightCardsArr, setRefHeightCardsArr ] = useState([]); 
  const [ cardOfPageArr, setCardOfPageArr ] = useState([]);   
  
  /*   let getAuthtoken = () => {
    let loginRequest = {
      scopes: ["user.read", "mail.send"] // optional Array<string>
    };
    createNewInstance().acquireTokenSilent(loginRequest).then(function (response) {
      setAccessToken(response.accessToken);
    }).catch(function (error) {
    });
  }
  */ 
  useEffect(() => {
    //if (toDoData !== undefined) { 
      saveHeightValuesIntoArr();
      calcCardPages();
    //}
  },[
    domHeightArr, cardOfPageArr, showingCards
  ]);
  
  /*   ;
  getAuthtoken();
  runAxiosGet( accessToken ); */
  
  let saveHeightValuesIntoArr= () => {
    let pushToDomHeightArr = [...domHeightArr];
    let heightCardBoxesArr = [];

    /* Save the elements height according:
    Index 0 = cardContainers height.
    Index 1 = Arrays of the lists and holding the height values of the list cards 
    */
    pushToDomHeightArr.push(refHeightCardContainer.current.offsetHeight);
    pushToDomHeightArr.push(heightCardBoxesArr);
    
    // Get out the offsetHeight from eatch cardelement and save the values to a common space 
    for (let listIndex = 0; listIndex < toDoData.length; listIndex++) {
      let getIntoList = toDoData[listIndex].toDoCards;      
      heightCardBoxesArr.push([]); 
      for (const cardIndex in getIntoList) {
        pushToDomHeightArr[1][listIndex].push(refHeightCardsArr[listIndex][cardIndex].current.offsetHeight+cardBoxSpace /*+style.cardBoxSpace */ );
      }
      
    } 
    // If the hook is emty = update it if not stop
    if (domHeightArr.length === 0) setDomHeightArr(pushToDomHeightArr);
  }
  let calcCardPages = () => {

    let cardOfPage = 0;

    let pushToListCardPagesArr = [...listCardPagesArr];    
    let heightCardContainer = domHeightArr[0];
    
    if (domHeightArr[1] !== undefined && toDoData.length !== 0){
      let heightCardBox = domHeightArr[1][0][0];
      
      // This not handle dynamic cardsBoxes height just static for all cards
      cardOfPage = Math.round(calcCardPages(heightCardContainer, heightCardBox));
      setListPagesIntoArr(pushToListCardPagesArr, cardOfPage); 
    }
  }
  let calcCardPages = (nr1, nr2) => {
    return nr1/nr2;
  }
  let setListPagesIntoArr = (pushToListCardPagesArr, cardOfPage) => {
    // Fix card / page
    let pushToCardOfPageArr = [...cardOfPageArr]
    pushToCardOfPageArr.push(cardOfPage)
    if (cardOfPageArr.length === 0) setCardOfPageArr(pushToCardOfPageArr);
    
    // Fix cardPages
    for (let index = 0; index < domHeightArr[1].length; index++) {
      let cardQuantity = domHeightArr[1][index].length;
      let cardPages = Math.round(cardQuantity/cardOfPage);
      
      //Update list pages
      pushToListCardPagesArr.push([cardPages]);   
      setListCardPagesArr(pushToListCardPagesArr);    
    }
  }
  
  let fixShowingCards = (incommingItem, listIndex) => {      
    console.log("TCL: fixShowingCards -> listIndex", listIndex)
    let slicedList = [];
    let currentSideNr = 1;
    let startCardIndex = 0;
    let cardOfPage = cardOfPageArr[0];
    console.log("TCL: fixShowingCards -> cardOfPage", cardOfPage)

    let endCardIndex = 0;
    
    startCardIndex = currentSideNr*cardOfPage-cardOfPage; // Start Index 
    endCardIndex = currentSideNr*cardOfPage;// End index

    if (incommingItem.length > cardOfPage && listIndex <= incommingItem.length-1) slicedList = incommingItem.slice(startCardIndex, endCardIndex);
    console.log("TCL: fixShowingCards -> incommingItem.length-1", incommingItem.length-1)
    console.log("TCL: fixShowingCards -> incommingItem.length", incommingItem.length)
    console.log("TCL: fixShowingCards -> incommingItem", incommingItem)
    if (incommingItem.length < cardOfPage) slicedList = incommingItem;
    return slicedList;
  }

  return (
    <div id="appbody">
        Teams Integrations 
      <main>
        <section className="toDoHeadLineContainer">
          {(toDoData.length !== 0)
            ? toDoData.map((item, index) => {        
                return (
                  <section key={ index } className="toDoHeadLinesBox">
                    { item.toDoHeadLine }         
                  </section>
                ); 
              })
            : <NoIncommingData/> 
          }
        </section>  
        {/* Save ref to correspnding created ref in top of the component */}
        <section id="toDoCardContainer" ref={ refHeightCardContainer }> 
          {(toDoData.length !== 0) 
            ? toDoData.map((item, index) => {
              let incommingItem = item.toDoCards;
              console.log("TCL: App -> incommingItem", incommingItem)
              
              // Force the push function only pushing the actual elements
              if (refHeightCardsArr.length <= index){
                refHeightCardsArr.push([]);
                //currentCardPageArr.push([]);
              };
              // Show correct list and its cards
            
              return(
                <ToDoCards key={ index }
                mainTodoList={ incommingItem }
                fixShowingCards={ fixShowingCards(incommingItem, index) }
                refHeightCardsArr={ refHeightCardsArr }
                listIndex={ index }
                /* currentCardPageArr={ currentCardPageArr } */
                />
                );
              })
            : <NoIncommingData/>

            }
        </section>
      </main>
      <footer id="toDoCardSidesContainer">
        {
          toDoData.map((item, index) => {
           
            return(
              <section key={ index } className="toDoHeadLinesBox toDoCardSides">
               {`Sid ${1/* currentCardPageArr[index] */} av ${listCardPagesArr[index]}`}
              </section>
            );
          })
        }
      </footer>
    </div>
  );
}

export default App;

let NoIncommingData = () => {
  return(
    <p> Inget data inkommet ! :( </p> 
  );
}