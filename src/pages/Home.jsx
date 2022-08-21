import React from 'react'
import UserResults from '../components/users/UserResults'
import UserSearch from '../components/users/UserSearch'

export default function Home() {
    return (
        <div className='flex flex-col'>
            <div>
                <UserSearch />

            </div>
            <div className='pt-10'>
                <UserResults />

            </div>
        </div>
    )
}
