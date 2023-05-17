import React, { Component } from 'react';
import './App.css';

import { QuestionAnswer } from './QuestionAnswer.js';

class App extends Component {
    render() {
        return (
            <div className="App">
              <h1 className="App-header">Legumebot! (Experimental OpenAI chatbot on GPT-3.5)</h1>
              <p className="App-intro">
                This is an <b>experimental</b> chatbot for answering questions about legume genera, with content from PubMed and PubAg publication abstracts.
                I built the Pinecone vector database from PubMed/PubAg abstracts that contain a legume genus and species name.
              </p>
              <p>
                The selectors control Pinecone and ChatGPT parameters:
              </p>
              <ul>
                <li><b>Top K</b> tells Pinecone to return (at most) the top K matching abstracts.</li>
                <li><b>Temperature</b> constrains the OpenAI language model's response: lower temperature is more constrained and tied to the provided abstracts.</li>
                <li><b>Frequency/Presence penalties</b> reduce the repetitiveness of the response.</li>
              </ul>
              <p>
                The response may be truncated due to OpenAi limits. If so, you'll see Finish reason: length, or OpenAi may just tell you the content length was too large.
                The Prompt tokens are the size of the abstracts sent to OpenAI plus your question. The Completion tokens are the size of the response.
                The Total tokens are limited by the current OpenAi model to 4,097.
              </p>
              <p>
                <i>If your prompt is too large or the response is truncated, try reducing Top K so there are fewer abstracts and therefore prompt tokens.</i>
              </p>
	      <QuestionAnswer />
            </div>
         );
     }
}

export default App;
