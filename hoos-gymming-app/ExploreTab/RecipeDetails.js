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


import {Card, Paragraph, Title} from 'react-native-paper';

import moment from 'moment';




const RecipeDetails = ({ navigation, route }) => {
    const isDarkMode = useColorScheme() === 'dark';
 
    const backgroundStyle = {
        backgroundColor: isDarkMode ?  "#FFFFFF" : "#dae1f7"
    };
    const [recipes, setRecipes] = useState(null);
    const [searchQuery, setQuery] = useState("");

    
         
         
       
          
 

      

      const reformatText = (textArray) => {

        var newString = "";
        for(let i = 0; i < textArray.length; i++){
          if(i < textArray.length-1){
            newString += textArray[i] + "\n";
          } else{
            newString += textArray[i];
          }
          
        }
        return newString;
      }

      
    //   function Recipe({label, image, dietLabels, healthLabels, ingredientLines, calories, instructions, totalNutrients, fat, protein ,carbs, cuisineType}){
    //     return(
    //         <Card onPress={() => navigation.navigate('RecipeDetails')} style={{ margin: 10, paddingHorizontal: 10, backgroundColor: "#202020"}}>

                
    //             <Card.Content style={{flex: 1, flexDirection: 'row'}}>
                 
    //             <Image source={{uri: image}} style={{resizeMode: 'contain', borderRadius: 10, width: 120, height: undefined, marginRight: 10}}></Image>
    //             <Card style={{flex: 1, width: 200, flexDirection: 'column', backgroundColor: '#0A0F1D'}}> 

    //             {/* <Card.Title titleStyle={{color: 'white', fontWeight: 'bold', fontSize: 20}} title={label}></Card.Title> */}
    //             <Card.Content>
    //             <Title style={{color: 'white', fontWeight: 'bold', fontSize: 22}}>{label}{'\n'}</Title>
    //             <Paragraph style={{color: 'white', fontSize: 13}}><Image source={require('../assets/calories.png')}></Image> Calories: {Math.round(calories)}</Paragraph>
    //             <Paragraph style={{color: 'white', fontSize: 13}}>🟢 Protein: {Math.round(protein)}g</Paragraph>
    //             <Paragraph style={{color: 'white', fontSize: 13}}>🟡 Fat: {Math.round(fat)}g</Paragraph>
    //             <Paragraph style={{color: 'white', fontSize: 13}}>🔴 Carb: {Math.round(carbs)}g</Paragraph>
    //             </Card.Content>
    //             </Card>
                  
                 
    //             </Card.Content>
    //             {/* <Card.Content style={{flex: 1, flexDirection: 'column'}}>
                   
    //             <Paragraph style={{color: 'white', fontSize: 12}}> {'\n'}{'\n'} {reformatText(healthLabels)} {'\n'}{'\n'}
    //               </Paragraph> 
    //             </Card.Content> */}
                
    //         </Card>

    //     )

    //   }
    const reformatLabels = (textArray) => {

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
      const[recipeDetails, setRecipeDetails] = useState(null);

      function getRecipeDetails(id){
        fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=f62cff1bf2de4dacb716d4046f45a53e`)
        .then(response => response.json())
        .then(response => setRecipeDetails(response))
        .catch(err => console.error(err))

        // console.log(recipeDetails, 'huh')
      }
      useEffect(() => {
        getRecipeDetails(route.params.theid)
      }, []);

    //   if(recipeDetails !== null){
    //     var val = 'Fat';
    //     var index = recipeDetails.nutrition.nutrients.findIndex(function(item, i){
    //         return item.name === val
    //       });
    //     // console.log(recipeDetails.summary.replaceAll('<b>', '').replaceAll('</b>','').replaceAll('"', '').substring(0, recipeDetails.summary.indexOf("This score is")))
    //     console.log(recipeDetails.nutrition.nutrients[index])
    //     // console.log(recipeDetails.nutrition.caloricBreakdown)
    //     // console.log(recipeDetails.summary.replaceAll('<b>', '').replaceAll('</b>',''))
    //   }
      const getMacro= (macro) => {
        var index = recipeDetails.nutrition.nutrients.findIndex(function(item, i){
            return item.name === macro
          });


          return index;
      }


      return(
        <SafeAreaView style={{flex: 1, backgroundColor: '#0A0F1D'}}>
         <StatusBar
         barStyle={'light-content'}
         backgroundColor={backgroundStyle.backgroundColor}
 
         />
         <ScrollView>
         <Card style={{backgroundColor: "#202020"}}>
                <Card.Content>
                  <Text style={{color: 'white', fontSize:30, textAlign: 'center', padding: 20, fontFamily: 'Thonburi-Bold'}}>{route.params.thetitle}</Text>
                    {/* <Title style={{textAlign: 'center', color: 'white', fontSize: 26, fontWeight: 'bold'}}>{route.params.thetitle}</Title> */}
                    {/* <Text>{'\n'}</Text> */}
                    {route.params.image !== null && route.params.image !== "" ? <Image source={{uri: route.params.theimage}} style={{width: 300, height: 200, alignSelf:'center', resizeMode:'contain'}}></Image> : <Text style={{color:'white', textAlign:'center', fontSize: 20}}> No picture from API D:</Text>}
                    <Text style={{color:'white', fontSize:18, textAlign: 'center', fontWeight: 'bold', fontSize: 15}}>{'\n'}Maronutrients (per serving) </Text>
                    {
                    recipeDetails !== null ?
                        (<Text style={{color:'white', fontSize:16, textAlign: 'center', fontWeight: 'bold'}}>
                           Calories: {recipeDetails.nutrition.nutrients[getMacro('Calories')].amount} kcal
                        
                        </Text>
                      
                        
                        
                        )
                        
                        
                    :
                    <Paragraph></Paragraph>
                   }
                   {
                    recipeDetails !== null ?
                        (<Text style={{color:'white', fontSize:16, textAlign: 'center'}}>
                          Protein: {recipeDetails.nutrition.nutrients[getMacro('Protein')].amount} g
                        
                        </Text>
                      
                        
                        
                        )
                        
                        
                    :
                    <Paragraph></Paragraph>
                   }

{
                    recipeDetails !== null ?
                        (<Text style={{color:'white', fontSize:16, textAlign: 'center'}}>
                           Fat: {recipeDetails.nutrition.nutrients[getMacro('Fat')].amount} g
                        
                        </Text>
                      
                        
                        
                        )
                        
                        
                    :
                    <Paragraph></Paragraph>
                   }
                   {
                    recipeDetails !== null ?
                        (<Text style={{color:'white', fontSize:16, textAlign: 'center'}}>
                           Carbs: {recipeDetails.nutrition.nutrients[getMacro('Carbohydrates')].amount} g
                        
                        </Text>
                      
                        
                        
                        )
                        
                        
                    :
                    <Paragraph></Paragraph>
                   }
                   {
                    recipeDetails !== null ?
                    (


                        <View style={{flexDirection:"row", justifyContent:'space-between',  marginLeft:30, marginRight:30, marginTop:20, marginBottom: 15}}> 
                        <Text style={{color:'white', fontSize:20}}>
                          <Text style={{fontWeight:'bold'}}>Total Time: </Text> 
                        {recipeDetails.readyInMinutes} mins
                        </Text>
                        <Text style={{color:'white', fontSize:20}}>
                          <Text style={{fontWeight:'bold'}}>Servings: </Text> 
                          {recipeDetails.servings}</Text>
                      </View>
                    )

                    :
                        <Paragraph></Paragraph>

                   }
                   
                    {/* <Paragraph style={{color: 'white', fontSize: 25, fontWeight: 'bold', fontFamily: 'Thonburi-Bold', marginBottom: 5}}>Ingredients: </Paragraph> */}
                    <Text style={{color: '#86CBF6', fontSize:25, fontFamily: 'Thonburi-Bold', textAlign:'center', marginBottom:5}}>Ingredients</Text>
                    {

                        recipeDetails !== null ?
                        
                        (recipeDetails.extendedIngredients.map((items, index)=>(
                            <Text key={index} style={{color:'white', fontSize:20, marginLeft:25, marginRight:25}}>
                            • {items.amount} {items.unit} {items.name}
                          
                           </Text>
                         
                       ))
                       )

                       

                       :
                       <Paragraph></Paragraph>
                    }
              
                    <Text style={{color: '#86CBF6', fontSize:25, fontFamily: 'Thonburi-Bold', textAlign:'center', marginBottom:5, marginTop:15}}>Instructions</Text>
                    {

                        recipeDetails !== null ?
                        
                        (<Text style={{color:'white', fontSize:20, marginLeft:25, marginRight:25}}>
                        •{' '}
                        {recipeDetails.instructions[0] ==='<' ? recipeDetails.instructions.replaceAll('</li><li>','\n• ').substring(8).replace('</li></ol>','')
                        :
                        recipeDetails.instructions.replaceAll('\n','\n• ')
                        }
                     </Text>
                       )

                       

                       :
                       <Paragraph></Paragraph>
                    }

                    
                    

                    {/* (recipeDetails.extendedIngredients.map((items, index)=>(
                          <Paragraph style={{color:'white', fontSize:13, marginLeft:25, marginRight:25}}>
                          • {items.amount} {items.unit} {items.name}
                        
                         </Paragraph>
                       
                     ))) */}
                   
                    {/* <Text>{'\n'}</Text>
                    <Paragraph style={{color: 'white', fontSize: 13}}><Image source={require('../assets/calories.png')}></Image> Calories: {Math.round(route.params.thecalories)}</Paragraph>
                <Paragraph style={{color: 'white', fontSize: 13}}>🟢 Protein: {Math.round(route.params.theprotein)}g</Paragraph>
                <Paragraph style={{color: 'white', fontSize: 13}}>🟡 Fat: {Math.round(route.params.thefat)}g</Paragraph>
                <Paragraph style={{color: 'white', fontSize: 13}}>🔴 Carb: {Math.round(route.params.thecarbs)}g</Paragraph>
                <Text>{'\n'}</Text>
                    <Paragraph style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Ingredients:{'\n'}</Paragraph>
                    <Paragraph style={{color: 'white', fontSize: 13}}>{reformatText(route.params.theingredients)}</Paragraph>
                    <Text>{'\n'}</Text>
                    <Paragraph style={{color: 'white', fontSize: 9}}>{reformatLabels(route.params.thehealthlabels)}</Paragraph> */}
                </Card.Content>

            </Card>
         </ScrollView>
            

            </SafeAreaView>
      );
      


};
export default RecipeDetails;