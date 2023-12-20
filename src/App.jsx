import React from 'react';
import './styles/reset.css';
import './styles/App.css'

import {v4 as uuidv4} from 'uuid';

import Header from './components/Header';
import Hero from './components/Hero';
import CardContainer from './components/CardContainer';
import ViewProduct from './components/ViewProduct';
import ViewTagPage from './components/ViewTagPage';
import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/Checkout';

import Admin from './components/Admin';

function App() {

  const root = 'http://localhost:3000';

  const [products, setProducts] = React.useState([])
  const [page, setPage] = React.useState('home');
  const [viewTag, setViewTag] = React.useState("none");
  const [currentProduct, setCurrentProduct] = React.useState(null);
  const [showShoppingCart, setShowShoppingCart] = React.useState(false);
  const [shoppingCartContents, setShoppingCartContents] = React.useState([])

  React.useEffect(() => {
    try {
      // for (const key in localStorage) {
      //   const product = JSON.parse(localStorage.getItem(key));
      //   if (product && product.name && product.external_id) {
      //     setShoppingCartContents((prev) => ([
      //       ...prev,
      //       product
      //     ]))
      //   }
      // }

      if (JSON.parse(localStorage.getItem("cart"))) {
        setShoppingCartContents(JSON.parse(localStorage.getItem("cart")));
      }
    } catch(err) {
      console.log(err);
    }
  }, [])

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
      setShowShoppingCart(false);
    } catch(err) {
      console.log(err);
    }
  }, [page])

  
  return (
    <div className="App">
      {showShoppingCart && 
        <ShoppingCart 
          setShowShoppingCart={setShowShoppingCart}
          shoppingCartContents={shoppingCartContents}
          setShoppingCartContents={setShoppingCartContents}
          setPage={setPage}
          setCurrentProduct={setCurrentProduct}
        />
      }
      
      <Header 
        setPage={setPage}
        setViewTag={setViewTag}
        setShowShoppingCart={setShowShoppingCart}
      />


      {page === "home" && <>
      <Hero />
      <CardContainer 
        productList={products}
        setCurrentProduct={setCurrentProduct}
        setPage={setPage}
      />
      </>}


      {page === "viewTag" &&
      <ViewTagPage 
        root={root}
        viewTag={viewTag}
        setCurrentProduct={setCurrentProduct}
        setPage={setPage}
      />
      }


      {page === "viewProduct" && 
      <ViewProduct 
        root={root}
        setPage={setPage}
        currentProduct={currentProduct}
        setShoppingCartContents={setShoppingCartContents}
        shoppingCartContents={shoppingCartContents}
      />
      }

      {page === "checkout" &&
        <Checkout 
          root={root}
          setPage={setPage}
          shoppingCartContents={shoppingCartContents}
          setShoppingCartContents={setShoppingCartContents}
        />
      }


      {page === "admin" && 
        <Admin
          root={root}
          currentProduct={currentProduct}
        />
      }
    </div>
  )
}

export default App
