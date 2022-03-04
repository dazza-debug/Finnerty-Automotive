import {Link} from 'react-router-dom';
import './login.css';

export default function Login() {
	const sumbitLogin = event => {
		event.preventDefault();
		console.log(event.target.email.value, event.target.password.value);
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