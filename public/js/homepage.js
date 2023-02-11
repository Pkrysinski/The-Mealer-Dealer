// TODO: This is breaking during testing, but just threw it in last minute.  Need to come back and revisit.
const createMealButtonHandler = async (event) => {

    event.preventDefault();

    const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
  };

document.querySelector('#createMealBtn').addEventListener('click', createMealButtonHandler);
