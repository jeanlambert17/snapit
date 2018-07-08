export default function availableFieldsToChange(req,res,next) {
    const { key } = req.body;

    switch (key) {
        case 'username': {
            next();
            break;
        }
        case 'email': {
            next();
            break;
        }
        case 'name': {
            next();
            break;
        }
        default:
            res.status(401).send({
                status: 401,
                body: 'Invalid option',
            });
            break;
    }
}

