import React from 'react';

const SignForm = ({changePage}) => {
    return(
        <div>
            <article class="pa2 br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-3">
                <div class="pa4 black-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0 tc">Sign In</legend>
                        <div className="mt3 tc">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-70" type="email" name="email-address"  id="email-address"/>
                        </div>
                        <div class="mv3 tc">
                            <label class="db fw6 lh-copy f6" for="password">Password</label>
                            <input class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-70" type="password" name="password"  id="password"/>
                        </div>
                        </fieldset>
                        <div className="tc">
                        <input onClick={()=> changePage('home')} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
                        </div>
                        <div class="lh-copy mt3 tc">
                        <a href="#0" className="f6 link dim black db" onClick={()=> changePage('register')} >Register</a>
                        <a href="#0" className="f6 link dim black db">Forgot your password?</a>
                        </div>
                    </form>
                </div>
            </article>
        </div>
    )
}

export default SignForm;