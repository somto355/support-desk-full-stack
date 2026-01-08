import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PrivateRoute() {
  const { user } = useSelector((state) => state.auth)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default PrivateRoute