import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useStore } from "../store/userStore";

function Login() {
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const { setUser } = useStore();

  const handleChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      // Use username as email for Firebase authentication
      await signInWithEmailAndPassword(auth, loginInfo.username, loginInfo.password);
      const user = auth.currentUser;
      setUser(user);
      navigate("/tracker"); // Navigate to tracker on successful login
    } catch (error) {
      console.error("Login error:", error);
      // Handle different types of Firebase auth errors
      switch (error.code) {
        case 'auth/user-not-found':
          setError("No account found with this email address.");
          break;
        case 'auth/wrong-password':
          setError("Incorrect password. Please try again.");
          break;
        case 'auth/invalid-email':
          setError("Please enter a valid email address.");
          break;
        case 'auth/too-many-requests':
          setError("Too many failed attempts. Please try again later.");
          break;
        default:
          setError("Login failed. Please check your credentials and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setIsLoading(true);
    
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      const user = auth.currentUser;
      setUser(user);
      navigate("/tracker"); // Navigate to tracker on successful Google login
    } catch (error) {
      console.error("Google login error:", error);
      if (error.code !== 'auth/popup-closed-by-user') {
        setError("Google login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#f4f8ff' }}>
      
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="max-w-lg w-full">
          <img
            src="/hello2.svg"
            alt="Login Illustration"
            className="w-full h-auto object-contain opacity-100"
          />
        </div>
      </div>

      
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md mx-auto">
          <div className="w-full space-y-5">

            <div className="text-center">
              <img src="/soulnest_title.svg" alt="Logo" className="inline-block h-28 mx-auto" />
              <p className="text-base text-gray-500">Login to your SoulNest account</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm border border-red-200">
                {error}
              </div>
            )}

            
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center space-x-3 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>{isLoading ? "Signing in..." : "Continue with Google"}</span>
            </button>

           
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

           
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                  <input
                    id="username"
                    name="username"
                    type="email"
                    value={loginInfo.username}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                    placeholder="Enter your email address"
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={loginInfo.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                    placeholder="Enter your password"
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-10 py-2 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={handleClickShowPassword}
                    disabled={isLoading}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 disabled:opacity-60"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 rounded-lg font-semibold text-white transition-all shadow-md hover:shadow-lg transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                style={{ 
                  backgroundColor: '#ff3f7a'
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.target.style.backgroundColor = '#e6356d';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.target.style.backgroundColor = '#ff3f7a';
                  }
                }}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Logging in...</span>
                  </span>
                ) : (
                  'Login'
                )}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link 
                to="/signup" 
                className="font-semibold hover:underline transition-colors"
                style={{ color: '#ff3f7a' }}
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;