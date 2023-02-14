const createMealButtonHandler = async (event) => {

    event.preventDefault();

    document.location.replace('/api/meals/build_your_meal');

};

document.querySelector('#createMealBtn').addEventListener('click', createMealButtonHandler);
