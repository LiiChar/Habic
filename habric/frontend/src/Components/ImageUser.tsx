import React from 'react'
import { useGetImageByNameQuery } from '../Store/Slices/userSlice'

interface IProps {
    user: string,
    width: string,
    heigth: string
}

export const  ImageUser =  React.memo( function (props: IProps)  {
    const image = useGetImageByNameQuery(props.user).data
    console.log(image);
    
  return (
    <div>
        {image && <div className='flex justify-center'>{<img className='w-max h-max' src={`http://localhost:5000/images/${image}`}/>}</div>}
    </div>
  )
})
