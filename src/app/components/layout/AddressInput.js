export default function AddressInputs({addressProps,setAddressProp,disabled=false}){
    
    const {phone,streetAddress,postalCode,city,country}= addressProps;
    
    return(
        <>
        <label >Phone Number</label>
        <input disabled={disabled} type="tel" placeholder="Phone Number"  value={phone || ''} onChange={ev=> setAddressProp('phone',ev.target.value)} />
        <label >Street Address</label>
        <input disabled={disabled} type="text" placeholder="Street Address" value={streetAddress || ''} onChange={ev=>setAddressProp('streetAddress',ev.target.value)}/>
        <div className="flex gap-2">
            <div>
            <label >Postal code</label>
            <input disabled={disabled} style={{'margin':'0'}} type="text" placeholder="Postal Code" value={postalCode || ''} onChange={ev=>setAddressProp('postalCode',ev.target.value)} />
            </div>
            <div>
            <label>City</label>
            <input disabled={disabled} style={{'margin':'0'}} type="text" placeholder="City" value={city || ''} onChange={ev=>setAddressProp('city',ev.target.value)}/>
            </div>
            
        </div>
        <label>Country</label>
        <input disabled={disabled} type="text" placeholder="Country" value={country || ''} onChange={ev=>setAddressProp('country',ev.target.value)}/>
        </>
    );
}