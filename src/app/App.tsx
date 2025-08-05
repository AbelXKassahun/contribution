// import { BrowserRouter, Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
// import React from 'react'
// import '../App.css'

import ContributionPage from '../Pages/Contribution-Declaration/Contribution_Declaration';
import Description from "../Pages/sub-pages/Description/Description";
import DFUE from '../Pages/sub-pages/Declaration-For-Unregistered-Employees/DFUE';
import DFRE from '../Pages/sub-pages/Declaration-For-Registered-Employees/DFRE';
import Declaration_History from '../Pages/sub-pages/Declaration-History/Declaration_History';
import DeclarationDetails from '../Pages/sub-pages/Declaration-Details/Details';
import Confirm_Declaration from '../Pages/sub-pages/Confirm-Declaration/Confirm_Declaration';
function App() {
  // const DeclarationForm = React.lazy(() => import('../Pages/DeclarationForm'));
  const detailsPaths = ["/contribution/unpaid_declarations/declaration_details", "/contribution/declarations_history/declaration_details"]
  // const detailsPaths = ["/contribution/unpaid_declarations/:id/declaration_details", "contribution/declarations_history/:id/declaration_details"]
  const DFUE_paths = ["/contribution/DFUE/table", "/contribution/DFUE/form"]

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/contribution/description" />} />
      <Route path="/contribution" element={<ContributionPage />}>
        <Route index element={<Navigate to="description" />} />

        <Route path="description" element={<Description />} />

        {/* Declaration For Registered Employees*/}
        <Route path="DFRE" element={<DFRE />} />

        {/* Declaration For Unregistered Employees*/}
        {DFUE_paths.map((p) => (
          <Route key={p} path={p} element={<DFUE />} />
        ))}

        <Route path="confirm_declaration" element={<Confirm_Declaration />} />

        <Route path="unpaid_declarations" element={<Declaration_History DeclarationListType="incomplete" />} />

        <Route path="declarations_history" element={<Declaration_History DeclarationListType="complete" />} />
      </Route>

      {detailsPaths.map((p) => (
        <Route key={p} path={p} element={<DeclarationDetails />} />
      ))}

    </Routes>
  )
}

export default App
