import {useState} from 'react';

const booked = {
  "booked": "true",
  "until": "2022-03-19T10:10:30Z" 
}

export default function Banner() {

	const [banner, setBanner] = useState(true);

	return (
		<div className={`banner ${banner||'hide'}`}>
			<p>We are currently booked up until ...</p>
			<div className="banner-close" onClick={() => setBanner(false)}>x</div>
		</div>
	);
}