import { useContext } from "react"
import AuthContext from "../context/AuthContext"

const Home = () => {
    const {user} = useContext(AuthContext);
    return (
        <div className="p-4">
            <p className="text-3xl">
                Welcome <span className="font-bold text-blue-500">
                    {user?.username}
                </span>
            </p>
        </div>
    )
}

export default Home;