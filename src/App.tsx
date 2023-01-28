import { Header } from './Header'
import { Navbar } from './Navbar'
import { Table } from './Table'
import './styles/main.sass'

function App() {
  return (
    <div>
      <Header/>
      <div className="wrapper">
        <Navbar/>
        <Table/>
      </div>
    </div>
  );
}

export default App
