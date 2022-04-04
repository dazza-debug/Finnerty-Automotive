import {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import Banner from '../Componenets/Banner';
import {useMisc} from '../App';
// import {times, booked} from '../Pages/Home';
import './homeEditor.css';

export default function HomeEditor() {

	const {getTimes, getBooked} = useContext(useMisc);
	const [getDropdown, setDropdown] = useState(stateTemplate());

	const [getMessage, setMessage] = useState({message: null, error: null});

	const navigation = useNavigate();

	//if the id is the same then open/close that state(div) otherwise open the state(div) with the new id
	const changeDrop = (id) => {
		setDropdown(getDropdown.dropdown===id?{...getDropdown, state:!getDropdown.state}:
			stateTemplate(id, true));
	}

	console.log(getBooked?.until_raw)
	//This mean if the id matched the div's id and the state is true then make the div visible
	//otherwise if the id matched the div's id and the state is false then make the div hidden
	//or if the id does not match this div's id then just hide this div!
	// getDropdown.dropdown===1?getDropdown.state?null:'hide':'hide'
	const getDropState = (id) => getDropdown.dropdown===id?getDropdown.state?true:false:false;

	const closeEditor = () => {
		// const option = window.confirm('Any unpublished data will be lost! Are you sure you want to continue?')
		if(window.confirm('Any unpublished data will be lost! Are you sure you want to continue?'))
			navigation('/');
	}

	const setNewMessage = (msg, err=false) => 
		err?setMessage({...getMessage, error:msg})
		:setMessage({...getMessage, message: msg});

	//this can be split into numerous components! for no duplications
	return (
		<div className="he-parent">
			<div className="he-container">
				{
					(getMessage.error||getMessage.message)&&<Banner 
					error={getMessage.error} 
					setError={() => setMessage({...getMessage, error:null})}
					message={getMessage.message}
					setMessage={() => setMessage({...getMessage, message:null})}/>
				}
				<div className="he-button" onClick={closeEditor}>Close Editor</div>
				<div className={`he-dropdown-${getDropState(1)?'open':'close'}`}>
					<h2 onClick={() => changeDrop(1)}>{`${getDropState(1)?'▲':'▼'} Business Hours`}</h2>
					<form  
					className={`${getDropState(1)?null:'hide'} he-form`} 
					method="post" onSubmit={(event) => sumbitHours(event, setNewMessage, setNewMessage)}>
						<div className="he-form-component">
							<label>Monday</label>
							<div className="he-form-content">
								<input 
								type="time" id="monStart" 
								name="mon" defaultValue={getTimes?.mon?closedHours(getTimes.mon):null}/>
								-
								<input 
								type="time" id="monEnd" 
								name="mon" defaultValue={getTimes?.mon?closedHours(getTimes.mon, false):null}/>

								<label>Closed?</label>
								<input 
								type="checkbox" id="monCheck" 
								name="mon" defaultChecked={getTimes?.mon?closedHours(getTimes.mon, true, true):null}/>
							</div>
						</div>
						<div className="he-form-component">
							<label>Tuesday</label>
								<div className="he-form-content">
								<input 
								type="time" id="tueStart" 
								name="tue" defaultValue={getTimes?.mon?closedHours(getTimes.tue):null}/>
								-
								<input 
								type="time" id="tueEnd" 
								name="tue" defaultValue={getTimes?.mon?closedHours(getTimes.tue, false):null}/>

								<label>Closed?</label>
								<input 
								type="checkbox" id="tueCheck" 
								name="tue" defaultChecked={getTimes?.mon?closedHours(getTimes.tue, true, true):null}/>
							</div>
						</div>
						<div className="he-form-component">
							<label>Wednesday</label>
							<div className="he-form-content">
								<input 
								type="time" id="wedStart" 
								name="wed" defaultValue={getTimes?.mon?closedHours(getTimes.wed):null}/>
								-
								<input 
								type="time" id="wedEnd" 
								name="wed" defaultValue={getTimes?.mon?closedHours(getTimes.wed, false):null}/>

								<label>Closed?</label>
								<input 
								type="checkbox" id="wedCheck" 
								name="wed" defaultChecked={getTimes?.mon?closedHours(getTimes.wed, true, true):null}/>
							</div>
						</div>
						<div className="he-form-component">
							<label>Thursday</label>
							<div className="he-form-content">
								<input 
								type="time" id="thuStart" 
								name="thu" defaultValue={getTimes?.mon?closedHours(getTimes.thu):null}/>
								-
								<input 
								type="time" id="thuEnd" 
								name="thu" defaultValue={getTimes?.mon?closedHours(getTimes.thu, false):null}/>

								<label>Closed?</label>
								<input 
								type="checkbox" id="thuCheck" 
								name="thu" defaultChecked={getTimes?.mon?closedHours(getTimes.thu, true, true):null}/>
							</div>
						</div>
						<div className="he-form-component">
							<label>Friday</label>
							<div className="he-form-content">
								<input 
								type="time" id="friStart" 
								name="fri" defaultValue={getTimes?.mon?closedHours(getTimes.fri):null}/>
								-
								<input 
								type="time" id="friEnd" 
								name="fri" defaultValue={getTimes?.mon?closedHours(getTimes.fri, false):null}/>

								<label>Closed?</label>
								<input 
								type="checkbox" id="friCheck" 
								name="fri" defaultChecked={getTimes?.mon?closedHours(getTimes.fri, true, true):null}/>
							</div>
						</div>
						<div className="he-form-component">
							<label>Saturday</label>
							<div className="he-form-content">
								<input 
								type="time" id="satStart" 
								name="sat" defaultValue={getTimes?.mon?closedHours(getTimes.sat):null}/>
								-
								<input 
								type="time" id="satEnd"
								 name="sat" defaultValue={getTimes?.mon?closedHours(getTimes.sat, false):null}/>

								 <label>Closed?</label>
								<input 
								type="checkbox" id="satCheck" 
								name="sat" defaultChecked={getTimes?.mon?closedHours(getTimes.sat, true, true):null}/>
							</div>
						</div>
						<div className="he-form-component">
							<label>Sunday</label>
							<div className="he-form-content">
								<input 
								type="time" id="sunStart" 
								name="sun" defaultValue={getTimes?.mon?closedHours(getTimes.sun):null}/>
								-
								<input 
								type="time" id="sunEnd" 
								name="sun" defaultValue={getTimes?.mon?closedHours(getTimes.sun, false):null}/>

								<label>Closed?</label>
								<input 
								type="checkbox" id="sunCheck" 
								name="sun" defaultChecked={getTimes?.mon?closedHours(getTimes.sun, true, true):null}/>
							</div>
						</div>
						<div className="he-form-buttons">
							<button type="sumbit">Submit and Save</button>
							<button type="reset">Revert All</button>
						</div>
					</form>
				</div>
				<div className={`he-dropdown-${getDropState(2)?'open':'close'}`} >
					<h2 onClick={() => changeDrop(2)}>{`${getDropState(2)?'▲':'▼'} Booking Times`}</h2>
					<form  
					className={`${getDropState(2)?null:'hide'} he-form`} 
					method="post" onSubmit={(event) => submitBooked(event, setNewMessage, setNewMessage)}>
						<div className="he-form-component">
							<div className="he-form-content">
								<label htmlFor="">Currently Booked Out? </label>
								<input 
								type="checkbox" id="bookedCheck" 
								name="booked" defaultChecked={getBooked?.booked}/>
							</div>
						</div>
						<div className="he-form-component">
							<div className="he-form-content">
								<label htmlFor="">Booked Out Until</label>
								<input 
								type="date" id="bookedUntil" 
								name="booked" defaultValue={getBooked?.until_raw}/>
							</div>
						</div>
						<div className="he-form-buttons">
							<button type="submit">Submit and Save</button>
							<button type="reset">Revert All</button>
							{/*<button onClick={() => document.location.reload()}>View Changes</button>*/}
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

const sumbitHours = (event, setMessage, setError) => {
	event.preventDefault();
	// console.log(event.target.mon[2].checked);
	const loopHours = day => !day[2].checked?day[0].value&&day[1].value?
		[day[0].value, day[1].value]:'closed':'closed';
	postData({
		mon: loopHours(event.target.mon).toString(),
		tue: loopHours(event.target.tue).toString(),
		wed: loopHours(event.target.wed).toString(),
		thu: loopHours(event.target.thu).toString(),
		fri: loopHours(event.target.fri).toString(),
		sat: loopHours(event.target.sat).toString(),
		sun: loopHours(event.target.sun).toString()
	}).then(resp => resp==='ok'?setMessage('Successfully changed business hours'):Promise.reject(resp))
	.catch(err => setError(err, true));
	
}

const submitBooked = (event, setMessage, setError) => {
	event.preventDefault();
	// console.log(event.target.booked[1].value, Date(event.target.booked[1].value));
	const checkDate = date => new Date(date)>new Date();
	postData(null, {
		isbooked: event.target.booked[1].value && checkDate(event.target.booked[1].value)?
			event.target.booked[0].checked?'y':'n':'n',
		booked: event.target.booked[1].value
	}).then(resp => resp==='ok'?setMessage('Successfully changed booking times'):Promise.reject(resp))
	.catch(err => setError(err, true));
}

const closedHours = ([start, end], opentime=true, checkbox=false) => 
	!end?(checkbox?true:''):(opentime?!checkbox?start:false:end);


const stateTemplate = (dropId, state) => ({dropdown: dropId, state: state});

const postData = (hours=null, booked=null) => {
	console.log(hours, booked);
	return new Promise((resolve, reject) => 
		fetch(process.env.REACT_APP_URL + '/fa/misc', {
		 	method: 'POST',
		 	headers: {
		 		"Content-Type":"application/json",
		 		"Authorization":window.sessionStorage.getItem(process.env.REACT_APP_TOKEN)},
		 	body: JSON.stringify({
		 		hours:hours,
		 		booked: booked
		 	})
		 }).then(raw => raw.json())
		 .then(resp => resolve(resp))
		 .catch(err => reject(err)))
}



