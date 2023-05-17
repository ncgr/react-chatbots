import React from 'react';
import { useState } from 'react';
import { Atom } from "react-loading-indicators";

export function QuestionAnswer() {

    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState(null);

    // Pinecone and OpenAI parameters
    const [topK, setTopK] = useState("5");
    const [temperature, setTemperature] = useState("0.0");
    const [frequencyPenalty, setFrequencyPenalty] = useState("0.0");
    const [presencePenalty, setPresencePenalty] = useState("0.0");

    // fetch the result from the REST API
    async function getAnswer(question="") {
        const url = process.env.REACT_APP_TOMCAT_URI +
              '?question=' + encodeURIComponent(question) +
              '&top_k=' + topK +
              '&temperature=' + temperature +
              '&frequency_penalty=' + frequencyPenalty +
              '&presence_penalty=' + presencePenalty +
              '&show_diagnostics' +
              '&show_dois' +
              '&show_pmids' +
              '&show_pubagids';
        fetch(url, {
            method: "GET",
            headers: {
                "Accept": "text/plain"
            },
        })
            .then((response) => {
                return(response.text());
            })
            .then((responseText) => {
                setAnswer(responseText);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    function handleSubmit(e) {
        // don't reload the page
        e.preventDefault();
        // clear the previous answer
        setAnswer(null);
        // Read the form data and set the question state variable
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        const question = formJson.question;
        setQuestion(question);
        // get the chatbot's answer, which sets the answer state variable
        getAnswer(question);
    }

    // set the topK
    function handleTopKSelection(e) {
        setTopK(e.target.value);
    }
    // set the temperature
    function handleTemperatureSelection(e) {
        setTemperature(e.target.value);
    }
    // set the frequency penalty
    function handleFrequencyPenaltySelection(e) {
        setFrequencyPenalty(e.target.value);
    }
    // set the presence penalty
    function handlePresencePenaltySelection(e) {
        setPresencePenalty(e.target.value);
    }

    function fixLineBreaks(s) {
        if (s) {
            const fixedString = s.replaceAll("\n", "<br/>");
            return {
                __html: fixedString
            }
        } else {
            return { }
        }
    }

    return (
        <div>
          <form method="post" onSubmit={handleSubmit}>
            <div className="question-form">
              <div className="select-box">
                <label>Top K</label><br/>
                <select className="" name="topK" 
                        onChange={e => handleTopKSelection(e)}>
	          <option key={"k5"} value="5">5</option>
                  <option key={"k10"} value="10">10</option>
                  <option key={"k15"} value="15">15</option>
                  <option key={"k20"} value="20">20</option>
	          <option key={"k25"} value="50">25</option>
                </select>
              </div>
              <div className="select-box">
                <label>Temperature</label><br/>
                <select className="" name="temperature" value={temperature}
                        onChange={e => handleTemperatureSelection(e)}>
                  <option key={"t1"} value="0.0">0.0</option>
                  <option key={"t2"} value="0.2">0.2</option>
                  <option key={"t3"} value="0.4">0.4</option>
                  <option key={"t4"} value="0.6">0.6</option>
                  <option key={"t5"} value="0.8">0.8</option>
                  <option key={"t6"} value="1.0">1.0</option>
                  <option key={"t7"} value="1.2">1.2</option>
                  <option key={"t8"} value="1.4">1.4</option>
                  <option key={"t9"} value="1.6">1.6</option>
                  <option key={"t10"} value="1.8">1.8</option>
                  <option key={"t11"} value="2.0">2.0</option>
                </select>
              </div>
              <div className="select-box">
                <label>Frequency penalty</label><br/>
                <select className="" name="frequencyPenalty" value={frequencyPenalty}
                        onChange={e => handleFrequencyPenaltySelection(e)}>
                  <option key={"f1"} value="-2.0">-2.0</option>
                  <option key={"f2"} value="-1.5">-1.5</option>
                  <option key={"f3"} value="-1.0">-1.0</option>
                  <option key={"f4"} value="-0.5">-0.5</option>
                  <option key={"f5"} value="0.0">0.0</option>
                  <option key={"f6"} value="0.5">0.5</option>
                  <option key={"f7"} value="1.0">1.0</option>
                  <option key={"f8"} value="1.5">1.5</option>
                  <option key={"f9"} value="2.0">2.0</option>
                </select>
              </div>
              <div className="select-box">
                <label>Presence penalty</label><br/>
                <select className="" name="presencePenalty" value={presencePenalty}
                        onChange={e => handlePresencePenaltySelection(e)}>
                  <option key={"f1"} value="-2.0">-2.0</option>
                  <option key={"f2"} value="-1.5">-1.5</option>
                  <option key={"f3"} value="-1.0">-1.0</option>
                  <option key={"f4"} value="-0.5">-0.5</option>
                  <option key={"f5"} value="0.0">0.0</option>
                  <option key={"f6"} value="0.5">0.5</option>
                  <option key={"f7"} value="1.0">1.0</option>
                  <option key={"f8"} value="1.5">1.5</option>
                  <option key={"f9"} value="2.0">2.0</option>
                </select>
              </div>
              <div className="clear textarea-box">
                Enter your question for the chatbot:<br/>
                <textarea className="question" name="question" />
              </div>
              <div className="clear submit-button-box">
                <button className="submit-button" type="submit">Submit</button>
                <button className="reset-button" type="reset">Clear</button>
              </div>
            </div>
          </form>
          {question && !answer && (
              <div className="clear atom">
                <Atom />
              </div>
          )}
          {question && answer && (
              <div className="clear question-answer">
                <b>Question:</b><br/>
                <div className="question-box">
                  { question }
                </div>
                <b>Answer:</b><br/>
                <div className="answer-box">
                  <div dangerouslySetInnerHTML={fixLineBreaks(answer)} />
                </div>
              </div>
          )}
        </div>
      );
}
