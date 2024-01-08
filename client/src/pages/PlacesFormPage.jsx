import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, resolvePath, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";



export default function PlacesFormPage(){
    const {id}= useParams();
    const [title,setTitle]=useState('');
    const [address,setAddress]=useState('');
    const [description,setDescription]=useState(''); 
    const [addedPhotos,setAddedPhotos]=useState([]);
    const [perks,setPerks]=useState([]);
    const [extraInfo,setExtraInfo]=useState('');
    const [checkIn,setCheckIn]=useState('');
    const [checkOut,setCheckOut]=useState('');
    const [maxGuests,setMaxGuests]=useState(1);
    const [price,setPrice]=useState(100);
    const [redirect,setRedirect]=useState(false);
   
    
    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get('/places/'+id).then(response=>{
            const {data}=response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
            
        })
    },[id]);
function inputHeader(text){
    return(
        <h2 className="text-2xl mt-4 ">{text}</h2>
    );
}
function inputDescription(text){
    return(
        <p className="text-gray-500 text-sm">{text}</p>
    );
}
function preInput(header, description){
    return(
        <>
            {inputHeader(header)}
            {inputDescription(description)}
        </>
    );
}
async function savePlace(ev){
    ev.preventDefault();
    const placeData={  title, address, addedPhotos, 
        description, perks, extraInfo, 
        checkIn, checkOut, maxGuests,price,
    };
    if(id){
        //update
        await axios.put('/places', {
        id, ...placeData
    });
    setRedirect(true);
    }
    else{
        //new place
        await axios.post('/places', placeData);
        setRedirect(true);
    }
    
}
if(redirect){
    return <Navigate to={'/account/places'}/>;
}
   
    return(
        <div>
                <AccountNav/>
                <form onSubmit={savePlace}>
                    {preInput('Title','title for your place, should be short or catchy as in advertisements')}
                    <input type="text" value={title} onChange={ev=>setTitle(ev.target.value)} placeholder="title, for example: My lovely apartment" />

                    {preInput('Address','address to this place')}
                    <input type="text" value={address} onChange={ev=>setAddress(ev.target.value)} placeholder="address" />

                    {preInput('Photos','more=better')}
                    <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>


                    {preInput('Description','description of the place')}
                    <textarea value={description} onChange={ev=>setDescription(ev.target.value)} className="mt-3"/>

                    {preInput('Perks','select all the perks of your place')}
                    <div className="grid mt-4 gap-2 grid-cols-2 md:grid-cols-3  lg:grid-cols-6">
                    <Perks selected={perks} onChange={setPerks} />
                    </div>

                    {preInput('Extra info','house rules, etc.')}
                    <textarea value={extraInfo} onChange={ev=>setExtraInfo(ev.target.value)} />

                    {preInput('Check in&out times, max guests','add check in and out times, remember to have some time window for cleaning the room between guests.')}
                    <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                        <div>
                            <h3 className="mt-2 -mb-1">Check in time </h3>
                            <input value={checkIn} 
                            onChange={ev=>setCheckIn(ev.target.value)} 
                            type="text" placeholder="10:00"/>
                        </div>
                        <div>
                            <h3 className="mt-2 -mb-1">Check out time</h3>
                            <input value={checkOut} 
                            onChange={ev=>setCheckOut(ev.target.value)} 
                            type="text" placeholder="10:00"/>
                        </div>
                        <div> 
                            <h3 className="mt-2 -mb-1">Max number of guests</h3>
                            <input value={maxGuests} 
                            onChange={ev=>setMaxGuests(ev.target.value)} 
                            type="number" />
                        </div>
                        <div> 
                            <h3 className="mt-2 -mb-1">Price per night</h3>
                            <input value={price} 
                            onChange={ev=>setPrice(ev.target.value)} 
                            type="number" />
                        </div>
                    </div>

                    <div>
                        <button className="primary my-4">Save</button>
                    </div>
                </form>
                </div>
    );
}