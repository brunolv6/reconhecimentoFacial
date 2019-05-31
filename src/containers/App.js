import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
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

const app = new Clarifai.App({
		apiKey: '389ca1196dc6418eab2a0de6e8db5328'
});

class App extends Component{
	
	state = {
		input: '',
		imgUrl: '',
		router: 'signIn',
		isSignedIn: false,
		box: []
	}

	/* calculateFace = (data) =>{
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		console.log(clarifaiFace);
		const image = document.getElementById('imageInput');
		const width = Number(image.width); garante que é um número
		const height = Number(image.height);
		console.log(width, height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - (clarifaiFace.right_col * width),
			bottomRow: height - (clarifaiFace.bottom_row * height)
		}
	} */

	calculateFace = (data) =>{
		const clarifaiFace = data.outputs[0].data.regions;
		const image = document.getElementById('imageInput');
		const width = Number(image.width); /* garante que é um número */
		const height = Number(image.height);
		const box = clarifaiFace.map((n) => {
			return {
				leftCol: n.region_info.bounding_box.left_col * width,
				topRow: n.region_info.bounding_box.top_row * height,
				rightCol: width - (n.region_info.bounding_box.right_col * width),
				bottomRow: height - (n.region_info.bounding_box.bottom_row * height)
			}
		});
		/* box.map((i)=> {
			console.log(i.leftCol, i.topRow, i.rightCol, i.bottomRow);
		}) */
		console.log(box[0].topRow);
		return box;
	}

	displayFaceBox = (box) =>{
		console.log(box);
		this.setState({box: box});
		console.log('a', this.state.box[0].topRow, 'e');
	}

	//recebe o valor da mudança dentro do input
	onInputChange = (event) =>{
		console.log(event.target.value);
		this.setState({input: event.target.value});
	}

	onButtonSubmit = () => {
		this.setState({box: ''});
		console.log('click');
		this.setState({imgUrl: this.state.input}); /* tenho que passar pelo input antes, senão da erro específico */
		app.models
			.predict('a403429f2ddf4b49b307e318f00e528b', this.state.input)
			.then(response => this.displayFaceBox(this.calculateFace(response)))
			.catch(err => console.log(err));
	}

	changePage = (router) => {
		if(router === 'home')
			this.setState({isSignedIn: true})
		else
			this.setState({isSignedIn: false})
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
						<SignForm changePage={this.changePage}/>
					</div>
					: 
					( (this.state.router === 'home')
						?
						<div>
							<Rank  className='mb7'/>
							<Forms 
								onInputChange={this.onInputChange} 
								onButtonSubmit={this.onButtonSubmit}
							/>	
							<Image box={this.state.box} imagem={this.state.imgUrl}/>
						</div>
						:
						<Register changePage={this.changePage}/>
					)
				}
			</div>
		);
	}
}

export default App;