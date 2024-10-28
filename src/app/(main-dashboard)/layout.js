import React from 'react'

const DashLayout = ({ children }) => {

    return (
        <div>
            <div className="flex-1 overflow-y-auto p-4">
                {children}
            </div>
        </div>

    )
}

export default DashLayout


