import {useNavigate, Link} from 'react-router-dom';
import {useState} from 'react';
import Banner from '../Componenets/Banner';
import './login.css';

export default function Register() {

	const navigate = useNavigate();
	const [getError, setError] = useState(null);

	const sumbitLogin = event => {
		event.preventDefault();
		fetch(process.env.REACT_APP_URL+'/fa/register', {
			method: 'POST',
			headers: {"Content-Type":"application/json"},
			body: JSON.stringify({
				email: event.target.email.value,
				name: event.target.name.value,
				pass: event.target.password.value
			})
		}).then(raw => raw.json())
		.then(() => navigate('/login'))
		.catch(err => setError(err));
		// console.log(event.target.email.value, event.target.password.value);
		// console.log(error);
	}

	return(
		<div className="login-container">
			
			<form className="login-form" onSubmit={sumbitLogin} method="post">
				{
					getError&&<Banner error={getError} setError={() => setError(null)}/>
				}
				<h1>Register</h1>
				{/*<label htmlFor="email">Email</label>*/}
				<input type="email" id="email" autoComplete="true" name="email" required placeholder="Enter your email"/>
				<input type="name" id="name" autoComplete="true" name="name" required placeholder="Enter your name"/>
				{/*<label htmlFor="password">Password</label>*/}
				<input type="password" id="password" name="password" autoComplete="true" required placeholder="Enter your password"/>
				<button type="submit">Register</button>
				<Link to="/">↪ back home</Link>
			</form>
		</div>
	)
}