import { Home, Purchases, Login, ProductDetails } from "./pages"
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { LoadingScreen, Navbar, ProtectedRoutes } from './components'
import { useSelector } from 'react-redux'

function App() {
  
  const isLoading = useSelector(state => state.isLoading)

  return (
    <div className="App">
      <HashRouter>
        <Navbar />
       { isLoading && <LoadingScreen/>}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products/:id" element={<ProductDetails/>}/>
          <Route path="/login" element={<Login/>}/>

          <Route element={<ProtectedRoutes/>}>
            <Route path="/purchases" element={<Purchases/>}/>
          </Route>

        </Routes>
        <footer className='footer-detail'>
                <p>©Academlo 2002</p>
        </footer>
    </HashRouter>
    </div>
  )
}

export default App
