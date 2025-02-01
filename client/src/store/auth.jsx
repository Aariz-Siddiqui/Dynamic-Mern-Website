import {React,useEffect,useState} from "react";
import { createContext,useContext } from "react";
export const authContext = createContext();
export const AuthProvider = ({children}) =>{
    const [token,setToken] = useState(localStorage.getItem("token"));
    const [userData,setUserData] = useState();
    const [cardData, setCardData] = useState([]);
    const [isLoading,setLoading] = useState(true);
    const authBearerToken = `Bearer ${token}`;
    const setTokenInLs = (token)=>{
            setToken(token);
            localStorage.setItem("token",token)
     }
     const isLoggedIn = !!token;
    let LogoutUser = (token)=>{
        setToken(""); //removing the token from the state
        localStorage.removeItem("token"); //removing the token from the local storage
    }

    const authentication = async() =>{
        try{
            const response = await fetch("http://localhost:8000/api/auth/user",{ //calling user controller which is returning user data after validating the token stored 
            // in ls and then reriving the payload which contains user email and using findOne() method of mongooose to retrive data associated with that email.
                method:"GET",
                headers: {
                    Authorization: authBearerToken,
                },
            }
            )
            if(response.ok){
                let Data = await response.json();
                setUserData(Data);
                setLoading(false);
            }
        }catch(error){
            console.log("error from the authentication function at auth.jsx" + error)
        }


    }


//to fetch the card details on the services page
    
    const getServices = async ()=>{
        try{
            const response = await fetch("http://localhost:8000/data/service", {
                method:"GET"
            })
            if(response.ok){
                const data = await response.json();
                console.log(data);
                setCardData(data);
                
            }
        }catch(error){
            console.log("error from the card/auth.jsx" + error);
        }
 
    }

    useEffect(()=>{
        getServices();
        authentication();
    },[]);

    return(
    <authContext.Provider value={{cardData,userData,isLoggedIn,setTokenInLs,LogoutUser,authBearerToken,token,isLoading}}>
        {children}
    </authContext.Provider>
    )
}
export const useAuth = ()=>{
    return useContext(authContext);
}