import { Outlet } from 'react-router-dom'


function PrivateLayout() {
  return (
    <div>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default PrivateLayout
