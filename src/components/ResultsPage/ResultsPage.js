import { useState, useEffect } from 'react';
import React from 'react';
//import MainPerson from "../MainPerson/MainPerson";
import DisplayCard from '../DisplayCard/DisplayCard.js';
import './ResultsPage.css';
import images2 from '../../images/monkeyshy.png';
import images from '../../images/neon.png';

/**
 * a component function that renders the results page.
 * - defines two states, one for player (userState), and one for player 2 (p2State)
 * - sends a fetch request to server to get all the questions and answers submitted by the player
 * - sends another fetch request for similar information for player 2.
 * - displays the fetched information on the page by rendering its children components and passing into them the appropriate props.
 * @param {string} userNickname prop
 * @param {number} userNumber prop
 * @returns renders player's questions and answers.
 */
export default function ResultsPage({ userNickname, userNumber }) {
	const [userState, setUserState] = useState([{}, {}, {}, {}, {}]); // for next sprint: can the initial state be refactored to ([{}])? or ([])
	const [p2State, setP2State] = useState([{}, {}, {}, {}, {}]);

	console.log(userState);
	useEffect(() => {
		// Run! Like go get some data from an API.
		/**
		 * This funtion sends fetch request to the server /database to get the player's data
		 * in the fetch request, it uses the player ID, which is the userNumber prop that is passed down from a parent component.
		 */
		async function getStats() {
			const response = await fetch(
				`https://icebreaker-app-backend-lets-git-on.onrender.com/api/players/${userNumber}`
			);
			let unpackedJson = await response.json();
			setUserState(unpackedJson.payload);
		}
		getStats();
	}, []);

	useEffect(() => {});

	/**
	 * This function sends fetch request to the server / database to get the player's data.
	 * @param {num} value player ID
	 */
	async function sendP2(value) {
		const response = await fetch(`https://icebreaker-app-backend-lets-git-on.onrender.com/api/players/${value}`);
		let unpackedJson = await response.json();
		console.log(unpackedJson.payload);
		setP2State(unpackedJson.payload);
	}

	/**
	 * This functions calls the function that fetches the player's infomation from db.
	 * it passes the player's ID into the argument.
	 */
	function handleP2() {
		let value = document.getElementById('p2Input').value;
		sendP2(value);
	}

	if (p2State[0].question == null) {
		return (
			<div id="resultsPage">
				<div id="playerOne">
					<h1 className="hello">Hello {userNickname}</h1>
					<h2 className="yourIdIs"> Your ID is: {userNumber}</h2>
					<img src={images} className="neonS" alt="neonS" />
					<DisplayCard userState={userState} userNickname={userNickname} />
					<p className="personalId"></p>
				</div>
				<div id="playerTwo">
					<h3 className="playerTwoResults">
						Write the ID of another player here to see their results:
						<input type="number" id="p2Input"></input>{' '}
						<button
							className="compareBtn"
							onClick={() => {
								handleP2();
							}}>
							Compare results
						</button>
					</h3>
					<p></p>
				</div>
			</div>
		);
	} else {
		return (
			<div id="resultsPage">
				<div id="playerOne">
					<h1 className="hello">Hello {userNickname}</h1>
					<h2 className="yourIdIs"> Your ID is: {userNumber}</h2>
					<img src={images} className="neonS" alt="neonS" />
					<DisplayCard userState={userState} userNickname={userNickname} />
				</div>
				<div id="playerTwo">
					<h3 className="player2Results">{p2State[0].nickname}</h3>
					<img src={images2} className="shymonkey" alt="monkey" />
					<div>
						<DisplayCard
							id="displayBox2"
							userState={p2State}
							userNickname={p2State[0].nickname}
						/>
					</div>
				</div>
			</div>
		);
	}
}
