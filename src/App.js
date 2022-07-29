
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from 'react-router-dom'
import './App.css';
import {Card, Grid} from '@material-ui/core'
import ItemCard from './cards/itemCard'
import ItemDetailCard from './cards/detailCard'
import play from './img/play.PNG'
import five from './img/high-five.jpg'
import Register from './register'
import Login from './login'
import React from 'react'
//import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'
//import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react'
//import { Authenticator } from '@aws-amplify/ui-react';
import {getAllItems, postBid} from './api'

//Amplify.configure(awsconfig);

// const itemCardList = [
//   {
//     title: "Item 1",
//     imgUrl: play,//"https://nofrillsmenubucket.s3.amazonaws.com/frame.png",
//     current: "$157",
//     desc: "It's the play button from the Blizz launcher. Not sure why you would bid on this",
//     id: 1,
//     minInc: 3
//   },
//   {
//     title: "High Five with Evan!",
//     imgUrl: five,
//     current: "$1",
//     desc: "If you win this item, you will get 1 (one) high five from the dude in this picture.  Don't know why you'd want that...",
//     id: 2,
//     minInc: 1
//   },
// ]

const itemCardList = [{"id":"0","description":"You get one (1) high five with the guy in this picture.  Not sure how you found or why you would want this item","currentBidder":"the_username","bidList":{"bids":[{"datetime":"07/25/2022, 05:54:40","bidder":"the_username","success":false,"bidAmt":6},{"datetime":"07/25/2022, 05:54:46","bidder":"the_username","success":false,"bidAmt":6},{"datetime":"07/25/2022, 05:54:57","bidder":"the_username","success":true,"bidAmt":7},{"datetime":"07/25/2022, 05:54:59","bidder":"the_username","success":false,"bidAmt":7}]},"minInc":1,"name":"High Five with Evan!","currentBid":7,"s3_url":"https://golftourneyaug21.s3.us-east-2.amazonaws.com/images/high-five.jpg"}]
const generateCards = () => {
  return itemCardList.map((item) => {
    const {
      name,
      imgUrl,
      currentBid,
      id
    } = item
    return (
      <Grid item xs={12} md={4}>
        <ItemCard
          title={name} 
          imgUrl={imgUrl} 
          current={currentBid} 
          id={id}
        />
      </Grid>
    )
  })
}

const getDetails = (id) => {
  const found = itemCardList.find((item) => item.id === id)
  console.log(found)
  return found
}

const Detail = () => {
  const { id } = useParams();

  return (
    <div className="App">
      <div className="App-header">
        Mansfield Golf Tournament Silent Auction
      </div>
      <ItemDetailCard 
        id={id} 
        details={getDetails(id)}
      />
    </div>
  )
}

const Home = () => {
  return (
    <div className="App">
      <div className="App-header">
        Mansfield Golf Tournament Silent Auction
      </div>
      <Grid container spacing={3}>
        {generateCards()}
      </Grid>
    </div>
  )
}

const LoginPage = () => {
  return (
    <div className="App">
      <div className="App-header">
        <Login />
      </div>
    </div>
  )
}

const RegisterPage = () => {
  return (
    <div className="App">
      <div className="App-header">
        <Register />
      </div>
    </div>
  )
}

const  App = () => {

  const [user, setUser] = React.useState(null);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading ] = React.useState(false);

  React.useEffect(()=> {
    if(items.length === 0 && !isLoading){
      setIsLoading(true)
      const itemList = getAllItems()
      setItems(itemList)
    }
  })

  const generateLogin = () => {
    if (user) {
      return (
        <Grid item xs={11}>
          <Link to={"/#"} onClick={() => setUser(null)}>
            Log Out
          </Link>
        </Grid>
      )
    } else {
      return(
        <>
        <Grid item xs={8} md={10}/>
        <Grid item xs={2} md={1}>
          <Link to={"/register"}> Register </Link>
        </Grid>
        <Grid item xs={2} md={1}>
          <Link to="/login">Log In</Link>
        </Grid>
        </>
      )
    }
  }

  return (
    <>

      <Router>
        <Grid container className="login">
          {/* <AmplifySignOut /> */}
        </Grid>
        <Routes>
          <Route path="/login" element={LoginPage()} >
          </Route>
          <Route path="/register" element={RegisterPage()} />
          <Route path='/:id' element={<Detail />}>

          </Route>
          <Route exact path='/' element={Home()}>
            
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
