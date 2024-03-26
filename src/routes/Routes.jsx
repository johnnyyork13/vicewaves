import { Routes, Route } from 'react-router-dom';
import Hero from '../components/Hero';
import CardContainer from '../components/CardContainer';
import Search from '../components/Search';
import ViewCategoryPage from '../components/ViewCategoryPage';
import ViewProduct from '../components/ViewProduct';
import Checkout from '../components/Checkout';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Admin from '../components/Admin';
import Profile from '../components/Profile';
import About from '../components/About';
import Contact from '../components/Contact';

export default function MainContainer(props) {

    return <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/products" element={<CardContainer />} />
        <Route path="/search" element={<Search />} />
        <Route path="/category/:category" element={<ViewCategoryPage />} />
        <Route path="/product/:id" element={<ViewProduct />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
    </Routes>
}