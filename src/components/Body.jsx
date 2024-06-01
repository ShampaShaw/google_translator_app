import React, { useEffect, useState, useCallback } from 'react';
import '../App.css';
import axios from 'axios';

const apikey = process.env.REACT_APP_API_KEY;

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const Body = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [inlanguage, setInLanguage] = useState('es'); // Default to Spanish
  const [outlanguage, setOutLanguage] = useState('es'); // Default to Spanish
  const [languages, setLanguages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://libretranslate.de/languages', {
      headers: {
        'Accept': 'application/json'
      }
    }).then((res) => {
      setLanguages(res.data);
      console.log(res.data);
    }).catch((err) => {
      console.error(err);
    });
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleTranslate = useCallback(debounce(async () => {
    try {
      const res = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ q: text, source: inlanguage, target: outlanguage, api_key: apikey }),
      });
      if (!res.ok) {
        if (res.status === 429) {
          setError('You have exceeded the number of allowed requests. Please try again later.');
        } else {
          setError('An error occurred. Please try again.');
        }
        return;
      }
      const data = await res.json();
      setTranslatedText(data.translatedText);
      setError(null);
      console.log(data);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    }
  }, 1000), [text, inlanguage, outlanguage]);

  const handleSpeak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = outlanguage;
    window.speechSynthesis.speak(utterance);
  };

  const handleListen = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = inlanguage;
    recognition.start();

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setText(speechToText);
    };

    recognition.onerror = (event) => {
      setError('An error occurred during speech recognition: ' + event.error);
    };
  };

  return (
    <div className="container">
      <h1>Google Translation App</h1>
      {error && <p className="error">{error}</p>}
      <div className="input-section">
        <h2>From:({inlanguage})</h2>
        <select value={inlanguage} onChange={(e) => setInLanguage(e.target.value)}>
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        <button onClick={handleListen}>🎤</button>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to translate"
        />
      </div>
      <div className="output-section">
        <h2>To:({outlanguage})</h2>
        <select value={outlanguage} onChange={(e) => setOutLanguage(e.target.value)}>
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        <textarea value={translatedText} readOnly placeholder="Translation" />
        <button onClick={() => handleSpeak(translatedText)}>🔊</button>
      </div>
      <button onClick={handleTranslate}>Translate</button>
    </div>
  );
};

export default Body;
