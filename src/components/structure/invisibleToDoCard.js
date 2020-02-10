import React from 'react';
export const InvisibleToDoCard = (props) => {
    let incommingData = props.propsArr;
    return(
        <section key={ incommingData[2] } className="toDoCardsListContainer hidden">
            {
                incommingData[0].map((cards, cardNr) => {
                // Force the push function only pushing the actual elements
                if (incommingData[1][incommingData[2]].length <= cardNr) 
                incommingData[1][incommingData[2]].push(React.createRef());

                    return(
                        <div key={ cardNr } className="toDoCardBoxes" ref={ incommingData[1][incommingData[2]][cardNr]}>
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
