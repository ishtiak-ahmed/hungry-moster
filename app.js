const searchResults = document.getElementById('search-result')

// Searching for food
function searchFood() {
    const query = document.getElementById('food').value;
    getFood(query)
}

// Get Food results from server
function getFood(name) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`)
        .then(res => res.json())
        .then(data => showFood(data['meals']))
        .catch(err => showEmpty())
}

// Fucntion for showing search result
function showFood(foods) {
    searchResults.innerHTML = '';
    foods.forEach(food => {
        let foodItem = (food.strMeal)
        if (foodItem.length > 20) {
            foodItem = foodItem.slice(0, 20)
        };
        const imglink = (food.strMealThumb);
        const item = document.createElement('div');
        const id = food.idMeal;
        item.setAttribute('onclick', `singleFood(${id})`)
        item.className = 'item';
        item.innerHTML = `
        <div class="thumb">    
        <img src=${imglink}>
        </div>
            <h3>${foodItem}</h3>
        `
        searchResults.appendChild(item);
    });
}

// Function for showing empty search result
function showEmpty() {
    const h2 = document.createElement('h2')
    h2.innerText = "No result Found for this query. Try something else."
    searchResults.innerText = '';
    searchResults.appendChild(h2)
}

// Single food Item
function singleFood(id) {
    console.log('showing details')
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => renderFood(data.meals[0]))
}

// Render single food result
function renderFood(food) {
    const imglink = (food.strMealThumb);
    let foodItem = (food.strMeal);
    let instructions = food.strInstructions;
    if (instructions.length > 2000) {
        instructions = instructions.slice(0, 2000)
    };
    let ingredients = '';
    for (let i = 1; i < 6; i++) {
        const ingr = food[('strIngredient' + i)];
        ingredients += `${i}. ${ingr} `;
    }
    const foodDetail = document.getElementById('foodDetails');
    const foodBox = document.createElement('div')
    foodBox.className = 'show'
    foodBox.innerHTML = `
        <div class='thumbItem'><img src=${imglink}></div>
        <div class='info'>
        <h3>${foodItem}</h3>
        <p>${ingredients}</p> 
        <p>${instructions}</p>
        </div>
    `;
    foodDetail.appendChild(foodBox);
    foodDetail.addEventListener('click', () => {
        foodDetail.innerText = ''
    })
}