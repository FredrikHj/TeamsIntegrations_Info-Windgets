import React from 'react';
export const ToDoCards = (props) => {

    // All of the props collected in one spot
    let { mainTodoList, refHeightCardsArr, listIndex, fixShowingCards, } = props;
    return(
        <>
            <section key={ listIndex+1 } className="toDoItemListContainer">
                {
                    fixShowingCards.map((item, index) => {
                    // Force the push function only pushing the actual elements   
                        return(
                            <div key={ index } className="toDoCardBoxes">
                                <div className="toDoCardHeadLine">{ item.cardHedline }</div>
                                <hr></hr>
                                <div className="toDoCardHeadContent">{ item.cardContent }</div>
                            </div>
                        );
                    })
                }
            </section>
            {/* The original container is hidden, this section is just for calculating the the pages the amount of cards are taking  */}
            <section key={ listIndex } className="toDoitemListContainer hidden">
                {
                    mainTodoList.map((item, index) => {
                    // Force the push function only pushing the actual elements
                    
                    if (refHeightCardsArr[listIndex].length <= index) refHeightCardsArr[listIndex].push(React.createRef());

                        return(
                            <div key={ index } className="toDoCardBoxes" ref={ refHeightCardsArr[listIndex][index]}>
                                <div className="toDoCardHeadLine">{ item.cardHedline }</div>
                                <hr></hr>
                                <div className="toDoCardHeadContent">{ item.cardContent }</div>
                            </div>
                        );
                    })
                }
            </section>
        </>
    );
}
