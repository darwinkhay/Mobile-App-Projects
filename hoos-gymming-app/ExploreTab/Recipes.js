/**
 * https://developer.edamam.com/edamam-docs-recipe-api#/ (food api)
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
    Pressable,
    Image

    
   
  } from 'react-native';




import styles from '../styles/styles.js'
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import {Marker, Callout} from 'react-native-maps';
import Map from '../src/components/Map.js';

import RecipeDetails from './RecipeDetails.js'
import {Card, Paragraph, Title} from 'react-native-paper';

import moment from 'moment';




const Recipes = ({ navigation, route }) => {
    const isDarkMode = useColorScheme() === 'dark';
 
    const backgroundStyle = {
        backgroundColor: isDarkMode ?  "#FFFFFF" : "#dae1f7"
    };
    const [recipes, setRecipes] = useState(null);
    const [searchQuery, setQuery] = useState("");

    const EDAMAM_API_KEY = 'fdc861901e2b8a0efe61924e9448a0e1'

const APPLICATION_ID = 'ad303cac'   
    // useEffect(() => {
    //     (async () => {
          
        
        
    //      let theRecipes = await RecipeService.getRecipes(searchQuery);
      
    //     //  for(let i =0; i < nearbyGyms.length; i++){
    //     //    nearbyGyms[i]['showDetails'] = false;
    //     //    let hoursofoperation = await YelpService.getHours(nearbyGyms[i]['id'])

    //     //    if(hoursofoperation === undefined){
    //     //      nearbyGyms[i]['hours'] = null
    //     //    }
    //     //    nearbyGyms[i]['hours'] = hoursofoperation

    //     //    // console.log(nearbyGyms[i].name, nearbyGyms[i].hours)
           
    //     //  }
         
    //      setRecipes(theRecipes)
         
    //      console.log(theRecipes)
         
         
       
          
          
    //     })();
    //   }, []);

      function getTheRecipes(query){
        // fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APPLICATION_ID}&app_key=${EDAMAM_API_KEY}`)
        // .then(response => response.json())
        // .then(response => setRecipes(response.hits))
        // .catch(err => console.error(err))


        fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=f62cff1bf2de4dacb716d4046f45a53e`)
        .then(response => response.json())
        .then(response => setRecipes(response.results))
        .catch(err => console.error(err))

        
        // console.log(query, recipes)
        // let theRecipes = await RecipeService.getRecipes(searchQuery);

        // setRecipes(theRecipes)
        // console.log(theRecipes)
        
      }

      const reformatText = (textArray) => {

        var newString = "";
        for(let i = 0; i < textArray.length; i++){
          if(i < textArray.length-1){
            newString += textArray[i] + " • ";
          } else{
            newString += textArray[i];
          }
          
        }
        return newString;
      }

      
      function Recipe({label, image, title, id, dietLabels, healthLabels, ingredientLines, calories, instructions, totalNutrients, fat, protein ,carbs, cuisineTypm, tags}){
        return(
            <Card onPress={() => navigation.navigate('RecipeDetails', 
            {
              theid: id,
              theimage: image,
              thetitle: title
            }
            // {thelabel: label, 
            // theimage: image, 
            // theingredients: ingredientLines, 
            // theinstructions: instructions,
            // theprotein: protein,
            // thefat: fat,
            // thecarbs: carbs,
            // thecalories: calories,
            // thehealthlabels: healthLabels,
            // thenutrients: totalNutrients,
            // thetags: tags
            // }
            )
          } 
            style={{ margin: 10, paddingHorizontal: 10, backgroundColor: "#202020"}}>

                
                <Card.Content style={{flex: 1, flexDirection: 'row'}}>
                <Card elevation={0} style={{width: 200, flexDirection: 'row', backgroundColor: '#202020'}}> 

                {/* <Card.Title titleStyle={{color: 'white', fontWeight: 'bold', fontSize: 20}} title={label}></Card.Title> */}
                <Card.Content>
                <Title style={{color: 'white', fontWeight: 'bold', fontSize: 22}}>{title}{'\n'}</Title>

                {/* <Title style={{color: 'white', fontWeight: 'bold', fontSize: 22}}>{label}{'\n'}</Title>
                <Paragraph style={{color: 'white', fontSize: 13}}><Image source={require('../assets/calories.png')}></Image> Calories: {Math.round(calories)}</Paragraph>
                <Paragraph style={{color: 'white', fontSize: 13}}>🟢 Protein: {Math.round(protein)}g</Paragraph>
                <Paragraph style={{color: 'white', fontSize: 13}}>🟡 Fat: {Math.round(fat)}g</Paragraph>
                <Paragraph style={{color: 'white', fontSize: 13}}>🔴 Carb: {Math.round(carbs)}g</Paragraph> */}


                </Card.Content>

                </Card>
                <Image source={{uri: image}} style={{resizeMode: 'contain', borderRadius: 10, width: 120, height: undefined, marginLeft: 10}}></Image>

                

                  
                 
                </Card.Content>
                
                {/* <Card.Content style={{flex: 1, flexDirection: 'column'}}>
                   
                <Paragraph style={{color: 'white', fontSize: 12}}> {'\n'}{'\n'} {reformatText(healthLabels)} {'\n'}{'\n'}
                  </Paragraph> 
                </Card.Content> */}
                
            </Card>

        )

      }

      return(
        <SafeAreaView style={{flex: 1, backgroundColor: '#0A0F1D'}}>
         <StatusBar
         barStyle={'light-content'}
         backgroundColor={backgroundStyle.backgroundColor}
 
         />
            <View style={{flex: 1, width: '100%' }}>
              <TextInput
                style={{
                  borderRadius: 10,
                margin: 10,
                  color: '#000',
                  borderColor: '#666',
                  backgroundColor: '#FFF',
                  borderWidth: 1,
                  height: 45,
                //   width: '100%',
                marginBottom: 10,
                  paddingHorizontal: 10,
                  fontSize: 18,
                }}
                placeholder={'Search'}
                placeholderTextColor={'#666'}
                onChangeText={(currentQuery) => setQuery(currentQuery)}
                onSubmitEditing={() => getTheRecipes(searchQuery)}
              />
              {recipes === null ? 

                <Text style={{color: 'white'}}></Text>
        
            :
            (
              recipes.length === 0 ?

              <Text style={{color: 'white', textAlign: 'center', fontSize: 22, fontWeight: 'bold'}}>No Results Found</Text>


            :


              


              <FlatList onEndReachedThreshold={10} showsVerticalScrollIndicator={false} data={recipes} renderItem={


                ({item}) => <Recipe 
                // label={item.recipe.label} 
                // image={item.recipe.image} 
                // dietLabels={item.recipe.dietLabels} 
                // healthLabels={item.recipe.healthLabels} 
                // ingredientLines={item.recipe.ingredientLines}
                // calories={item.recipe.calories}
                // instructions={item.recipe.image}
                // totalNutrients={item.recipe.totalNutrients}
                // fat={item.recipe.totalNutrients['FAT']['quantity']}
                // protein={item.recipe.totalNutrients['PROCNT']['quantity']}
                // carbs={item.recipe.totalNutrients['CHOCDF']['quantity']}
                // cuisineType={item.recipe.cuisineType}
                // tags={item.recipe.tags}
                id={item.id}
                title={item.title}
                image={item.image}
                ></Recipe>
            }/>
            )
            
            
            
            
            }


            </View>
                

                

            


            </SafeAreaView>
      );
      


};
export default Recipes;