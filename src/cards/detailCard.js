import {Button, Card, Input, Grid} from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'

import './itemCard.css'

const ItemDetailCard = (props) => {

  const {
    details
  } = props
  const [bidAmt, setBidAmt] = React.useState('');

  const columns = [
    { field: 'bidder', headerName: 'Name'},
    { field: 'bidAmt', headerName: 'Bid Amount'},
    { field: 'datetime', headerName: 'Bid Time'},
  ];

  const generateBidList =  details.bidList.bids.filter(bid => bid.success).reverse().map((item, id) => {
    console.log(item)
      return {...item, bidAmt: `$${item.bidAmt}`, id: id + 1}
  });
  
  console.log(generateBidList)
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
          <div className="current">
            Current Bid: $
            {details.currentBid}
          </div>
          <div className="current">
            Minimum Bid Increase: $
            {details.minInc}
          </div>
          <div className="details-button">
            <Input
              value={bidAmt}
              onChange={(e,v) => setBidAmt(v)}
              />
            <Button
              onClick={() => alert(`You bid $${bidAmt} on this??`)}
            >
              Submit
            </Button>
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