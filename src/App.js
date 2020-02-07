import React, { useEffect, useState} from 'react';
import './components/styles/App.sass';

import { createNewInstance } from './components/data/authentication';
import { runAxiosGet } from './components/data/axiosGet';
import { toDoList } from './components/data/toDoList';
import { LogLevel } from 'msal';
import style from './components/styles/common.sass';
let cardBoxSpace = 40;
let refHeightCardContainer = React.createRef();
let heightCardBoxesArr = [];
let refHeightCardsArr = [];
let domHeightArr = [];
let footerArr = [];

const App = () => {
  //const [ accessToken, setAccessToken ] = useState('');
  const [ plannerData, updatePlannerData ] = useState(toDoList);
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
    if (!plannerData) return;
  }, [footerArr, footerCalc]);
/*   console.log(accessToken);
  getAuthtoken();
  runAxiosGet( accessToken ); */
  console.log(plannerData);

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
        let maxListPages = cardQuantity/maxCardShowing;
        let setListPage = Math.round(maxListPages);

        footerArr.push(setListPage);        
      }  
    }    

  return (
    <div id="appbody">
        Teams Integrations 
      <main>
        <section className="toDoHeadLineContainer">
          {
            plannerData.map((dataLists, listNr) => {        
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
            plannerData.map((dataLists, countList) => {
              let listName = `list${countList}`;
              
              let getToDoCards = dataLists.toDoCards;

              refHeightCardsArr.push([]);


              return(
                <section key={ countList } className="toDoCardsListContainer">
                  {
                    getToDoCards.map((cards, cardBoxNr) => {
                      refHeightCardsArr[countList].push(React.createRef());

                      return(
                        <div key={ cardBoxNr } className="toDoCardBoxes" ref={ refHeightCardsArr[countList][cardBoxNr]} id={ listName }>
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
      </main>
      <footer id="toDoCardSidesContainer">
        {
          plannerData.map((dataLists, countList) => {      
            let tes = dataLists.toDoCards.length
          
            return(
              <section key={ countList } className="toDoHeadLinesBox toDoCardSides">
                {`Sid ${'1'} av ${footerArr[countList]}`}
              </section>
            );
          })
        }
      </footer>
    </div>
  );
}

export default App;