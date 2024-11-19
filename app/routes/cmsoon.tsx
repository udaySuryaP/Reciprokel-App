import '../css/cmsoon.css'
import { Link } from '@remix-run/react';


const cmsoon = () =>{
    return(
        <body className='cmsoon-container' >
            <p>Coming Soon...</p>
            <Link to='/' > <img src="/Arrow3.png" alt="" /> back</Link>
        </body>
    )
}

export default cmsoon;