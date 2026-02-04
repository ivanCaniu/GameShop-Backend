// using native http module

// Helper to disable needing external deps for this simple test
const http = require('http');

function post(path, body) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(body);
        const options = {
            hostname: 'localhost',
            port: 5000,
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = http.request(options, (res) => {
            let responseBody = '';
            res.on('data', (chunk) => responseBody += chunk);
            res.on('end', () => {
                resolve({ status: res.statusCode, body: JSON.parse(responseBody || '{}') });
            });
        });

        req.on('error', (error) => reject(error));
        req.write(data);
        req.end();
    });
}

async function runTests() {
    console.log('--- TEST 1: Register with Invalid Email ---');
    const res1 = await post('/api/auth/register', {
        name: 'Test',
        email: 'invalid-email', // NO @ symbol
        password: 'password123'
    });
    console.log(`Status: ${res1.status} (Expected 400)`);
    console.log('Response:', JSON.stringify(res1.body, null, 2));

    console.log('\n--- TEST 2: Register with Short Password ---');
    const res2 = await post('/api/auth/register', {
        name: 'Test',
        email: 'good@email.com',
        password: '123' // Too short (min 6)
    });
    console.log(`Status: ${res2.status} (Expected 400)`);
    console.log('Response:', JSON.stringify(res2.body.errors?.[0]?.msg, null));

    console.log('\n--- TEST 3: Login with Missing Fields ---');
    const res3 = await post('/api/auth/login', {
        email: 'only@email.com'
        // Missing password
    });
    console.log(`Status: ${res3.status} (Expected 400)`);

    if (res1.status === 400 && res2.status === 400 && res3.status === 400) {
        console.log('\n✅ ALL VALIDATION TESTS PASSED!');
    } else {
        console.log('\n❌ SOME TESTS FAILED');
    }
}

runTests();
