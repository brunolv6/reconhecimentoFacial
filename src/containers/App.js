import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import Forms from '../components/Forms/Forms';
import Rank from '../components/Rank/Rank';
import Register from '../components/Register/Register';
import Image from '../components/Image/Image';
import SignForm from '../components/SignForm/SignForm';
import './App.css'

const particlesOptions = {
	particles: {
		number:{
			value: 150,
			density:{
				enable: true,
				value_area: 800
			}
		}
	}
}

const initialState = {
	input: '',
	imgUrl: '',
	router: 'signIn',
	isSignedIn: false,
	box: {},
	user: {
		id: '',
		name: '',
		email: '',
		entries: 0,
		joined: ''
	}	
}

class App extends Component{
	
	constructor(){
		super();
		this.state = initialState;
	}
 
	
	loadUser = (data) => {
		this.setState({user: {
			id: data.id,
			name: data.name,
			email: data.email,
			entries: data.entries,
			joined: data.joined
		}})
		console.log(this.state.user);
	}

	calculateFace = (data) =>{
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		console.log(clarifaiFace);
		const image = document.getElementById('imageInput');
		const width = Number(image.width); /* garante que é um número */
		const height = Number(image.height);
		console.log(width, height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - (clarifaiFace.right_col * width),
			bottomRow: height - (clarifaiFace.bottom_row * height)
		}
	}

	displayFaceBox = (box) =>{
		console.log(box);
		this.setState({box: box});
	}

	//recebe o valor da mudança dentro do input
	onInputChange = (event) =>{
		this.setState({input: event.target.value});
	}

	onButtonSubmit = () => {
		this.setState({box: ''});
		console.log('click');
		this.setState({imgUrl: this.state.input}); /* tenho que passar pelo input antes, senão da erro específico */
		fetch('http://localhost:3000/imageurl', {
			method: 'post',
			headers: {'Content-type': 'application/json'},
			body: JSON.stringify({
				input: this.state.input
			})
		})
		.then(response => response.json())
			.then(response => {
				if(response){
					fetch('http://localhost:3000/image', {
						method: 'post',
						headers: {'Content-type': 'application/json'},
						body: JSON.stringify({
							id: this.state.user.id
						})
					})
						.then(response => response.json())
						.then(count => {
							//importante fazer assim para mudar apenas um parametro no estado do user e não todos!!
							this.setState(Object.assign(this.state.user, { entries: count}))
						})
						.catch(console.log);
				}
				this.displayFaceBox(this.calculateFace(response))
			})
			.catch(err => console.log(err));
	}

	changePage = (router) => {
		if(router === 'home')
			this.setState({isSignedIn: true});
		else{
			//limpa tudo quando faz signOut
			this.setState(initialState);
		}
		this.setState({router: router});
	}

	render(){
		return(
			<div className="App">
				<Particles className='particles'
					params={particlesOptions}
				/>
				<Navigation changePage={this.changePage} isSignedIn={this.state.isSignedIn}/>
				<Logo/>
				{(this.state.router === 'signIn')
					? 
					<div>
						<SignForm changePage={this.changePage} loadUser={this.loadUser}/>
					</div>
					: 
					( (this.state.router === 'home')
						?
						<div>
							<Rank  className='mb7' name={this.state.user.name} entries={this.state.user.entries}/>
							<Forms 
								onInputChange={this.onInputChange} 
								onButtonSubmit={this.onButtonSubmit}
							/>	
							<Image box={this.state.box} imagem={this.state.imgUrl}/>
						</div>
						:
						<Register changePage={this.changePage} loadUser={this.loadUser}/>
					)
				}
			</div>
		);
	}
}

export default App;