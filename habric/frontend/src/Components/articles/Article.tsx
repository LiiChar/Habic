import React from 'react'
import { Link } from 'react-router-dom'
import { IActicles } from '../../types/acticles'
import shortText from '../../utils/shortText'

interface IPropsArticle {
  article: IActicles,
  type: string
}

export const Article: React.FC<IPropsArticle> = (props) => {

  const text = shortText(props?.article?.text || '')

  return (
    <div className='mb-5 border-2 border-solid border-sky-900'>
      <div className='m-4'>
        {props.type === 'article' && <div>
          {props.article.author}
        </div>}
        <div className='my-2 text-lg'><b><Link to={'artic/' + props.article.id}>{props.article.name}</Link></b></div>
        <div className='text-xs mb-2'>{props.article.tags}</div>
        <div>
          { props.article.image && <img className='w-max h-max' src={`http://localhost:5000/images/${props.article.image}`} />}
          <div className='whitespace-pre-line'>{text}</div>
        </div>
        <div className='mt-3'>
          <Link to={'artic/' + props.article.id}>Читать дальше</Link>
        </div>
      </div>
    </div>
  )
}
