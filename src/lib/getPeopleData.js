export const getPeopleData = async (page, search) => {
  const url = `https://swapi.dev/api/people/?page=${page}${search.length ? `&search=${encodeURIComponent(search)}` : ''}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Network response was nto ok: ${response.status}`);
    }
    return response.json();
  }
  catch (error) {
    console.log('Error:', error)
  }
}