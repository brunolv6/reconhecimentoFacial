import React from 'react';
import './Image.css';

const Image = ({box, imagem}) => {
    return(
        <div className='centro ma'>
            <div className='absolute mt2'>
                <img id='imageInput' alt='' src={imagem} width='500px' height='auto'/>
               {
                box.map((n) => {
                    return (
                        <div className='bounding-box' style={{top: n.topRow, right: n.rightCol, bottom: n.bottomRow, left: n.leftCol}}></div>
                    )
                })
               }
            </div> 
         </div>
    );
}

export default Image;

/*  <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div> */