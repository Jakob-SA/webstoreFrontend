import './App.css'
import Basket from './assets/scripts/basket'
import UpsellItem from './assets/scripts/upsellItem'


function App() {
  return (
    <div >
      <div style ={{ display: 'flex', justifyContent: 'right' }}>
        <UpsellItem/>
        </div>
      <Basket/>
      
    </div>
  );
}

  


export default App
