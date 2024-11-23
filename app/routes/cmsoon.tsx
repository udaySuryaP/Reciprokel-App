import '../css/cmsoon.css'
import { Link,useLocation,useNavigate } from '@remix-run/react';


const cmsoon = () =>{

    const location  = useLocation();
    const navigate = useNavigate();

    const state = location.state || {};

    console.log(state.from);
    

    return(
        <body className='cmsoon-container' >
            <p>We’re <br className='cmsoon-break' /> Working on It.</p>
            <Link to='/' style={{display:state.from == 'index' ? 'none' :'flex'}} ><img src="/Arrow3.png" alt="" /></Link>
            <button onClick={()=>{navigate('/')}}  > <img src="/Arrow3.png" alt="" /></button>
        </body>
    )
}

export default cmsoon;