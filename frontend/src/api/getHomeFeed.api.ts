export async function get_home_feed() {
  const url = 'http://localhost:8000/api/v1/users/home';
  const userData = {
    "page": "100",
    "limit": 5
  }
  try {
    const response = await fetch(url, {
      method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Success:', data.data.videos[0]);
    return data;
    
  } catch (error) {
    console.error('Fetch operation failed:', error.message);
  }
}