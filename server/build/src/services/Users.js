"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMulter = void 0;
exports.createUsers = createUsers;
exports.deleteUser = deleteUser;
exports.getUsers = getUsers;
exports.checkUserAuth = checkUserAuth;
exports.logOut = logOut;
exports.checkAuth = checkAuth;
exports.getTeacherOptions = getTeacherOptions;
const Users_1 = __importDefault(require("../../models/Users"));
const index_1 = require("../index");
const Bcrypt_1 = require("../utils/Bcrypt");
function createUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.body;
            const users = yield Users_1.default.get();
            user.Password = (0, Bcrypt_1.hashPassword)(user.Password);
            const findUser = users.find((userDB) => userDB.Id === user.Id);
            console.log(user);
            if (findUser) {
                return res.status(401).send('user already signed');
            }
            else {
                yield Users_1.default.create(user);
                index_1.io.addUser(user);
                console.log('----------------------servr');
                req.session.user = user;
                return res.status(200).json(user);
            }
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const user = yield Users_1.default.update({ Id: id }, { Active: false }, { new: true });
            res.send(id).status(200);
            index_1.io.deleteUser(user);
        }
        catch (e) {
            res.status(400).send(e);
            // console.log('not updated',e)
        }
    });
}
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(Users_1.default);
            const users = yield Users_1.default.get();
            res.send(users).status(200);
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
function checkUserAuth(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const User = req.body;
            // console.log(Users)
            const users = yield Users_1.default.get();
            // const Password = users.find((user)=> user.Password === User.Password)
            const selectedUser = users.find((user) => user.Id === User.Id);
            console.log(selectedUser === null || selectedUser === void 0 ? void 0 : selectedUser.Password);
            if (!selectedUser || !(0, Bcrypt_1.comparePassword)(User.Password, selectedUser.Password)) {
                return res.status(401).send('bad credentials');
            }
            else {
                // console.log(selectedUser)
                req.session.user = selectedUser;
                console.log(req.session);
                return res.status(200).send(selectedUser);
            }
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
function logOut(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('in');
        try {
            req.session.destroy((err) => {
                console.log(err);
            });
            res.send('logged out').status(200);
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
function checkAuth(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.session.user) {
                return res.status(401).send({ Id: undefined, Password: undefined });
            }
            else {
                res.status(200).send(req.session.user);
            }
            // const User :userCredentials = req.body
            // console.log(Users)
            // const users:userInterface[] = await Users.get()
            // // const Password = users.find((user)=> user.Password === User.Password)
            // const selectedUser = users.find((user)=> user.Id === User.Id)
            // if (!selectedUser || selectedUser.Password !==User.Password){
            //     return res.status(401).send('bad credentials')
            // }
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
function getTeacherOptions(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // console.log(Subjects)
            const year = req.params.year;
            const subjects = yield Users_1.default.aggregation([
                {
                    '$lookup': {
                        'from': 'courses',
                        'localField': 'Id',
                        'foreignField': 'TeacherId',
                        'as': 'result'
                    }
                }, {
                    '$unwind': {
                        'path': '$result',
                        'preserveNullAndEmptyArrays': false
                    }
                }, {
                    '$project': {
                        '_id': 1,
                        'Id': 1,
                        'Name': 1,
                        'BirthYear': 1,
                        'Password': 1,
                        'Gender': 1,
                        'Job': 1,
                        '__v': 1,
                        'year': '$result.enrollementYear'
                    }
                }, {
                    '$match': {
                        'year': { '$ne': year }
                    }
                }
            ]);
            console.log(subjects, 1);
            res.send(subjects).status(200);
        }
        catch (e) {
            res.send(e).status(400);
        }
    });
}
const postMulter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.status(200).send(`File uploaded successfully: ${req.file.filename}`);
});
exports.postMulter = postMulter;
