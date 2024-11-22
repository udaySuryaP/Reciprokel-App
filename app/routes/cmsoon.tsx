import '../css/cmsoon.css'
import { Link } from '@remix-run/react';


const cmsoon = () =>{
    return(
        <body className='cmsoon-container' >
            <p>We’re Working on It.</p>
            <Link to='/' ><img src="/Arrow3.png" alt="" /></Link>
        </body>
    )
}

export default cmsoon;