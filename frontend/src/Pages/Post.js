import React from 'react'
import { useParams } from 'react-router-dom'

const Post = () => {
    const { id } = useParams()
    console.log(id)

return (
    <div>Post</div>
  )
}

export default Post