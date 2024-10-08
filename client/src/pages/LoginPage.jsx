import { motion } from "framer-motion"
import { Mail, Lock, Loader } from 'lucide-react'
import Input from "../components/Input";
import { useState } from "react";
import { Link } from 'react-router-dom'
import { useAuthStore } from "../store/store";
// import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {login, isLoading, error} = useAuthStore();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <motion.div
      initial={{
        opacity: 0, y: 20
      }}
      animate={{
        opacity: 1, y: 0
      }}
      transition={{ duration: 0.5 }}
      className=" max-w-md max-md:max-w-sm max-md:mx-4 w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden "
    >
      <div className=" p-8">
        <h2 className=" text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Welcome Back
        </h2>

        <form onSubmit={handleSignup}>
          <Input
            icon={Mail}
            type="email"
            placeholder="E-mail Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Link to='/forgot-password' className=" hover:underline underline-offset-2 text-green-400">Forgot Password?</Link>

          {error && <p className=" text-red-500 mt-2 font-semibold">{error}</p>}
          <motion.button className=" mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Loader className=" animate-spin size-6 mx-auto" /> : "Login"}
          </motion.button>
        </form>
      </div>

      <div className=" px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className=" text-sm text-gray-400">
          Don't have an account? 
          <Link to="/signup" className=" text-green-400 hover:underline pl-1" >
             Sign Up
          </Link>
        </p>
      </div>
    </motion.div>
  )
}

export default LoginPage