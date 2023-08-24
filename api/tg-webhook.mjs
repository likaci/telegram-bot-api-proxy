const TG_WEBHOOK_TOKEN = 'YOUR_TG_WEBHOOK_TOKEN';

export default async (req, res) => {
    console.log('method', req.method);
    console.log('url', req.url);
    console.log('header', req.headers);
    console.log('body', JSON.stringify(req.body));

    if (req.headers['x-telegram-bot-api-secret-token'] !== TG_WEBHOOK_TOKEN) {
        console.log('TG_WEBHOOK_KEY not valid');
        response200(res);
        return;
    }

    if (req.body.callback_query.data === 'delete') {
        console.log('delete msg');
        res.status(200).json({
            method: 'deleteMessage',
            chat_id: req.body.callback_query.message.chat.id,
            message_id: req.body.callback_query.message.message_id,
        });
        return;
    }

    response200(res);
}

function response200(res) {
    res.status(200).send();
}
