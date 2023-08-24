import request from 'request';

export default async (req, res) => {
    console.log('method', req.method);
    console.log('url', req.url);
    console.log('header', req.headers);
    console.log('body', JSON.stringify(req.body));

    let url = 'https://api.telegram.org' + req.url.replaceAll(/(api\/)?tg\//g, '');
    console.log('url after replace', url);

    if (req.method === 'GET') {
        if (url.includes('sendMessage') && !req.query.reply_markup) {
            console.log('insert reply_markup');
            url += `&reply_markup=${encodeURIComponent('{"inline_keyboard":[[{"text":"🗑️","callback_data":"delete"}]]}')}`;
        }
        console.log('url after reply mark', url);
        request(url).pipe(res);
    } else if (req.method === 'POST') {
        let body = req.body;
        if (url.includes('sendMessage') && !body.reply_markup) {
            console.log('insert reply_markup');
            body.reply_markup = {
                'inline_keyboard': [[{'text': '🗑️', 'callback_data': 'delete'}]],
            };
        }
        console.log('body', JSON.stringify(body));
        request(url, {
            method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body),
        }).pipe(res);
    } else {
        res.status(500).json(JSON.stringify({
            ok: false, msg: 'method not supported yet',
        }));
    }
}