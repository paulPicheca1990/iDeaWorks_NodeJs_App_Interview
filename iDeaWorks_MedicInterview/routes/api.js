/*************
 * Includes
 *************/
    var express = require('express');
    var router = express.Router();
    var Patient = require('../models/patient');
    var __REGEXS = {
        NAME: /^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/,
        DATE: /^[0-9]{4,4}-[0-9]{2,2}-[0-9]{2,2}$/,
        ADDRESS: /^[A-Z][a-z]+(\s[A-Z][a-z]+)*([,][\s])[A-Z][a-z]+(\s[A-Z][a-z]+)*$/,
        GENDER: /^(Male|Female){1,1}$/,
        OHCN: /^[0-9]{4,4}([\s\-]{1,1})[0-9]{3,3}([\s\-]{1,1})[0-9]{3,3}(([\s\-]{1,1})([A-Z]{2,2}))*$/
    };

/*************
 * Routing
 *************/
    /* GET API page. */
    router.get('/', function(req, res, next) {
        res.json({ message: 'hooray! welcome to our api!' });
    });

    router.get('/patient/:patient_id', function(req, res, next) {
        Patient.findById(req.params.patient_id, function(err, patient) {
            if (err)
                res.send(err);
            res.json(patient);
        });
    });

    router.get('/patients', function(req, res, next) {
        Patient.find(function(err, patients) {
            if (err)
                res.send(err);

            res.json(patients);
        });
    });

    // Post API Page
    router.post('/patient', function(req, res, next) {
        // bool for validating Attributes of Patient
        var isOK = true;
        var message = {};

        // Create new patient
        var patient = new Patient();

        // First Name
        if( __REGEXS.NAME.test(req.body.first_name) )
            patient.first_name = req.body.first_name;
        else {
            isOK = false;
            message.add(
                {first_name: "Firstname is invalid. Must start with a captial on each word and can be an infinite amount of words."}
            );

            message.add()
        }

        // Middle Name
        patient.middle_name = req.body.middle_name;

        // Last Name
        if( __REGEXS.NAME.test(req.body.last_name) )
            patient.last_name = req.body.last_name;
        else {
            isOK = false;
            message.add(
                {last_name: "Lastname is invalid. Must start with a captial on each word and can be an infinite amount of words."}
            );
        }
        // Address
        if( __REGEXS.ADDRESS.test(req.body.address) )
            patient.address = req.body.address;
        else {
            isOK = false;
            message.add(
                {address: "Address is invalid. Must be like Eg. [Street], [City]."}
            );
        }

        // OHC Number
        if( __REGEXS.OHCN.test(req.body.ohc_number) )
            patient.ohc_number = req.body.ohc_number;
        else {
            isOK = false;
            message.add(
                {ohc: "Ontairo Health Card # is invalid. Must be like 10 digits seperated by spaces or heiphens ( ' ' or '-')"}
            );
        }

        // Date of Birth
        if( __REGEXS.DATE.test(req.body.date_of_birth) )
            patient.date_of_birth = req.body.date_of_birth;
        else {
            isOK = false;
            message.add(
                {date_of_birth: "Date of birth is invalid. Must be like [Year:4]-[Month:2]-[Day:2]"}
            );
        }

        // Gender
        if( __REGEXS.GENDER.test(req.body.gender) )
            patient.gender = req.body.gender;
        else {
            isOK = false;
            message.add(
                {gender: "Gender is invalid. Must be like Male or Female"}
            );
        }

        // Generic Notes
        patient.generic_notes = req.body.generic_notes;

        if(isOK) {
            // save the patient and check for errors
            patient.save(function (err) {
                if (err)
                    res.send(err);

                res.json({message: 'Patient created!'});
            });
        }else{
            res.json(message);
        }
    });

    // Put API Page
    router.put('/patient/:patient_id', function(req, res, next) {
        Patient.findById(req.params.patient_id, function(err, patient) {

            if (err)
                res.send(err);

            //patient.first_name = req.body.first_name;

            // save the bear
            patient.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Patient updated!' });
            });

        });
    });

    // Delete API Page
    router.delete('/patient/:patient_id', function(req, res) {
        Patient.remove({
            _id: req.params.patient_id
        }, function(err, patient) {
            if (err)
                res.send(err);

            res.json({ message: 'Patient Successfully deleted' });
        });
    });


/*************
 * Export
 *************/
    module.exports = router;