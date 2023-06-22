/**
 * https://blog.expo.dev/building-a-coffee-map-with-react-native-and-expo-a00b8f60a4c6 (yelp api)
 */
import axios from 'axios'

const YELP_API_KEY = 'S2j596gL-NTF4qLylrySOHNfTN725RFW1ACFmpi73j5n7VZvohVa1uKc4eaGMHmMy8eSYbKaJsjaABsub9xVCKhZldwlpHWcAzMq1UCM29V3dTRB9961Rkaus2yRY3Yx'

const api = axios.create({
  baseURL: 'https://api.yelp.com/v3',
  headers: {
    Authorization: `Bearer ${YELP_API_KEY}`,
  },
})

const getNearbyGyms = userLocation => {
  return api.get('/businesses/search', {
      params: {
        limit: 15,
        categories: 'afc,Aquatic & Fitness Center,fitness center,gym,gyms',
        ...userLocation,
      },
    })
    .then(res =>
      res.data.businesses.map(business => {
        return {
          name: business.name,
          address: business.location.address1,
          city: business.location.city,
          state: business.location.state,
          zip_code: business.location.zip_code,
          coords: business.coordinates,
          distance: business.distance,
          phone: business.display_phone,
          alias: business.alias,
          id: business.id
        
        }
      })
    )
    .catch(error => console.error(error))
}


const getNearbyRestaurants = userLocation => {
  return api.get('/businesses/search', {
      params: {
        limit: 15,
        categories: 'healthy restaurants',
        ...userLocation,
      },
    })
    .then(res =>
      res.data.businesses.map(business => {
        return {
          name: business.name,
          address: business.location.address1,
          city: business.location.city,
          state: business.location.state,
          zip_code: business.location.zip_code,
          coords: business.coordinates,
          distance: business.distance,
          phone: business.display_phone,
          alias: business.alias,
          id: business.id
        
        }
      })
    )
    .catch(error => console.error(error))
}

const getHours = (id) => {
  return api.get(`/businesses/${id}`).then(

   (res) => {
  //  if(res.data){
  //   console.log(res.data.name, "yeah")
  //  } else{
  //   console.log('no')
  //  }
  // console.log(res.data.hours)
  if(res.data.hours !== undefined){
    // console.log(res.data.hours[0].open[0])
   return res.data.hours[0].open
  } else{
    return null
  }
  
   
    // return res.data.hours[0].open
    // console.log(res.data, res.data.name)
    // return{
    //   hours: res.data.hours
    // }
   }

   
    
     
  ).catch(error => console.error(error))
  // return api.get(`/businesses/${id}`).then(
    
  //     res => {
  //       return{
          
  //       }
  //     }
    

 

    
    
  //   )
  //   .catch(error => console.error(error))
}

export default {
  getNearbyGyms, getHours, getNearbyRestaurants
}