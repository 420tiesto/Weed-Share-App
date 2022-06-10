import React from 'react'
import ReviewsItem from './ReviewsItem'

type Props = {}

const BudReviews = (props: Props) => {
  return (
    <div className='p-8 grid gap-6 sunken-element'>
      <h6 className='font-bold text-2xl'>Reviews</h6>
      <ReviewsItem/>
      <ReviewsItem/>
    </div>
  )
}

export default BudReviews