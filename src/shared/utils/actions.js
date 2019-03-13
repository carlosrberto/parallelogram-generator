/* eslint-disable import/prefer-default-export */
// External
import { defineAction } from 'redux-define';

/**
 * Create actions types
 * Ex:
 * const login = appTypes.defineAction('login');
 * const FORM = login.defineAction('FORM', ['SUBMIT', 'SUCCESS', 'FAILURE']);
 * {
 *  ACTION: '@app/login/FORM',
 *  SUBMIT: '@app/login/FORM_SUBMIT',
 *  SUCCESS: '@app/login/FORM_SUCCESS',
 *  FAILURE: '@app/login/FORM_FAILURE',
 * }
 */
export const appTypes = defineAction('@app');
