import React, { Component } from 'react';
import './App.css';

import { QuestionAnswer } from './QuestionAnswer.js';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="header">
		    <img className="logo" src="https://www.ncgr.org/static/img/logo_dark.png"/>
                </div>
                <div className="content">
		    <h1>Legumebot</h1>
                    <h2>Experimental chatbot on OpenAI { process.env.REACT_APP_OPENAI_MODEL }</h2>
                    <p className="app-intro">
                        This is an <b>experimental</b> chatbot for answering questions about legume species, with content from PubMed and PubAg publication abstracts.
                        We built a Pinecone vector database of embedding vectors from PubMed and PubAg abstracts that contain a legume genus and species name. Those abstracts are used
                        by OpenAI { process.env.REACT_APP_OPENAI_MODEL } to construct a response and list the relevant publications.
                    </p>
                    <p>
                        The selectors control Pinecone and ChatGPT parameters:
                    </p>
                    <ul>
                        <li><b>Top K</b> tells Pinecone to return the top K matching abstracts.</li>
                        <li><b>Temperature</b> constrains the OpenAI language model's response: lower temperature is more constrained and tied to the provided abstracts.</li>
                            <li><b>Frequency/Presence penalties</b> reduce the repetitiveness of the response.</li>
                            </ul>
                            <p>
				The response may be truncated due to OpenAi limits. If so, you'll see Finish reason: length, or OpenAi may just tell you the content length was too large.
				The Prompt tokens are the size of the abstracts sent to OpenAI plus your question. The Completion tokens are the size of the response.
				The Total tokens are limited by the { process.env.REACT_APP_OPENAI_MODEL } model to { process.env.REACT_APP_OPENAI_MODEL_TOKENS }.
                            </p>
                        <p>
                            <i>If your prompt is too large or the response is truncated, try reducing Top K so there are fewer abstracts and therefore prompt tokens.</i>
                        </p>
	                <QuestionAnswer />
                    </div>
                </div>
        );
    }
}

export default App;
