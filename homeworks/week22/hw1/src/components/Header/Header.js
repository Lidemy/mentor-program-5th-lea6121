import styled from 'styled-components'
import { ResetStyle, GlobalStyle } from '../../globalStyle'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts'
import { setAuthToken } from '../../utils'

const HeaderContainer = styled.div`
  letter-spacing: 1px;
  width: 100vw;
  display: flex;
  align-items: center;
  position: fixed;
  background-color: white;
  justify-content: space-evenly;
  z-index: 2;
  border-bottom: 1px solid black;
`

const Brand = styled(Link)`
  font-size: 50px;
  text-decoration: none;
  color: #010101;
`

const NavbarList = styled.div`
  display: flex;
  color: #010101;
`

const Nav = styled(Link)`
  border-left: 1px solid black;
  box-sizing: border-box;
  padding: 35px 40px 35px 40px;
  font-size: 20px;
  text-align: center;
  color: #010101;
  display: flex;
  transition: all 0.2s ease-in;
  cursor: pointer;
  text-decoration: none;

  ${(props) =>
    props.$active &&
    `
    background: rgba(36, 35, 35, 0.9);
    color: white;
    `};
`

export default function Header() {
  const location = useLocation()
  const history = useHistory()
  const { user, setUser } = useContext(AuthContext)
  const handleLogout = () => {
    setAuthToken('')
    setUser(null)
    alert('登出成功！')
    if (location.pathname !== '/') {
      history.push('/')
    }
  }

  return (
    <HeaderContainer>
      <ResetStyle />
      <GlobalStyle />
      <Brand to="/" $active={location.pathname === '/'}>
        BLOG
      </Brand>
      <NavbarList className="tags">
        <Nav to="/about" $active={location.pathname === '/about'}>
          ABOUT
        </Nav>
        {user && (
          <Nav to="/new-post" $active={location.pathname === '/new-post'}>
            POST
          </Nav>
        )}
        {!user && (
          <Nav to="/login" $active={location.pathname === '/login'}>
            LOG IN
          </Nav>
        )}
        {user && <Nav onClick={handleLogout}>LOG OUT</Nav>}
        {!user && (
          <Nav to="/register" $active={location.pathname === '/register'}>
            SIGN UP
          </Nav>
        )}
      </NavbarList>
    </HeaderContainer>
  )
}
