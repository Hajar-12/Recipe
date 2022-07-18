const searchButton = document.getElementById('search-field')
const fav = document.createElement('div')
const random = document.createElement('div')
const randomRecipe = document.createElement('div')
const favorite = document.querySelector('.favorite')
const favoriteMeal = document.querySelector('.favorite-meal')
const mealPopUp = document.getElementById('meal-popup')
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
    // const name = recipe.strMeal
    // const img = recipe.strMealThumb
    // const mealId = recipe.idMeal
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
    // document.querySelector('.random').appendChild(randomRecipe)
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
    // elm.addEventListener('mouseover',()=>{
    //     // spn.innerText = 'click me'
    //     elm.style.opacity = '.5'
    //     spn.style.display = 'none'

    // })
    // elm.addEventListener('mouseout',()=>{
    //     elm.style.opacity = '1'
    //     spn.style.display = 'block'


    // })
})
// console.log(heart)
// heart.addEventListener('click',()=>{
//     console.log(recipe)
//     if(heart.classList.contains('fa-regular')){
//         addMealLS(recipe.idMeal)
//         heart.classList.remove('fa-regular')
//         console.log(recipe)
//         fav.innerHTML=''
//         // addMealToFav(recipe)
//         fetchFavMeal()
//         state = true;
//     }
//     else{
//         removeMealLs(recipe.idMeal)
//         heart.classList.add('fa-regular')
//         // const parent = document.querySelector('.fav-recipe').chi
//         // console.log(parent)
//         const id = document.getElementById(recipe.idMeal)
//         if(id.classList.contains('fav-meal')){
//             // console.log(id.classList.contains('fav-meal'))
//             id.remove()

//         }
//         }
// })

    // CHANGE COLOR OF HEART WHEN CLICK 
    // console.log(recipe)

    heart.forEach(a=>{
        a.addEventListener('click',async (e)=>{
            
            const mealId = a.parentElement.parentElement.parentElement.id
             const meal = await getMealById(mealId)

            if(a.classList.contains('fa-regular')){
                addMealLS(meal.idMeal)
                a.classList.remove('fa-regular')
                fav.innerHTML=''
                // addMealToFav(recipe)

                fetchFavMeal()
                state = true;
            }
            else{
                removeMealLs(meal.idMeal)
                a.classList.add('fa-regular')
                const id = document.getElementById(mealId)
                if(id.classList.contains('fav-meal')){
                    id.remove()
                    fav.innerHTML=''
                    fetchFavMeal()

                  

                }
                }
            })
    })
}
// ALL FAV MEALS


// ADD MEAL TO FAV MEAL
 function addMealToFav(meal){
    
    
    // const img = meal.strMealThumb
    // const mealId = meal.idMeal
        fav.classList.add('fav-recipe')
        fav.innerHTML += `<div  class='fav-meal'id='${meal.idMeal}'>
        <button  class='clear'><i class='fa fa-x fa-2xs'></i></button>
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
              
    //   showMealInfo(id,img,name,description)
    // //   showMealInfo(b)
            
    //         })
    //         imgText.addEventListener('mouseover',()=>{
    //             a.style.pointerEvents = 'all'
    //             imgText.style.opacity = '.1'
    //             imgText.innerHTML+='<p>click here</p>'

    //         })
    //         imgText.addEventListener('mouseout',()=>{
    //             // a.style.pointerEvents = 'all'
    //             imgText.style.opacity = '1'

    //         })
    //     })
    //     favoriteC.forEach(a =>{
    //         const clear = a.childNodes[0];
    //         clear.addEventListener('click',()=>{
    //             removeMealLs(a.id)
    //             const i = document.getElementById(a.id)
    //             i.remove()
                
    //         })
    //      })
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
    <button class="close-popup" id="close-popup">
        <i class="fa fa-times"></i>
    </button>
    <h3>${meal.strMeal}</h3>
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
    return mealIds === null ? [] : mealIds;
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
   let newMealIds = mealIds.slice(Math.max(mealIds.length - 5, 0))
   for(let i=0;i<newMealIds.length;i++){
       const mealId = newMealIds[i]
    meal =  await getMealById(mealId)
    addMealToFav(meal)
   }
}




// SCROLL FAV MEAL 
let pressed = false;
let startX;
let x;

// favorite.addEventListener('mousedown',(e)=>{
//     pressed = true;
//     startX = e.offsetX - fav.offsetLeft;
//     favorite.style.cursor = 'grabbing'

// })
// favorite.addEventListener('mouseenter',()=>{
//     favorite.style.cursor = 'grab'
    
// })
// favorite.addEventListener('mouseup',()=>{
//     favorite.style.cursor = 'grab'
// })
// window.addEventListener('mouseup',()=>{
//     pressed = false;

// })
// favorite.addEventListener('mousemove',(e)=>{
//     if(!pressed) return;
//     e.preventDefault();
//     x = e.offsetX
//     fav.style.left = `${x - startX}px`
//     checkBoundry()
// })

// function checkBoundry(){
//     const body = document.body;
//     let outer = fav.getBoundingClientRect()
//     let inner = fav.getBoundingClientRect()
//     if(parseInt(fav.style.left) > 0){
//         fav.style.left = '0px';
//     }
//     else if (inner.right < outer.right ){
//         fav.style.left = `-${inner.width - outer.width}px`
//     }
// }
// // const addedMealId = document.getElementById(mealId)
// // const id = addedMealId.getAttribute('id')
// // const div = document.getElementsByTagName('button')
// // div.addEventListener('click',()=>{
// //     alert('done');

// // })
// function clear()
// {
//     alert('done')

// }


// PRACTICE OF PROMISES
// const btn = document.querySelector('button');
// const move = (elm,amount,delay)=>{
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             const BodyBoundry = document.body.clientWidth;
//             const elRight = elm.getBoundingClientRect().right
//             const currLeft = elm.getBoundingClientRect().left
//             if(elRight + amount > BodyBoundry) {reject()}
//             else{
//                 elm.style.transform = `translateX(${currLeft + amount}px)`
//                 resolve()
//             }
//         },delay)
//     })
// }

// move(btn,100,500)
// .then(()=>move(btn,100,500)
// .then(()=>move(btn,100,500))
// .then(()=>move(btn,100,500))
// .then(()=>move(btn,100,500))
// .then(()=>move(btn,100,500))
// ).catch(()=>{
//     console.log('CANT MOVE')
// })

// function moveX(elm,amount,delay,callback){
//     setTimeout(()=>{
//         const BodyBoundry = document.body.clientWidth;
//         const elRight = elm.getBoundingClientRect().right
//         const currLeft = elm.getBoundingClientRect().left
//         if(elRight + amount > BodyBoundry) {
//             console.log('cant move')
//         }
//         else{
//             elm.style.transform = `translateX(${currLeft + amount}px)`
            
//         }
//     },delay) 
// }

// moveX(btn,100,1000,
//     moveX(btn,200,2000,
//         moveX(btn,300,3000)))
