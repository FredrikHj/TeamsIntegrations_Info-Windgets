import React, { useEffect, useState} from 'react';
import './components/styles/App.sass';

/* import { createNewInstance } from './components/data/authentication';
import { runAxiosGet } from './components/data/axiosGet'; */
import { toDoList } from './components/data/toDoList';
import { VisibleToDoCard } from './components/structure/visibleToDoCard';
import { InvisibleToDoCard } from './components/structure/invisibleToDoCard';
import variables from './components/data/variables';
import { logDOM } from '@testing-library/react';
/* import { LogLevel, UserAgentApplication } from 'msal';
import style from './components/styles/common.sass'; */


const App = () => {
  //const [ accessToken, setAccessToken ] = useState('');
  const [ toDoData ] = useState(toDoList);
  const [ quantityCardPage, updateQuantityCardPage ] = useState(0);
  const [ footerCalc, setFooterCalc ] = useState(false); 
  let count = 0;
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
    if (!toDoData) return;
  }, [quantityCardPage, footerCalc]);
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

        autoChangeShowingCard(index, maxCardShowing);
      }
    }    
    let autoChangeShowingCard = (listIndex, sideNr) => {
      let currentSideNr = 1;
      let cardOfPage = Math.round(sideNr);      
      let pushTest = 0;


      // Get index of all cards in an array
      let indexOfCard = toDoData[listIndex].toDoCards.map((item, index) => index);
      // Get indexNr from the above array
      let getShowingCardsIndex = 0;
/*       for (let index = 0; index < indexOfCard.length; index++) {
        getShowingCardsIndex = indexOfCard[index];

          pushTest++;
          //console.log('inne');
          
          //variables.currentTodoData[listIndex].push(pushTest);
          //console.log(toDoData[listIndex].slice(0, 5));
          
          
        } */
       variables.currentTodoData[listIndex].push(toDoData[listIndex].toDoCards.slice(0, currentSideNr*cardOfPage));
      
      
/*       setInterval(() => {
        console.log('Sid byte :)');
         }, 5000, ); */
    }
console.log(variables.currentTodoData);

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

              let listName = `list${countList}`;
              
              let getToDoCards = dataLists.toDoCards;
              // Force the push function only pushing the actual elements
              if (variables.refHeightCardsArr.length <= countList){
                variables.refHeightCardsArr.push([]);
                variables.currentCardPageArr.push([]);
                variables.currentTodoData.push([]);
              };
              let propsArr =[ 
                getToDoCards,
                variables.refHeightCardsArr,
                countList,
                variables.currentCardPageArr,
                variables.currentTodoData,
              ];

              return(
                <>
                  <VisibleToDoCard
                    propsArr={ propsArr }
                  />
                  <InvisibleToDoCard
                    propsArr={ propsArr }
                  />  
                </>
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