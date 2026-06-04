import React from 'react'

export default function Dashboard() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    return (
        <div className="p-10">

            <h1 className="text-3xl font-bold">

                Welcome

                {user?.name}

            </h1>

        </div>
    );
}