function Home () {
    const user = [
        {
            name: "Luffy",
            gender: "M",
            profile: "https://fantech.id/wp-content/uploads/2023/11/luffy-1024x575.jpg"
        },
        {
            name: "Nami",
            gender: "F"
        },
        {
            name: "Luffy",
            gender: "M"
        },
    ]


    return (
        <div>
            <div className="text-start">Daftar User</div>
            <ul>
                {user.map((user)=> {
                    return (
                        <li className={`px-4 py-2 border border-gray-400 rounded w-52 ${user.gender === 'M' ? 'bg-blue-300' :'bg-red-300'} `}>
                            <div className="text-black">{user.name}</div>
                            {user.profile &&  <img src={user.profile} alt="" />}
                        </li>
                        
                    )
                
                })}
            </ul>
        
        </div>
    )
}

export default Home