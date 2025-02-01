import React from "react";
import {BrowserRouter, Routes , Route} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Service from "./pages/Service";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Error from "./pages/Error";
import Navbar from "./Components/Navbar";
import AdminUsers from "./pages/AdminUsers";
import AdminContacts from "./pages/AdminContacts";
import AdminServices from "./pages/AdminServices";
import AdminLayouts from "./layouts/AdminLayouts";
import UpdateUser from "./pages/UpdateUser";
import { Footer } from "./Components/Footer/Footer";
const App = () =>{
 return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
        <Route path = "/" element={<Home/>}/>
        <Route path = "/about" element={<About/>}/>
        <Route path = "/contact" element={<Contact/>}/>
        <Route path = "/service" element={<Service/>}/>
        <Route path = "/register" element = {<Register/>}/>
        <Route path = "/login" element={<Login/>}/>
        <Route path = "/logout" element = {<Logout/>}/>
        <Route path ="*" element={<Error/>}/>
        <Route path="/admin" element={<AdminLayouts/>}>
        <Route path="users" element={<AdminUsers/>}/>
        <Route path="contacts" element={<AdminContacts/>}/>
        <Route path="services" element={<AdminServices/>}/>
        <Route path="users/:id/edit" element={<UpdateUser/>}/> /* :id = currdata.id, which we pass in the url link of edit button and then we fetch that data by using useParams() hoooks*/
        </Route>
    </Routes>
    <Footer/>
    </BrowserRouter>
 )
}

export default App;
