import React, { useState, useEffect, useRef,useContext } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com';
import { ProjectSettings } from '../ProjectSettingsContext';
import { useNavigate } from "react-router-dom";

export default function SchedulePickup() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [mail, setMail] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState(null);
  const [useMyLocation, setUseMyLocation] = useState(false);
  const [message,setMessage] = useState('');
  const [pickupDate,setPickupDate] = useState('');

  const revGpsAdrr = useRef('');
  const settings = useContext(ProjectSettings);
  const navigate = useNavigate();

  useEffect(() => {
    if (useMyLocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation(`${latitude}, ${longitude}`);
      });
    } else {
      setLocation('');
    }
  }, [useMyLocation]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(name.length < 3 || phone.length < 10 || mail.length <3 || address.length < 5 || pickupDate.length < 5) {
      alert('Please provide correct details')
      return;
    }
    if(location){
      // const revGpsUrl = `https://nominatim.openstreetmap.org/reverse?lat=${location.split(',')[0]}&lon=${location.split(',')[1]}`
      const revGpsUrl = `https://nominatim.openstreetmap.org/reverse.php?lat=${location.split(',')[0]}&lon=${location.split(',')[1]}&format=jsonv2`
      try {
         const response = await axios.get(revGpsUrl);
         revGpsAdrr.current=response.data.address;
         console.log('your gps address '+JSON.stringify(response));
       } catch (error) {
         console.error(error);
       }
     }

    const pickUpOrder = {
      "name": name,
      "phone":phone,
      "mail":mail,
      "address": address,
      "location":location,
      "message":message,
      "gpsAddress": JSON.stringify(revGpsAdrr.current),
      "pickupDate": pickupDate,
      "status": "pickup scheduled"
    }
    console.log(pickUpOrder);
    
    try {
      const response = await axios.post(`http://${settings.env==="dev"?settings.ipAddr:'localhost'}:3000/pickupSchedules`,
        pickUpOrder );
      alert('Thank you for your help. We\' get in touch with you!');
      if(mail!=='') sendEmail();
      console.log(pickUpOrder.toString());
      console.log(response);
      navigate('/thankyou')
    } catch (error) {
      console.error(error);
      alert('Some issue while adding your details, please contact our support team!');
    }
  };


  function sendEmail() {
    // e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it
    //emailjs.send("service_likzpne","template_6dgdseg");
    emailjs.send("service_likzpne","template_6dgdseg",{
      from_name: "Freepathshala",
      to_name: name,
      reply_to: "roshan@freepathshala.org",
      to_mail: mail,
      },"80UO7pt7FGqErN1sh").then((result) => {
        console.log(result);  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
    }, (error) => {
        console.log(error.text);
    });;

  }
  
  return (
    <div className="login-form" style={{backgroundColor: "white"}}>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-3">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
          />
        </div>
        <div className="form-group mt-3">
          <label>Phone:</label>
          <input
            type="phone"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
          />
        </div>
        <div className="form-group mt-3">
          <label>Email Address :</label>
          <input
            type="mail"
            className="form-control"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            name="mail"
          />
        </div>
        <div className="form-group mt-3">
          <label>Address:</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={useMyLocation}
            name="address"
          />
        </div>
        <div className="form-check mt-3">
          <input
            type="checkbox"
            className="form-check-input"
            checked={useMyLocation}
            onChange={(e) => setUseMyLocation(e.target.checked)}
            name="myLocation"
          />
          <label className="form-check-label">Use My Location</label>
        </div>
        {useMyLocation && (
          <div>
            <p>Location: {location}</p>
          </div>
        )}

        <div className="form-group mt-3">
          <label>Message :</label>
            <input
            type="text"
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            name='message'
          />
        </div>

        <div className="form-group mt-3">
          <label>Pickup Date :</label>
            <input
            type="datetime-local"
            className="form-control"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            name='pickupDate'
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Sechule Pickup
        </button>
      </form>
    </div>
  );
}