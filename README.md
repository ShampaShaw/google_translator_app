# Google Translation App

![Google Translation App](https://your-image-link.com)

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Technologies Used](#technologies-used)

## Description
The Google Translation App is a web-based application that allows users to translate text from one language to another using the LibreTranslate API. The app also includes features for speech recognition and text-to-speech, enhancing user interaction by allowing users to speak the input text and listen to the translated output.

## Features
- Translate text between multiple languages
- Speech recognition to input text via microphone
- Text-to-speech to hear the translated text
- Responsive design for use on various devices
- Error handling and rate limit notifications

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/google-translation-app.git
    cd google-translation-app
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your API key:
    ```env
    REACT_APP_API_KEY=your_api_key
    ```

4. Start the development server:
    ```bash
    npm start
    ```

## Usage
1. Select the source and target languages from the dropdown menus.
2. Enter the text you want to translate in the input area.
3. Click the "Translate" button to get the translation.
4. Use the "Speak" button to use speech recognition for input.
5. Click the speaker icon to hear the translated text.

## File Structure

google-translation-app/
├── public/
├── src/
│ ├── components/
│ │ └── Body.jsx
│ ├── App.css
│ ├── App.js
│ ├── index.css
│ ├── index.js
├── .gitignore
├── README.md
├── package-lock.json
├── package.json
├── tailwind.config.js

## Technologies Used
- **React**: A JavaScript library for building user interfaces
- **Axios**: Promise-based HTTP client for the browser and Node.js
- **LibreTranslate API**: Free and Open Source Machine Translation API
- **Web Speech API**: Interface for speech recognition and synthesis
- **CSS**: For styling the application

---

Made with ❤️ by [Shampa Shaw](https://github.com/ShampaShaw)
