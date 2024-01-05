import React from 'react';
import './styles/reset.css';
import './styles/App.css'

import Header from './components/Header';
import Hero from './components/Hero';
import CardContainer from './components/CardContainer';
import ViewProduct from './components/ViewProduct';
import ViewCategoryPage from './components/ViewCategoryPage';
import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Signup from './components/Signup';
import Footer from './components/Footer';
import Profile from './components/Profile';
import About from './components/About';
import Contact from './components/Contact';
import Privacy from './components/Privacy';
import TOS from './components/TOS';
import Refunds from './components/Refunds';
import FAQ from './components/FAQ';
import Search from './components/Search';

import Admin from './components/Admin';

import './styles/queries.css';

function App() {

  // const root = 'https://us-central1-vicewaves-back.cloudfunctions.net/api';
  const root = "http://localhost:3000";

  const [showDropdown, setShowDropdown] = React.useState(null);
  const [showAbout, setShowAbout] = React.useState(false);
  const [showContact, setShowContact] = React.useState(false);
  const [showPrivacy, setShowPrivacy] = React.useState(false);
  const [showRefunds, setShowRefunds] = React.useState(false);
  const [showFAQ, setShowFAQ] = React.useState(false);
  const [showTOS, setShowTOS] = React.useState(false);
  const [products, setProducts] = React.useState(null)
  const [page, setPage] = React.useState('home');
  const [currentProduct, setCurrentProduct] = React.useState(null);
  const [showShoppingCart, setShowShoppingCart] = React.useState(false);
  const [shoppingCartContents, setShoppingCartContents] = React.useState([])
  const [currentUser, setCurrentUser] = React.useState(null);
  const [beginSearch, setBeginSearch] = React.useState(false);
  const [openSmallMenu, setOpenSmallMenu] = React.useState(false);
  const [categorySearch, setCategorySearch] = React.useState(null);


  //reset categories when a new one is clicked
  // React.useEffect(() => {
  //   setViewSubCat(null);
  //   setViewMainCat(null);
  // }, [viewTag])

  // React.useEffect(() => {
  //   setViewSubCat(null);
  //   setViewTag(null);
  // }, [viewMainCat])

  // React.useEffect(() => {
  //   setViewTag(null);
  //   setViewMainCat(null);
  // }, [viewSubCat])

  React.useEffect(() => {
    try {
      //log user again if valid cookie
      async function attemptLoginUser() {
        const url = root + '/login'
        await fetch(url, {
          method: "GET",
          mode: 'cors',
          credentials: 'include'
        }).then((res) => res.json())
        .then((res) => {
          if (res) {
            // console.log('relogin', res);
            setCurrentUser(res);
          }
        })
      }
      attemptLoginUser();

      //reload shopping cart from localStorage
      if (JSON.parse(localStorage.getItem("cart"))) {
        setShoppingCartContents(JSON.parse(localStorage.getItem("cart")));
      }
    } catch(err) {
      console.log(err);
    }
  }, [])

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    if (page === "home") {
      try {
        async function getAllProducts() {
          const url = root + "/products/all";
          await fetch(url, {
            method: "GET",
            mode: "cors"
          }).then((res) => res.json())
          .then((res) => setProducts({
            topShirts: res.topShirts,
            topHome: res.topHome,
            topBottoms: res.topBottoms,
            newProducts: res.newProducts,
          }))
          .catch((err) => console.log(err));
        }
        getAllProducts();
        setShowShoppingCart(false);
      } catch(err) {
        console.log(err);
      }
    }
  }, [page])
  
  return (
    <div className="App" onClick={() => {setShowDropdown(null); setBeginSearch(false); setOpenSmallMenu(false)}}>
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
        root={root}
        setPage={setPage}
        categorySearch={categorySearch}
        setCategorySearch={setCategorySearch}
        setShowShoppingCart={setShowShoppingCart}
        shoppingCartContents={shoppingCartContents}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setCurrentProduct={setCurrentProduct}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        beginSearch={beginSearch}
        setBeginSearch={setBeginSearch}
        openSmallMenu={openSmallMenu}
        setOpenSmallMenu={setOpenSmallMenu}
      />

      <main>
        {page === "home" && products && <>
        <Hero 
          header="Latest SynthWave Merch"
          setPage={setPage}
          redirect={"new"}
          redirectText={"Go Now"}
        />
        <CardContainer 
          header={"Top Shirts"}
          productList={products.topShirts}
          setCurrentProduct={setCurrentProduct}
          setPage={setPage}
        />
        <CardContainer 
          header={"Top Accessories"}
          productList={products.topHome}
          setCurrentProduct={setCurrentProduct}
          setPage={setPage}
        />
        </>}

        {page === "search" && 
          <Search 
            root={root}
            setPage={setPage}
            setCurrentProduct={setCurrentProduct}
          />
        }

        {page === "viewCategory" &&
        <ViewCategoryPage
          root={root}
          categorySearch={categorySearch}
          setCategorySearch={setCategorySearch}
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
          setShowShoppingCart={setShowShoppingCart}
        />
        }

        {page === "checkout" &&
          <Checkout 
            root={root}
            setPage={setPage}
            shoppingCartContents={shoppingCartContents}
            setShoppingCartContents={setShoppingCartContents}
            currentUser={currentUser}
            setCurrentProduct={setCurrentProduct}
          />
        }

        {page === "login" &&
          <Login 
            root={root}
            setPage={setPage}
            setCurrentUser={setCurrentUser}
          />
        }

        {page === "signup" &&
          <Signup 
            root={root}
            setPage={setPage}
          />
        }

        {page === "admin" && 
          <Admin
            root={root}
            currentProduct={currentProduct}
            setCurrentProduct={setCurrentProduct}
            setPage={setPage}
          />
        }

        {page === "profile" && 
          <Profile 
            root={root}
            currentUser={currentUser}
            setCurrentProduct={setCurrentProduct}
            setPage={setPage}
          />
        }
        {showAbout && 
          <About 
            setPage={setPage}
            setShowAbout={setShowAbout}
          />
        }{showContact && 
          <Contact 
            setPage={setPage}
            setShowContact={setShowContact}
          />
        }
        {showPrivacy && 
          <Privacy 
            setPage={setPage}
            setShowPrivacy={setShowPrivacy}
          />
        }
        {showTOS && 
          <TOS 
            setPage={setPage}
            setShowTOS={setShowTOS}
          />
        }
        {showRefunds && 
          <Refunds 
            setPage={setPage}
            setShowRefunds={setShowRefunds}
          />
        }
        {showFAQ &&
          <FAQ 
            setPage={setPage}
            setShowFAQ={setShowFAQ}
          />
        }

        {page === "about" && 
          <About 
            setPage={setPage}
          />

        }

        {page === "contact" && 
          <Contact 
            setPage={setPage}
          />
        }
      </main>


      <Footer 
        setPage={setPage}
        setShowAbout={setShowAbout}
        setShowContact={setShowContact}
        setShowPrivacy={setShowPrivacy}
        setShowTOS={setShowTOS}
        setShowRefunds={setShowRefunds}
        setShowFAQ={setShowFAQ}
      />
    </div>
  )
}

export default App
