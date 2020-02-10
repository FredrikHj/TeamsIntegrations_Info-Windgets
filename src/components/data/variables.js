import React from 'react';

let cardBoxSpace = 40;
let refHeightCardContainer = React.createRef();
let heightCardBoxesArr = [];
let currentCardPageArr = [];
let currentShowingCard = [];
let refHeightCardsArr = [];
let listCardPagesArr = [];
let currentTodoData = [];
let domHeightArr = [];
let getVisiableDataArr = [];

let variables = {
    cardBoxSpace,
    refHeightCardContainer,
    heightCardBoxesArr,
    currentCardPageArr,
    currentShowingCard,
    refHeightCardsArr,
    listCardPagesArr,
    domHeightArr,
    currentTodoData,
    getVisiableDataArr,
}
console.log(variables);

export default variables;