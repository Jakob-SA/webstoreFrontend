import Products from './products.json'

function getItems(){
  return (
    <div className="d-flex">
     {
      Products.map((data,i)=>( 
        <div className='border m-2' key={i} > 
          <h1>{data.id} </h1>
          <p> {data.name}</p>
        </div>
        
      ))
     }
    </div>
  );
  
}
export default getItems