export default async function handler(req, res) {
    res.json({ message: 'Hello Everyone!' });
    const method = req.method;
    console.log(method);
}
