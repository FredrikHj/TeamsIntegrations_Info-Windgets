import React from 'react';
export const VisibleToDoCard = (props) => {
    let incommingData = props.propsArr;    
    return(
        <section key={ incommingData[2] } className="toDoCardsListContainer">
            {
                incommingData[4][0].map((cards, cardNr) => {
                    
                    return(
                        cards.map((cards, cardNr) => {
                            //console.log(cards);
                            return(                                  
                                <div key={ cardNr } className="toDoCardBoxes">
                                    <div className="toDoCardHeadLine">{ cards.cardHedline }</div>
                                    <hr></hr>
                                    <div className="toDoCardHeadContent">{ cards.cardContent }</div>
                                </div>
                                    
                            );
                        })
                    );
                })
            }
        </section>
    );
}