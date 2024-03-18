import { get } from "http";
import { listenerCount } from "process";

export async function fetchData(url:any) {
    const response = await fetch(url);
  
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = response.json();
    return data;
  

}



export async function getProducts() {
    let dataList = [];
  try {
    const data = await fetchData('https://raw.githubusercontent.com/CDIO-gr-17/FrontendWebApp/Dev/src/assets/media/products.json');
    dataList.push(data);
  } catch (error) {
    console.error('Error:', error);
  }
  return dataList;
}