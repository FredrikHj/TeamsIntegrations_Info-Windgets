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
  const [ toDoData, setToDoData ] = useState(toDoList);
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
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
  }
  */ 
  useEffect(() => {   
    let promiseFooterArr = new Promise(success => {
      window.onload = (event) => {
        
        success();
      };
      
    })
    promiseFooterArr.then((data) => {
      //setFooterCalc(true);
    })
    saveHeightValuesIntoArr();
    handleCardPages();
    /*     saveHeightValuesIntoArr();
    calcCardPages(); */
    
    console.log('Min toDoData :)');
    console.log(toDoData);
    
    console.log('domHeightArr');
    console.log(domHeightArr);
  },[
    domHeightArr, cardOfPageArr, showingCards
  ]);
  
  /*   console.log(accessToken);
  getAuthtoken();
  runAxiosGet( accessToken ); */
  
  let saveHeightValuesIntoArr= () => {
    let pushToDomHeightArr = [...domHeightArr];
    let heightCardBoxesArr = [];

    /* Save the elements height according:
    Index 0 = cardContainers height.
    Index 1 = Arrays of the lists and holding the height values of the list cards 
    Index 2 is the tot of the values for the specific list! ???0
    */
    pushToDomHeightArr.push(refHeightCardContainer.current.offsetHeight);
    console.log(pushToDomHeightArr.length !== 0);
    pushToDomHeightArr.push(heightCardBoxesArr);
    
    //pushToDomHeightArr.push([]); Space for index 2 ?
    
    // Get out the offsetHeight from eatch cardelement and save the values to a common space 
    for (let listIndex = 0; listIndex < toDoData.length; listIndex++) {
      let getIntoList = toDoData[listIndex].toDoCards;      
      heightCardBoxesArr.push([]); 
      for (const cardIndex in getIntoList) {
        pushToDomHeightArr[1][listIndex].push(refHeightCardsArr[listIndex][cardIndex].current.offsetHeight+cardBoxSpace /*+style.cardBoxSpace */ );
      }
      
    } 
    console.log(heightCardBoxesArr);

    // If the hook is emty = update it if not stop
    if (domHeightArr.length === 0) setDomHeightArr(pushToDomHeightArr);
    /*     toDoData.map((item, listIndex) => {
      item.toDoCards.map((item, cardIndex) => {
      })
      //calcHeighOtfCardBoxes(listIndex)
    })
    //toDoData.map((item, listIndex) => listIndex);
    
    refHeightCardsArr.map((item, index) => {
      console.log(refHeightCardsArr[index][1].current.offsetHeight);
      
      
    }); */
    
  }
  let calcHeighOtfCardBoxes = (listNr) => {
    let getIntoList = domHeightArr[1][listNr];  
    let showCardBoxPage = getIntoList.length;
    
    let savedListTot = 0;
    
    /* for (let index = 0; index  < getIntoList.length; index++) {
      //Save the tot of a list array at the end as the last index in that array
      savedListTot += getIntoList[index];
      if (index === getIntoList.length - 1) domHeightArr[2].push(savedListTot);
    } */
    
    return showCardBoxPage;
  } 

  let handleCardPages = () => {
    let cardPages = 0;
    let cardOfPage = 0;

    let pushToListCardPagesArr = [...listCardPagesArr];    
    let heightCardContainer = domHeightArr[0];
    
    if (domHeightArr[1] !== undefined){
      let heightCardBox = domHeightArr[1][0][0];
      console.log(heightCardContainer);
      console.log(heightCardBox);
      
      // This not handle dynamic cardsBoxes height just static for all cards
      cardOfPage = Math.round(calcCardPages(heightCardContainer, heightCardBox));
      fixListPages(pushToListCardPagesArr, cardOfPage);
    }
  }
  let calcCardPages = (nr1, nr2) => {
    return nr1/nr2;
  }
  let fixListPages = (pushToListCardPagesArr, cardOfPage) => {
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
  console.log(listCardPagesArr);
  
  let fixShowingCards = (incommingItem, listIndex) => {   
    let slicedList = [];
    let currentSideNr = 1;
    let startCardIndex = 0;
    let cardOfPage = cardOfPageArr[0];

    let endCardIndex = 0;
    
    startCardIndex = currentSideNr*cardOfPage-cardOfPage; // Start Index 
    endCardIndex = currentSideNr*cardOfPage;// End index
    
    console.log(currentSideNr);
    console.log(startCardIndex);
    console.log(endCardIndex);
    if (incommingItem.length > cardOfPage) slicedList = incommingItem.slice(startCardIndex, endCardIndex);
    if (incommingItem.length < cardOfPage) slicedList = incommingItem;

    console.log(incommingItem);
    console.log(slicedList);

    return slicedList;
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
              
              console.log(item.toDoCards);
              let incommingItem = item.toDoCards;
              console.log(item.toDoCards);
              
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

            }
        </section>
      </main>
      <footer id="toDoCardSidesContainer">
        {
          toDoData.map((item, index) => {
           console.log(item);
           
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