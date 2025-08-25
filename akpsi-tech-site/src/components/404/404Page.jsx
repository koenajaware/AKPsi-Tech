import '../../styles/404/404Page.css';

const NotFoundPage = () => {
    return ( 
        <div className="notfound-container">
            <h1>404</h1>
            <h2>Oops! Page not found.</h2>
            <p>The page you are looking for does not exist.</p>
            <a href="/">Home</a>
        </div>
    )
} 

export default NotFoundPage; 