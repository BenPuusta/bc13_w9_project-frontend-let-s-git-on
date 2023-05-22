import './App.css';
import { useState } from 'react';
import NicknameInput from '../NicknameInput/NicknameInput';
import SelectionMenu from '../SelectionMenu/SelectionMenu';
import Question1 from '../Question/Question1';
import Question2 from '../Question/Question2';
import Question3 from '../Question/Question3';
import Question4 from '../Question/Question4';
import Question5 from '../Question/Question5';
import ResultsPage from '../ResultsPage/ResultsPage';

//to simplify the code, lines 5-9 can be imported with a single line?
//create a Question component and reuse the same component, passing different props

/**
 *
 *This function is a main parent component that renders its children components and passing into them
 the appropriate props. 
 */
function App() {
	// all the states we are using so far
	const [nickname, setNickname] = useState('');
	const [selection, setSelection] = useState('');
	const [question, setQuestion] = useState(1);
	const [userNumber, setUserNumber] = useState('');
	const [questionID, setQuestionID] = useState('');
	const [answer, setAnswer] = useState('');
	//these are in a good state

	//pass in props and create a question tag with the text e.g <question text="question here?"/>
	//create a new state here for the questions
	//Create five different objects with the questions and options

	/**
	 * This function sends and API POST request to the server to add a new player to database.
	 * - Request body contains an object with key 'nickname' and a value of a string.
	 * - POST request receives a response of player's ID.
	 * - updates the userNumber state with the player's ID.
	 * @param {string} name new player's nickname
	 */
	async function sendName(name) {
		let nameobject = { nickname: name };

		const response = await fetch('http://icebreaker-app-backend-lets-git-on.onrender.com/api/players', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(nameobject),
		});
		let unpackedJson = await response.json();
		let userId = unpackedJson.payload[0]['player_id'];
		setUserNumber(userId);
		console.log(userId);
		// return response.json()
	}

	/**
	 *This function sends an API POST request to the server to store the player's answer to database.
  - Request body contains an object with keys 'playerID', 'question', and 'answer'
	 * @param {number} userNum player ID
	 * @param {number} qID question ID
	 * @param {number} answer multiple choice answer selection ID
	 */

	async function sendAnswer(userNum, qID, answer) {
		let answerobject = {
			playerID: userNum,
			question: qID,
			answer: answer,
		};
		const response = await fetch('http://icebreaker-app-backend-lets-git-on.onrender.com/api/answers', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(answerobject),
		});
	}

	/**
	 * Function for when you click on next after typing in a nickname.
	 * - it sends the nickname to the function that does API POST request
	 * - it updates the nickname state with player's nickname
	 */
	function handleNickname() {
		let value = document.getElementById('nicknameInput').value;
		//post nickname to localhost backend needed here
		//updates state underneath - we need this even when the localhost request is working as the state controls what is rendered in the app
		setNickname(value);
		sendName(value);
	}

	/**
	 * function for when you click on ice melting hour
	 */
	function handleSelection() {
		//this state also controls what is rendered in the app, please don't remove
		setSelection('ice-melter');
	}

	/**
	 * This function calls the function that sends API POST request for storing player's answer.
	 * and it updates the question number states, increasing the number by 1.
	 * @returns {number} updated question number
	 */
	function handleNextQuestion() {
		sendAnswer(userNumber, questionID, answer);
		return setQuestion(question + 1);
		//return console.log(question)
	}

	/**
	 * This is a callback function to update states:
	 * - updates answer state with the player's choice of answer contained in the event object.
	 * - updates questionID state with the corresponding question ID.
	 * @param {Object} e an event object.
	 * @returns a console log of the question ID and the answer ID
	 */
	function handleAnswer(e) {
		setAnswer(e.target.id);
		setQuestionID(e.target.parentNode.id);

		return console.log(`question: ${questionID} answer: ${answer}`);
	}

	//conditional rendering below to control what is displayed on the page based on states
	if (nickname.length === 0) {
		return (
			<div className="App">
				<NicknameInput
					userNickname={nickname}
					handleNickname={handleNickname}
				/>
			</div>
		);
	} else if (nickname.length !== 0 && selection.length === 0) {
		return (
			<div>
				<SelectionMenu nickname={nickname} handleSelection={handleSelection} />
				<p>{selection}</p>
			</div>
		);
	} else if (
		nickname.length !== 0 &&
		selection.length !== 0 &&
		question === 1
	) {
		return (
			<Question1
				handleAnswer={handleAnswer}
				handleNextQuestion={handleNextQuestion}
			/>
		);
	} else if (question === 2) {
		return (
			<Question2
				handleAnswer={handleAnswer}
				handleNextQuestion={handleNextQuestion}
			/>
		);
	} else if (question === 3) {
		return (
			<Question3
				handleAnswer={handleAnswer}
				handleNextQuestion={handleNextQuestion}
			/>
		);
	} else if (question === 4) {
		return (
			<Question4
				handleAnswer={handleAnswer}
				handleNextQuestion={handleNextQuestion}
			/>
		);
	} else if (question === 5) {
		return (
			<Question5
				handleAnswer={handleAnswer}
				handleNextQuestion={handleNextQuestion}
			/>
		);
	} else if (question === 6) {
		return <ResultsPage userNickname={nickname} userNumber={userNumber} />;
	}
}

export default App;
