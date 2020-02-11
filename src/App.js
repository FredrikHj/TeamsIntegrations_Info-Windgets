import React, { useEffect, useState} from 'react';
import './components/styles/App.sass';

/* import { createNewInstance } from './components/data/authentication';
import { runAxiosGet } from './components/data/axiosGet'; */
import { toDoList } from './components/data/toDoList';
import { ToDoCards } from './components/structure/toDoCards';

import { logDOM } from '@testing-library/react';
/* import { LogLevel, UserAgentApplication } from 'msal';
import style from './components/styles/common.sass'; */

let cardBoxSpace = 40;

let listIndex = -1;
let count = -1;
const App = () => {
  count++;
  //const [ accessToken, setAccessToken ] = useState('');
  const [ toDoData ] = useState(toDoList);
  const [ refHeightCardContainer ] = useState(React.createRef()); 
  const [ domHeightArr ] = useState([]); 
  const [ listCardPagesArr ] = useState([]); 
  const [ heightCardBoxesArr ] = useState([]); 
  const [ currentCardPageArr ] = useState([]); 
  const [ currentShowingCard ] = useState([]); 
  const [ refHeightCardsArr ] = useState([]); 
  const [ currentTodoData ] = useState([]); 
  const [ getVisibleDataArr ] = useState([]); 
  let [ loopList, updateLoopList ] = useState(0); 

  const [ quantityCardPage, updateQuantityCardPage ] = useState(0);
  
  let promiseFooterArr = new Promise(success => {
    window.onload = (event) => {
      createHeightArr();
      success();
    };
  
  })
  console.log(getVisibleDataArr);
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
    //if (!toDoData || !refHeightCardContainer.current) return;
  }, [loopList]);
/*   console.log(accessToken);
  getAuthtoken();
  runAxiosGet( accessToken ); */

  let createHeightArr = () => {
    console.log(domHeightArr);
    console.log(refHeightCardContainer);
    

    domHeightArr.push(refHeightCardContainer.current.offsetHeight);     
    

    //Save it to its space
    /*
    Index 0 = cardContainers height.
    Index 1 = Arrays of the lists and holding the height values of the list cards 
    Index 2 is the tot of the values for the specific list!
    */
    domHeightArr.push(heightCardBoxesArr);
    domHeightArr.push([]);
    refHeightCardsArr.map((toDoList, countList) => {
      heightCardBoxesArr.push([]);
      toDoList.map((toDoBoxes, countBoxes) => {
        domHeightArr[1][countList].push(refHeightCardsArr[countList][countBoxes].current.offsetHeight+cardBoxSpace/* +style.cardBoxSpace */);
      })  

      calcHeighOtfCardBoxes(countList)
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
      let heightCardContainer = domHeightArr[0];
      let heightCardBox = domHeightArr[1][0][0];
      let maxCardShowing = heightCardContainer/heightCardBox;

      for (let index = 0; index < domHeightArr[1].length; index++) {
        let cardQuantity = domHeightArr[1][index].length;
        maxCardPage = cardQuantity/maxCardShowing;
        
        //Update the card / page
        updateQuantityCardPage(maxCardPage);
        let setListPage = Math.round(maxCardPage);
        if (setListPage === 0) setListPage = 1;
        listCardPagesArr.push(setListPage);        
        
        autoChangeShowingCard(maxCardShowing);
      }    
    }
    let autoChangeShowingCard = (sideNr) => {
      let getCorrectDataGroup;
      let getVisibleData;
      console.log(loopList);
    
      currentTodoData.push();
      
      let currentSideNr = 1;
      let startCardIndex = 0;
      
      let endCardIndex = 0;
      
      let cardOfPage = Math.round(sideNr);      
      
      startCardIndex = currentSideNr*cardOfPage-cardOfPage; // Start Index 
      endCardIndex = currentSideNr*cardOfPage;              // End index
      console.log(currentSideNr);
      console.log(startCardIndex);
      console.log(endCardIndex);
      // Get the correct data from the main array and past it into the new visiable data array 
      console.log(listIndex);
      
      //if (getCorrectDataGroup) 
      getCorrectDataGroup = toDoData[loopList].toDoCards.slice(2, 5);
      if (getCorrectDataGroup.length === 0) getVisibleDataArr.push([]);

      if (getCorrectDataGroup.length !== 0) {
        getVisibleData = currentTodoData.concat(getCorrectDataGroup);
  
        getVisibleDataArr.push(getVisibleData);
      }
      updateLoopList(loopList++);
    }
    
    console.log(getVisibleDataArr);
    console.log(currentTodoData);
    return (
      <div id="appbody">
        Teams Integrations 
      <main>
        <section className="toDoHeadLineContainer">
          {
            toDoData.map((dataLists, listNr) => {        
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
            toDoData.map((dataLists, countList) => {
              console.log(countList);
              count++;
              console.log(count);
              
              let listName = `list${countList}`;
              
              let invisibleToDoCards = dataLists.toDoCards;
              console.log(invisibleToDoCards);
              
              let visibleToDoCards = getVisibleDataArr;
              console.log(getVisibleDataArr);
              
              // Force the push function only pushing the actual elements
              if (refHeightCardsArr.length <= countList){
                refHeightCardsArr.push([]);
                currentCardPageArr.push([]);
              };            
              console.log(getVisibleDataArr[countList]);
              
              let propsArr = [ 
                invisibleToDoCards,
                refHeightCardsArr,
                countList,
                currentCardPageArr,
                getVisibleDataArr,
              ];
              console.log(getVisibleDataArr);
              
              return(
                <ToDoCards
                  propsArr={ propsArr }
                />
              );
            })
          }
        </section>
      </main>
      <footer id="toDoCardSidesContainer">
        {
          toDoData.map((dataLists, countList) => {

            return(
              <section key={ countList } className="toDoHeadLinesBox toDoCardSides">
                {`Sid ${currentCardPageArr[countList]} av ${listCardPagesArr[countList]}`}
              </section>
            );
          })
        }
      </footer>
    </div>
  );
}

export default App;