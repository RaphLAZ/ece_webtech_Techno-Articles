export default function handler(req, res) {
    // Check if user is authenticated (in this example, always assume user is authenticated)
    const user = {
        username: 'raphael',
        email: 'raphael.lazzari@ece.fr',
    }

    res.status(200).json(user)
}