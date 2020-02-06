import React, { useEffect, useState} from 'react';
import './components/css/App.sass';
import { createNewInstance } from './components/data/authentication';
import { runAxiosGet } from './components/data/axiosGet';
import { toDoList } from './components/data/toDoList';
import { LogLevel } from 'msal';

function App() {
  //const [ accessToken, setAccessToken ] = useState('');
  const [ plannerData, updatePlannerData ] = useState(toDoList);
  const [ footerArr, updateFooterArr ] = useState([]);
  let refHeightCardContainer = React.createRef();
  let domHeightArr = [];
  let refHeightCardsArr = [];
  let heightCardBoxesArr = [];
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
   createHeightArr();
  },[footerArr]);
/*   console.log(accessToken);
  getAuthtoken();
  runAxiosGet( accessToken ); */
  console.log(plannerData);

  /* The function willl take three argumment = calMaxCardOfContainers(arg1 ,arg2, arg3) ...
    arg 1 = What list
    arg 2 = Nr1 calculating
    arg 3 = Nr2 calculating
  */
  let calcHeighOtfCardBoxes = (listNr) => {
    let getIntoList = domHeightArr[1][listNr];  
    let showCardBoxPage = getIntoList.length;
    
    let savedListTot = 0;
    // Tot marg of a list
    let marginOfCardBox = 20*getIntoList.length;    

    for (let index = 0; index  < getIntoList.length; index++) {
      //Save the tot of a list array at the end as the last index in that array
      savedListTot += getIntoList[index];
      if (index === getIntoList.length - 1) domHeightArr[2].push(savedListTot+marginOfCardBox);
    }
console.log(showCardBoxPage);

    return showCardBoxPage;
  }
  let createHeightArr = () => {
    let listNr = 0;
    domHeightArr.push(refHeightCardContainer.current.offsetHeight);      

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
      
      //domHeightArr[1][countList].push(0);
      
      toDoList.map((toDoBoxes, countBoxes) => {
        domHeightArr[1][countList].push(refHeightCardsArr[countList][countBoxes].current.offsetHeight);           
        listNr = countList;
      })      
      footerArr.push(calcHeighOtfCardBoxes(listNr));
    });
  }
  let promiseFooterArr = new Promise((success, error) => {
    if (footerArr.length < 0) {
      success();
    }
  })
  console.log(footerArr);
  
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
              return(
                <section key={ countList } className="toDoHeadLinesBox toDoCardSides">
                  {promiseFooterArr.then(() => footerArr[countList]).value}
                </section>
              );
              
            })
        }
      </footer>
    </div>
  );
}

export default App;