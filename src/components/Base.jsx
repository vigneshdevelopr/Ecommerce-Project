import React from 'react'
import NavBar from './NavBar'

function Base({title,children}) {
  return (
    <div className='main-component'>
<NavBar  />
<main >
    {children}
</main>
</div>
  )
}

export default Base