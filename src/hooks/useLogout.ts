import ROUTES from '@/consts/Routes'
import { deleteCookie } from '@/lib/Cookies'
import { logout as signOut } from '@/store/reducers/authSlice'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

const useLogout = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const logout = () => {
    dispatch(signOut())
    deleteCookie('token', { path: '/' })
    router.push(ROUTES.AUTH)
  }

  return { logout }
}

export default useLogout
