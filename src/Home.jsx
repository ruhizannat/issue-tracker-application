import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"

const Home = () =>{
    const navigate=useNavigate()
    return(
        <div className="text-center">
            <h1 className="text-dark">Issue Tracker</h1>
            <Button variant="info" onClick={() =>navigate('/issues')}>Brows Issue</Button>
        </div>
    )
}
export default Home