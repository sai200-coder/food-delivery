import React, { Profiler, useContext, useState, useEffect } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'


const Navbar = ({setShowLogin}) => {

    const [menu,setMenu] = useState("home");
    const [showSearch, setShowSearch] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const {getTotalCartAmount,token,setToken} = useContext(StoreContext);

    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const sections = {
                home: 0,
                menu: document.querySelector('#explore-menu')?.offsetTop,
                'moblie-app': document.querySelector('#app-download')?.offsetTop,
                'contact us': document.querySelector('#footer')?.offsetTop
            };

            const scrollPosition = window.scrollY + 100;

            if (scrollPosition < (sections.menu || 0)) {
                setMenu("home");
                return;
            }

            for (const [key, value] of Object.entries(sections)) {
                if (value && scrollPosition >= value) {
                    setMenu(key);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logout = ()=>{
      localStorage.removeItem("token");
      setToken("");
      navigate("/")
    }
    
    const handleSearchClick = () => {
        setShowSearch(!showSearch);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log("Search Term:", searchInput);
        setSearchInput("");
        setShowSearch(false);
    };

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };

  return (
    <div className='navbar'>
       <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link> 
        <ul className="navbar-menu">
            <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""} >home</Link>
            <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""} >menu</a>
            <a href='#app-download' onClick={()=>setMenu("moblie-app")} className={menu==="moblie-app"?"active":""} >mobile-app</a>
            <a href='#footer' onClick={()=>setMenu("contact us")} className={menu==="contact us"?"active":""} >contact us</a>
        </ul>
        <div className="navbar-right">
            <div className="search-container">
                <img src={assets.search_icon} alt='' onClick={handleSearchClick} />
                {showSearch && (
                    <form onSubmit={handleSearchSubmit} className="search-form">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="search-input"
                            value={searchInput}
                            onChange={handleInputChange}
                        />
                         <button type="submit" style={{display:"none"}}></button>
                    </form>
                )}
            </div>
            <div className="navbar-search-icon">
               {token ? 
                 <Link to='/cart'><img src={assets.basket_icon} alt=''/></Link> 
                 : 
                 <img src={assets.basket_icon} alt='' onClick={() => setShowLogin(true)}/>
               }
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
            </div>
            {!token?<button onClick={()=>setShowLogin(true)}>sign in</button>
            :<div className='navbar-profile'>
              <img src={assets.profile_icon} alt="" />
              <ul className='nav-profile-dropdown'>
                <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                <hr />
                <li onClick={logout} ><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                </ul></div>}
            
        </div>

      
    </div>
  )
}

export default Navbar
