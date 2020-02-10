import React from 'react';
let count = 0;
export const VisibleToDoCard = (props) => {
    count++;
    //let incommingData = props.propsArr;
    //console.log(incommingData[4]);
console.log(count);

    return(
        <section key={ '' } className="toDoCardsListContainer">
            {

/*                 incommingData[4].map((cards, cardNr) => {
                    console.log(cards);
                    // Force the push function only pushing the actual elements

                    return(                                  
                        <div key={ cardNr } className="toDoCardBoxes">
                            <div className="toDoCardHeadLine">{ cards.cardHedline }</div>
                            <hr></hr>
                            <div className="toDoCardHeadContent">{ cards.cardContent }</div>
                        </div>
                    );
                }) */
            }
        </section>
    );
}