import React from 'react'
import ShoppingCartTable from '../../components/ShoppingCartTable/ShoppingCartTable'

import './Home.scss'
import UserProfileCard from '../../components/UserProfileCard/UserProfileCard'

export default function Home() {
    return (
        <div className='homePage'>
            <UserProfileCard></UserProfileCard>
            <ShoppingCartTable></ShoppingCartTable>
        </div>
    )
}
