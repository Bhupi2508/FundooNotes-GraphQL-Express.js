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
     mocha testing Demo
     */
    it('Mocha Demo', done => {
        request(server)
            .post('/graphql')
            /*
            write your data for checking by giving query
            */
            .send({ query: '{ users { id firstname lastname }}' })
            .expect(200)
            .end((err, res) => {
                /*
                if any error the return error
                */
                if (err) {
                    return done(err);
                }
                /*
                otherwise return success data
                */
                expect(JSON.parse(res.text).data.users[0]).to.deep.equal(
                    {
                        "id": "5caadab0f3013516974ba4df",
                        "firstname": "cp",
                        "lastname": "Rathore"
                    }
                )
                done();
            });
    });


    /**************************************************************************************************************/
    /*
    for Register purpose Mocha testing
    */
    it('register API', done => {
        request(server)
            .post('/graphql')
            /*
            write your data for checking by giving mutation
            */
            .send({ query: 'mutation { signupUser (firstname:"akash" lastname:"sharma" email:"ajss1@gmail.com" password:"akash1") {message}}' })
            .expect(200)
            .end((err, res) => {

                /*
                if any error the return error
                */
                if (err) {
                    return done(err);
                }
                /*
                otherwise return success data
                */
                expect(JSON.parse(res.text).data.signupUser.message).to.deep.equal("Register successfull")
                done();
            });
    });


    /***************************************************************************************************************/
    /*
    for Login purpose Mocha testing
    */
    it('login APIs', done => {
        request(server)
            .post('/graphql ')
            /*
            write your data for checking by giving mutation
            */
            .send({ query: 'mutation { loginUser (email:"jdfdi@gmail.com" password:"akash1") {message}}' })
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
                expect(JSON.parse(res.text).data.loginUser.message).to.deep.equal("!Login....Successfully")
                done();
            });
    });


    /***************************************************************************************************************/
    /*
    for forgotPassword purpose Mocha testing
    */
    it('forgotPassword APIs', done => {
        request(server)
            .post('/graphql ')
            /*
            write your data for checking by giving mutation
            */
            .send({ query: 'mutation { forgotPasswordUser (email:"jdfdi@gmail.com") {message}}' })
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
                expect(JSON.parse(res.text).data.forgotPasswordUser.message).to.deep.equal("Mail sent to your given email id")
                done();
            });
    });


    /***************************************************************************************************************/
    /*
    for Login purpose Mocha testing
    */
    it('resetPassword APIs', done => {
        request(server)
            .post('/graphql ')
            /*
            write your data for checking by giving mutation
            */
            .send({ query: 'mutation{ resetPasswordUser (newPassword:"1234567" confirmPassword:"1234567"){message}}'})
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
                expect(JSON.parse(res.text).data.resetPasswordUser.message).to.deep.equal("token is not verify")
                done();
                
            });
    });
});
