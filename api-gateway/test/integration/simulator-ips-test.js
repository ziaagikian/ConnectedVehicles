

const chai = require('chai')

const expect = chai.expect // Not using assertions

// chai.use(require('chai-things'));
const app = require('../../app')
const request = require('supertest')(app)

const vehicleMocks = require('../fixture/vehicles')
const testUtils = require('../../libs/test-util')

const configVehicles = '/api/v1/vehicles/configs'
const pingVehicles = '/api/v1/vehicles/ping'
const JSON_Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdCIsImlhdCI6MTU3NDM0OTYzNiwiZXhwIjoxNjA1OTA3MjM2fQ.q13N2siftymEvCl8RNXXYkqzuASbm5bYvaoF1jIMV-w'

describe('Vehicle Status', () => {
    beforeEach((done) => {
        //Do crud etc
        done();
    });
});

/**
 * Test Vehicle Config API
 */
describe('Get Vehicle Configs', () => {
    it("Should Retrieve Vehicle Configs ", (done) => {
        request.get(configVehicles)
            .set('Accept', 'application/json')
            .set('authorization',JSON_Token)
            .end((err, resp) => {
                if (err) done(err);
                expect(resp.body.success).to.equal(true)
                expect(resp.body.statusCode).to.equal(200)
                // Array type testing
                expect(resp.body.entities).to.be.an('array')//.that.contains.like('vin')
                // Empty Array Testing
                expect(resp.body.entities).to.have.length.gte(1)
                done()
            })
    })
});

/**
 * Test Ping API [Post API]
 */

describe('Post Vehicle Ping IPs', () => {
    it('Should Ping server ', (done) => {
        let body = {
            "id": 1,
            "latitude": 45.999,
            "longitude": -23.999,
            "telematics": "" // 
        }
        request.post(pingVehicles)
            .send(body)
            .set('Accept', 'application/json')
            .set('authorization',JSON_Token)
            .end((err, resp) => {
                if (err) done(err)
                expect(resp.body.success).to.equal(true)
                expect(resp.body.statusCode).to.equal(200)
                // expect(resp.body.entities).to.deep.eql(vehicleMocks) // Contents may change
                // Array type testing
                expect(resp.body.entities).to.be.an('array')//.that.contains.like('vin')
                // Empty Array Testing
                expect(resp.body.entities).to.have.length.gte(1)
                // Check update Time
                expect(resp.body.entities[0].last_updated).to.be.an('string')
                done()
            })
    })
})

