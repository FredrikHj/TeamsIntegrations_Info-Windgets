import React from 'react';
export const ToDoCards = (props) => {

    return(
        <>
            <section key={ props.listIndex+1 } className="toDoitemListContainer">
                {
                    props.fixShowingCards.map((item, index) => {
                    // Force the push function only pushing the actual elements
                    
                    if (props.refHeightCardsArr[props.listIndex].length <= index) props.refHeightCardsArr[props.listIndex].push(React.createRef());
                        //console.log(props.refHeightCardsArr);
                        
                        return(
                            <div key={ index } className="toDoCardBoxes" ref={ props.refHeightCardsArr[props.listIndex][index]}>
                                <div className="toDoCardHeadLine">{ item.cardHedline }</div>
                                <hr></hr>
                                <div className="toDoCardHeadContent">{ item.cardContent }</div>
                            </div>
                        );
                    })
                }
            </section>
            <section key={ props.listIndex } className="toDoitemListContainer hidden">
                {
                    props.mainTodoList.map((item, index) => {
                    // Force the push function only pushing the actual elements
                    
                    if (props.refHeightCardsArr[props.listIndex].length <= index) props.refHeightCardsArr[props.listIndex].push(React.createRef());
                        //console.log(props.refHeightCardsArr);
                        
                        return(
                            <div key={ index } className="toDoCardBoxes" ref={ props.refHeightCardsArr[props.listIndex][index]}>
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
