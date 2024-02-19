document.getElementById('antal').addEventListener('change', event => {
    let price = event.target.value * 100;
    document.getElementById('price').textContent = price.toString() + ' kr'
} )
