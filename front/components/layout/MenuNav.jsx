import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Link from 'next/link';

const MenuNav = () => {
    return (
        <Navbar className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link href="/">
                            <a className="nav-link active" aria-current="page">Home</a>
                        </Link>
                        <Link href="/perfume">
                            <a className="nav-link" href="#">Perfume</a>
                        </Link>
                        <Link href="/feed">
                            <a className="nav-link" href="#">Forum</a>
                        </Link>
                        <Link href="/mypage">
                            <a className="nav-link" href="#">Mypage</a>
                        </Link>
                    </div>
                </div>
            </div>
        </Navbar>
    )
}

export default MenuNav
