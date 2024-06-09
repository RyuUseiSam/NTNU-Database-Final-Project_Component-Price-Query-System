import React from 'react'
import ShoppingCartTable from '../../components/ShoppingCartTable/ShoppingCartTable'

import './Home.scss'

export default function Home() {
    return (
        <div className='homePage'>
            <ShoppingCartTable></ShoppingCartTable>
        </div>
    )
}
