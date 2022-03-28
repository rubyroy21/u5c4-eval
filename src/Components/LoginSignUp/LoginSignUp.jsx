import axios from 'axios';
import {useState} from 'react';
import {v4 as uuid} from 'uuid'

export const LoginSignUp = () => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [interest, setInterest] = useState([]);
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");

  const [techno, setTechno] = useState(false);
  const [drama, setDrama] = useState(false);
  const [food, setFood] = useState(false);
  const [movies, setMovie] = useState(false);
  const [culture, setCulture] = useState(false);
  const [art, setArt] = useState(false);

  const [username, setUserName] = useState("");
  const [userpass, setUserPass] = useState("");
  const [login, setLogin] = useState(false);
  
  console.log(interest)
  return ( 
    <div className="loginSignUp">
      <form className="signUp" onSubmit={(e) => {
        if(techno){
          setInterest([...interest,"technology"])
        }
        if(movies){
          setInterest([...interest,"movies"])
        }
        if(food){
          setInterest([...interest,"food"])
        }
        if(culture){
          setInterest([...interest,"culture"])
        }
        if(art){
          setInterest([...interest,"art"])
        }
        if(drama){
          setInterest([...interest,"drama"])
        }
        const data = {
          id: uuid(),
          name: name,
          password: pass,
          location : location,
          interest: interest,
          image: image,
          subscribed: []
        }
        axios.post("http://localhost:8080/users", data).then(({data})=> {
          console.log(data)
        })

       }}>
        <h1>SignUp</h1>
        <label>name</label>
        <input
          type="text"
          className="name"
          onChange={(event) => { 
            setName(event.target.value)
          }}
          required
        />
        <br />
        <label>password</label>
        <input
          type="text"
          className="password"
          onChange={(event) => {
            setPass(event.target.value)
           }}
          required
        />
        <br />
        <select value={location} className="location" onChange={(event) => {
          setLocation(event.target.value)
         }}>
          <option value=""></option>
          <option value="bangalore">Bangalore</option>
          <option value="kolkata">Kolkata</option>
          <option value="delhi">Delhi</option>
          <option value="mumbai">Mumbai</option>
        </select>
        <label>Interests</label>
        <br />
        <label>technology</label>
        <input
          type="checkbox"
          className="technology"
          onChange={(event) => {
           event.target.checked ? setTechno(false) : setTechno(true)
           }}
        />
        <br />
        <label>food</label>
        <input type="checkbox" className="food" onChange={(event) => {
          event.target.checked ? setFood(true) : setFood(false)
         }} />
        <br />
        <label>movies</label>
        <input type="checkbox" className="movies" onChange={(event) => {
          event.target.checked ? setMovie(true) : setMovie(false)
         }} />
        <br />
        <label>culture</label>
        <input type="checkbox" className="culture" onChange={(event) => {
          event.target.checked ? setCulture(true) : setCulture(false)
         }} />
        <br />
        <label>art</label>
        <input type="checkbox" className="art" onChange={(event) => { 
          event.target.checked ? setArt(true) : setArt(false)
        }} />
        <br />
        <label>drama</label>
        <input type="checkbox" className="drama" onChange={(event) => { 
          event.target.checked ? setDrama(true) : setDrama(false)
        }} />
        <br />
        <label>image</label>
        <input
          type="text"
          className="image"
          onChange={(event) => { 
            setImage(event.target.value)
          }}
          required
        />
        <br />
        <input type="submit" className="submitSignUpForm" />
      </form>
      <form className="login" onSubmit={(e) => {
        const users = axios.get("http://localhost:8080/users").then(({data}) => {
          return data;
        })
        // for(var i = 0; i <= users.length; i++){
          
        // }
        users.filter(user => {
          if(username === user.name && userpass === user.password){
            setLogin(true)
            localStorage.setItem("userLoginDetails",JSON.stringify({userLoginDetails:user,state:true}))
          }
        })
       }}>
        <h1>Login</h1>
        <label>name</label>
        <input
          type="text"
          className="name"
          onChange={(event) => {
            setUserName(event.target.value);
           }}
          required
        />
        <br />
        <label>password</label>
        <input
          type="text"
          className="password"
          onChange={(event) => {
            setPass(event.target.value);
           }}
          required
        />
        <br />
        <input type="submit" className="submitLoginForm" />
      </form>
    </div>
  );
};
