import '@styles/globals.css';
import React, { Children } from 'react';
import Nav from '@components/Nav';
import Provider from '@components/Provider';


export const metadata = {
    title: 'IdeaScape',
    description: 'Share AI Prompts',
    author: 'Karim',
    keywords: 'Next.js, React.js, React Framework',
  
}
const RootLayout = ({children}) => {
  return (
   <html lang="en">
<body>
    <Provider>
    <div className="main">
        <div className="gradient"/>
    </div>
    <main className="app">
        <Nav/>
        {children}
    </main>
</Provider>
</body>
   </html>
  )
}

export default RootLayout
