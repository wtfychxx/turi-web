import axios from 'axios'

// require('dotenv').config()
const apiUrl = 'http://localhost:5010/api'

export const getPersonByFamilyCard = async(searchText: string) => {
    try{
        const results = await axios.get(`${apiUrl}/getPerson/${searchText}`)

        return results.data
    }catch(errors){
        console.error(errors)
        return 
    }
}