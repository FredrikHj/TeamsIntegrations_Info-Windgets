import React, { useEffect, useState} from 'react';
import './components/styles/App.sass';

import { createNewInstance } from './components/data/authentication';
import { runAxiosGet } from './components/data/axiosGet';
import { toDoList } from './components/data/toDoList';
import { LogLevel, UserAgentApplication } from 'msal';
import style from './components/styles/common.sass';
let cardBoxSpace = 40;
let refHeightCardContainer = React.createRef();
let heightCardBoxesArr = [];
let currentCardPageArr = [];
let currentShowingCard = [];
let refHeightCardsArr = [];
let listCardPagesArr = [];
let domHeightArr = [];

const App = () => {
  //const [ accessToken, setAccessToken ] = useState('');
  const [ toDoData ] = useState(toDoList);
  const [ quantityCardPage, updateQuantityCardPage ] = useState(0);
  const [ footerCalc, setFooterCalc ] = useState(false); 

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
  console.log(toDoData);

  let createHeightArr = () => {
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
        domHeightArr[1][countList].push(refHeightCardsArr[countList][countBoxes].current.offsetHeight+40/* +style.cardBoxSpace */);
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
    console.log(showCardBoxPage);
    
    return showCardBoxPage;
  }
    promiseFooterArr.then((data) => {
      calcCardOfSide();
      setFooterCalc(true);
    })
    let calcCardOfSide = () => {
      let heightCardContainer = domHeightArr[0];
      let heightCardBox = domHeightArr[1][0][0];
      let maxCardShowing = heightCardContainer/heightCardBox;
 
      for (let index = 0; index < domHeightArr[1].length; index++) {
        let cardQuantity = domHeightArr[1][index].length;
        let maxCardPage = cardQuantity/maxCardShowing;
        
        //Update the card / page
        updateQuantityCardPage(maxCardPage);
        let setListPage = Math.round(maxCardPage);
        if (setListPage === 0) setListPage = 1;
        listCardPagesArr.push(setListPage);        
      }  
    }    
    let autoChangeShowingCard = () => {
        console.log(toDoData.toDoCards);
        
/*       setInterval(() => {
        console.log('Sid byte :)');
        
      }, 5000, ); */
    }
    console.log(quantityCardPage);
    
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
              let listName = `list${countList}`;
              
              let getToDoCards = dataLists.toDoCards;

              refHeightCardsArr.push([]);


              return(
                <>
                  <section key={ countList } className="toDoCardsListContainer">
                    {
                      /* currentShowingCard.map((cards, cardNr) => {
                        <div key={ cardNr } className="toDoCardBoxes">
                          <div className="toDoCardHeadLine">{ cards.cardHedline }</div>
                          <hr></hr>
                          <div className="toDoCardHeadContent">{ cards.cardContent }</div>
                        </div>
                      }) */
                    }
                  </section>
                  <section key={ countList } className="toDoCardsListContainer hidden">
                    {
                      getToDoCards.map((cards, cardNr) => {
                        refHeightCardsArr[countList].push(React.createRef());

                        return(
                          <div key={ cardNr } className="toDoCardBoxes" ref={ refHeightCardsArr[countList][cardNr]}>
                            <div className="toDoCardHeadLine">{ cards.cardHedline }</div>
                            <hr></hr>
                            <div className="toDoCardHeadContent">{ cards.cardContent }</div>
                          </div>
                        );

                      })
                    }
                  </section>
                </>
              );
            })
          }
          {autoChangeShowingCard()}
        </section>
      </main>
      <footer id="toDoCardSidesContainer">
        {
          toDoData.map((dataLists, countList) => {      
            let tes = dataLists.toDoCards.length
          
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