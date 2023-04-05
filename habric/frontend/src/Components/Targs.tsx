import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';

interface IPropsTags {
    tags: string[];
    setTags: any
}

export const Targs: FC<IPropsTags> = (props) => {
    const [tagis, setTagis] = useState<string[]>(props.tags)
    const tags: string[] = ['Философия', 'It', 'Программирование', 'Алгоритмы', 'JavaScript']
    const [vision, setVision] = useState<boolean>(false)
    const [text, setText] = useState<string>('')

    let filtetTags: string[] = tags.filter((tag) => tag.toLocaleLowerCase().includes(text.toLocaleLowerCase()))

    function handleTags(e: ChangeEvent<HTMLInputElement>) {

        console.log(filtetTags);
        setText(e.target.value)

    }

    return (
        <div>
            {vision && <div className='absolute bg-slate-400 top-2/4 right-1/4 mb-8 w-1/6 h-2/6'>
                {filtetTags.map((tag) => (<div key={tag} onClick={() => 
                    {
                        if (!props.tags.includes(tag)) {
                            props.setTags(tag)
                        }
                    }}
                    >{tag}</div>))}
            </div>}

            <div className='flex flex-row'>
                <div>
                    {
                        props.tags.map((tag) => (
                            <span key={tag}>{tag} </span>
                        ))
                    }
                </div>
                <div className='ml-2 w-12'>
                    <input
                        onClick={() => setVision(true)}
                        onChange={(e) => handleTags(e)}
                        className='w-12 bg-grey-500 outline-none'
                        value={text}
                    >
                    </input>
                </div>
            </div>
        </div>
    )
}
