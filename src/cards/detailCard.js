import {
  Button,
  Card, 
  Input, 
  Grid, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
} from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import Box from '@mui/material/Box';

import './itemCard.css'



const ItemDetailCard = (props) => {

  const {
    details,
    submitBid,
    id
  } = props
  const [bidAmt, setBidAmt] = React.useState('');
  const [bidder, setBidder] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [dOpen, setDOpen] = React.useState(false);

  const columns = [
    { field: 'bidder', headerName: 'Name'},
    { field: 'bidAmt', headerName: 'Bid Amount'},
  ];

  const generateBidList =  details.bidList.bids.filter(bid => bid.success).reverse().map((item, id) => {
      return {...item, bidAmt: `$${item.bidAmt}`, id: id + 1}
  });
  
  const updateName = (event) => {
    setBidder(event.target.value)
  }

  const updatePhone = (event) => {
    setPhone(event.target.value)
  }

  const updateBid = (event) => {
    setBidAmt(event.target.value)
  }

  const disabled = () => {
    return bidAmt === '' || bidder === '' || phone === '' || isNaN(bidAmt)
  }


  const ConfirmationDialog = (props) =>{
    const { dOpen} = props;
  
    const handleCancel = () => {
      setDOpen(false);
    };
  
    const handleSubmit = () => {
      submitBid({
        bidId: id,
        user: bidder,
        bidAmt: bidAmt,
        phone: phone
      })
      setDOpen(false);
    }

    return (
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="xs"
        open={dOpen}
      >
        <DialogTitle>Confirm Bid</DialogTitle>
        <DialogContent>
          <div>
            {`Bidder: ${bidder}`}
          </div>
          <div>
            {`Contact Number: ${phone}`}
          </div>
          <div>
            {`Bid Amount: $${bidAmt}`}
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Ok</Button>
        </DialogActions>
      </Dialog>
    );
  }

  return(
    <Grid container>
      <Grid item xs={1} />
      <Grid item xs={10}>
        <Card>
          <div className="app-header">
            <Link to={'/'}> &lt;-- Back </Link>
          </div>
          <h3>
            {details.name}
          </h3>
          <div className="imgHolder">
            <img src={`${details.s3_url}`} style={{width: '100%'}}/>
          </div>
          <div className='description'>
            {details.description}
          </div>
          <div style={{width: "100%"}}>
            <div className="current">
              Current Bid: $
              {details.currentBid}
            </div>
            <div className="current">
              Minimum Bid Increase: $
              {details.minInc}
            </div>
            <div className="current">
              Value: $
              {details.value}
            </div>
          </div>
          <div style={{width:"100%"}}>
          <Box component="form" autoComplete="off">
            <div>
            <Input
              value={bidder}
              onChange={updateName}
              placeholder="Name"
            />
            </div>
            <div>
            <Input
              value={phone}
              onChange={updatePhone}
              placeholder="Phone #"
            />
            </div>
            <div>
            <Input
              value={bidAmt}
              onChange={updateBid}
              placeholder="Bid Amount"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
              />
              </div>
            <div>
            <Button
              onClick={() => setDOpen(true)}
              variant="contained"
              id="submit-button"
              disabled={disabled()}
            >
              Place Bid
            </Button>
            </div>
          </Box>
          </div>
        </Card>
        <Card style={{marginTop: '20px'}}>
          <h4>Current Bids</h4>
          <div style={{width: "100%", height: "300px"}}>
          <DataGrid
            rows={generateBidList}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
          </div>
        </Card>
      </Grid> 
      <ConfirmationDialog 
        dOpen={dOpen}
      />
    </Grid>
  )
}

export default ItemDetailCard