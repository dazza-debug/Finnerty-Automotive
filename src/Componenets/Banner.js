import {useState, useEffect, useContext} from 'react';
import {useMisc} from '../App';

export default function Banner({error=null, setError=null, message=null, setMessage=null}) {
	// console.log(error);
	const [banner, setBanner] = useState(false);

	const {getBooked} = useContext(useMisc);

	useEffect(() => {
		if(!error && !message) 
			setBanner(getBooked?.booked);
		// else
			// setBanner(true);
	}, [getBooked, error, message])

	return !error&&!message?(
		<div className={`banner ${banner?'warn':'hide'}`}>
			<p>{`We are currently booked up until ${getBooked?.until}`}</p>
			<div className="banner-close" onClick={() => setBanner(false)}>x</div>
		</div>
	):!message?(
		<div className={`banner err`}>
			<p>{`${error}!`}</p>
			<div className="banner-close" onClick={setError}>x</div>
		</div>
	):(
		<div className={`banner log`}>
			<p>{`${message}!`}</p>
			<div className="banner-close" onClick={setMessage}>x</div>
		</div>
	);
}
