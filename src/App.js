import React, { useState, useEffect } from 'react'

import './App.css';

const API_URL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

const App = () => {
    const [quotes, setQuotes] = useState('');
    const [author, setAuthor] = useState('');

    useEffect(() => {
        getQuotes();
    }, []);

    const getQuotes = () => {
        fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const dataQuotes = data.quotes;
            let randomIndex = Math.floor(Math.random() * dataQuotes.length);
            let randomQuote = dataQuotes[randomIndex];
            setQuotes(randomQuote.quote);
            setAuthor(randomQuote.author);
        })
    };

    const handleClick = () => {
        getQuotes();
    }

    return (
        <div id='wrapper'>
            <div id='quote-box'>
                <div id='text'>
                    {quotes}
                </div>
                <div id='author'>
                    {author}
                </div>
                <div className='buttons'>
                    <button 
                        id='new-quote'
                        onClick={handleClick} //onClick will display the new quote and author
                    >
                        New quote
                    </button>
                    <a 
                        id='tweet-quote' 
                        href='twitter.com/intent/tweet' //#10
                    >                       
                    </a>
                </div>
            </div>
        </div>
    )
}

export default App