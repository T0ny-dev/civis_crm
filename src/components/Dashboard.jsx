import styled from 'styled-components'
import Navbar from './Navbar'
import { Search, Users, Wrench, FileSignature, Calculator } from 'lucide-react'
import { useState } from 'react'

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: #ffffff;
`

const Content = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const SearchSection = styled.div`
  margin-bottom: 2rem;
  
  h2 {
    margin-bottom: 1rem;
    color: #000000;
    font-weight: 600;
  }
`

const SearchBar = styled.div`
  margin-bottom: 2rem;
  position: relative;
  
  input {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    background: white;
    font-size: 1rem;
    color: #000000;
    
    &::placeholder {
      color: #666666;
    }
    
    &:focus {
      outline: none;
      border-color: #6861f2;
      box-shadow: 0 2px 8px rgba(104, 97, 242, 0.1);
    }
  }
  
  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #666666;
  }
`

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: #6861f2;
    box-shadow: 0 4px 12px rgba(104, 97, 242, 0.1);
  }
  
  h3 {
    margin-top: 1rem;
    color: #000000;
    font-weight: 500;
  }
  
  svg {
    color: #6861f2;
  }
`

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const cards = [
    { id: 1, title: 'CRM', icon: Users },
    { id: 2, title: 'Mantenimiento', icon: Wrench },
    { id: 3, title: 'Firmar', icon: FileSignature },
    { id: 4, title: 'Cotizaciones', icon: Calculator }
  ]

  const filteredCards = cards.filter(card =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <DashboardContainer>
      <Navbar />
      <Content>
        <SearchSection>
          <h2>¿Qué herramienta necesitas?</h2>
          <SearchBar>
            <Search />
            <input 
              type="text" 
              placeholder="Buscar herramientas..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
        </SearchSection>
        <CardsGrid>
          {filteredCards.map(card => (
            <Card key={card.id}>
              <card.icon size={24} />
              <h3>{card.title}</h3>
            </Card>
          ))}
        </CardsGrid>
      </Content>
    </DashboardContainer>
  )
}

export default Dashboard 