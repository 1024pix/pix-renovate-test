import { Solution } from '../../../../../src/devcomp/domain/models/Solution.js';
import { expect } from '../../../../test-helper.js';

describe('Unit | Domain | Models | Solution', function () {
  describe('#enabledTolerances', function () {
    it('should contain nothing, when no tolerances are set', function () {
      // given
      const solution = new Solution({ id: 'id' });

      // when
      const enabledTolerances = solution.enabledTolerances;

      // then
      expect(enabledTolerances).to.be.empty;
    });

    it('should contain t1, when isT1Enabled is true', function () {
      // given
      const solution = new Solution({ id: 'id', isT1Enabled: true });

      // when
      const enabledTolerances = solution.enabledTolerances;

      // then
      expect(enabledTolerances).to.deep.equal(['t1']);
    });

    it('should contain t2, when isT2Enabled is true', function () {
      // given
      const solution = new Solution({ id: 'id', isT2Enabled: true });

      // when
      const enabledTolerances = solution.enabledTolerances;

      // then
      expect(enabledTolerances).to.deep.equal(['t2']);
    });

    it('should contain t3, when isT3Enabled is true', function () {
      // given
      const solution = new Solution({ id: 'id', isT3Enabled: true });

      // when
      const enabledTolerances = solution.enabledTolerances;

      // then
      expect(enabledTolerances).to.deep.equal(['t3']);
    });

    it('should contain t1, t2, t3, when isT1Enabled, isT2Enabled, isT3Enabled is true', function () {
      // given
      const solution = new Solution({ id: 'id', isT1Enabled: true, isT2Enabled: true, isT3Enabled: true });

      // when
      const enabledTolerances = solution.enabledTolerances;

      // then
      expect(enabledTolerances).to.deep.equal(['t1', 't2', 't3']);
    });
  });

  describe('#deactivations', function () {
    it('should return an deactivations.t1 = false when t1 is enabled ', function () {
      // given
      const solution = new Solution({ id: 'id', isT1Enabled: true });

      // when
      const deactivationsT1 = solution.deactivations.t1;

      // then
      expect(deactivationsT1).to.be.false;
    });

    it('should return an deactivations.t1 = true when t1 is not enabled ', function () {
      // given
      const solution = new Solution({ id: 'id', isT1Enabled: false });

      // when
      const deactivationsT1 = solution.deactivations.t1;

      // then
      expect(deactivationsT1).to.be.true;
    });

    it('should return an deactivations.t2 = false when t2 is enabled ', function () {
      // given
      const solution = new Solution({ id: 'id', isT2Enabled: true });

      // when
      const deactivationsT2 = solution.deactivations.t2;

      // then
      expect(deactivationsT2).to.be.false;
    });

    it('should return an deactivations.t2 = true when t2 is not enabled ', function () {
      // given
      const solution = new Solution({ id: 'id', isT2Enabled: false });

      // when
      const deactivationsT2 = solution.deactivations.t2;

      // then
      expect(deactivationsT2).to.be.true;
    });

    it('should return an deactivations.t3 = false when t3 is enabled ', function () {
      // given
      const solution = new Solution({ id: 'id', isT3Enabled: true });

      // when
      const deactivationsT3 = solution.deactivations.t3;

      // then
      expect(deactivationsT3).to.be.false;
    });

    it('should return an deactivations.t3 = true when t3 is not enabled ', function () {
      // given
      const solution = new Solution({ id: 'id', isT3Enabled: false });

      // when
      const deactivationsT3 = solution.deactivations.t3;

      // then
      expect(deactivationsT3).to.be.true;
    });
  });
});
