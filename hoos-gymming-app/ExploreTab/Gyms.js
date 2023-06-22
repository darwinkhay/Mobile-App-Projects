/**
 * https://docs.expo.dev/versions/latest/sdk/location/ (location/GPS)
 * https://docs.expo.dev/versions/v47.0.0/sdk/map-view/ (map view)
 * https://blog.logrocket.com/react-native-maps-introduction/#setting-up-map-default-view (default map view)
 * https://stackoverflow.com/questions/55051541/add-search-bar-to-react-native-maps-when-using-expo (map search bar)
 * https://blog.expo.dev/building-a-coffee-map-with-react-native-and-expo-a00b8f60a4c6 (rendering nearby gyms)
 * https://www.flaticon.com/free-icon/gym_7902167?term=gym%20marker&page=1&position=27&page=1&position=27&related_id=7902167&origin=search (gym map marker)
 * https://www.flaticon.com/free-icon/restaurant_7902125?term=restaurant%20marker&page=1&position=7&page=1&position=7&related_id=7902125&origin=search (restaurant map marker)
 * https://stackoverflow.com/questions/69538998/react-native-expo-mapview-passing-marker-details-to-an-expanding-bottom-view (marker details)
 * https://stackoverflow.com/questions/36419195/how-can-i-get-the-index-from-a-json-object-with-value (indexing JSON object based on value)
 * https://reactnative.dev/docs/modal (modal)
 */



import React, {useState, useEffect} from 'react';

 import {
     SafeAreaView,
     ScrollView,
     StatusBar,
     useColorScheme,
     Text,
     View,
     Alert,
     Checkbox,
     FlatList,
     TouchableOpacity,
     Animated,
     Button,
     TextInput,
     Modal,
     Pressable
     
    
   } from 'react-native';

 
 import uuid from 'react-uuid';


import styles from '../styles/styles.js'
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import {Marker, Callout} from 'react-native-maps';
import Map from '../src/components/Map.js';
import YelpService from '../src/services/yelp.js';


import {Card, Paragraph, Title} from 'react-native-paper';

import moment from 'moment';

const Gyms = ({ navigation, route }) => {
 
     const isDarkMode = useColorScheme() === 'dark';
 
     const backgroundStyle = {
         backgroundColor: isDarkMode ?  "#FFFFFF" : "#dae1f7"
     };

     var currentWeekDay = new Date().getDay();
     if(currentWeekDay === 0){
      currentWeekDay = 6
     } else if(currentWeekDay === 1){
      currentWeekDay = 0
     }
     else{
      currentWeekDay = currentWeekDay - 1
     }
     
    // const state = {
    //     region: null,
    //     gyms: []
    //  }
    

         /** testing location
      * 
      */
         const [location, setLocation] = useState(null);
         const [errorMsg, setErrorMsg] = useState(null);
         const [gyms, setGyms] = useState(null);
         //var thefkinggyms = null;
         useEffect(() => {
           (async () => {
             
             let { status } = await Location.requestForegroundPermissionsAsync();
             if (status !== 'granted') {
               setErrorMsg('Permission to access location was denied');
               return;
             }
             
             let location = await Location.getCurrentPositionAsync({});
             setLocation(location);
             const region = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0952,
                longitudeDelta: 0.0421
              };
            
            // await getNearbyGyms();
            const { latitude, longitude} = region
            const userLocation = {latitude, longitude}
            //console.log(userLocation)
            let nearbyGyms = await YelpService.getNearbyGyms(userLocation);
            //thefkinggyms = nearbyGyms
            for(let i =0; i < nearbyGyms.length; i++){
              nearbyGyms[i]['showDetails'] = false;
              let hoursofoperation = await YelpService.getHours(nearbyGyms[i]['id'])

              if(hoursofoperation === undefined){
                nearbyGyms[i]['hours'] = null
              }
              nearbyGyms[i]['hours'] = hoursofoperation

              // console.log(nearbyGyms[i].name, nearbyGyms[i].hours)
              
            }
            
            setGyms(nearbyGyms)
            // console.log(nearbyGyms)
            // console.log(moment('2000', 'HHmm').format('h:mm A'))
            
            
          
             
             
           })();
         }, []);
       
         let text = 'Waiting..';
        var canRender = false;
         if (errorMsg) {
           text = errorMsg;
         } else if (location && gyms) {
           text = JSON.stringify(location);
          // console.log(location.coords.latitude)
          // console.log(location.coords.longitude)
           var currentLocation ={
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0952,
            longitudeDelta: 0.0421
           }
          // let gymbros = gyms
          // for(let i = 0; i < gymbros.length; i++){
          //   console.log(gymbros[i]["name"])
          // }
           canRender = true;
           var thelong = location.coords.longitude;
           var thelat = location.coords.latitude;
          //console.log(currentLocation, "no")
          
         //console.log(currentLocation)
        // console.log(gymbros, "yes pls")
         //console.log(gyms, "ye")

           
         }
         
           //******************** */
           
        //    getNearbyGyms = async () => {
        //     console.log("bruh pls");
        //     // const { latitude, longitude } = currentLocation;
        //     // const userLocation = { latitude, longitude};
            
        //     // const nearbyGyms = await YelpService.getNearbyGyms(userLocation);
            
        //     // setGyms({nearbyGyms})
        //   };
        const [popup, doPopup] = useState(false);
    function renderMarkers(){
        return gyms.map((place, i) => {
            return(
                // <Text style={{color: 'white'}}>{place.name}</Text>
                
            <Marker image={require('../assets/gym.png')} key ={i} coordinate={place.coords}>
               <Callout key={uuid()} onPress={() => Alert.alert('yeah')}>
               <View key={uuid()} style={{ position: 'absolute', top: 10, width: '100%' }}>
              {/* <TextInput
                style={{
                  borderRadius: 10,
                  margin: 10,
                  color: '#000',
                  borderColor: '#666',
                  backgroundColor: '#FFF',
                  borderWidth: 1,
                  height: 45,
                  paddingHorizontal: 10,
                  fontSize: 18,
                }}
                placeholder={'Search'}
                placeholderTextColor={'#666'}
              /> */}
              <Text key={uuid()} style={{color: 'black'}}>{place.name}</Text>
            </View>
                </Callout> 
            </Marker>
            
            


            )
            
        })
        
    }

    const[modalVisible, setModalVisible] = useState(false)
    function Details({title, address, city, state, zip_code, distance, hours, today, phone, showDetails}){
      return(
        
          <View style={{
            flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
          }}>



        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{
            flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
          }}>
          <View style={{margin: 20,
    backgroundColor: "#202020",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5}}>
            <Text style={{marginBottom: 15,
    textAlign: "center", color: 'white', fontWeight: 'bold', fontSize: 24}}>{title}</Text>
    <Text style={{marginBottom: 15,
    textAlign: "center", color: 'white', fontSize: 18}}>{address}{'\n'}{city}, {state} {zip_code}</Text>
    <Text style={{marginBottom: 15,
    textAlign: "center", color: 'white', fontSize: 16}}>Today's hours: {'\n'}{hours !== null && hours !== undefined && today !== -1 ?moment(hours[today].start, 'HHmm').format('h:mm A') + " - "+ moment(hours[today].end, 'HHmm').format('h:mm A') : "N/A"}</Text>
        <Text style={{marginBottom: 15,
    textAlign: "center", color: 'white', fontSize: 16}}>Phone: {phone}</Text>

            <Pressable
              style={[{
                borderRadius: 20,
                padding: 10,
                elevation: 2
              }, {
                backgroundColor: "#2196F3",
              }]}
              onPress={() => handleToggle(title)}
            >
              <Text style={{color: "white",
    fontWeight: "bold",
    textAlign: "center"}}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* <Pressable
        style={[{
          borderRadius: 20,
          padding: 10,
          elevation: 2
        }, {
          backgroundColor: "#F194FF",
        }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{color: "white",
    fontWeight: "bold",
    textAlign: "center"}}>Show Modal</Text>
      </Pressable> */}
              
          </View>
      
          
       
        
      
        
      )
    }


    


    function MarkerWithDetails({point, onToggle}) {
      const {coords, name, description, showDetails, address, city, state, zip_code, distance, hours, phone} = point;
      //console.log(coords, name)
      // console.log(hours)
      if(hours !== null && hours !== undefined){
        var theWeekDay = hours.findIndex(function(item, i){
          // console.log(item.day === currentWeekDay)
         
          return item.day === currentWeekDay
        });

        // console.log(theWeekDay,'yuh', name)

      } else{
        var theWeekDay = currentWeekDay
        // console.log(theWeekDay, 'no', name)
      }
      
      return(
        
          // <TouchableOpacity>
          
            <Marker onPress={onToggle} image={require('../assets/gym.png')} coordinate={coords}>
                {modalVisible && showDetails && <Details title={name} address={address} city={city} state={state} phone={phone} zip_code={zip_code} distance={distance} showDetails={showDetails} hours={hours} today={theWeekDay}/>}

            </Marker>


          
              
              
                
        
               
          // </TouchableOpacity>
            
             
            
         
      
      )
    }


    handleToggle = (name) => {
      setGyms(prevState => prevState.map(gym => (  
            gym.name === name ? {...gym, showDetails: !gym.showDetails} : gym     
         ))
      )

      setModalVisible(!modalVisible)
    }

    // function renderPlaceInfo(){
    //   return(
    //     {this.popup ? 
    //       <View style={{ position: 'absolute', top: 10, width: '100%' }}>
    //     <TextInput
    //       style={{
    //         borderRadius: 10,
    //         margin: 10,
    //         color: '#000',
    //         borderColor: '#666',
    //         backgroundColor: '#FFF',
    //         borderWidth: 1,
    //         height: 45,
    //         paddingHorizontal: 10,
    //         fontSize: 18,
    //       }}
    //       placeholder={'Search'}
    //       placeholderTextColor={'#666'}
    //     />
    //   </View> : null}
        
    //   )
    // }
        
     return (
   
      
      <SafeAreaView style={{flex: 1, backgroundColor: '#0A0F1D'}}>
         <StatusBar
         barStyle={'light-content'}
         backgroundColor={backgroundStyle.backgroundColor}
 
         />
        {/* <Text style={{color: 'white'}}>{JSON.stringify(gymbros)}</Text> */}
         {/* <Text style={{color: 'white'}}>{thelong} {thelat}</Text> */}
        {/* <Button title="NODSFS" onPress={() => Alert.alert(JSON.stringify(currentLocation))}></Button> */}
        {
            canRender?
            <MapView loadingBackgroundColor='#202020' loadingEnabled='true' style={styles.map} showsCompass={false} showsUserLocation='true'  userInterfaceStyle='dark' initialRegion={currentLocation}>

            
               {/* {renderMarkers()} */}
               {gyms.map((gym) => (<MarkerWithDetails point={gym} key={uuid()} onToggle={() => handleToggle(gym.name)}/>))}           
               
          </MapView> 
          
          
          
          : 
          // <MapView loadingBackgroundColor='black' loadingEnabled='true' styles={styles.map} showsCompass={false} showsUserLocation='true' userInterfaceStyle='dark' initialRegion={currentLocation}>
          //   </MapView>
          <Text style ={{color:'white', fontSize: 19, alignItems:'center', justifyContent:'center', textAlign:'center', marginTop:'70%'}}>Loading Map...</Text>
       
        }
         
         {/* <View style={{ position: 'absolute', top: 10, width: '100%' }}>
    <TextInput
      style={{
        borderRadius: 10,
        margin: 10,
        color: '#000',
        borderColor: '#666',
        backgroundColor: '#FFF',
        borderWidth: 1,
        height: 45,
        paddingHorizontal: 10,
        fontSize: 18,
      }}
      placeholder={'Search'}
      placeholderTextColor={'#666'}
    />
  </View> */}
    
    
    
    {/* {canRender ?<Map
   
        places={gymbros}
        intialRegion={currentLocation}
    /> : <Text></Text> } */}
       
        

        
             
      </SafeAreaView>
     
        
         
    
         
     );
     
   };
   export default Gyms;