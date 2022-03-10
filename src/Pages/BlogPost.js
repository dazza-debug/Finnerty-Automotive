import BlogNavigation from '../Componenets/BlogNavigation';
import {useParams} from 'react-router-dom';

export default function BlogPost() {
	let params = useParams();
	// let location = useLocation()
	// console.log(params);
	return (
		<div>
			<BlogNavigation blogPage={true}/>
			<h2>{`Test Blog_${params.id}`}</h2>
			<p>Hello this is a test/experimental test blog thingy that is being used to see how stuff will work and if they do blah blah blah etc etc etc</p>
			<p>Written By: Daz Daz</p>
			<h3>Comments</h3>
		</div>
	)
}