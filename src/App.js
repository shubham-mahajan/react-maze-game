import React, { Component } from 'react';
import './App.css';

let createReactClass = require('create-react-class');
let items = []
let no_of_moves;
const max_no_of_moves = 64;
let mario_jump;
let max_mashroom;

function Welcome(props) {
	return (
		<div>
			<h2>Mario Maze Game</h2>
			<p>You need to eat all the mashrooms in 64 steps. By Default maze size is 10 x 10, you can change it by reloading or entering the height and width in prompt.</p>
		</div>
		)
}


function ScoreCard(props) {
	let score_achived  = document.getElementById('score_achived')
	
	let no_of_moves_score = document.getElementById('no_of_moves')
	let steps_remaining = document.getElementById('steps_remaining')
	let mashrooms_remaining = document.getElementById('mashrooms_remaining')
	steps_remaining.innerHTML = max_no_of_moves -  no_of_moves
	no_of_moves_score.innerHTML = no_of_moves
	mashrooms_remaining.innerHTML = document.getElementsByClassName('active').length
	score_achived.innerHTML = max_mashroom - document.getElementsByClassName('active').length
}

let Score = createReactClass({
	getInitialState: function() {
		return {score: 0}

	},
	render: function() {
		return (
		<div id="score">
			<div>
				<p>Score Achived</p>
				<p id="score_achived">0</p>
			</div>
			<div>
				<p>Steps Used</p>
				<p id="no_of_moves">0</p>
			</div>
			<div >
				<p>Steps Remaining</p>
				<p id="steps_remaining">0</p>
			</div>
			<div >
				<p>Mashroom Remaining</p>
				<p id="mashrooms_remaining">0</p>
			</div>
		</div>
		)
	}
})

let Cell = createReactClass({
	getInitialState: function() {
		return {selected: false}

	},
	render: function() {
		return (
		<div className={this.state.selected?"cell active":"cell"}
			id={this.props.id}>
		</div>
		)
	}
})


function checkFinish() {
	if(no_of_moves === max_no_of_moves){
		let confirm = window.confirm("Game Over. Do you want to restart?");
		if (confirm === true){
			window.location.reload();
		}
	}
	let check = document.getElementsByClassName('active')
	if(check.length === 0){
		let game_complete = window.confirm("hurray!!! You have finished the game in "+ no_of_moves + " moves.");
		if (game_complete === true){
			window.location.reload()
		}
	}
}


let Box = createReactClass({
	getInitialState: function() {
		// build an array to hold all the cells
		//
		let c = []  
		for(let i=1; i<=this.props.matrix; i++){ 
			c.push( <Cell key={i} id={i} cells={c} /> )
			items.push(i)
		}
		return {cells: c} 
	},
	render: function() {
		return (
		  <div> { this.state.cells } </div>
		)    
	}
})



/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		let temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array
	
}


function movement(event){
	if (event.keyCode === 37){
		let mario = document.getElementsByClassName('mario')
		let marioid = mario[0].id
		let move = document.getElementById(marioid-1)
		if(move != null){
			if(move.classList.contains('active')){
				move.classList.toggle('active')
			}
			move.innerHTML = document.getElementById(marioid).innerHTML
			document.getElementById(marioid).innerHTML = ""
			document.getElementById(marioid).classList.toggle('mario')
			move.classList.toggle('mario')
			marioid = marioid-1
		}
		else{
			no_of_moves = no_of_moves-1
		}
		
	}
	if (event.keyCode === 38){
		let mario = document.getElementsByClassName('mario')
		let marioid = mario[0].id
		let move_up = parseInt(marioid,10) - parseInt(mario_jump,10);
		let move = document.getElementById(move_up)
		if(move != null){
			if(move.classList.contains('active')){
				move.classList.toggle('active')
			}
			move.innerHTML = document.getElementById(marioid).innerHTML
			document.getElementById(marioid).innerHTML = ""
			document.getElementById(marioid).classList.toggle('mario')
			move.classList.toggle('mario')
			marioid = marioid-mario_jump
		}
		else{
			no_of_moves = no_of_moves-1
		}
	}
	
	if (event.keyCode ===39){
		let mario = document.getElementsByClassName('mario')
		let marioid = mario[0].id
		let move_right = parseInt(marioid,10) + 1
		let move = document.getElementById(move_right)
		if(move != null){
			if(move.classList.contains('active')){
				move.classList.toggle('active')
			}
			move.innerHTML = document.getElementById(marioid).innerHTML

			document.getElementById(marioid).innerHTML = ""
			document.getElementById(marioid).classList.toggle('mario')
			move.classList.toggle('mario')
			marioid = marioid+1
		}
		else{
			no_of_moves = no_of_moves-1
		}
	}
	
	if (event.keyCode === 40){
		let mario = document.getElementsByClassName('mario')
		let marioid = mario[0].id
		let move_up = parseInt(marioid,10) + parseInt(mario_jump,10)
		let move = document.getElementById(move_up)
		if(move != null){
			if(move.classList.contains('active')){
				move.classList.toggle('active')
			}
			move.innerHTML = document.getElementById(marioid).innerHTML
			document.getElementById(marioid).innerHTML = ""
			document.getElementById(marioid).classList.toggle('mario')
			move.classList.toggle('mario')
			marioid = marioid+mario_jump
		}
		else{
			no_of_moves = no_of_moves-1
		}
	}

}

class App extends Component {
 	constructor(props){
		super(props);
		let width = prompt("Enter width of game: ", "e.g. 10,20,30");
		let height = prompt("Enter height of  game: ", "e.g. 10,20,30");
		if(height == null || width == null || isNaN(width) === true || isNaN(height) === true){
			height = 10
			width = 10
		}
		let matrix_size = height * width
		mario_jump = width
		this.state = {
			matrix_size:matrix_size,
			width:width,
			height:height
		}
	}
	componentDidMount() {
		window.addEventListener('load', this.handleLoad(this.state.width,this.state.height));
	}

	handleLoad(width,height){
		let matrix = document.getElementById('root')
		matrix.style.height = 40 * height + "px"
		matrix.style.width = 40 * width + "px"
		let shuffled_data = shuffleArray(items)
		let truncated_data = shuffled_data.slice(0,parseInt(this.state.matrix_size/3,10))

		for (let i = 0; i < truncated_data.length; i++) {
			let elem_position = document.getElementById(truncated_data[i])
			elem_position.innerHTML="<img src='mario-mashroom.jpeg' alt='mario' class='maze-image'/>";
			elem_position.classList.toggle('active')
		}

		let unique_data = shuffled_data.filter(function(obj) { return truncated_data.indexOf(obj) === -1; });
		let item = unique_data[Math.floor(Math.random()*unique_data.length)];
		let marioposition=document.getElementById(item)
		marioposition.classList.toggle('mario')
		marioposition.innerHTML="<img src='mario-icon.png' alt='mario' class='maze-image'/>";
		max_mashroom = document.getElementsByClassName('active').length
	}
	
	onKeyPress(event){
		if(event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40){
			if (no_of_moves === undefined){
			  	no_of_moves = 0
			}
			no_of_moves = no_of_moves + 1;

		}
		movement(event) 
		checkFinish()
		ScoreCard()
	}

	componentWillMount() {
		document.addEventListener("keydown", this.onKeyPress);
	}
	render() {
		return (
			<div className="App">
				<Welcome/>
				<Box matrix={this.state.matrix_size}/>
				<Score/>
			</div>
		);
	}
}

export default App;
