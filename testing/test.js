/******************************************************************************
 *  Execution       : default node          : cmd> testMocha.js
 *                      
 * 
 *  Purpose         : test code from Mocha
 * 
 *  @description    : check code which is wriiten in your program by using mocha
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
const chai = require('chai')
const expect = chai.expect;

const url = `http://localhost:4000/`;

const request = require('supertest')(url);

describe('GraphQL', () => {
    it('Returns user with login', (done) => {
        request.post('/graphql')
            .send({ mutation: '{login (email:akash@gmail.com, password:akash1),message }' })
            .expect(200)
            .end((err, res) => {
                /*
                 res will contain array with one user
                */
                if (err) return done(err);
                res.body.user.should.have.property('email')
                res.body.user.should.have.property('password')
                done();
            })
    })

    it('Returns all users', (done) => {
        request.post('/graphql')
            .send({ mutation: '{login (email:akash@gmail.com, password:akash1),token }' })
            .expect(200)
            .end((err, res) => {
                /*
                 res will contain array of all users
                */
                if (err) return done(err);
                /*
                 assume there are a 100 users in the database
                */
               res.body.user.should.have.lengthOf(100);
            })
    })
});