import React from 'react';
import './styles/reset.css';
import './styles/App.css'

import {v4 as uuidv4} from 'uuid';

import Header from './components/Header';
import Card from './components/Card';
import ViewProduct from './components/ViewProduct';

function App() {

  const root = 'http://localhost:3000';

  const [products, setProducts] = React.useState([])
  const [page, setPage] = React.useState('home');
  const [currentProduct, setCurrentProduct] = React.useState(null);
  const [updateDatabase, setUpdateDatabase] = React.useState(false);

  React.useEffect(() => {
    if (updateDatabase) {
      const url = "http://localhost:3000/admin/update-database"
      // const url = 'http://localhost:3000/admin/categories';
      async function test() {
        await fetch(url, {
          method: "GET",
          mode: "cors",
        }).then((res) => res.json()).then((data) => setShirt(data));
      }
      test();
    }
  }, [updateDatabase]);

  React.useEffect(() => {
    try {
      async function getAllProducts() {
        const url = root + "/products/all";
        await fetch(url, {
          method: "GET",
          mode: "cors"
        }).then((res) => res.json())
        .then((res) => setProducts(res.allProducts))
        .catch((err) => console.log(err));
      }
      getAllProducts();
    } catch(err) {
      console.log(err);
    }
  }, [])

  const mappedProducts = products.map((product) => {
    return <Card 
              key={uuidv4()}
              product={product}
              setCurrentProduct={setCurrentProduct} 
              setPage={setPage}
      />
  })

  return (
    <div className="App">
      <button type="button" onClick={() => setUpdateDatabase((prev) => !prev)}>Update Database</button>
      <Header />
      {page === "home" && <div className="card-container">
        {mappedProducts}
      </div>}
      {page === "view-product" && 
      <ViewProduct 
        root={root}
        setPage={setPage}
        currentProduct={currentProduct}
      />
      }

    </div>
  )
}

export default App
