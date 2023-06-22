import React, {useState, useEffect, useContext} from 'react';
import {Storage} from '@aws-amplify/storage'
import uuid from 'react-uuid';

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
     Image
     
    
   } from 'react-native';

 
 import
 MaterialCommunityIcons
from 'react-native-vector-icons/MaterialCommunityIcons';
   
   import styles from '../styles/styles.js'
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../src/models';
import {UserContext, IdContext} from '../context/UserContext'


const RecipeOfDay = ({ navigation, route }) => {
    const [recipe, setRecipe] = useState(route.params)
     const isDarkMode = useColorScheme() === 'dark';
 
     const backgroundStyle = {
         backgroundColor: isDarkMode ?  "#FFFFFF" : "#dae1f7"
     };

     const getMacro= (macro) => {
      var index = recipeNutrition.nutrition.nutrients.findIndex(function(item, i){
          return item.name === macro
        });


        return index;
    }
    const [recipeNutrition, setNutrition] = useState(null)
    useEffect(() => {
     
  // console.log(recipe.recipes[0].id)
  getNutrition(recipe.recipes[0].id)

  }, []

    )
    function getNutrition(id){
      fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=960e541de5f54e48b9e7c1a7075e5719`)
      .then(response => response.json())
      .then(response => [setNutrition(response)])
      .catch(err => console.error(err, 'bruho?'));

      // console.log(recipeNutrition.nutrition.nutrients[getMacro('Calories')].amount)
    }
     return (
   
      
         <SafeAreaView style={styles.sectionContainer2}>
             <StatusBar
         barStyle={'light-content'}
         backgroundColor={backgroundStyle.backgroundColor}
         />
         <ScrollView>
         {
           recipe ?
           <View>
            <Text style={{color: 'white', fontSize:30, textAlign: 'center', padding: 20, fontFamily: 'Thonburi-Bold'}}>{recipe.recipes[0].title}</Text>
            {recipe.recipes[0].image ? <Image source={{uri: recipe.recipes[0].image}}
                   style={{width: 300, height: 200, alignSelf:'center', resizeMode:'contain'}} />
                   :
                    <View style={{borderColor: "white", borderWidth: '0.4px', width: 300, height: 200, backgroundColor:'#121212', 
                    justifyContent: 'center', alignSelf:'center'}} 
         >
           <Text style={{color:'white', textAlign:'center', fontSize: 20}}> No picture from API :(</Text>
         </View>
            }
                    <Text style={{color:'white', fontSize:18, textAlign: 'center', fontWeight: 'bold', fontSize: 15}}>{'\n'}Maronutrients (per serving) </Text>

                    {recipeNutrition !== null && recipeNutrition !== undefined ? <Text style={{color:'white', fontSize:16, textAlign: 'center', fontWeight: 'bold'}}>
                           Calories: {recipeNutrition.nutrition.nutrients[getMacro('Calories')].amount} kcal
                        
                        </Text> : <Text></Text>}
                    {recipeNutrition !== null && recipeNutrition !== undefined ? <Text style={{color:'white', fontSize:16, textAlign: 'center'}}>
                        Protein: {recipeNutrition.nutrition.nutrients[getMacro('Protein')].amount} g
                    
                    </Text> : <Text></Text>}
                    {recipeNutrition !== null && recipeNutrition !== undefined ? <Text style={{color:'white', fontSize:16, textAlign: 'center'}}>
                        Fat: {recipeNutrition.nutrition.nutrients[getMacro('Fat')].amount} g
                    
                    </Text> : <Text></Text>}

                    {recipeNutrition !== null && recipeNutrition !== undefined ? <Text style={{color:'white', fontSize:16, textAlign: 'center'}}>
                        Carbs: {recipeNutrition.nutrition.nutrients[getMacro('Carbohydrates')].amount} g
                    
                    </Text> : <Text></Text>}
                      <View style={{flexDirection:"row", justifyContent:'space-between',  marginLeft:30, marginRight:30, marginTop:20, marginBottom: 15}}> 
                      
                      
                        <Text style={{color:'white', fontSize:20}}>
                          <Text style={{fontWeight:'bold'}}>Total Time: </Text> 
                        {recipe.recipes[0].readyInMinutes} mins
                        </Text>
                        <Text style={{color:'white', fontSize:20}}>
                          <Text style={{fontWeight:'bold'}}>Servings: </Text> 
                          {recipe.recipes[0].servings}</Text>
                      </View>
                      <Text style={{color: '#86CBF6', fontSize:25, fontFamily: 'Thonburi-Bold', textAlign:'center', marginBottom:5}}>Ingredients</Text>
                        {recipe.recipes[0].extendedIngredients.map((items, index)=>(
                          <Text key={uuid()} style={{color:'white', fontSize:20, marginLeft:25, marginRight:25}}>
                          • {items.amount} {items.unit} {items.name}
                           </Text>
                        ))}
                     
                      <Text style={{color: '#86CBF6', fontSize:25, fontFamily: 'Thonburi-Bold', textAlign:'center', marginBottom:5, marginTop:15}}>Instructions</Text>
                       <Text style={{color:'white', fontSize:20, marginLeft:25, marginRight:25}}>
                         •{' '}
                         {recipe.recipes[0].instructions[0]==='<' ? recipe.recipes[0].instructions.replaceAll('</li><li>','\n• ').substring(8).replace('</li></ol>','')
                         :
                         recipe.recipes[0].instructions.replaceAll('\n','\n• ')
                         }
                      </Text>
            </View>
           :
           ""
         }
         </ScrollView>
      </SafeAreaView>
     
    
         
     );
     
   };
   export default RecipeOfDay;