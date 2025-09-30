
import './App.css'
import EmployeeHeader from './component/EmployeeHeader';
import EmployeeList from './component/EmployeeList';


function App() {

  const employees = [
  { id: 1, code: "EMP001", name: "Nguyễn Văn A", title: "Frontend Dev",   phone: "0901 234 567", email: "a.nguyen@company.com" },
  { id: 2, code: "EMP002", name: "Trần Thị B",   title: "Backend Dev",    phone: "0902 345 678", email: "b.tran@company.com" },
  { id: 3, code: "EMP003", name: "Lê Văn C",     title: "UI/UX Designer", phone: "0903 456 789", email: "c.le@company.com" },
  { id: 4, code: "EMP004", name: "Phạm Văn D",   title: "Manager",        phone: "0904 567 890", email: "d.pham@company.com" }
];

  return (
    <>
      <EmployeeHeader 
        count = {employees.length}
      />
      <EmployeeList
        employees = {employees}
      />
      
    </>
  )
}

export default App
