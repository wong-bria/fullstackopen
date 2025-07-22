const Filter = ({value}) => {
  const handleFilterChange = (event) => {
    setNewFilterValue(event.target.value)
  }
  
  return <div>filter shown with: <input value={value} onChange={handleFilterChange}/></div>
}

export default Filter