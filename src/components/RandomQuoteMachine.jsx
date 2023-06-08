import React, { useState, useEffect } from 'react';
import '../css/RandomQuote.css';

const API_URL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

const RandomQuoteMachine = () => {
    const [quotes, setQuotes] = useState('');
    const [author, setAuthor] = useState('');

    useEffect(() => {
        getQuotes();
    }, []);

    const getQuotes = async() => {
        const response = await fetch(`${API_URL}`);
        const data = await response.json();
        const dataQuotes = data.quotes;
        let randomIndex = Math.floor(Math.random() * dataQuotes.length);
        let randomQuote = dataQuotes[randomIndex];
        setQuotes(randomQuote.quote);
        setAuthor(randomQuote.author);
    };

    const handleClick = () => {
        getQuotes();
    };

    return (
    <div id='wrapper'>
            <div id='quote-box'>
                <div id='text'>
                    <i class="fa fa-quote-left"></i>
                    {quotes}
                </div>
                <div id='author'>
                    - {author}
                </div>
                <div className='buttons'>
                    <a 
                        id='tweet-quote' 
                        href='twitter.com/intent/tweet' 
                        target='_blank'
                    >   
                        <i class="fa fa-twitter"></i>                    
                    </a>
                    <a 
                        id='tumblr-quote' 
                        href='#' 
                        target='_blank'
                    >   
                        <i class="fa fa-tumblr"></i>                    
                    </a>
                    <button 
                        id='new-quote'
                        onClick={handleClick} 
                    >
                        New quote
                    </button>
                </div>
            </div>
        </div>
  )
}

export default RandomQuoteMachine