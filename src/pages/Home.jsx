import React from 'react'

const Home = () => {
  return (
    <div style={{display:"flex"}}>
        <h1>Home </h1>
        <div style={{margin:"10px"}}>
            <a style={{margin:"5px"}} href='/compare'>Compare</a >
            <a style={{margin:"5px"}} href='/finduser'>Find user</a >
            <a style={{margin:"5px"}} href='/history'>History of user</a >
        </div>
      
    </div>
  )
}

export default Home
