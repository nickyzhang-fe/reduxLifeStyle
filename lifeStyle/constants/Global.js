/**
 * Created by Cral-Gates on 2017/5/2.
 */
'use strict';
import React, {Component} from 'react';

var API_ADDRESS = 'https://leancloud.cn:443/1.1';
var GLOBAL = {
    HOST: API_ADDRESS,
    LOGIN: API_ADDRESS + '/login?',
    REGISTER: API_ADDRESS + '/users',
    NOTES:API_ADDRESS + '/classes/note?where=',
    ADDNOTE: API_ADDRESS + '/classes/note',
    DELETENOTE: API_ADDRESS + '/classes/note/',
    ADDNOTEBOOK: API_ADDRESS + '/classes/notebook',
    NOTEBOOK:API_ADDRESS + '/classes/notebook?where=',
    NOTEUPDATE: API_ADDRESS + '/classes/note/'
};
export default GLOBAL;