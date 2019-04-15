/********************************************************************************************************************
 *  @Execution      : default node          : cmd> test.js
 *                      
 * 
 *  @Purpose        : Mocha testing in graphql
 * 
 *  @description    : test code with the help of mocha, chai, supertest
 * 
 *  @overview       : fundoo application  
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 06-april-2019
 *
 *******************************************************************************************************************/
/**
 * @requires files
 */
const { describe, it } = require('mocha')
const { expect } = require('chai')
const request = require('supertest')
var server = require('../server')

/**
 * @param {function()}
 */
describe('GraphQL API', () => {

    /***************************************************************************************************************/
    /**
     * @purpose : Testing for users APIs
     * @property {request} request has do request for server
     * @property {post} post has post the function to the given path
     * @property {send} send has send the parameter to the mutation
     * @property {expect} expect has pass the ok means all are fine
     * @returns {error} error
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
                        "id": "5cadfb863f13e9542c96324a",
                        "firstname": "aaaa",
                        "lastname": "bcccc",
                    }
                )
                done();
            });
    });


    /***************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */
    it('register API', done => {
        request(server)
            .post('/graphql')

            //write your data for checking by giving mutation
            .send({ query: 'mutation { signupUser (firstname:"akash" lastname:"sharma" email:"afsssrs1@gmail.com" password:"akasfdrgh1") {message}}' })
            .expect(200)
            .end((err, res) => {

                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success data
                expect(JSON.parse(res.text).data.signupUser.message).to.deep.equal("Register successfull")
                done();
            });
    });

    /****************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */
    it('login APIs', done => {
        request(server)
            .post('/graphql ')

            //write your data for checking by giving mutation
            .send({ query: 'mutation { loginUser (email:"jdfdi@gmail.com" password:"akash1") {message}}' })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success
                expect(JSON.parse(res.text).data.loginUser.message).to.deep.equal("email is not present")
                done();
            });
    });

    /***************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */
    it('forgotPassword APIs', done => {
        request(server)
            .post('/graphql ')

            //write your data for checking by giving mutation
            .send({ query: 'mutation { forgotPasswordUser (email:"jdfdi@gmail.com") {message}}' })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success
                expect(JSON.parse(res.text).data.forgotPasswordUser.message).to.deep.equal("email is not present in database")
                done();
            });
    });

    /***************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */
    it('resetPassword APIs', done => {
        request(server)
            .post('/graphql ')

            //write your data for checking by giving mutation
            .send({ query: 'mutation{ resetPasswordUser (newPassword:"1234567" confirmPassword:"1234567"){message}}' })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success
                expect(JSON.parse(res.text).data.resetPasswordUser.message).to.deep.equal("token is not verify")
                done();

            });
    });

    /****************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */

    it('addLabel APIs', done => {
        request(server)
            .post('/graphql ')

            //write your data for checking by giving mutation
            .send({ query: 'mutation {createLabel(labelName:"abcdefg"){message}}' })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success
                expect(JSON.parse(res.text).data.createLabel.message).to.deep.equal("token is not verify")
                done();

            });
    });


    /****************************************************************************************************************/
    /**
    * @purpose : Testing for users APIs
    * @property {request} request has do request for server
    * @property {post} post has post the function to the given path
    * @property {send} send has send the parameter to the mutation
    * @property {expect} expect has pass the ok means all are fine
    * @returns {error} error
    */

    it('editLabel APIs', done => {
        request(server)
            .post('/graphql ')

            //write your data for checking by giving mutation
            .send({ query: 'mutation {editLabel(editlabelName:"abcdefg"){message}}' })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success
                expect(JSON.parse(res.text).data.editLabel.message).to.deep.equal("label is not updated")
                done();

            });
    });
});

