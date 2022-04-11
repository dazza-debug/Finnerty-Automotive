// import {useState, cloneElement} from 'react';

// export default function App(props) {
//   const [getUser, setUser] = useState('bob');

//   return <>{cloneElement(props.children, {getUser: 'bob'})}</>
// }

//I wanted to do whats above but it seems it doenst pass props through Router to the children
//Another possible way would be to use React.Context or exporting something maybe?????

import {useState, useEffect, createContext, Suspense, lazy} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home, {times, booked} from './Pages/Home';
import Banner from './Componenets/Banner';
import NotFound from './Componenets/NotFound';
import LoadingPage from './Componenets/LoadingPage';

const HomeEditor = lazy(() => import('./Componenets/HomeEditor')); //lazy
const Login = lazy(() => import('./Pages/Login')); //lazy
const Register = lazy(() => import('./Pages/Register')); //lazy
const Blog = lazy(() => import('./Pages/Blog')); // lazy
const BlogPost = lazy(() => import('./Pages/BlogPost')); //lazy 
const BlogEditor = lazy(() => import('./Componenets/BlogEditor')); //lazy

export const useMisc = createContext();

export default function App() {

  const [getUser, setUser] = useState(null);
  const [getMisc, setMisc] = useState(miscTemplate(undefined, undefined));
  //For Success banners. //What about making message banners stack messages with more then one of them
  const [getMessage, setMessage] = useState(null)

  useEffect(() => {
    if(window.sessionStorage.getItem(process.env.REACT_APP_TOKEN))
      fetch(process.env.REACT_APP_URL + '/fa/login', {
        method: 'POST',
        headers: {'Authorization': window.sessionStorage.getItem(process.env.REACT_APP_TOKEN)}
      }).then(raw => raw.status===401?Promise.reject('Unauthorized'):raw.json())
      .then(data => setUser(userTemplate(data.name, true, data?.level))) //change to name
      .catch(err => {console.log(err); window.sessionStorage.removeItem(process.env.REACT_APP_TOKEN);});
    fetchMisc().then(record => setMisc(miscTemplate(times(record), booked(record))))
    .catch(err => console.error(err));
  }, [])

  // return fullSite(getMisc, getUser, setUser, getMessage, setMessage);

  
  return loginValidation(getUser,0)?fullSite(getMisc, getUser, setUser, getMessage, setMessage)
    :emergencyShutdown(getMisc, getUser, setUser, setMessage);
  
}

const emergencyShutdown = (getMisc, getUser, setUser, setMessage) => {
  return (
    <useMisc.Provider value={getMisc}>
      <Router>
        <Suspense fallback={<LoadingPage />}>
          <Banner />
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home getUser={getUser} setUser={setUser} emergency={true}/>} />
            <Route path="login" element={<Login setUser={setUser} setMessage={setMessage}/>}/>
          </Routes>
        </Suspense>
      </Router>
    </useMisc.Provider>
  )
}

const fullSite = (getMisc, getUser, setUser, getMessage, setMessage) => {
  return (
    <useMisc.Provider value={getMisc}>
      <Router>
        <Suspense fallback={<LoadingPage/>} >
          <Banner />
          {
            getMessage&&<Banner error setError message={getMessage} setMessage={() => setMessage(null)}/>
          }
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home getUser={getUser} setUser={setUser}/>}>
              <Route path="editor" element={<HomeEditor setMessage={setMessage}/>}/>
            </Route>
            <Route path="login" element={<Login setUser={setUser} setMessage={setMessage}/>}/>
            <Route path="register" element={<Register setUser={setUser} setMessage={setMessage}/>}/>
            <Route path="blog" element={<Blog getUser={getUser}/>}>
              <Route path="editor" element={<BlogEditor getUser={getUser} setMessage={setMessage}/>} />
            </Route>
            <Route path="blog/:id" element ={<BlogPost getUser={getUser}/>}>
              <Route path="editor" element={<BlogEditor getUser={getUser} setMessage={setMessage}/>} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </useMisc.Provider>
  )
}

//Templates
export const userTemplate = (name, loggedin, security=0) => ({name: name, loggedIn: loggedin, security:security })
const miscTemplate = (times, booked) => ({getTimes: times, getBooked: booked});


//Fetches
const fetchMisc = () => {
  return new Promise((resolve, reject) => 
    fetch(process.env.REACT_APP_URL+'/fa/misc').then(raw => raw.json())
    .then(result => result?.id?resolve(result):reject(result)).catch(reject));
}

export const logout = (setUser) => {
  const clean = () => {
    setUser(null); 
    window.sessionStorage.removeItem(process.env.REACT_APP_TOKEN)
  }
  fetch(process.env.REACT_APP_URL + '/logout', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json", 
        "Authorization": window.sessionStorage.getItem(process.env.REACT_APP_TOKEN)
      }
    }).then(() => clean())
    .catch(err => {console.error(err); clean();})
}


//Validation
export const loginValidation = (user, securityLevel=4) => {
  return user?.name&&user?.loggedIn&&user?.security>=securityLevel&&window.sessionStorage.getItem(process.env.REACT_APP_TOKEN)
}
