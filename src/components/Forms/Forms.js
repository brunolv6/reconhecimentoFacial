import React from 'react';
import './Style.css';

const Forms = ({onInputChange, onButtonSubmit}) =>{
    return(
        <div className='tc'>
            <p className='f3 b'>Let's try the Magic Brain! Find a FACE in your photo! </p>
            <div className='centro'>
                <div className='amarelo shadow-5'>
                    <div className='centro'>
                        <input 
                            className='altura1 br4 br--left fontepla' type='text' placeholder='https://images.google/...' 
                            onChange={onInputChange}
                        />
                        <button 
                            className= 'altura2 grow br4 br--right'
                            onClick={onButtonSubmit}
                        >
                                <h1 className='search'>Search</h1>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Forms;
