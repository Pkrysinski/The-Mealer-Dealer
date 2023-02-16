const createMealButtonHandler = async (event) => {

    event.preventDefault();

    document.location.replace('/api/meals/build_your_meal');

};

const viewPastMealsButtonHandler = async (event) => {

    event.preventDefault();

    document.location.replace('/api/meals/meal_history');

};

document.querySelector('#pastMealsBtn').addEventListener('click', viewPastMealsButtonHandler);
document.querySelector('#createMealBtn').addEventListener('click', createMealButtonHandler);
