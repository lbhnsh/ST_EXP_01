const { expect } = require('chai');
const express = require('express');
const app = express();
const chaiHttp = require('chai-http');
const chai = require('chai');

chai.use(chaiHttp);

// Import your functions
const {
    addDetails,
    viewDetails,
    searchDetails,
    updateDetails,
    deleteDetails,
} = require('../controllers/student');

// Configure the Express app to use JSON and your functions
app.use(express.json());

app.post('/api/student/add', addDetails);
app.get('/api/student/view', viewDetails);
app.get('/api/student/:id', searchDetails);
app.put('/api/student/update/:id', updateDetails);
app.delete('/api/student/delete/:id', deleteDetails);

describe('Student API Test', () => {
    // Test variables
    let studentId;

    // Pass Test Cases:

    it('should add a new student and return success', done => {
        chai.request(app)
            .post('/api/student/add')
            .send({
                stname: 'John Doe',
                course: 'Math',
                fee: 1000,
                mobile: '1234567890',
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body.success).to.be.true;
                studentId = res.body.id;
                done();
            });
    });

    it('should retrieve all student details and return success', done => {
        chai.request(app)
            .get('/api/student/view')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.success).to.be.true;
                done();
            });
    });

    it('should update a student and return success', done => {
        chai.request(app)
            .put(`/api/student/update/${studentId}`)
            .send({
                stname: 'Updated Name',
                course: 'Updated Course',
                fee: 2000,
                mobile: '9876543210',
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.success).to.be.true;
                done();
            });
    });

    // it('should delete a student and return success', done => {
    //     chai.request(app)
    //         .delete(`/api/student/delete/${studentId}`)
    //         .end((err, res) => {
    //             expect(res).to.have.status(200);
    //             expect(res.body.success).to.be.true;
    //             done();
    //         });
    // });

    // it('should return 404 for a non-existing student', done => {
    //     chai.request(app)
    //         .get('/api/student/9999') // Assuming 9999 is not a valid student ID
    //         .end((err, res) => {
    //             expect(res).to.have.status(404);
    //             expect(res.body.success).to.be.false;
    //             done();
    //         });
    // });

    // // Fail Test Cases:

    // it('should return an error for missing student name', done => {
    //     chai.request(app)
    //         .post('/api/student/add')
    //         .send({
    //             course: 'Math',
    //             fee: 1000,
    //             mobile: '1234567890',
    //         })
    //         .end((err, res) => {
    //             expect(res).to.have.status(400);
    //             expect(res.body.success).to.be.false;
    //             done();
    //         });
    // });

    // it('should return an error for invalid fee value', done => {
    //     chai.request(app)
    //         .post('/api/student/add')
    //         .send({
    //             stname: 'John Doe',
    //             course: 'Math',
    //             fee: 'invalid_fee',
    //             mobile: '1234567890',
    //         })
    //         .end((err, res) => {
    //             expect(res).to.have.status(400);
    //             expect(res.body.success).to.be.false;
    //             done();
    //         });
    // });

    // it('should return an error for updating with invalid fee value', done => {
    //     chai.request(app)
    //         .put(`/api/student/update/${studentId}`)
    //         .send({
    //             stname: 'Updated Name',
    //             course: 'Updated Course',
    //             fee: 'invalid_fee',
    //             mobile: '9876543210',
    //         })
    //         .end((err, res) => {
    //             expect(res).to.have.status(400);
    //             expect(res.body.success).to.be.false;
    //             done();
    //         });
    // });

    // it('should return an error when deleting a non-existing student', done => {
    //     chai.request(app)
    //         .delete('/api/student/delete/9999')
    //         .end((err, res) => {
    //             expect(res).to.have.status(404);
    //             expect(res.body.success).to.be.false;
    //             done();
    //         });
    // });

    // it('should handle valid ID and return a 200 status with student data', done => {
    //     const validId = 3;

    //     chai.request(app)
    //         .get(`/api/student/${validId}`)
    //         .end((err, res) => {
    //             expect(res).to.have.status(200);
    //             expect(res.body.success).to.be.true;
    //             expect(res.body.data).to.exist;
    //             done();
    //         });
    // });

    // it('should handle invalid ID and return a 400 status', done => {
    //     const invalidId = 'abc';

    //     chai.request(app)
    //         .get(`/api/student/${invalidId}`)
    //         .end((err, res) => {
    //             expect(res).to.have.status(400);
    //             expect(res.body).to.deep.equal({
    //                 success: false,
    //                 message: 'Invalid ID',
    //             });
    //             done();
    //         });
    // });

    // it('should handle student not found and return a 404 status', done => {
    //     const nonExistentId = 9999;

    //     chai.request(app)
    //         .put(`/api/student/update/${nonExistentId}`)
    //         .send({
    //             stname: 'Updated Name',
    //             course: 'Updated Course',
    //             fee: 2000,
    //             mobile: '9876543210',
    //         })
    //         .end((err, res) => {
    //             expect(res).to.have.status(404);
    //             expect(res.body).to.deep.equal({
    //                 success: false,
    //                 message: 'Student not found',
    //             });
    //             done();
    //         });
    // });

    // it('should handle invalid ID and return a 400 status', done => {
    //     const invalidId = 'abc';

    //     chai.request(app)
    //         .delete(`/api/student/delete/${invalidId}`)
    //         .end((err, res) => {
    //             expect(res).to.have.status(400);
    //             expect(res.body).to.deep.equal({
    //                 success: false,
    //                 message: 'Invalid ID',
    //             });
    //             done();
    //         });
    // });
});