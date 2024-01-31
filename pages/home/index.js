import { redirect } from 'next/dist/server/api-utils'
import { useRouter } from 'next/router'
import React from 'react'

const index = () => {
    const router = useRouter();
    const handleSubmit = () => {
        alert('Match created successfully')
        // redirect to matchDetails page
        router.push('/StartMatch')

    }
  return (
    <div>
        <button onClick={handleSubmit}>Create a Match</button>
    </div>
  )
}

export default index