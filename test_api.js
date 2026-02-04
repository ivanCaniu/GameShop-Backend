const http = require('http');

const postData = JSON.stringify({
    name: 'Test User',
    email: 'test' + Date.now() + '@example.com',
    password: 'password123'
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/register',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
    },
};

console.log('Testing /api/auth/register...');
const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.setEncoding('utf8');
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        console.log(`BODY: ${data}`);

        // Now test login
        if (res.statusCode === 201) {
            testLogin(JSON.parse(data).user.email);
        }
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.write(postData);
req.end();

function testLogin(email) {
    console.log('\nTesting /api/auth/login...');
    const loginData = JSON.stringify({
        email: email,
        password: 'password123'
    });

    const loginOptions = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/auth/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(loginData),
        },
    };

    const loginReq = http.request(loginOptions, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => { console.log(`BODY: ${chunk}`); });
    });

    loginReq.write(loginData);
    loginReq.end();
}
