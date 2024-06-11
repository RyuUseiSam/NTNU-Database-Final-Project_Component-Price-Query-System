import React from 'react'
import ShoppingCartTable from '../../components/ShoppingCartTable/ShoppingCartTable'

const Order = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                minWidth: '400px',

            }}
        >
            <ShoppingCartTable></ShoppingCartTable>
        </div>

    )
}

export default Order
