import { Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react"
import axios from "axios";

export const Home = () => {
  const navigation = useNavigate()
  const loginState = JSON.parse(localStorage.getItem("userLoginDetails")) || {state:false};
  const [option , setOption] = useState("");
  const [events, setEvents] = useState([]);
  useEffect(() => {
    getEvents()
  }, [])
  function getEvents(){
    axios.get("http://localhost:8080/meetups").then(({data})=>{
      setEvents(data)
    })
  }
  console.log(events);
  return (
    <div className="homeContainer">
      {events
        .filter((el) => {
          if(el.location === option){
            return el;
          }
         }) // Filter on the basis of Users interests and location (both true)
        .map((el) => {
          return (
            <Link to={`add route here`} className="events">
              
              {/* add your children here (divs)
              ex : title, theme, description, date, time, location, image(optional)
              the classNames should be also : title, theme, description, date, time, location, image(optional)
             */}
            </Link>
          );
        })}

      <div className="subscribedData">
        <div>
          <select
            value={option}  // add value here
            onChange={(e) => {
              setOption(e.target.value)
             }}
          >
            <option value="">------</option>
            <option value="bangalore">Bangalore</option>
            <option value="kolkata">Kolkata</option>
            <option value="delhi">Delhi</option>
            <option value="mumbai">Mumbai</option>
          </select>
        </div>
        <Link to={"/addmeetup"}> Add Meetup</Link>
        <h1>Subscribed Events</h1>
        <div className="subscribedEvents">
          {/* All user subcribed events should be displayed here in an ascending order of date */}

          {events
            .map((el) => {
              return (
                <Link to={`/meetup/${el.id}`} className="events">
                <div>
                {el.title}
                </div>
                
                <div>
                {el.location}
                </div>
                <br/>
                  {/* Each event should have these elements/children (divs):
                    ex : title, theme, description, date, time, location, image(optional)
                    the classNames should be also : title, theme, description, date, time, location, image(optional) */}
                </Link>
              );
            })}

        </div>
      </div>
    </div>
  );
};
