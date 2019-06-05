import React from 'react';

const Rank = ({ name, entries}) =>{
    return(
        <div className='tc'>
             <div>
               <p className='f2 b'>
                {`${name}, your ENTRY COUNT is...`}
               </p>
               <p className='f1 b'> 
                {entries}
               </p>
            </div>
        </div>
    );
}

export default Rank;