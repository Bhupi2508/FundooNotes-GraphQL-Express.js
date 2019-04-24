/********************************************************************************************************************
 *  @Execution      : default node          : cmd> test.js
 *                      
 * 
 *  @Purpose        : Mocha testing in graphql for test code
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
    it('register API', done => {
        request(server)
            .post('/graphql')

            //write your data for checking by giving mutation
            .send({ query: 'mutation { signupUser (firstname:"akash" lastname:"sharma" email:"akash@gmail.com" password:"akasfdrgh1") {message}}' })
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
            .send({ query: 'mutation { loginUser (email:"aaaaa@gmail.com" password:"akash1") {message}}' })
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
            .send({ query: 'mutation { forgotPasswordUser (email:"aaaaaaaa@gmail.com") {message}}' })
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
            .send({ query: 'mutation {createLabel(labelName:"abcd"){message}}' })
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
            .send({ query: 'mutation {editLabel(editlabelName:"AWS"){message}}' })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success
                expect(JSON.parse(res.text).data.editLabel.message).to.deep.equal("token is not verify")
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

    it('removeLabel APIs', done => {
        request(server)
            .post('/graphql ')

            //write your data for checking by giving mutation
            .send({ query: 'mutation {removeLabel(labelID:"5cc01661299f2121952ca652"){message}}' })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success
                expect(JSON.parse(res.text).data.removeLabel.message).to.deep.equal("token is not verify")
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

    it('addNote APIs', done => {
        request(server)
            .post('/graphql ')

            //write your data for checking by giving mutation
            .send({ query: 'mutation {createNote(title:"Java", description:"programming language"){message}}' })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success
                expect(JSON.parse(res.text).data.createNote.message).to.deep.equal("token is not verify")
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

    it('editNote APIs', done => {
        request(server)
            .post('/graphql ')

            //write your data for checking by giving mutation
            .send({ query: 'mutation {editNote(noteID:"5cc01661299f2121952ca652" editTitle:"change name during tseting"){message}}' })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success
                expect(JSON.parse(res.text).data.editNote.message).to.deep.equal("note updated")
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

    it('removeNote APIs', done => {
        request(server)
            .post('/graphql ')

            //write your data for checking by giving mutation
            .send({ query: 'mutation {removeNote(noteID:"5cc016e0299f2121952ca653"){message}}' })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success 
                expect(JSON.parse(res.text).data.removeNote.message).to.deep.equal("note removed")
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

    it('saveLabelToNote APIs', done => {
        request(server)
            .post('/graphql ')

            //write your data for checking by giving mutation
            .send({ query: 'mutation {savelabelonNote(noteID:"5cc004ca713f9c1141a20ac4 labelID:"5cc01661299f2121952ca652){message}}' })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success 
                expect(JSON.parse(res.text).data.savelabelonNote.message).to.deep.equal("label added on note successfully ")
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

    it('removeLabelFromNote APIs', done => {
        request(server)
            .post('/graphql ')

            //write your data for checking by giving mutation
            .send({ query: 'mutation {DeleteLabelFromNote(noteID:"5cc004ca713f9c1141a20ac4 labelID:"5cc01661299f2121952ca652){message}}' })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success 
                expect(JSON.parse(res.text).data.DeleteLabelFromNote.message).to.deep.equal("label delete from note successfully ")
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

    it('social Git OAuth 2.0 APIs', done => {
        request(server)
            .post('/graphql ')

            //write your data for checking by giving mutation
            .send({ query: 'mutation {gitAuthSocial(email:"bhupendrasingh.ec18@gmail.com"){message}}' })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success 
                expect(JSON.parse(res.text).data.gitAuthSocial.message).to.deep.equal("Mail sent to your given email id")
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

    it('codeVerify APIs', done => {
        request(server)
            .post('/graphql ')

            //write your data for checking by giving mutation
            .send({ query: 'mutation {codeVerify{message}}' })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success 
                expect(JSON.parse(res.text).data.codeVerify.message).to.deep.equal("null")
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

    it('git Auth Token Verify for login APIs', done => {
        request(server)
            .post('/graphql ')

            //write your data for checking by giving mutation
            .send({ query: 'mutation {gitAuthTokenVerify{message}}' })
            .expect(200)
            .end((err, res) => {


                //if any error the return error
                if (err) {
                    return done(err);
                }

                //otherwise return success 
                expect(JSON.parse(res.text).data.gitAuthTokenVerify.message).to.deep.equal("verification successfull")
                done();

            });
    });

});
