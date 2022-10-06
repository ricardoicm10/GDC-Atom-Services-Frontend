import { useRef } from 'react'
import {FaBars,FaTimes} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import "./Navbar.css"

function NavBar(){

    const navRef = useRef()

    const showNavBar = () => {
        navRef.current.classList.toggle('responsive_nav')
    }

    return(
        <header className='nav-bar'>
            <h3>Intel</h3>
            <nav ref={navRef}>
                <Link to="/requests">
                     Tracking Service Request
                </Link>
                <Link to="/spec-cpu-2017/results">
                    Spec Results
                </Link>
                <button className='nav-btn nav-close-btn' onClick={showNavBar}>
                    <FaTimes/>
                </button>
            </nav>
            <button className='nav-btn' onClick={showNavBar}>
                <FaBars/>
            </button>
        </header>
    )
}

export default NavBar