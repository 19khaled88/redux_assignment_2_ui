import React from 'react'

const JobPosts = ({posts}) => {
    console.log(posts)
  return (
    <div>
      <div>{posts.companyName}</div>
    </div>
  )
}

export default JobPosts
