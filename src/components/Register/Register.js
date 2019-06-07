import React, { Component } from 'react';

class Register extends Component{

    constructor(){
        super();
        this.state = {
            nameR: '',
            emailR: '',
            passwordR: ''
        }
    }

    onChangeName = (event) => {
        this.setState({nameR: event.target.value});
    }

    onChangeEmail = (event) => {
        this.setState({emailR: event.target.value});
    }

    onChangePassword = (event) => {
        this.setState({passwordR: event.target.value});
    }

    onRegister = () => {
        fetch('http://localhost:3000/register', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                name: this.state.nameR,
                email: this.state.emailR,
                password: this.state.passwordR,
            })
        })
            .then(response => response.json())
            .then(user => {
                //coloca .ID porque assim ele não aceita avisos 400, appenas usuarios que possuam algum .ID
                if(user.id){
                    this.props.loadUser(user)
                    this.props.changePage('home');
                }
            })
        /* this.props.changePage('home');  */
    }

    render(){
        return(
            <div>
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
                    <div className="pa4 black-80">
                        <form className="measure center">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0 tc">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="nome">Nome</label>
                                <input onChange={this.onChangeName} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="nome"  id="nome"/>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onChangeEmail} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onChangePassword} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                            </div>
                            </fieldset>
                            <div className="tc">
                            <button 
                                onClick={this.onRegister} 
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="button" 
                                value="Sign in"
                            >Sign In
                            </button>
                            </div>
                        </form>
                    </div>
                </article>
            </div>
        )
    }
}

export default Register;