// TODO: This is breaking during testing, but just threw it in last minute.  Need to come back and revisit.
const createMealButtonHandler = async (event) => {

    event.preventDefault();

    document.location.replace('/api/meals/build_your_meal');

  };

document.querySelector('#createMealBtn').addEventListener('click', createMealButtonHandler);
