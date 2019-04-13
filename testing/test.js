/********************************************************************************************************************
 *  Execution       : default node          : cmd> test.js
 *                      
 * 
 *  Purpose         : Mocha testing in graphql
 * 
 *  @description    : test code with the help of mocha, chai, supertest
 * 
 *  @overview       : fundoo application  
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 06-april-2019
 *
 *******************************************************************************************************************/
/*
required files
*/
const { describe, it } = require('mocha')
const { expect } = require('chai')
const request = require('supertest')
var server = require('../server')

describe('GraphQL API', () => {

    /********************************************************************************************************************
     *  Execution       : default node          : cmd> test.js
     *                      
     * 
     *  Purpose         : Demo example for testing
     * 
     *  @description    : test code with the help of mocha, chai, supertest
     * 
     *  @overview       : fundoo application  
     *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
     *  @version        : 1.0
     *  @since          : 06-april-2019
     *
     *******************************************************************************************************************/
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


    /********************************************************************************************************************
     *  Execution       : default node          : cmd> test.js
     *                      
     * 
     *  Purpose         : Register API testing in graphql
     * 
     *  @description    : test register code with the help of mocha, chai, supertest
     * 
     *  @overview       : fundoo application  
     *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
     *  @version        : 1.0
     *  @since          : 06-april-2019
     *
     *******************************************************************************************************************/
    it('register API', done => {
        request(server)
            .post('/graphql')

            //write your data for checking by giving mutation
            .send({ query: 'mutation { signupUser (firstname:"akash" lastname:"sharma" email:"ajsrs1@gmail.com" password:"akash1") {message}}' })
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
});
