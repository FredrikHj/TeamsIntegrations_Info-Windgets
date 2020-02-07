import React, { useEffect, useState} from 'react';
import './components/css/App.sass';
import { createNewInstance } from './components/data/authentication';
import { runAxiosGet } from './components/data/axiosGet';
import { toDoList } from './components/data/toDoList';
import { LogLevel } from 'msal';

const App = () => {
  //const [ accessToken, setAccessToken ] = useState('');
  const [ plannerData, updatePlannerData ] = useState(toDoList);
  let refHeightCardContainer = React.createRef();
  let domHeightArr = [];
  let refHeightCardsArr = [];
  let heightCardBoxesArr = [];
  let promiseFooterArr = new Promise(success => {
    window.onload = (event) => {
      createHeightArr();
      success();
    };
  
  })
  //let footerArr = [];

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
  }, [heightCardBoxesArr]);
/*   console.log(accessToken);
  getAuthtoken();
  runAxiosGet( accessToken ); */
  console.log(plannerData);


  let createHeightArr = () => {
    let listNr = 0;
    domHeightArr.push(refHeightCardContainer.current.offsetHeight);      
    console.log(refHeightCardContainer);

    //Save it to its space
    /*
    Index 0 = cardContainers height.
    Index 1 = Arrays of the lists. 
    Index 1 is the tot of the other index values!
    Index > 1 is the height of the corresponding cardboxes. 
    The data are numbers an rep... the element height
    */
    domHeightArr.push(heightCardBoxesArr);
    domHeightArr.push([]);
    refHeightCardsArr.map((toDoList, countList) => {
      heightCardBoxesArr.push([]);
      
      // Createing an array placing the boxes heights. The last index is tot in the list     
      toDoList.map((toDoBoxes, countBoxes) => {
        domHeightArr[1][countList].push(refHeightCardsArr[countList][countBoxes].current.offsetHeight);           
        listNr = countList;
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
      calcListSide();
    })
    let calcListSide = () => {
      plannerData.map((data, countList) => {
        console.log(countList);
        let calcListSpace = 20*domHeightArr[1][countList].length;
        let calcListCardHeight = domHeightArr[2][countList];

console.log(calcListSpace+calcListCardHeight);


        console.log(domHeightArr[0]/domHeightArr[2][countList]);
        
        
        
      })

      
      
      console.log(domHeightArr);
    }
    console.log(refHeightCardContainer);
    
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
                {tes}
              </section>
            );
          })
        }
      </footer>
    </div>
  );
}

export default App;