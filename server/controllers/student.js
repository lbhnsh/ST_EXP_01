const db = require('../db/connect');

// @description Add new student details
// @route POST api/student/add
// @access PUBLIC
const addDetails = (req, res) => {
    const { stname, course, fee, mobile } = req.body;

    if (!stname || !course || isNaN(fee) || isNaN(mobile)) {
        return res
            .status(400)
            .json({ success: false, message: 'Invalid input data' });
    }

    const details = {
        stname: stname,
        course: course,
        fee: fee,
        mobile: mobile,
    };
    const sql = 'INSERT INTO student SET ?';

    db.query(sql, details, (error, result) => {
        if (error) {
            return res
                .status(500)
                .json({ success: false, message: 'Student creation failed' });
        }
        res.status(201).json({
            success: true,
            message: 'Student created successfully',
            id: result.insertId,
        });
    });
};

// @description View student details
// @route GET api/student/view
// @access PUBLIC
const viewDetails = (req, res) => {
    const sql = 'SELECT * FROM STUDENT';
    db.query(sql, (error, result) => {
        if (error) {
            return res
                .status(500)
                .json({ success: false, message: 'Error connecting to DB' });
        }
        res.status(200).json({ success: true, data: result });
    });
};

// @description Search Student Details
// @route GET api/student/:id
// @access PUBLIC
const searchDetails = (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) {
        return res.status(400).json({ success: false, message: 'Invalid ID' });
    }
    const sql = 'SELECT * FROM STUDENT WHERE id = ?';
    db.query(sql, [id], (error, result) => {
        if (error) {
            return res
                .status(500)
                .json({ success: false, message: 'Error connecting to DB' });
        }
        if (result.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: 'Student not found' });
        }
        res.status(200).json({ success: true, data: result[0] });
    });
};

// @description Update the student details
// @route PUT api/student/update/:id
// @access PUBLIC
const updateDetails = (req, res) => {
    const { id } = req.params;
    const { stname, course, fee, mobile } = req.body;

    if (isNaN(id) || !stname || !course || isNaN(fee) || isNaN(mobile)) {
        return res
            .status(400)
            .json({ success: false, message: 'Invalid input data' });
    }

    const sql =
        'UPDATE Student SET stname=?, course=?, fee=?, mobile=? WHERE id=?';
    db.query(sql, [stname, course, fee, mobile, id], (error, result) => {
        if (error) {
            return res
                .status(500)
                .json({ success: false, message: 'Student Update Failed' });
        }
        if (result.affectedRows === 0) {
            return res
                .status(404)
                .json({ success: false, message: 'Student not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Student Updated Successfully',
        });
    });
};

// @description Delete the student details
// @route DELETE api/student/delete/:id
// @access PUBLIC
const deleteDetails = (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) {
        return res.status(400).json({ success: false, message: 'Invalid ID' });
    }
    const sql = 'DELETE FROM Student WHERE id = ?';
    db.query(sql, [id], (error, result) => {
        if (error) {
            return res
                .status(500)
                .json({ success: false, message: 'Student Deletion Failed' });
        }
        if (result.affectedRows === 0) {
            return res
                .status(404)
                .json({ success: false, message: 'Student not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Student Deleted Successfully',
        });
    });
};

module.exports = {
    addDetails,
    viewDetails,
    searchDetails,
    updateDetails,
    deleteDetails,
};
