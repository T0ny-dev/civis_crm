import styled from 'styled-components'
import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import useAuthStore from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
`

const LoginCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`

const Title = styled.h1`
  color: #000000;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-align: center;
`

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  margin-bottom: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  background-color: #ffffff;
  color: #000000;
  

  &::placeholder {
    color: #666666;
  }
  
  &:focus {
    outline: none;
    border-color: #6861f2;
    box-shadow: 0 2px 8px rgba(104, 97, 242, 0.1);
  }
`

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: #6861f2;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #5549f1;
    transform: translateY(-1px);
  }
  
  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: none;
  }
`

const ErrorMessage = styled.p`
  color: #ff4444;
  margin-bottom: 1rem;
  text-align: center;
`

const Description = styled.p`
  color: #666666;
  text-align: center;
  margin-top: -1rem;
`

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;

  h2 {
    color: #000000;
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
`

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const setUser = useAuthStore((state) => state.setUser)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      setUser(data.user)
      navigate('/dashboard')
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message)
    }
  }

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Bienvenido</Title>
        <Description>Sistema de gestión empresarial</Description>
        <LoginForm onSubmit={handleLogin}>
          <h2>Iniciar Sesión</h2>
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">
            <LogIn size={20} />
            Ingresar
          </Button>
        </LoginForm>
      </LoginCard>
    </LoginContainer>
  )
}

export default Login