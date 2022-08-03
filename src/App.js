
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from 'react-router-dom'
import './App.css';
import {Card, Grid, IconButton} from '@material-ui/core'
import CloseIcon from '@mui/icons-material/Close'
import ItemCard from './cards/itemCard'
import ItemDetailCard from './cards/detailCard'
import Register from './register'
import Login from './login'
import React from 'react'
//import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'
//import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react'
//import { Authenticator } from '@aws-amplify/ui-react';
import {getAllItems, postBid} from './api'
import { Snackbar } from '@mui/material';


const generateCards = (itemList) => {
  return itemList.map((item) => {
    const {
      name,
      s3_url,
      currentBid,
      id
    } = item
    return (
      <Grid item xs={12} md={4}>
        <ItemCard
          title={name} 
          s3_url={s3_url} 
          current={currentBid} 
          id={id}
        />
      </Grid>
    )
  })
}

const getDetails = (itemList, id) => {

  const found = itemList.find((item) => item.id === id)
  return found
}

const Home = (itemList) => {
  return (
    <div className="App">
      <div className="App-header">
        Wendy Sardella Memorial Silent Auction
      </div>
      <Grid container spacing={3}>
        {generateCards(itemList)}
      </Grid>
    </div>
  )
}


const  App = () => {

  const [user, setUser] = React.useState(null);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading ] = React.useState(true);
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [bidMessage, setBidMessage] = React.useState("Message");
  const [snackType, setSnackType] = React.useState('success');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      setSnackOpen(false)
    }
    setSnackOpen(false)
  }

  const snack = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color='default'
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  )

  React.useEffect(()=> {
    if(items.length === 0){
      //setIsLoading(true)
      getAllItems().then(items => {
        setItems(items)
        setIsLoading(false)
      })
    }
  })

  const postNewBid = (bid) => {
    postBid(bid).then((res) => {
      console.log(res)
      if (res.statusCode === 200){
        setSnackType('success')
      }else{
        setSnackType('error')
      }
      setBidMessage(res.body.message)
      setSnackOpen(true)
      getAllItems().then(items => {
        setItems(items)
        setIsLoading(false)
      })
    })

  }

  const { id } = useParams();

  if (isLoading){
    return(
      <div>
        Loading
      </div>
    )
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
          details={getDetails(items, id)}
          submitBid={postNewBid}
        />
      </div>
    )
  }
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
          <Route path='/:id' element={<Detail />} />
          <Route exact path='/' element={Home(items)} />
        </Routes>
      </Router>
      <Snackbar
        open={snackOpen}
        autoHideDuration={5000}
        onClose={handleClose}
        message={bidMessage}
        action={snack}
        severity={`${snackType}`}
      />
    </>
  );
}

export default App;
