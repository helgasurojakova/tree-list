import { rowsApi } from './api/rowsApi'
import Header from './components/Header'

function App() {
  const entity = {
    id: 33097, 
    rowName: '9b72f240-526b-4172-8c41-f7d893911dd6',
  }

  const createRow = () => {
    rowsApi.createRow(entity.id)
  }

  const refreshList = () => {
    rowsApi.getRows(entity.id, entity.rowName)
  }

  const updateRow = () => {
    rowsApi.updateRow(entity.id, 25131)
  }

  const deleteRow = () => {
    rowsApi.deleteRow(entity.id, 25131)
  }

  return (
    <div className="App">
      <Header/>
      {/* <button onClick={refreshList}>Get rows</button>
      <button onClick={createRow}>Create row</button>
      <button onClick={updateRow}>Update row</button>
      <button onClick={deleteRow}>Delete row</button> */}
    </div>
  );
}

export default App
