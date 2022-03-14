import {useNavigate} from 'react-router-dom';
import './modal.css';

export default function BlogEditor() {

	const navigate = useNavigate()

	const cancelForm = () => {
		navigate('/blog');
	}

	const sumbitForm = (event) => {
		event.preventDefault();
		fetch('http://localhost:3001/fa/blog',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': window.sessionStorage.getItem(process.env.REACT_APP_TOKEN)},
			body: JSON.stringify({
				title: event.target.title.value,
				blog: event.target.blogContent.value,
				author: 'test',
				posted: new Date(),
				id: ''
			})
		}).then(raw => raw.json())
		.then(resp => resp?.id?navigate(`/blog/${resp.id}`):console.error(resp))
		.catch(err => console.error(err));
	}

	return (
		<div className="be-parent">
			<div className="be-container">
				<h1>Blog Editor</h1>
				<form onReset={cancelForm} onSubmit={sumbitForm} className="be-form">
					<label htmlFor="title">Blog Title</label>
					<input id="title" name="title" type="text"/>
					<label htmlFor="blogContent">Blog</label>
					<textarea id="blogContent" name="blogContent"/>
					<div>
						<button type="submit">Post Blog</button>
						<button type="reset">Cancel</button>
					</div>
				</form>
			</div>
		</div>
	);
}