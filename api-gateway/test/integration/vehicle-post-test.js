const chai = require('chai')

const expect = chai.expect // Not using assertions

// chai.use(require('chai-things'));
const app = require('../../app')
const request = require('supertest')(app)

// const vehicleMocks = require('../fixture/vehicles')
// const testUtils = require('../../libs/test-util')
const apiPath = '/api/v1/vehicles/customers'
const JSON_Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdCIsImlhdCI6MTU3NDM0OTYzNiwiZXhwIjoxNjA1OTA3MjM2fQ.q13N2siftymEvCl8RNXXYkqzuASbm5bYvaoF1jIMV-w'


describe('Testing Vehicle List POST  API', () => {
    //const util = new testUtils();
    it('Should retrieve all vehicle List', (done) => {
        let body = {
            "customerIds": [{
                "id": 1
            }]
        }
        request.post(apiPath)
            .send(body)
            .set('Accept', 'application/json')
            .set('authorization',JSON_Token)
            .end((err, resp) => {
                if (err) done(err);
                expect(resp.body.success).to.equal(true)
                expect(resp.body.statusCode).to.equal(200)
                // expect(resp.body.entities).to.deep.eql(vehicleMocks) // Contents may change
                // Array type testing
                expect(resp.body.entities).to.be.an('array')//.that.contains.like('vin')
                // Empty Array Testing
                expect(resp.body.entities).to.have.length.gte(1)
                done()
            })
    })
});

