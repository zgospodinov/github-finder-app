import { React, useState, useContext } from 'react'
import GithubContext from '../../Context/Github/GithubContext'
import AlertContext from '../../Context/Alert/AlertContext'
import { searchUsers } from '../../Context/Github/GithubActions'

export default function UserSearch() {
    const [text, setText] = useState('')

    const { users, dispatch } = useContext(GithubContext)
    const { setAlert } = useContext(AlertContext)

    const handleChange = (e) => setText(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (text === '') {
            setAlert("Please enter something", 'error')
        } else {
            dispatch({type: 'SET_LOADING'})

            const usersResult = await searchUsers(text)
            dispatch({type: 'GET_USERS', payload: usersResult})
            setText('')
        }
    }

    return (
        <div className='flex flex-row'>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                                placeholder='Search'
                                value={text}
                                onChange={handleChange}
                            />
                            <button
                                type='submit'
                                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg">
                                Go
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            {users.length > 0 && (
                <div>
                    <button onClick={() => dispatch({type: 'CLEAR_USERS'})} className='btn btn-ghost btn-lg'>Clear</button>
                </div>
            )}

        </div>
    )
}
