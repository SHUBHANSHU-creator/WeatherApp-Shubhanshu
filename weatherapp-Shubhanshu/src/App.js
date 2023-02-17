import React, {useState,useEffect} from "react"
import axios from 'axios'


function App() {
  const [data,setData] = useState({})
  const [location,setLocation] = useState("")
  const [temp,setTemp] = useState("C")
  const [once,setOnce] = useState(0)
  const [lat,setLat] = useState("New delhi")
  const [long,setLong] = useState("")
  
  
  const getLocation= ()=>{
    const successCallback = (position) => {
      setLat(position.coords.latitude)
      setLong(position.coords.latitude)
      searchLocation1()
    };

    
    
    const errorCallback = (error) => {
      console.log(error);
    };
    
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=7c6f383d57214b19bbc124620231602&q=${location}`
  

  const searchLocation = (e)=>{
    if(e.key === "Enter" || e=="Enter"){
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data);
        setTemp(localStorage.getItem("scale"))
        console.log(response.data);
        setLocation(" ")
      })
    }
  }

  const searchLocation1 = ()=>{
    const url1= `https://api.weatherapi.com/v1/current.json?key=7c6f383d57214b19bbc124620231602&q=${23.0791653},${23.0791653}`
    if(lat && long){
      axios.get(url1).then((response) => {
        setData(response.data)
        setTemp(localStorage.getItem("scale"))
        console.log(response.data);
        setLocation(" ")
      })
    }
  }

  



  const Temp =(scale)=>{
    localStorage.setItem("scale",scale)
    setTemp(scale)
  
  }

//   useEffect(()=>{
//     let geo = getLocation()
// }, []) 
  

  return (
    <div className="app">
      <div className="left">
        <div className="box">
          <div className="search">
            <input
              value={location}
              onChange={e=>setLocation(e.target.value)} 
              onKeyDown={searchLocation}
              placeholder="Search">
            </input>
          </div>

          <div className="inner-box">
            <div className="location">
                  {/* <p>hello</p> */}
                  {data.location ? (<p>{data.location.name}</p>):(<p>Location</p>)}
            </div>

            <div className="temp">
              {data.current ? (temp=="C"?<p>{data.current.temp_c}°</p>:<p>{data.current.temp_f}°</p>):(<p>Temp</p>)}
              <div className="temp_switch">
                <button onClick={() => {Temp("C")}}
                        style={{opacity:temp =="C"? "100%":"50%"}}>C</button>
                <button onClick={() => {Temp("F")}}
                        style={{opacity:temp =="F"? "100%":"50%"}}>F</button>
              </div>
            </div>
            <button className="btn" onClick={()=>getLocation()}>Your Location</button>
          </div> 
        </div>

        
        

      </div>

      <div className="right">
        <div className="windspeed">
            <p>Wind Speed:</p>
            {data.current ? (<p>{data.current.wind_mph}MPH</p>):(<p></p>)}
          </div>

          <div className="Humidity">
            <p>Humidity:</p>
            {data.current ? (<p>{data.current.humidity}%</p>):(<p></p>)}
          </div>

          <div className="precipitation">
              <p>precipitation:</p>
              {data.current ? (<p>{data.current.precip_mm}mm</p>):(<p></p>)}
        </div>
        
      </div>
    </div>
  );
}

export default App;
