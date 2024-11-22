import {
    Link,
    json, 
    useFetcher,
    } from "@remix-run/react";
import {useState } from "react";
import React,{useRef,useContext} from "react";
import {db,serverTimestamp,addDoc,collection} from '../firebase.js'
import { useNavigate } from "@remix-run/react";

import '../css/style.css'
import '../css/mobile/style.css'



  
  export const action = async ({ request }: any) => {

    const formData = new URLSearchParams(await request.text());
    const formType = formData.get('FormType')
  
    if (formType === 'form1'){
      const email = formData.get('email');
  
      if (!email) {
        return json({ error: 'Email is required!' }, { status: 400 });
      }
  
      try {
        await addDoc(collection(db, 'emails'), {
          email: email,
          timestamp: serverTimestamp(),
        });
  
        return json({ success: true });
      } catch (error) {
        console.error('Error saving email:', error);
        return json({ error: 'Error saving email to database' }, { status: 500 });
      }
    }
  
    if(formType === 'form2'){
      const name = formData.get('name')
      const email2 = formData.get('email2')
      const phone = formData.get('phone')
      const msg = formData.get('msg')
  
      if(!name || !email2 || !msg){
        return json({ error: 'All fields except phone are required!' }, { status: 400 });
      }else{
        try {
          await addDoc(collection(db, 'enquiry'), {
            name:name,
            email: email2,
            phone: phone,
            msg: msg,
            timestamp: serverTimestamp(),
          })
          
          return json({ success: true })
        } catch (error) {
          console.error('Error saving email:', error);
          return json({ error: 'Error saving email to database' }, { status: 500 });
        }
      }
    }
  
    if(formType === 'form3'){
      const email3 = formData.get('email3')
  
      if(!email3){
        return json({ error: 'All fields except phone are required!' }, { status: 400 });
      }else{
        try {
          await addDoc(collection(db, 'newsletter'), {
            email: email3,
            timestamp: serverTimestamp(),
          })
          
          return json({ success: true })
        } catch (error) {
          console.error('Error saving email:', error);
          return json({ error: 'Error saving email to database' }, { status: 500 });
        }
      }
    }
  };
  
  
  export default function Index() {
    
    const navigate = useNavigate()

    const [navbar,setNavbar] = useState(false)

    const [waitlist,setWaitlist] = useState('')

    const [get_name,setGet_Name] = useState('')
    const [get_phone,setGet_phone] = useState('')
    const [get_email,setGet_email] = useState('')
    const [get_msg,setGet_msg] = useState('')

    const [newsLetter,setNewLetter] = useState('')
    const navbar_handle = () =>{
      setNavbar(!navbar)
    }
  
    const fetcher = useFetcher();
    const alert = useRef<HTMLDivElement>(null);
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const response = await fetcher.submit(formData, { method: 'post' });
  
      if (response == undefined){
        if(alert.current){
          alert.current.style.right = '10px'
        }
        setTimeout(()=>{
          if(alert.current){
            alert.current.style.right = '-400px'
            setWaitlist('')
            setGet_Name('')
            setGet_email('')
            setGet_phone('')
            setGet_msg('')
            setNewLetter('')
            navigate('/cmsoon')

          }
        },2000)
      }
      
    };
    return(
      <body className="container" >
  
        <section ref={alert} className="noti" >
          <p>Successfully sent</p>
        </section>
  
        <section data-aos="fade-up" className="navbar">
  
          <div className="navbar-left">
            <p><Link to={'/'} >Reciprockel App</Link></p>
          </div>
  
          <div className="navbar-center">
            <ul style={{right:navbar ? '-20px' : '-400px'}}  >
              <li><Link to='/' >Home</Link></li>
              <li><Link to='/cmsoon' >About us</Link></li>
              <li><Link to='/cmsoon' >Roadmap</Link></li>
              <li><Link to='/cmsoon' >Contact Us</Link></li>
            </ul>
          </div>
  
          <div className="navbar-right">
            <p><Link to={'/cmsoon'} >For Investors</Link></p>
            <button className="hamBar" style={{opacity:navbar?0:1}} onClick={navbar_handle} ><img src="./Hamburgericon.png" alt="" /></button>
            <button className="backBar" style={{opacity:navbar?1:0}}  onClick={navbar_handle} ><img src="./Arrow3.png" alt="" /></button>
          </div>
  
        </section>
  
        <section data-aos="fade-up" className="hero" >
          <p className="hero-head">Revolutionizing Learning <br /> & Professional Growth.</p>
          <p className="hero-sub-head">Unlock the Future of Education with a Platform Designed for Impactful Engagement and Real-World Success.</p>
  
          <form onSubmit={handleSubmit}  >
              <input type="hidden" name="FormType" value={"form1"} />
              <input
                type="email"
                name="email"
                value={waitlist}
                onChange={(e) => setWaitlist(e.target.value)}
                required
                placeholder="Enter your email address"
              />
              <button  type="submit">Join the waitlist</button>
          </form>
  
        </section>
  
        <section data-aos="fade-up" className="about" >
          <p data-aos="fade-up" className="about-head" >ABOUT US</p>
          <p data-aos="fade-up" className="about-content" >Our mission is to <span style={{color:'#4d61f4'}} >transform education</span> and empower growth through technology. We’re dedicated to providing institutions, students, and educators with tools to achieve, engage, and <span style={{color:'#4d61f4'}} >succeed</span> in a dynamic world.</p>
          <button data-aos="fade-up" className="about-learn-more" > <Link to={'/cmsoon'} >Learn More</Link> <img src="/Arrow1.png" alt="" /> </button>
        </section>
  
        <section  className="fet">
          <div className="fet-left">
            <div data-aos="fade-up" className="fet-left-top">
              <p className="fet-head">AI Insights to Drive Success</p>
              <p className="fet-cot">Harness the power of AI to personalize learning, optimize course recommendations, and enhance student outcomes. Uncover how data-driven insights and adaptive assessments can elevate education at every level.</p>
            </div>
            <div data-aos="fade-up" className="fet-left-center">
              <div data-aos="fade-up" className="fet-left-center-left">
                <p className="fet-head">Effortless Attendance, Made Smart</p>
                <p className="fet-cot">Forget roll calls and tedious logs. Our platform revolutionizes attendance with seamless tracking and analytics.</p>
              </div>
              <div data-aos="fade-up" className="fet-left-center-right">
                <p className="fet-head">All-in-One<br />for Assignments,<br />Feedback, and More</p>
                <p className="fet-cot">Streamline assignments, real-time grading, and personalized feedback for effortless student-teacher connection.</p>
              </div>
            </div>
            <div data-aos="fade-up" className="fet-left-bottom">
              <p className="fet-head">Instant Notifications,<br />Maximum Impact</p>
              <p className="fet-cot">Never miss a beat with real-time alerts for deadlines, grades, events, and more. Our platform keeps everyone informed with customizable push notifications across devices. Discover how we keep communication flowing.</p>
            </div>
          </div>
          <div className="fet-right">
            <div data-aos="fade-up" className="fet-right-top">
              <p className="fet-head">Student Progress,<br />Visualized Like Never Before</p>
              <p className="fet-cot">Track academic growth with intuitive dashboards, personalized reports, and in-depth analytics. Dive deeper into performance trends, skill gaps, and strengths, all presented visually for easier insights. See how we turn data into growth.</p>
            </div>
            <div data-aos="fade-up" className="fet-right-bottom">
              <p className="fet-head">Your Campus Community,<br />Digitally Connected</p>
              <p className="fet-cot">Whether it’s group projects, club meetings, or discussion boards, create vibrant communities and collaborative spaces for every need. Dive into an ecosystem that supports both learning and growth beyond the classroom.</p>
            </div>
          </div>
        </section>
        <section className="stayTuned" >
          <p data-aos="fade-up" >Stay Tuned for More</p>
          <div data-aos="fade-up" className="staytuned-btns">
            <button>
              <img src="/Arrowbtns.png" alt="" />
            </button>
            <button>
              <img style={{transform: 'rotate(180deg)'}} src="/Arrowbtns.png" alt="" />
            </button>
          </div>
        </section>
        <section data-aos="fade-up" className="roadmap" >
          <div className="roadmap-top">
            <p className="roadmap-top-title" >ROADMAP</p>
            <p className="roadmap-top-head" >Building a <span style={{color:'#4d61f4'}} >Seamless</span> Learning Experience.</p>
            <p className="roadmap-top-sub-head" >Our design process focuses on intuitive functionality and real-world impact, creating a transformative platform for students, educators, and institutions.</p>
          </div>
          <div className="roadmap-bottom-container">
            <div className="roadmap-bottom">
              <div className="roadmap-b-item-1">
                <p>Initial Development</p>
              </div>
              <div className="roadmap-b-item-2">
                <p>Early AI-Driven & Testing</p>
              </div>
              <div className="roadmap-b-item-3">
                <p>Feature Expansion</p>
              </div>
              <div className="roadmap-b-item-4">
                <p>Full Platform Rollout & Scaling</p>
              </div>
              <div className="roadmap-b-item-5">
                <p>Growth & Innovation</p>
              </div>
              <img className="roadmap-bottom-img1" src="/Timelinevectors.png" alt="" />
              <img className="roadmap-bottom-img2" src="/TimelineMeasures.png" alt="" />
            </div>
          </div>
        </section>

        <section className="roadmap-addon" >
          <p>Swipe <img src="/Arrow13.png" alt="" /></p>
        </section>
  
        <section className="get" >
          <div data-aos="fade-up" className="get-top">
            <p>Get in touch, <br /> We'd <span style={{color:'#4d61f4'}} >Love to Hear</span> From You.</p>
          </div>
          <div data-aos="fade-up" className="get-bottom">
            <fetcher.Form onSubmit={handleSubmit} >
              <input type="hidden" name="FormType" value={"form2"} />
              <div className="get-b-top">
                <input 
                  type="text" 
                  placeholder="Your Name" required 
                  value={get_name}
                  onChange={(e) => setGet_Name(e.target.value)}
                  name="name" />
                <input 
                  type="email" 
                  placeholder="Your Email" required 
                  value={get_email}
                  onChange={(e) => setGet_email(e.target.value)}
                  name="email2" />
                <input 
                  type="text" 
                  placeholder="Phone Number (Optional)" 
                  value={get_phone}
                  onChange={(e) => setGet_phone(e.target.value)} 
                  name="phone" />
              </div>
              <div className="get-b-b">
                <textarea required 
                  rows={4} 
                  autoCorrect="false" 
                  placeholder="Message" 
                  value={get_msg}
                  onChange={(e) => setGet_msg(e.target.value)}
                  name="msg" ></textarea>
              </div>
              <button type="submit" >Leave us a message  </button>
            </fetcher.Form>
          </div>
        </section>
  
        <footer>
  
          <div data-aos="fade-up" className="footor-container">
            <div className="footor-left">
              <p className="footor-l-head" >Reciprokel App</p>
              <p className="footor-l-sub-head" >Subscribe to receive news and updates.</p>
  
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="FormType" value={"form3"}/>
                <input 
                  placeholder="Enter you email address" 
                  className="footor-l-f-input" 
                  value={newsLetter}
                  onChange={(e) => setNewLetter(e.target.value)}
                  type="email" 
                  name="email3" required/>
                <button type="submit" ></button>
              </form>
  
            </div>
  
            <div className="footor-right">
              <div className="footor-r-left">
                <p>Company</p>
                <ul>
                <li><Link to='/' >Home</Link></li>
                <li><Link to='/cmsoon' >About us</Link></li>
                <li><Link to='/cmsoon' >Roadmap</Link></li>
                <li><Link to='/cmsoon' >Contact Us</Link></li>
                </ul>
              </div>
              <div className="footor-r-right">
                <p>Info</p>
                <ul>
                <li><Link to='/cmsoon' >Blog</Link></li>
                </ul>
              </div>
            </div>
          </div>
  
          <p  className="footor-cpwrite" >© 2024 Reciprokel. All rights reserved </p>
        </footer>
        
      </body>
    )
  }
  