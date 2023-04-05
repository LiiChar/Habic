import React from 'react'
import { Link } from 'react-router-dom'
import { IActicles } from '../../types/acticles'

interface IPropsArticle {
  article: IActicles,
  type: string
}

export const Article: React.FC<IPropsArticle> = (props) => {

  

  return (
    <div className='mb-5 border-2 border-solid border-sky-900'>
      <div className='m-4'>
        {props.type === 'article' && <div>
            {props.article.author}
        </div>}
        <div className='my-2 text-lg'><b><Link to={'artic/' + props.article.id}>{props.article.name}</Link></b></div>
        <div className='text-xs mb-2'>{props.article.tags}</div>
        <pre>
          {props.article.text?.slice(0, props.article.text?.length > 1000 ? props.article.text?.slice(0, 1000).lastIndexOf('.') + 1 : 1000)}
        </pre>
        <div className='mt-3'>
          <Link to={'artic/' + props.article.id}>Читать дальше</Link>
        </div>
      </div>
    </div>
  )
}
