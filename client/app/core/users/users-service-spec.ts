/// <reference path="../../../../typings/chai/chai.d.ts"/>
/// <reference path="../../../../typings/mocha/mocha.d.ts"/>
/// <reference path="../../../../typings/es6-promise/es6-promise.d.ts"/>

import {UsersService} from 'core/users/users-service';
import {expect} from 'chai';

export function main() {
  describe('LoginFormComponent', () => {
    it('should exits', () => {
      expect(UsersService).to.be.a('function');
    });

    it('should use our mocks', () => {
      
      let logMock = {};
      let whenAuthenticatedCalledCount = 0;
      let koastMock = {
        user: {
          whenAuthenticated: () => {
            whenAuthenticatedCalledCount++;
            return Promise.resolve();
          }
        }
      };
      let us = new UsersService(koastMock,logMock);
      expect(us).to.be.an('object');
      expect(us.whenReady).to.be.a('function');
      expect(whenAuthenticatedCalledCount).to.be.above(0,'it should call koast.user.whenAuthenicated when the service was init\'d');
    });
  });
}