import {useNavigate, Link} from 'react-router-dom';
import {useState} from 'react';
import {userTemplate} from '../App';
import Banner from '../Componenets/Banner'
import './login.css';

export default function Login({setUser, setMessage}) {

	const navigate = useNavigate();

	const [getError, setError] = useState(null);

	const sumbitLogin = event => {
		event.preventDefault();
		fetch(process.env.REACT_APP_URL + '/fa/login', {
			method: 'POST',
			headers: {"Content-Type":"application/json"},
			body: JSON.stringify({
				email: event.target.email.value,
				pass: event.target.password.value
			})
		}).then((res) => res.json())
		.then((data) => {
			if(data?.success === "true"){
				window.sessionStorage.setItem(process.env.REACT_APP_TOKEN, data.token);
				setUser(userTemplate(data.user.name, true, data.user.level));
				setMessage('Successfully logged in!')
			}
			else
				return Promise.reject(data);
		})
		.then(() => navigate('/'))
		.catch(err => setError(err));
		// console.log(event.target.email.value, event.target.password.value);
		// console.log(err);
	}

	return(
		<div className="login-container">
			
			<form className="login-form" onSubmit={sumbitLogin} method="post">
				{
				getError&&<Banner error={getError} setError={() => setError(null)}/>
				}
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