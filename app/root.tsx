import {
  Link,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  MetaFunction,
  Outlet
} from "@remix-run/react";
import  {Analytics}  from '@vercel/analytics/react';
import { useEffect } from "react";
import type { LinksFunction } from "@remix-run/node";
import AOS from "aos";
import "aos/dist/aos.css"; 

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
  {
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css",
  },
  { rel: "stylesheet", href: "/aos/aos.css" },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Reciprokel" },
    { name: "description", content: "Welcome to the Reciprokel app!" },
  ];
};
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
        <Analytics />
      </body>
    </html>
  );
}


export default function App() {

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/aos/aos.js";
    script.onload = () => {
      AOS.init({
        duration: 300,
        once: true,
        disable: () => window.innerWidth <= 768
      });
    };
    document.body.appendChild(script);

  }, []);


  return <Outlet />;
}
