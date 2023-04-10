import React from 'react'

interface IProps {
  setImage: any;
}

export const ImageUpload: React.FC<IProps> = ({setImage}) => {
    const [text, setText] = React.useState<string>('Загрузите изображение')
    const ref = React.useRef<HTMLInputElement>(null)

    function uploadHandler(event: any) {
        setImage(event.target.files[0])
        
        setText('Изображение' + event.target.files[0].name)
    } 

  return (
    <div onClick={() => ref?.current?.click()}>
        <input ref={ref} type="file" style={{display: 'none', cursor: 'pointer'}} accept='image/*' onChange={(e) => uploadHandler(e)} name='image' placeholder='Загрузите изображение'/>
        <div>{text}</div>
    </div>
  )
}
