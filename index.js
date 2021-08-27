//Element from DOM
const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    mealsEl = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    single_mealsEl  = document.getElementById('single-meals');

//Functions
//Search meal and fetch from API

function searchMeal(e) {
    e.preventDefault();
    
    //Clear single meal
    single_mealsEl.innerHTML = '';

    //Get search term
    const term = search.nodeValue;

    //Check for empty
    if (term.trim()) {
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=${term}')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            resultHeading.innerHTML = `<h2>Results for '${term}'</h2>`;
            
            if (data.meals === null) {
                resultHeading.innerHTML = `<p>There are no Search results. Try again!</p>`;
            } else {
                mealsEl.innerHTML = data.meals.map(meal => `
                    <div class="meal">
                        <img scr="${meals.strMealThumb}"  alt="${meal.strMeal}"/>
                        <div class="meal-info" data-mealID="${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                `
                    )
                    .join('');
            }

            // Clea search text 
            search.value = '';
        })
    } else {
        alert('Please Type-in a Search Term or Keyword');
    }
}

// Fetch meal by ID
function getMealById(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0];

        addMealToDOM(meal);
    });
}

//Fetch Random Meal
function getRandomMeal() {
    //Clear meals and Heading
    mealsEl.innerHTML = '';
    resultHeading.innerHTML = (`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0];

        addMealToDOM(meal);
    });

    fetch()
}

//Add Meal to DOM
function addMealToDOM(meal) {
    const ingedients = [];

    for(let i = 1; i <= 20; 1++) {
        if(meal[`strIngedient${i}`]) {
            ingedients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }
    
    single_mealsEl.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img scr="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="single-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
            </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
            </div>
        </div>
    `
}

// Event listener
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);

mealsEl.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false;
        }
    });

    if (mealInfo) {
        const mealID = mealInfo.getAttribute('data-mailid');
        getMealById(mealID);
    }
});
