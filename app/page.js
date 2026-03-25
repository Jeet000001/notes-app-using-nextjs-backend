import dbconnect from '@/lib/db'
import React from 'react'

const page = async () => {
  await dbconnect()
  return (
    <div>page</div>
  )
}

export default page