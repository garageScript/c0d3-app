import React from 'react'

const Layout: React.FC = ({ children }) => {
  return (
    <div className="container">
      {children}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-gap: 1em;
          max-width: 1440px;
          margin: auto;
          text-align: center;
          margin-bottom: 1em;
        }

        /* 
         * We can pre setup default column classes like below
         * Personally I prefear write this css into my components
         */
        .col-1 {
          grid-column: span 1;
          background-color: #e2e8f0;
        }
        .col-2 {
          grid-column: span 2;
          background-color: #e2e8f0;
        }
        .col-3 {
          grid-column: span 3;
          background-color: #e2e8f0;
        }
        .col-4 {
          grid-column: span 4;
          background-color: #e2e8f0;
        }
        .col-5 {
          grid-column: span 5;
          background-color: #e2e8f0;
        }
        .col-6 {
          grid-column: span 6;
          background-color: #e2e8f0;
        }
        .col-7 {
          grid-column: span 7;
          background-color: #e2e8f0;
        }
        .col-8 {
          grid-column: span 8;
          background-color: #e2e8f0;
        }
        .col-9 {
          grid-column: span 9;
          background-color: #e2e8f0;
        }
        .col-10 {
          grid-column: span 10;
          background-color: #e2e8f0;
        }
        .col-11 {
          grid-column: span 11;
          background-color: #e2e8f0;
        }
        .col-12 {
          grid-column: span 12;
          background-color: #e2e8f0;
        }
      `}</style>
    </div>
  )
}

export default Layout
