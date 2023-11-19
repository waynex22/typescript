let selectedCards: HTMLElement[] = [];
let level = Number($('input[name="level"]').val())
function chooseCard(card: HTMLElement): void {
  if (card)
    card.classList.add('no-steam');
  if (selectedCards.length < 2 && !selectedCards.includes(card)) {
    selectCard(card);
    selectedCards.push(card);
  }
  if (selectedCards.length === 2) {
    const [firstCard, secondCard] = selectedCards;

    const firstImg = firstCard.querySelector('.card-poke') as HTMLImageElement;
    const secondImg = secondCard.querySelector('.card-poke') as HTMLImageElement;

    if (firstImg.getAttribute('data-id') === secondImg.getAttribute('data-id')) {
      chooseTrue(firstCard, secondCard);
    } else {
      chooseFalse(firstCard, secondCard, firstImg, secondImg);
    }
    selectedCards = [];
  }
}
function selectCard(card: HTMLElement): void {
  card.style.background = 'none';
  card.style.border = '1px solid #fff'
  card.classList.add('flip');
}

function chooseTrue(firstCard: HTMLElement, secondCard: HTMLElement): void {
  console.log('Đúng');
  firstCard.style.border = ('1px solid #17B169')
  secondCard.style.border = ('1px solid #17B169')
  setTimeout(() => {
    firstCard.remove();
    secondCard.remove();
    if (document.querySelectorAll('.card-item').length === 0) {
      window.location.href = `/play?level=${level + 1}`;
    }
  }, 1000);
}

function chooseFalse(firstCard: HTMLElement, secondCard: HTMLElement, firstImg: HTMLImageElement, secondImg: HTMLImageElement): void {
  console.log('Sai');
  firstCard.style.border = ('1px solid #EF0107')
  secondCard.style.border = ('1px solid #EF0107')
  setTimeout(() => {
    resetCards(firstImg, secondImg, firstCard, secondCard);
  }, 200);
}

function resetCards(firstImg: HTMLImageElement, secondImg: HTMLImageElement, firstCard: HTMLElement, secondCard: HTMLElement): void {
  setTimeout(() => {
    firstCard.style.background = 'url("https://upload.wikimedia.org/wikipedia/vi/3/3b/Pokemon_Trading_Card_Game_cardback.jpg") center/cover';
    secondCard.style.background = 'url("https://upload.wikimedia.org/wikipedia/vi/3/3b/Pokemon_Trading_Card_Game_cardback.jpg") center/cover';
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    firstCard.style.border = ('none')
    secondCard.style.border = ('none')
    firstCard.classList.remove('no-steam');
    secondCard.classList.remove('no-steam');
  }, 200);
}

// time
const secondsContainer = document.querySelector<HTMLElement>('.seconds');
const minutesContainer = document.querySelector<HTMLElement>('.minutes');

let countdown = level * 10;
let intervalId: number | null = null;

function updateCountdown() {
  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  updateContainer(minutesContainer, minutes.toString());
  updateContainer(secondsContainer, seconds.toString());

  countdown--;

  if (countdown < 0) {
    resetCountdown();
    setTimeout(() => {
      alert('you lost !!!');
    }, 1000);
    const cardItems = document.querySelectorAll('.card-item');
    cardItems.forEach(cardItem => {
      cardItem.removeAttribute('onclick');
    });
    // window.location.href = `/`;
  }
}

function resetCountdown() {
  clearInterval(intervalId as number);
  countdown = level * 1;
}

function updateContainer(container: HTMLElement | null, newTime: string) {
  if (!container) return;

  const time = newTime.split('');

  if (time.length === 1) {
    time.unshift('0');
  }

  const first = container.firstElementChild as HTMLElement;
  if (first.lastElementChild?.textContent !== time[0]) {
    updateNumber(first, time[0]);
  }

  const last = container.lastElementChild as HTMLElement;
  if (last.lastElementChild?.textContent !== time[1]) {
    updateNumber(last, time[1]);
  }
}

function updateNumber(element: HTMLElement, number: string) {
  const second = element.lastElementChild?.cloneNode(true) as HTMLElement;
  if (!second) return;

  second.textContent = number;

  element.appendChild(second);
  element.classList.add('move');

  setTimeout(() => {
    element.classList.remove('move');
  }, 990);
  setTimeout(() => {
    element.removeChild(element.firstElementChild as Node);
  }, 990);
}

updateCountdown();

setTimeout(() => {
  intervalId = setInterval(updateCountdown, 1000);
}, 100);
