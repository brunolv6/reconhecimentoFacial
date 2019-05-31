import React from 'react';

const Register = ({changePage}) => {
    return(
        <div>
            <article class="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
                <div class="pa4 black-80">
                    <form className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0 tc">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="nome">Nome</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="nome"  id="nome"/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                        </div>
                        <div class="mv3">
                            <label class="db fw6 lh-copy f6" for="password">Password</label>
                            <input class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                        </div>
                        </fieldset>
                        <div className="tc">
                        <input onClick={()=> changePage('home')} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
                        </div>
                    </form>
                </div>
            </article>
        </div>
    )
}

export default Register;