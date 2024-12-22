const  NavBar = ({brand}) => {
    return (  
        <nav className="navbar navbar-dark bg-dark">
            <div className="container">
                <a href="!#" className="navbar-brand">{brand}</a>
                <ul className="navbar-nav">
                <li className="nav-item">  
                     <span className="nav-link text-light">
                     car items:
                     <span className="badge badge-light">0</span>
                        </span>
                        </li>
                       
            </ul>
            </div> 
           

        </nav>

    );
}
 
export default NavBar;