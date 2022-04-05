import {useState, useEffect} from 'react';
import {useNavigate, useOutletContext} from 'react-router-dom';
import Banner from './Banner';
import './modal.css';

import {EditorState, convertFromHTML, ContentState, RichUtils} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import {convertToHTML} from 'draft-convert';
import BlogNavigation from '../Componenets/BlogNavigation';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const setInitial = (exists=null, checkBlog=false) => {
	if (!exists && !window.sessionStorage.getItem(process.env.REACT_APP_TEMP_BLOG))
		return null

	if (checkBlog && JSON.parse(window.sessionStorage.getItem(process.env.REACT_APP_TEMP_BLOG))?.blog)
		return true

	return !exists?JSON.parse(window.sessionStorage.getItem(process.env.REACT_APP_TEMP_BLOG)):
		({title: exists?.title, blog: exists?.blog, id: exists?.param.id})
}

export default function BlogEditor({getUser, setMessage}) {
	//get the existing blog if there is one
	const existingBlog = useOutletContext();

	//Initialize the state
	const [getPreview, setPreview] = useState()
	const [getBehaviour, setBehaviour] = useState({scroll: true, fullscr: false})
	const [getEditorState, setEditorState] = useState(() => EditorState.createEmpty(), )
	//Set Error states and Success States
	const [getError, setError] = useState(null);
	
	const initialEditorState = (exists) => {
		return setInitial(exists, true)?
			EditorState.createWithContent(
				ContentState.createFromBlockArray(
					convertFromHTML(setInitial(existingBlog).blog))):
			EditorState.createEmpty();
	}

	//set state to a saved state or null or if there is an exisiting blog
	useEffect(() => {
		setPreview(setInitial(existingBlog));
		setEditorState(initialEditorState(existingBlog));
	}, [existingBlog])


	// const buttonType = type => {
	// 	setEditorState(RichUtils.toggleInlineStyle(getEditorState, type));
	// 	// setEditorState(editorState);
	// }

	// const handleKey = command => {
	// 	const newState = RichUtils.handleKeyCommand(getEditorState, command);
	// 	if(newState) {
	// 		setEditorState(newState);
	// 		return "handled";
	// 	}
	// 	return "not-handled";
	// }

	const navigate = useNavigate()

	const cancelForm = () => {
		return getPreview?.id?navigate(`/blog/${getPreview.id}`):navigate(-1);
	}

	const sumbitForm = (event, id) => {
		event.preventDefault();
		fetch(process.env.REACT_APP_URL + '/fa/blog',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': window.sessionStorage.getItem(process.env.REACT_APP_TOKEN)},
			body: JSON.stringify({
				title: event.target.title.value,
				blog: convertToHTML(getEditorState.getCurrentContent()),
				author: getUser?.name,
				posted: new Date().toDateString(),
				id: id
			})
		}).then(raw => raw.status===401?Promise.reject('Unauthorized'):raw.json())
		.then(resp => {
			if(resp?.id){
				window.sessionStorage.removeItem(process.env.REACT_APP_TEMP_BLOG);
				setMessage(`Successfully ${id?'Edited':'Created'} Blog`)
				navigate(`/blog/${resp.id}`);
			}
			else 
				Promise.reject(resp);})
		.catch(err => {setError(err); console.log(err)});
	}
	// if(getEditorState)
	// 	console.log(convertToRaw(getEditorState))

	return (
		<div className="be-parent">{
				getError&&<Banner 
				error={getError} setError={() => setError(null)} />
			}
			<div className="be-container">
				<h1>Blog Editor</h1>
				<form 
				onReset={cancelForm} 
				onSubmit={(event) => sumbitForm(event, getPreview?.id)} 
				className="be-form">

					<label htmlFor="title">Blog Title</label>
					<input 
					onChange={(event) => setPreview({...getPreview, title: event.target.value})}
					id="title" name="title" type="text" defaultValue={getPreview?.title} required/>

					<label>Blog</label>
					<Editor 
					editorState={getEditorState}
					onEditorStateChange={setEditorState}
					wrapperClassName="wrapper-class"
					editorClassName="editor-class"
					toolbarClassName="toolbar-class"
					toolbar={toolbarOptions}/>

					<div className="be-form-buttons">
						<button type="submit">Post Blog</button>
						<button type="button" className={`${getPreview?.id&&'hide'}`}
						onClick={() => saveForm(getPreview.title, convertToHTML(getEditorState.getCurrentContent()))}>
						Save Blog</button>
						<button type="reset">Cancel</button>
					</div>
				</form>
				<h1>Preview:</h1>
				<div 
					className={`be-preview 
						${getBehaviour.scroll&&!getBehaviour.fullscr?'be-preview-scroll':''} 
						${getBehaviour.fullscr&&'be-preview-full'}`}>
					<div className="be-preview-buttons">
						<button 
						onClick={() => setBehaviour({...getBehaviour, scroll: !getBehaviour.scroll})}>
						{getBehaviour?.scroll?'Disable Scroll':'Enable Scroll'}
						</button>
						<button 
						onClick={() => setBehaviour({...getBehaviour, fullscr: !getBehaviour.fullscr})}>
						{getBehaviour?.fullscr?'Exit Full Screen':'Enter Full Screen'}
						</button>
					</div>
					{
						getBehaviour.fullscr&&<BlogNavigation blogPage={true} fake={true} />
					}
					<div className={`${getBehaviour.fullscr?'bp-component':'bp-component-preview'} `}>
						<div className="bp-blog-section">
							<h2>{getPreview?.title}</h2>
							<div className="bp-blog-info">
								<div dangerouslySetInnerHTML={{__html: convertToHTML(getEditorState.getCurrentContent())}}/>
								<p>{`Written By: ${getUser?.name||'--'}`}</p>
							</div>
							<div className="bp-blog-date">
								<p>Mon Mar 28 2022</p>
							</div>
						</div>
					</div>{/*
					<h2>{getPreview?.title}</h2>
					<div dangerouslySetInnerHTML={{__html: convertToHTML(getEditorState.getCurrentContent())}}/>*/}
				</div>
			</div>
		</div>
	);
}



const saveForm = (title, blog) => {
	if (window.sessionStorage.getItem(process.env.REACT_APP_TEMP_BLOG))
		return window.confirm('Are you sure you want to save and overide previous save?')?
			window.sessionStorage.setItem(process.env.REACT_APP_TEMP_BLOG, JSON.stringify({title: title, blog:blog})):
			null;
	else
		return window.sessionStorage.setItem(process.env.REACT_APP_TEMP_BLOG, JSON.stringify({title:title, blog:blog}));
}


//MOVE ME TO MY OWN FILE PLZ
const toolbarOptions = {
  options: ['inline', 'blockType', 'list', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
  inline: {
  	options: ['bold', 'italic', 'underline', 'strikethrough']
  },
  blockType: {
  	options: ['Normal', 'H3', 'H4', 'H5']
  },
  link: {
  	inDropdown: true
  },
  emoji: {
  	emojis:[
  	'😀', '😄', '😂', '🙂', '🙁', '😢', '🤔', '🤭', '😷', '🤕', '🤒', '🤝',
  	'👏', '👍', '👎', '👊', '🤞', '👈', '👉', '👆', '👇', '👋', '🚗', '🚛',
  	'🚚', '🚘', '🎆', '🛒', '☑️', '✅', '❌', '❎'
  	]
  }

}


