const toggleCookedButtonHandler = async (event) => {

    if (event.target.hasAttribute('data-id')) {

        const id = event.target.getAttribute('data-id');
        const cooked = event.target.checked;
    
        const response = await fetch(`/api/meals/meal_results/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
              cooked,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
        });
    
        if (response.ok) {
          console.log("good job!");
        } else {
          alert('Issue changing cooked toggle!');
        }
      }
};

document.querySelectorAll('.cooked-toggle').forEach(input => {
    input.addEventListener('click', toggleCookedButtonHandler);
  });