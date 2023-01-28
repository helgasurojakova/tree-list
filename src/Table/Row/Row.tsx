import { RowType } from './Row.types'
import './Row.style.sass'
import { useState } from 'react'
import { rowsApi } from '../Table.sevice'
import { entity } from '../Table'

export const Row = (props:RowType) => {
  const {
    id,
    rowName,
    salary,
    equipmentCosts,
    overheads,
    estimatedProfit,
  } = props

  const [isEditable, setIsEditable] = useState(false)
  const [rowNameValue, setRowName] = useState(rowName)
  const [salaryValue, setSalary] = useState(salary)
  const [equipmentCostsValue, setEquipmentCosts] = useState(equipmentCosts)
  const [overheadsValue, setOverheads] = useState(overheads)
  const [estimatedProfitValue, setEstimatedProfit] = useState(estimatedProfit)

  const handleEdit = () => {
    setIsEditable((prevState) => !prevState)
  }

  const handleChangeRowName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowName(event.target.value)
  }
  const handleChangeSalary = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSalary(parseInt(event.target.value))
  }
  const handleChangeEquipmentCosts = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEquipmentCosts(parseInt(event.target.value))
  }
  const handleChangeOverheads = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOverheads(parseInt(event.target.value))
  }
  const handleChangeEstimatedProfit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEstimatedProfit(parseInt(event.target.value))
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
        rowsApi.updateRow(
          entity.id, 
          id, 
          equipmentCostsValue, 
          estimatedProfitValue, 
          overheadsValue, 
          rowNameValue, 
          salaryValue)
        setIsEditable(false)
    }
}

  return (
    <div className="row" onDoubleClick={handleEdit}>
      <div className="row-icons">{id}</div>
      <div className="row-inputs__left-part">
        <div className="row-input-wrapper">
          <input 
            className={`row-input${isEditable ? ' row-input-active' : ''}`} 
            value={rowNameValue}
            onChange={handleChangeRowName}
            readOnly={!isEditable}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div className="row-inputs__right-part">
        <div className="row-input-wrapper">
          <input 
            className={`row-input${isEditable ? ' row-input-active' : ''}`} 
            value={salaryValue}
            onChange={handleChangeSalary}
            readOnly={!isEditable}
            type="number"
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="row-input-wrapper">
          <input 
            className={`row-input${isEditable ? ' row-input-active' : ''}`} 
            value={equipmentCostsValue}
            onChange={handleChangeEquipmentCosts}
            readOnly={!isEditable}
            type="number"
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="row-input-wrapper">
        <input 
          className={`row-input${isEditable ? ' row-input-active' : ''}`} 
          value={overheadsValue}
          onChange={handleChangeOverheads}
          readOnly={!isEditable}
          type="number"
          onKeyDown={handleKeyDown}
        />
        </div>
        <div className="row-input-wrapper">
          <input 
            className={`row-input${isEditable ? ' row-input-active' : ''}`} 
            value={estimatedProfitValue}
            onChange={handleChangeEstimatedProfit}
            readOnly={!isEditable}
            type="number"
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  )
}

