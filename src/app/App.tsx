// import { BrowserRouter, Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';
// import React from 'react'
// import '../App.css'
import DeclarationForm from '../Pages/Contribution_Declaration/ContributionDeclaration';
import Header_Section from '../Components/Invoice/Header_Section';
import Invoice from '../Components/Invoice/Invoice';
function App() {
  // const DeclarationForm = React.lazy(() => import('../Pages/DeclarationForm'));

  return (
    <>
      {/* <DeclarationForm /> */}
      {/* <Header_Section /> */}
      <Invoice />
    
    </>
  )
}

export default App
