import React from 'react'

export default function DisplayError({ errors }) {
    return (
        <div>
            <ul>
                {errors.forEach((error, index) => {
                    <li key={index}>{error}</li>
                })}
            </ul>
        </div>
    )
}
