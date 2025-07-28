// import { BrowserRouter, Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';
// import React from 'react'
// import '../App.css'
import DeclarationForm from '../Pages/Contribution_Declaration/ContributionDeclaration';
import Header_Section from '../Components/Invoice/Header_Section';
import Invoice from '../Components/Invoice/Invoice';
import Declaration_History from '../Components/Client Side Declaration Management/Declaration_History';
import Organizations from '../Components/Organization List Backoffice/Organizations';
function App() {
  // const DeclarationForm = React.lazy(() => import('../Pages/DeclarationForm'));

  return (
    <>
      {/* <DeclarationForm /> */}
      {/* <Header_Section /> */}
      {/* <Invoice /> */}
      {/* <Declaration_History/> */}
      <Organizations/>
    
    </>
  )
}

export default App
