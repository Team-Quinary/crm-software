import React from 'react'

export default function Loading() {
  return (
    <div style={{position:"relative"}}>
        <h2 style={{
            position:'fixed',
            top:'50%',
            bottom:'50%',
            transform: 'translate(-50%,-50%)',

        }}>
            Loading........
        </h2>
    </div>
  )
}
