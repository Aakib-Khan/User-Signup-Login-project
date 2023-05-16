import { useNavigate } from "react-router-dom";


const Home = () => {
  const redirect = useNavigate();

 const logOut=()=>{
  localStorage.clear();
redirect("/")
 }
  return (
    <div  >
      
     <h1 className="font-bold text-5xl" >
      Home Page
      </h1> 

<button className="mt-[50px]  text-white font-mono text-2xl bg-red-500 px-5 py-2 rounded-lg " onClick={logOut} >LogOut</button>
    </div>
  )
}

export default Home