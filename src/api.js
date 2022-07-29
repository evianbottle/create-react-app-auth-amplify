import axios from 'axios'

export async function getAllItems() {
    try{
        const response = await axios.get('https://es6lidg23b.execute-api.us-east-1.amazonaws.com/prod/items');
        return response.data;
    }catch(error) {
        return []
    }
}

export async function postBid(bid) {
    const response = await axios.post('https://es6lidg23b.execute-api.us-east-1.amazonaws.com/prod/items', bid)
    return response.data;
}