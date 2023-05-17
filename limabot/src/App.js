import React, { Component } from 'react';
import './App.css';

import { QuestionAnswer } from './QuestionAnswer.js';

class App extends Component {
    render() {
        return (
            <div className="App">
              <h1 className="App-header">Limabot! (Experimental OpenAI chatbot on GPT-3.5)</h1>
              <p className="App-intro">
                This is an <b>experimental</b> chatbot for answering questions about <i>Phaseolus lunatus</i> publication abstracts, mostly from PubMed.
              </p>
              <p className="App-intro">
                If an answer is not provided from the supplied context (abstracts), the prompt will be answered by normal GPT-3.5, the same as ChatGPT.
              </p>
              <QuestionAnswer />
            </div>
        );
    }
}

export default App;
