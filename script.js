const quoteContainer = document.getElementById(`quote-container`);
const quoteText = document.getElementById(`quote`);
const authorText = document.getElementById(`author`);
const twitterBtn = document.getElementById(`twitter`);
const newQuoteBtn = document.getElementById(`new-quote`);
const loader = document.getElementById('loader');


let apiQuotes = [];

// Show loading 
function loading() {
    loader.hidden - false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new quote
function newQuote() {
    loading();
    // pick random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
        authorText.innerText = quote.author;
        quoteText.innerText = quote.text;
    // Check if author is blank - replace with unknown
    if (!quote.author){
        authorText.textContent = `Unkown`;
    }
    // Check quote length to determine styling
    if(quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    }else {
        quoteText.classList.remove('long-quote')
    }
    // Set quote, Hide loader 
    quoteText.textContent = quote.text;
    complete();
}

//  get quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // catch Error here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, `_blank`);
}
// Event Listeners 
newQuoteBtn.addEventListener(`click`, newQuote);
twitterBtn.addEventListener(`click`, tweetQuote);

// On load
getQuotes();

