import { useEffect,useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";


export default function BookingsPage(){
    const [bookings,setBookings]=useState([]);
    useEffect(()=>{
    axios.get("/bookings").then(response=>{
        setBookings(response.data);
    });
    },[]);
    return(
        <div>
           <AccountNav />
           <div>
            {bookings?.length>0 && bookings.map(booking=>(
                <Link to={`/account/bookings/${booking._id}`} className="flex gap-4 mt-4 bg-gray-200 rounded-2xl overflow-hidden booking-background">
                    <div className="w-48">
                        <PlaceImg place={booking.place} className={'object cover w-full h-full'} />
                    </div>
                    <div className="py-3 pr-3 grow">
                        <h2 className="text-xl">{booking.place.title}</h2>
                        
                        <div className="text-lg">
                           <BookingDates booking={booking} />
                        
                       
                       <div className="flex items-center gap-1 text-2xl">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 mt-1 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        Total price: ₹{booking.price}
                       </div>
                        
                        </div>

                    </div>
                </Link>

            ))}
           </div>
        </div>
    );
}