import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Navbar = () => {
    const {user, logout} = useContext(AuthContext);
    const handleLogout = () => {
        logout();
        navigate("/login")
        toast.success('Logout Successfull');
    }
    return (
        <nav className="flex items-center justify-between pz-3 py-4">
            <div className="flex px-6 py-4">
                <p className="text-3xl font-extrabold px-8">Authentication</p>
            </div>
            <div className="px-5">
               {
                user ? <div className="flex space-x-5"> <p className="font-bold text-lg bg-blue-500 text-white p-3 rounded-lg">
                    {user.username }
                </p> 

                {/* logout */}
                <button onClick={handleLogout} className="px-3 mr-4 py-3 text-lg font-bold bg-green-500 rounded-lg hover:scale-105 duration-200 text-white">Logout</button>
                 </div>: <> <Link to="/login" className="px-3 mr-4 py-3 text-lg font-bold bg-gradient-to-r from-blue-500 to-fuchsia-500 hover:opacity-80 rounded-lg hover:scale-105 duration-200 text-white">Login / Signup</Link>
                {/* logout */}

                </>
               }
            </div>
        </nav>
    )
}

export default Navbar;