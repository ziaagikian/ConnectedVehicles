const expect = require('chai').expect // Not using assertions
const app = require('../../app')
const request = require('supertest')(app)

const  customerIPs = '/api/v1/customers/'
const JSON_Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdCIsImlhdCI6MTU3NDM0OTYzNiwiZXhwIjoxNjA1OTA3MjM2fQ.q13N2siftymEvCl8RNXXYkqzuASbm5bYvaoF1jIMV-w'

describe('Customer List Get API', () => {
    //const util = new testUtils();
    it('Should retrieve Customer List', (done) => {
        request.get(customerIPs)
            .set('Accept', 'application/json')
            .set('authorization',JSON_Token)
            .end((err, resp) => {
                if (err) done(err);
                expect(resp.body.success).to.equal(true)
                expect(resp.body.statusCode).to.equal(200)
                expect(resp.body.entities).to.be.an('array')
                //expect(resp.body.entities).to.eql(customerMock)
                done()
            })
    })
});


