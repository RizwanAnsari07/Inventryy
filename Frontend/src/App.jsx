import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Toaster } from 'sonner'
import ActiveAdminLayout from "./Components/ActiveAdminLayout"
import AddProductLayout from "./Components/AddProductLayout"
import LatestProductLayout from "./Components/LatestProductLayout"
import LessStockLayout from "./Components/LessStockLayout"
import LoginPageLayout from "./Components/LoginPageLayout"
import ProductPageLayout from "./Components/ProductPageLayout"
import SalesPageLayout from "./Components/SalesPageLayout"
import SignupPageLayout from "./Components/SignupPageLayout"
import AdminRoute from "./ProtectedRoutes/AdminRoute"
import UserRoute from "./ProtectedRoutes/UserRoute"

const App = () => {
  return (
    <BrowserRouter>
      {/* <Sidebar/> */}<Toaster position="top-center" richColors/>
      <Routes>

        <Route path="/loginpage" element={ <ProductPageLayout/> }/>
        <Route path="/latest-products" element={ <UserRoute> <LatestProductLayout/> </UserRoute> }/>

        <Route path="/login" element={ <LoginPageLayout/> }/>
        <Route path="/add-admin" element={<AdminRoute> <SignupPageLayout/> </AdminRoute>}/>

        <Route path="/add-product" element={ <AdminRoute> <AddProductLayout/> </AdminRoute> }/>
        <Route path="/active-admin" element={ <AdminRoute> <ActiveAdminLayout/> </AdminRoute> }/>
        <Route path="/less-stock" element={ <AdminRoute> <LessStockLayout/> </AdminRoute> }/>
        <Route path="/sales" element={ <AdminRoute> <SalesPageLayout/> </AdminRoute> }/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
