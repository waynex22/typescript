"use strict";
let selectedCards = [];
let lockBoard = false;
function chooseCard(card) {
    if (lockBoard)
        return;
    card.classList.add('no-steam');
    if (selectedCards.length < 2 && !selectedCards.includes(card)) {
        selectCard(card);
        selectedCards.push(card);
    }
    if (selectedCards.length === 2) {
        lockBoard = true;
        const [firstCard, secondCard] = selectedCards;
        const firstImg = firstCard.querySelector('.card-poke');
        const secondImg = secondCard.querySelector('.card-poke');
        if (firstImg.getAttribute('data-id') === secondImg.getAttribute('data-id')) {
            chooseTrue(firstCard, secondCard);
        }
        else {
            chooseFalse(firstCard, secondCard, firstImg, secondImg);
        }
        selectedCards = [];
    }
}
function selectCard(card) {
    const img = card.querySelector('.card-poke');
    card.classList.add('flip');
    img.style.zIndex = '1';
    card.style.background = 'none';
}
function chooseTrue(firstCard, secondCard) {
    console.log('Đúng');
    setTimeout(() => {
        firstCard.remove();
        secondCard.remove();
        lockBoard = false;
        if (document.querySelectorAll('.card-item').length === 0) {
            alert('Bạn đã win!');
        }
    }, 1000);
}
function chooseFalse(firstCard, secondCard, firstImg, secondImg) {
    console.log('Sai');
    setTimeout(() => {
        resetCards(firstImg, secondImg, firstCard, secondCard);
        lockBoard = false;
    }, 500);
}
function resetCards(firstImg, secondImg, firstCard, secondCard) {
    firstImg.style.zIndex = '-1';
    secondImg.style.zIndex = '-1';
    firstCard.classList.add('flip');
    secondCard.classList.add('flip');
    firstCard.style.background = 'url("https://upload.wikimedia.org/wikipedia/vi/3/3b/Pokemon_Trading_Card_Game_cardback.jpg") center/cover';
    secondCard.style.background = 'url("https://upload.wikimedia.org/wikipedia/vi/3/3b/Pokemon_Trading_Card_Game_cardback.jpg") center/cover';
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    setTimeout(() => {
        firstCard.classList.remove('no-steam');
        secondCard.classList.remove('no-steam');
    }, 600);
}
