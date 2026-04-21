import { Heart, LogIn, Star } from 'lucide-react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex">

            <div className="hidden md:flex md:w-1/2 lg:w-3/5 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex-col items-center justify-center p-12 text-white">
                <div className="max-w-md text-center space-y-6">
                    <div className="text-6xl font-bold tracking-tight">Welcome</div>
                    <p className="text-xl text-white/80">
                        Your journey starts here. Sign in or create an account to get started.
                    </p>
                    <div className="flex justify-center gap-4 pt-4">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl"><Star size={20}/></div>
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl"><LogIn/></div>
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl"><Heart/></div>
                    </div>
                    
                </div>
            </div>

            <div className="w-full md:w-1/2 lg:w-2/5 flex items-center justify-center p-6 bg-white">
                <div className="w-full max-w-sm">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AuthLayout
