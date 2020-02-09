import React from 'react';
export const VisibleToDoCard = (props) => {
    let incommingData = props.propsArr;

    return(
        <section key={ incommingData[2] } className="toDoCardsListContainer">
           {
                incommingData[3].map((cards, cardNr) => {                    
                    return(
                        <div key={ cardNr } className="toDoCardBoxes">
                        <div className="toDoCardHeadLine">{ cards.cardHedline }</div>
                        <hr></hr>
                        <div className="toDoCardHeadContent">{ cards.cardContent }</div>
                    </div>
                    );
                    
                })
            }
        </section>
    );
}