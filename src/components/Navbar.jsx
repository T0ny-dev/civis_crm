import styled from 'styled-components'
import useAuthStore from '../store/authStore'
import { LogOut, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabaseClient'
import { useState, useRef, useEffect } from 'react'

const NavbarContainer = styled.nav`
  background: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
`

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  color: #000000;
  font-weight: 500;
  
  &:hover {
    background: #f5f5f5;
  }

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px;
  }
`

const UserMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  padding: 0.5rem;
  min-width: 200px;
  margin-top: 0.5rem;
`

const MenuItem = styled.button`
  width: 100%;
  padding: 0.8rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  background: none;
  color: #666;
  cursor: pointer;
  border-radius: 4px;
  
  &:hover {
    background: #f5f5f5;
    color: #6861f2;
  }
`

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  background: #6861f2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef()
  const { userData, clearUser } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    clearUser()
    navigate('/login')
  }

  return (
    <NavbarContainer>
      <NavContent>
        <h1>Dashboard</h1>
        <UserSection ref={menuRef}>
          <UserProfile onClick={() => setMenuOpen(!menuOpen)}>
            <Avatar>{userData.nombre.substring(0, 2).toUpperCase()}</Avatar>
            <span>{userData.nombre}</span>
          </UserProfile>
          {menuOpen && (
            <UserMenu>
              <MenuItem onClick={handleLogout}>
                <LogOut size={20} />
                Cerrar sesión
              </MenuItem>
            </UserMenu>
          )}
        </UserSection>
      </NavContent>
    </NavbarContainer>
  )
}

export default Navbar 