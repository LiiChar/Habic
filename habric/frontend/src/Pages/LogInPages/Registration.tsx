import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUsersMutation } from '../../Store/Slices/userSlice';
import { ImageUpload } from '../../Components/articles/ImageUpload';

export const Registration = () => {
  const [username, setUsername] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [error, setError] = React.useState<string>('')
  const [image, setImage] = React.useState<any>()
  const navigate = useNavigate()
  const [createUsers, {isSuccess, isError, data}] = useCreateUsersMutation()

  async function setLogin() {

    if (username !== '' && password !== '') {
      const data = new FormData()
      data.append('username', username)
      data.append('password', password)
      data.append('image', image)
      console.log(data.get('image'));
      
      const user: any = await createUsers(data)
      if (user?.error?.data?.message) {
        setError(user?.error.data.message)
      }
      
      if (user?.error?.originalStatus === 201) {
        sessionStorage.setItem('token', JSON.stringify(user?.error?.data))
        sessionStorage.setItem('user', JSON.stringify(username));
        navigate('/login')
      }
    }
  }

  return (
    <div className='flex justify-center items-center '>
      <div style={{ borderRadius: '4px' }} className='w-1/3 h-1/4 m-8 border-2 border-solid border-sky-900'>
        <div className='m-4'>
          <div>
            {error &&
              <div className='text-xs mt-2'>{error ?? ''}</div>
            }
          </div>
          <div>
            <div className='text-xs'>Логин</div>
            <input type="text" style={{ border: '1px solid blue', borderRadius: '4px' }} className='outline-none mb-3 w-full' value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <div className='text-xs'>Пароль</div>
            <input type="text" style={{ border: '1px solid blue', borderRadius: '4px' }} className='outline-none w-full mb-2' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='mb-2 '>
            <button style={{ borderRadius: '4px' }} className='bg-cyan-500 hover:bg-cyan-700 p-2' onClick={setLogin}>Зарегестрироваться</button>
          </div>
          <div className='text-sm'>Усли у вас есть аккаунта? <Link className='font-bold' to={'/login'}>войдите</Link></div>
          <ImageUpload setImage={setImage} />
        </div>
      </div>
    </div>
  )
}
