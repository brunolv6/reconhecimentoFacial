import React, { Component } from 'react';

class SignForm extends Component {

    constructor(){
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    componentDidMount() {
        //segue esta path de um servidor e pega o result em json
       fetch('http://localhost:3000/')
           //transforma a response que veio do servidor em json
           .then(response => response.json())
           //imprime o dado que veio do servidor
           .then(data => console.log(data)) //podia ser só ".then(console.log())"
   }

   onEmailChange = (event) => {
       this.setState({email: event.target.value});
   }

   onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    onSignIn = () => {
        fetch('http://localhost:3000/signin', {
            method: 'post', //pode ser get, put ou delete tbm
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        });
        this.props.changePage('home');
    }

    render(){
        //abreviação abaixo apenas
        const { changePage } = this.props;
        return(
            <div>
                <article className="pa2 br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-3">
                    <div className="pa4 black-80">
                        <form className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0 tc">Sign In</legend>
                            <div className="mt3 tc">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-70" type="email" name="email-address"  id="email-address"/>
                            </div>
                            <div className="mv3 tc">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-70" type="password" name="password"  id="password"/>
                            </div>
                            </fieldset>
                            <div className="tc">
                            <input onClick={this.onSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
                            </div>
                            <div className="lh-copy mt3 tc">
                            <a href="#0" className="f6 link dim black db" onClick={()=> changePage('register')} >Register</a>
                            <a href="#0" className="f6 link dim black db">Forgot your password?</a>
                            </div>
                        </form>
                    </div>
                </article>
            </div>
        )
    };
}

export default SignForm;