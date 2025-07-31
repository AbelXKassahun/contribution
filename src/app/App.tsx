// import { BrowserRouter, Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
// import React from 'react'
// import '../App.css'

import ContributionPageClientSide from '../Pages/Contribution_Client_Side/ContributionDeclaration';
import Description from "../Components/Description/Description";
import DFUE from '../Components/DeclarationForUnregisteredEmployees/DFUE';
import DFRE from '../Components/DeclarationForRegisteredEmployees/DFRE';
import UnregisteredEmployeeForm from "../Components/DeclarationForUnregisteredEmployees/UnregisteredEmployeeForm";
import UnregisteredEmployeeTable from "../Components/DeclarationForUnregisteredEmployees/UnregisteredEmployeeTable"
import Declaration_History from '../Components/Client_Side_Declaration_Management/Declaration_History';
import DeclarationDetails from '../Components/Declaration_Details/Details';
function App() {
  // const DeclarationForm = React.lazy(() => import('../Pages/DeclarationForm'));
  const detailsPaths = ["/contribution/unpaid_declarations/declaration_details", "contribution/declarations_history/declaration_details"]
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/contribution/description" />} />
      <Route path="/contribution" element={<ContributionPageClientSide />}>
        <Route index element={<Navigate to="description" />} />
        <Route path="description" element={<Description />} />
        <Route path="DFRE" element={<DFRE />} /> {/* Declaration For Registered Employees*/}

        <Route path="DFUE" element={<DFUE />} > {/* Declaration For Unregistered Employees*/}
          <Route index element={<Navigate to="table" />} />
          <Route path="table" element={<UnregisteredEmployeeTable />} />
          <Route path="form" element={<UnregisteredEmployeeForm />} />
        </Route>
        {/* below, there will be routes for declarations and paid history */}
        <Route path="unpaid_declarations" element={<Declaration_History DeclarationListType="incomplete" />} /> {/* */}
        <Route path="declarations_history" element={<Declaration_History DeclarationListType="complete" />} /> {/* */}
      </Route>

      {detailsPaths.map((p) => (
        <Route key={p} path={p} element={<DeclarationDetails />} />
      ))}
    </Routes>
  )
}

export default App
