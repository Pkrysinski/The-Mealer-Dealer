const submitMealButtonHandler = async (event) => {

    event.preventDefault();

    document.location.replace('/api/meals/meal_results');

};

document.querySelector('#submitMealBtn').addEventListener('click', submitMealButtonHandler);
