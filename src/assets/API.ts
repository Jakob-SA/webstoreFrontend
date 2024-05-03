
async function fetchData(url: any) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  }


export async function getProducts() {

  try {
    const data = fetchData('https://dtu62597.eduhost.dk:10272/api/products');
    return data;
  } catch (error) {
    console.error('Error:', error);
  }

}