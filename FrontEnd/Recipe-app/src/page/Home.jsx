import React from 'react'
import image_home from '../assets/image_home.png'
import "../App.css";
import AllRecipe from '../components/AllRecipe';
import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate = useNavigate()
  return (
    <>
    <section className='home'>
    <div className='left'>
        <h1>Share your Favorite Recipe    </h1>
        <p>
            lorem
        </p>
        <button onClick={()=>navigate("/addrecipe")}>Share Your Recipe</button>
    </div>
     <div className='reght'>
        <img src={image_home}  width="350px" height="350px"/>
        
    </div>
    </section>

    <div className='bg'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ff9560" fill-opacity="0.99" d="M0,224L21.8,229.3C43.6,235,87,245,131,213.3C174.5,181,218,107,262,74.7C305.5,43,349,53,393,90.7C436.4,128,480,192,524,202.7C567.3,213,611,171,655,144C698.2,117,742,107,785,128C829.1,149,873,203,916,224C960,245,1004,235,1047,202.7C1090.9,171,1135,117,1178,112C1221.8,107,1265,149,1309,138.7C1352.7,128,1396,64,1418,32L1440,0L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"></path></svg>
    </div>

    <AllRecipe />
    </>
  )
}

export default Home