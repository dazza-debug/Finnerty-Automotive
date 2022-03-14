import {useNavigate, Link} from 'react-router-dom';
import {useState} from 'react';
import './login.css';

export default function Login() {

	const navigate = useNavigate();
	const [error, setError] = useState(null);

	const sumbitLogin = event => {
		event.preventDefault();
		fetch('http://localhost:3001/fa/login', {
			method: 'POST',
			headers: {"Content-Type":"application/json"},
			body: JSON.stringify({
				email: event.target.email.value,
				pass: event.target.password.value
			})
		}).then((res) => res.json())
		.then((data) => {
			if(data?.success === "true")
				window.sessionStorage.setItem(process.env.REACT_APP_TOKEN, data.token);
			else
				return Promise.reject(data);
		})
		.then(() => navigate('/'))
		.catch(err => setError(err));
		// console.log(event.target.email.value, event.target.password.value);
		console.log(error);
	}

	return(
		<div className="login-container">
			<form className="login-form" onSubmit={sumbitLogin} method="post">
				<h1>Login</h1>
				{/*<label htmlFor="email">Email</label>*/}
				<input type="email" id="email" autoComplete="true" name="email" required placeholder="Enter your email"/>
				{/*<label htmlFor="password">Password</label>*/}
				<input type="password" id="password" name="password" autoComplete="true" required placeholder="Enter your password"/>
				<button type="submit">Sign in</button>
				<Link to="/">↪ back home</Link>
			</form>
		</div>
	)
}