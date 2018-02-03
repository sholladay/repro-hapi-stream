import fs from 'fs';
import test from 'ava';
import FormData from 'form-data';
import server from '.';

test('responds to multipart/form-data streams', async (t) => {
    const app = await server({});
    const form = new FormData();
    form.append('description', 'pretty kitty');
    form.append('image', fs.createReadStream('./lib/static/cat.png'));
    process.nextTick(() => {
        form.resume();
    });

    const response = await app.inject({
        method  : 'POST',
        url     : '/cats',
        headers : form.getHeaders(),
        payload : form
    });
    t.is(response.statusCode, 200);
    t.is(response.statusMessage, 'OK');
    t.is(response.headers['content-type'], 'text/html; charset=utf-8');
    t.is(response.payload, 'A pretty kitty in image/png format');
});
