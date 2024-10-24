const users = [
    {
        user: 'guest',
        pass: 'pass',
        role: 'guest',
        token: 'guest'
    },
    {
        user: 'worker',
        pass: 'pass',
        role: 'worker',
        token: 'worker'
    },
    {
        user: 'admin',
        pass: 'pass',
        role: 'admin',
        token: 'admin'
    },
]

export function verifyUser(user,pass) {
       const userFound = users.find((u) => u.user === user && u.pass === pass)
       return userFound ? { role: userFound.role, token: userFound.token } : null
}