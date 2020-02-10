import React, { useEffect, useState} from 'react';
import './components/styles/App.sass';

/* import { createNewInstance } from './components/data/authentication';
import { runAxiosGet } from './components/data/axiosGet'; */
import { toDoList } from './components/data/toDoList';
import { VisibleToDoCard } from './components/structure/visibleToDoCard';
import { InvisibleToDoCard } from './components/structure/invisibleToDoCard';
import { ToDoCards } from './components/structure/toDoCards';
import variables from './components/data/variables';
import { logDOM } from '@testing-library/react';
/* import { LogLevel, UserAgentApplication } from 'msal';
import style from './components/styles/common.sass'; */
let listIndex = -1;
let count = 0;
const App = () => {
  count++;
  //const [ accessToken, setAccessToken ] = useState('');
  const [ toDoData ] = useState(toDoList);
  const [ quantityCardPage, updateQuantityCardPage ] = useState(0);
  const [ allUpdate, setAllUpdate ] = useState(false); 
  
  let promiseFooterArr = new Promise(success => {
    window.onload = (event) => {
      createHeightArr();
      success();
    };
  
  })
  console.log(count);
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
    if (!toDoData) return;
  }, [allUpdate]);
/*   console.log(accessToken);
  getAuthtoken();
  runAxiosGet( accessToken ); */

  let createHeightArr = () => {
    console.log('casc');
    variables.domHeightArr.push(variables.refHeightCardContainer.current.offsetHeight);     
    

    //Save it to its space
    /*
    Index 0 = cardContainers height.
    Index 1 = Arrays of the lists and holding the height values of the list cards 
    Index 2 is the tot of the values for the specific list!
    */
    variables.domHeightArr.push(variables.heightCardBoxesArr);
    variables.domHeightArr.push([]);
    variables.refHeightCardsArr.map((toDoList, countList) => {
      variables.heightCardBoxesArr.push([]);
      toDoList.map((toDoBoxes, countBoxes) => {
        variables.domHeightArr[1][countList].push(variables.refHeightCardsArr[countList][countBoxes].current.offsetHeight+40/* +style.cardBoxSpace */);
      })  

      calcHeighOtfCardBoxes(countList)
    });
  }
  let calcHeighOtfCardBoxes = (listNr) => {
    let getIntoList = variables.domHeightArr[1][listNr];  
    let showCardBoxPage = getIntoList.length;
    
    let savedListTot = 0;

    for (let index = 0; index  < getIntoList.length; index++) {
      //Save the tot of a list array at the end as the last index in that array
      savedListTot += getIntoList[index];
      if (index === getIntoList.length - 1) variables.domHeightArr[2].push(savedListTot);
    }

    return showCardBoxPage;
  }
    promiseFooterArr.then((data) => {
      calcCardOfSide();
      //setFooterCalc(true);
    })

    let calcCardOfSide = () => {
      let maxCardPage = 0;
      let heightCardContainer = variables.domHeightArr[0];
      let heightCardBox = variables.domHeightArr[1][0][0];
      let maxCardShowing = heightCardContainer/heightCardBox;

      for (let index = 0; index < variables.domHeightArr[1].length; index++) {
        let cardQuantity = variables.domHeightArr[1][index].length;
        maxCardPage = cardQuantity/maxCardShowing;
        
        //Update the card / page
        updateQuantityCardPage(maxCardPage);
        let setListPage = Math.round(maxCardPage);
        if (setListPage === 0) setListPage = 1;
        variables.listCardPagesArr.push(setListPage);        
        listIndex++;

        autoChangeShowingCard(listIndex, maxCardShowing);
      }
    }    
    let autoChangeShowingCard = (listIndex, sideNr) => {
      variables.currentTodoData.push();
        
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
      let getCorrectDataGroup = toDoData[listIndex].toDoCards.slice(startCardIndex, endCardIndex);
      //let getShaddowArraiesIndex = getCorrectDataGroup.map((item) => item);

      let getVisiableData = variables.currentTodoData.concat(getCorrectDataGroup);

      variables.getVisiableDataArr.push(getVisiableData);
      console.log(variables.getVisiableDataArr);
      
      setAllUpdate(true);
    }
    
    console.log(variables.getVisiableDataArr);
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
        <section id="toDoCardContainer" ref={ variables.refHeightCardContainer }>
          {
            toDoData.map((dataLists, countList) => {
              console.log(countList);
              
              let listName = `list${countList}`;
              
              let getToDoCards = dataLists.toDoCards;
              // Force the push function only pushing the actual elements
              if (variables.refHeightCardsArr.length <= countList){
                variables.refHeightCardsArr.push([]);
                variables.currentCardPageArr.push([]);
              };            
              //console.log(variables.getVisiableDataArr[countList]);
              
              let propsArr = [ 
                getToDoCards,
                variables.refHeightCardsArr,
                countList,
                variables.currentCardPageArr,
                variables.getVisiableDataArr,
              ];
              console.log(propsArr[4]);
              
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
            //

            return(
              <section key={ countList } className="toDoHeadLinesBox toDoCardSides">
                {`Sid ${variables.currentCardPageArr[countList]} av ${variables.listCardPagesArr[countList]}`}
              </section>
            );
          })
        }
      </footer>
    </div>
  );
}

export default App;