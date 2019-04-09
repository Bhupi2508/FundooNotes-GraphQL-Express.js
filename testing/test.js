/******************************************************************************
 *  Execution       : default node          : cmd> test.js
 *                      
 * 
 *  Purpose         : Mocha testing in graphql
 * 
 *  @description    : test code with the help of mocha, chai, supertest
 * 
 *  @overview       : Create APIs using graphql 
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 06-april-2019
 *
 ******************************************************************************/
/*
required files
*/
const { describe, it } = require('mocha')
const { expect } = require('chai')
const request = require('supertest')
var server = require('../server')

describe('GraphQL API', () => {

    /***************************************************************************************************************/
    /*
    for Register purpose Mocha testing
    */
    it('Check user list data', done => {
        request(server)
            .post('/graphql ')
            /*
            write your data for checking by giving mutation
            */
            .send({ mutation: '{ signupUser( firstname:"akashji", lastname:"Rathore", email:"jffi@gmail.com", password:"akash1"), { message }}' })
            .expect(200)
            .end((err, res) => {

                /*
                if any error the return error
                */
                if (err) {
                    return done(err);
                }
                /*
                otherwise return success
                */
                expect(JSON.parse(res.text).data.signup[0]).to.deep.equal(
                    {
                        "firstname": "akashji",
                        "lastname": "Rathore",
                        "email": "jffi@gmail.com",
                        "password": "akash1",
                        "message": "register successfull"
                    }
                )

                done();
            });
    });


    /***************************************************************************************************************/
    /*
    for Login purpose Mocha testing
    */
    it('Check data in Database', done => {
        request(server)
            .post('/graphql ')
            /*
            write your data for checking by giving mutation
            */
            .send({ mutation: '{ loginUser( email:"jffi@gmail.com", password:"akash1")}' })
            .expect(200)
            .end((err, res) => {

                /*
                if any error the return error
                */
                if (err) {
                    return done(err);
                }
                /*
                otherwise return success
                */
                expect(JSON.parse(res.text).data.loginUser.message).to.deep.equal(
                    {
                        "message": "!Login....Successfully"
                    }
                )

                done();
            });
    });
});