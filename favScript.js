// GET MEAL BY ITS ID
async function getMealById(id){
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+ id)
    const respData = await resp.json()
    const meal = respData.meals[0]
    return meal;
}
getMealById()
const allFav = document.querySelector('.all-favorite')
console.log(allFav);
fetchFavMeal()

allFav.innerHTML += `
<div class="all-fav d-flex justify-content-between w-80">
                <div class="d-flex justify-content-around" id='${meal.idMeal}'>
                    <div>
                        <img class='rounded-3'src="${meal.strMealThumb}" alt="">
                    </div>
                    <div class="m-auto p-4">
                        <p>${meal.strCategory}</p>
                    </div>
                </div>
                <div>
                    <button  class='clear'><i class='fa  fa-trash'></i></button>
                </div>
            </div>
        </div>
`


async function fetchFavMeal(){
    const meals = []
   const mealIds = getMealLS()
   let newMealIds = mealIds.slice(Math.max(mealIds.length - 5, 0))
   for(let i=0;i<newMealIds.length;i++){
       const mealId = newMealIds[i]
    let meal =  await getMealById(mealId)
    addMealToFav(meal)
   }
}