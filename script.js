const searchButton = document.getElementById('search-field')
const fav = document.createElement('div')
const random = document.createElement('div')
const randomRecipe = document.createElement('div')
const favorite = document.querySelector('.favorite')
const favoriteMeal = document.querySelector('.favorite-meal')
const mealPopUp = document.getElementById('meal-popup')
// const showAll = document.querySelector('.show-all-fav');

let state ;




// GET RANDOM MEAL
async function getRandomRecipe(){
    const prm = await fetch('https://www.themealdb.com/api/json/v1/1/random.php/')
    const recipe = await prm.json()
    const meal = recipe.meals[0]
    addRecipe(meal,true)
}

// GET MEAL BY ITS ID
async function getMealById(id){
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+ id)
    const respData = await resp.json()
    const meal = respData.meals[0]
    return meal;
}

// GET MEAL BY SEARCH WORD
async function getMealBySearch(search){
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + search)
    const respData = await resp.json()
    const meals = respData.meals    
    return meals;    

}

//  SERCH 
async function serchEvent(){
    const searchInput = document.querySelector('input')
    const inputValue = searchInput.value;
    if(inputValue){
    randomRecipe.innerHTML = ''
    const heart = randomRecipe.querySelectorAll('.random-recipe .fa-regular')
    const searchVal = await getMealBySearch(inputValue)
    if(searchVal){
        

        searchVal.forEach(a=>{
            addRecipe(a,false) 
        
        })
        
    }
    else{
        randomRecipe.innerHTML = `<div class='no-result'><h2>There is no result</h2></div>`
    }
      }   
}

// EVENT ON SEARCH ICON 
search.addEventListener('click', ()=>{    
   serchEvent();
})
search.addEventListener('keypress', (e)=>{  
    if(e.keyCode == 13){
        serchEvent();
    }  
   
})



// ADD RANDOM MEAL TO PAGE
 function addRecipe(recipe,span){
    random.classList.add('random')
    randomRecipe.classList.add('random-recipe')
    randomRecipe.innerHTML += `<div  id="${recipe.idMeal}"class='meal-contain'>
    ${ span  ?      '<span>recipe of the day</span>' : ''}
     <img class='img-random'src="${recipe.strMealThumb}">
     <div>
     <h5>${recipe.strMeal}</h5>
     <button class="h">
     <i id='heart'class="fa fa-regular fa-heart"></i>
     </button>
     </div>
     </div>`
    document.getElementById('recipeContainer').appendChild(randomRecipe)
    const heart = randomRecipe.querySelectorAll('.random-recipe .fa-regular')
    const image = document.querySelectorAll('.img-random')
  
image.forEach(a=>{
    const elm = a.childNodes[3]
    const spn = a.childNodes[1]
console.log(a)
    a.addEventListener('click',async ()=>{
        const imageId = a.parentElement.id
        console.log(imageId)
        const meal = await getMealById(imageId)
        showMealInfo(meal)

    })
 
})


    heart.forEach(a=>{
        a.addEventListener('click',async (e)=>{
            
            const mealId = a.parentElement.parentElement.parentElement.id
             const meal = await getMealById(mealId)

            if(a.classList.contains('fa-regular')){
                
                addMealLS(meal.idMeal)
              addMealToFav(meal)
          
                // fetchFavMeal()
                a.classList.remove('fa-regular')
              
                state = true;
            }
            else{
                removeMealLs(meal.idMeal)
                a.classList.add('fa-regular')
                const id = document.getElementById(mealId)
                if(id.classList.contains('fav-meal')){
                    id.remove()
                    // favorite.innerHTML=''
                    // fetchFavMeal()

                  

                }
                }
                
            })
    })
}

// ADD MEAL TO FAV MEAL
 function addMealToFav(meal){
    
    

        fav.classList.add('fav-recipe')
        fav.innerHTML += `<div  class='fav-meal'id='${meal.idMeal}'>
        <span  class='clear'><i class='fa fa-x fa-2xs'></i></span>
        <img  class='img-fav'src="${meal.strMealThumb}">
        <h5>${meal.strCategory}</h5></div>`

        favorite.appendChild(fav)
        const lc = document.querySelectorAll('.clear')
        const favoriteC = fav.childNodes
        const favAll = document.querySelectorAll('.fav-meal')
        const imgFav = document.querySelectorAll('.img-fav')
        
    favAll.forEach(a=>{
        const elm = a.childNodes[3]
            elm.addEventListener('click',async ()=>{

                    const meal = await getMealById(a.id)
                    console.log(meal)
                    showMealInfo(meal)
                
                
        
            })
        })
              
 
    lc.forEach(a=>{
        a.addEventListener('click',async ()=>{
            const meal = await getMealById(a.parentElement.id)
            removeMealLs(meal.idMeal)
                        const i = document.getElementById(meal.idMeal)
                        i.remove()
                        fav.innerHTML=''
                        fetchFavMeal()
        })
    })
    
        
        
}

async function showMealInfo(meal){
    const Ingredient = []
     
    for(let i=1;i<=20;i++){
        if(meal['strIngredient'+i]){
            Ingredient.push( `${meal['strIngredient'+i]} / ${meal['strMeasure'+i]}`)
            
        }
        else{
            break;
        }
        
        
    }
 
    mealPopUp.innerHTML+=`<div class="meal-show" id='${meal.idMeal}'>
  
    <div class='d-flex justify-content-between'>
    <h3>${meal.strMeal}</h3>
    <span class="close-popup" id="close-popup">
        <i class="fa fa-times"></i>
    </span>
    </div>
    
    <div class="meal-img">
        <img src="${meal.strMealThumb}" alt="">
    </div>
    <h3>Ingredient and Measure</h3>
    <ul>
    
      ${Ingredient.map(ing=>
         `<li>${ing}</li> `).join('')
      }  
    </ul>
    <h3>Instruction</h3>
    <p>${meal.strInstructions}</p>
</div>`

const popUpClose = document.getElementById('close-popup')

popUpClose.addEventListener('click',()=>{
mealPopUp.classList.add('hidden');
mealPopUp.innerHTML=''
})
    mealPopUp.classList.remove('hidden')
  
        
    
}

// REMOVE MEAL FROM FAV
function removeMealToFav(id,meal){  
    
    const mealId = document.getElementById(id)
    if(mealId.id === id){
        mealId.innerHTML = ''
        
    }   

}
// CALL FAV MEAL
fetchFavMeal()
function showMeal(){
    fav.style.pointerEvents = 'all';
    alert('no')
}
// STORE RANDOM RECIPE WE HAVE CHOSEN TO THE LOCAL STORAGE
getRandomRecipe()
function addMealLS(mealId){
    
    const mealIds = getMealLS()
    if(!mealIds.includes(mealId)){
        localStorage.setItem('mealId',JSON.stringify([...mealIds,mealId]))
    }

}

// GET MEAL FROM LOCAL STORAGE
function getMealLS(){
    const mealIds = JSON.parse(localStorage.getItem('mealId'))
    return mealIds === null ? []: mealIds;
}


// REMOVE MEAL FROM LOCAL STORAGE
function removeMealLs(mealId){
    const mealIds = getMealLS();
    const newId = mealIds.filter(id=> {return id !== mealId}) 
    localStorage.setItem('mealId',JSON.stringify(newId))
}

// FETCH MEAL BY ID FROM API

async function fetchFavMeal(){
    const meals = []
    
   const mealIds = getMealLS()
   if(mealIds.length === 0){
    favorite.innerHTML = `<h6 class='text-muted p-4'>you have not added any meal</h6>`;
   }
   
   else{
    for(let i=0;i<mealIds.length;i++){
        const mealId = mealIds[i]
     let meal =  await getMealById(mealId)
     addMealToFav(meal)
    }
   }
   console.log(mealIds);
  
   
}

// SHOW ALL FAV 
// showAll.addEventListener('click',()=>{
//     favorite.classList.toggle('show-all');
//     if (!favorite.classList.contains('show-all')){
//         showAll.innerText = 'show more'
//     }
//     else{
//         showAll.innerText = 'show less'
//     }
// })


// SCROLL FAV MEAL 
let pressed = false;
let startX;
let x;


