import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json, 
  redirect
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { db, serverTimestamp } from './firebase.js'
import { addDoc, collection } from 'firebase/firestore';

import './css/style.css'

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const action = async ({ request }) => {
  const formData = new URLSearchParams(await request.text());
  const email = formData.get('email');

  if (!email) {
    return json({ error: 'Email is required!' }, { status: 400 });
  }

  try {
    // Save email to Firestore
    await addDoc(collection(db, 'emails'), {
      email: email,
      timestamp: serverTimestamp(),
    });

    return json({ success: true });
  } catch (error) {
    console.error('Error saving email:', error);
    return json({ error: 'Error saving email to database' }, { status: 500 });
  }
};

export default function App() {
  return(
    <div className="container" >

      <section className="navbar">

        <div className="navbar-left">
          <p>Reciprockel</p>
        </div>

        <div className="navbar-center">
          <ul>
            <li><Link to='/' >Home</Link></li>
            <li><Link to='/' >About us</Link></li>
            <li><Link to='/' >Roadmap</Link></li>
            <li><Link to='/' >Contact Us</Link></li>
          </ul>
        </div>

        <div className="navbar-right">
          <p>For Investors</p>
        </div>

      </section>

      <section className="hero" >
        <p className="hero-head">Revolutionizing Learning <br /> & Professional Growth</p>
        <p className="hero-sub-head">Unlock the Future of Education with a Platform Designed for Impactful Engagement and Real-World Success.</p>

        <form method="post">
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
            />
            <button type="submit">Submit</button>
        </form>

      </section>
    </div>
  )
}
