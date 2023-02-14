const submitMealButtonHandler = async (event) => {

    event.preventDefault();
    // document.location.replace('/api/meals/meal_results');

    const quantityOfMeals = document.querySelector('#quantityOfMeals').value.trim();
    const quantityOfPeople = document.querySelector('#quantityOfPeople').value.trim();
    const main_protein = document.querySelector('#main_protein').value;
    const total_time = document.querySelector('#total_time').value;

    if (total_time && main_protein) {
      const params = total_time + "&" + main_protein;

      // const response = await fetch('/api/meals/meal_results', {
      //   method: 'POST',
      //   body: JSON.stringify({  quantityOfMeals, quantityOfPeople, main_protein }),
      //   headers: { 'Content-Type': 'application/json' },
      // });

      // if (response.ok) {
        document.location.replace(`/api/meals/meal_results/${params}`);
      } else {
        alert("Please make sure all fields are populated!");
      }
    //}    

};

document.querySelector('#submitMealBtn').addEventListener('click', submitMealButtonHandler);