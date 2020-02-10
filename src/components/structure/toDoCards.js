import React from 'react';

export const ToDoCards = (props) => {

    let incommingData = props.propsArr;
    console.log(incommingData[4][incommingData[2]]);
    
    return(
        <>
            <section key={ incommingData[2] } className="toDoCardsListContainer">
                {
/*                     incommingData[4][incommingData[2]].map((cards, cardNr) => {
                    // Force the push function only pushing the actual elements
                    if (incommingData[1][incommingData[2]].length <= cardNr) incommingData[1][incommingData[2]].push(React.createRef());
                    

                        return(
                            <div key={ cardNr } className="toDoCardBoxes" ref={ incommingData[1][incommingData[2]][cardNr]}>
                                <div className="toDoCardHeadLine">{ cards.cardHedline }</div>
                                <hr></hr>
                                <div className="toDoCardHeadContent">{ cards.cardContent }</div>
                            </div>
                        );
                    }) */
                }
            </section>
            <section key={ incommingData[2] } className="toDoCardsListContainer hidden">
                {
                    incommingData[0].map((cards, cardNr) => {
                    // Force the push function only pushing the actual elements
                    if (incommingData[1][incommingData[2]].length <= cardNr) incommingData[1][incommingData[2]].push(React.createRef());
                    

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
        </>
    );
}
