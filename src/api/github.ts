export const fetchGithubUser = async (userName: string) => {
     const res = await fetch(`${import.meta.env.VITE_GITHUB_API}/users/${userName}`)

    if (!res.ok) {
        throw new Error("User Not Found");  
    } 

    const data = await res.json()
    return data
}

export const searchGithubUser = async (query: string) => {
     const res = await fetch(`${import.meta.env.VITE_GITHUB_API}/search/users?q=${query}`)

    if (!res.ok) {
        throw new Error("User Not Found");  
    } 

    const data = await res.json()
    // console.log(data.items)
    return data.items
}