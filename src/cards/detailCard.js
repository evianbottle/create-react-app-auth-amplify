import {Button, Card, Input, Grid} from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import Box from '@mui/material/Box';

import './itemCard.css'

const ItemDetailCard = (props) => {

  const {
    details,
    submitBid
  } = props
  const [bidAmt, setBidAmt] = React.useState('');
  const [bidder, setBidder] = React.useState('');
  const [phone, setPhone] = React.useState('');

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
              onClick={() => submitBid({
                bidId: props.id,
                user: bidder,
                bidAmt: bidAmt,
                phone: phone
              })}
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
    </Grid>
  )
}

export default ItemDetailCard