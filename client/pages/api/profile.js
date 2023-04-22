export default function handler(req, res) {
    if(false){
        return res.status(401).json('Resource access not authorized')
    }
    // Check if user is authenticated (in this example, always assume user is authenticated)
    const user = {
        username: 'raphael',
        email: 'raphael.lazzari@ece.fr',
    }

    res.status(200).json(user)
}