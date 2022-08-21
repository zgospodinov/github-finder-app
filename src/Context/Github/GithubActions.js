import axios from 'axios'

const GITHUT_URL = process.env.REACT_APP_GITHUB_URL
const GITHUT_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const github = axios.create({
    baseURL: GITHUT_URL,
    headers: {
        Authorization: `token ${GITHUT_TOKEN}`
    }
})

export const searchUsers = async (text) => {
    const params = new URLSearchParams({
        q: text
    })

    const response = await github.get(`/search/users?${params}`)
    return response.data.items
}
 
export const getUserAndRepos = async (login) => {
    const [user, repos] = await Promise.all([
        github.get(`/users/${login}`),
        github.get(`/users/${login}/repos`)
    ])

    return {
        user: user.data,
        repos: repos.data
    }
}