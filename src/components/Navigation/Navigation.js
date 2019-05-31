import React from 'react'

const Navigation = ({changePage, isSignedIn}) => {
    if(isSignedIn)
        return(
            <nav style={{display: 'flex', justifyContent: 'flex-end', paddingTop:'24px', paddingRight: '60px'}}>
                <div>
                    <h1 className='pointer' onClick={() => changePage('signIn')}>Sign Out</h1>
                </div>
            </nav>
        );
    else
        return(
            <nav style={{display: 'flex', justifyContent: 'flex-end', paddingTop:'24px', paddingRight: '60px'}}>
                <div>
                    <h1 className='pointer' onClick={() => changePage('register')}>Register</h1>
                </div>
            </nav>
        );
}

export default Navigation;