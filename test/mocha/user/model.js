'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

//Globals
var user, user2;

//The tests
describe('<Unit Test>', function() {
    describe('Model User:', function() {
        before(function(done) {
            user = new User({
                email: 'mail@trippie.com',
                username: 'user',
                password: 'password'
            });
            user2 = new User({
                email: 'mail@trippie.com',
                username: 'user',
                password: 'password'
            });

            done();
        });

        describe('Method Save', function() {
            it('should begin with no users', function(done) {
                User.find({}, function(err, users) {
                    users.should.have.length(0);
                    done();
                });
            });

            it('should be able to save whithout problems', function(done) {
                user.save(done);
            });

            it('should fail to save an existing user again', function(done) {
                user.save();
                return user2.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without email', function(done) {
                user.email = '';
                return user.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save with incorrect email <- no @', function(done) {
                user.email = 'test_mail.com'; // not @
                return user.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save with incorrect email <- multiple @', function(done) {
                user.email = 'a@test@mail.com';
                return user.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save with incorrect email <- invalid charactes', function(done) {
                user.email = 'a"b(c)d,e:f;g<h>i[j\k]l@example.com';
                return user.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

        });

        after(function(done) {
            User.remove().exec();
            done();
        });
    });
});