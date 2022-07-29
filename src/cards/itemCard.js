import {Button, Card} from '@material-ui/core'
import { Link } from 'react-router-dom'

import './itemCard.css'

let ItemCard = (props) => {

  const {
    title,
    s3_url,
    current,
    id
  } = props

  return(
    <Card>
      <h3>
        {title}
      </h3>
      <div className="imgHolder">
        <img src={`${s3_url}`} style={{width: '90%'}}/>
      </div>
      <div className="current">
        Current Bid: $
        {current}
      </div>
      <div className="details-button">
        <Button
        >
          <Link to={`/${id}`}> Details </Link>
        </Button>
      </div>
    </Card>
  )
}

export default ItemCard