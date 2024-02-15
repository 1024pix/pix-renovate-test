import { expect } from '../../../../../../test-helper.js';
import {
  imageElementSchema,
  qcmElementSchema,
  qcuElementSchema,
  qrocmElementSchema,
  textElementSchema,
  videoElementSchema,
} from './element/index.js';
import { getImageSample } from '../../../../../../../src/devcomp/infrastructure/datasources/learning-content/samples/elements/image.sample.js';
import { getQcmSample } from '../../../../../../../src/devcomp/infrastructure/datasources/learning-content/samples/elements/qcm.sample.js';
import { getQcuSample } from '../../../../../../../src/devcomp/infrastructure/datasources/learning-content/samples/elements/qcu.sample.js';
import { getQrocmSample } from '../../../../../../../src/devcomp/infrastructure/datasources/learning-content/samples/elements/qrocm.sample.js';
import { getTextSample } from '../../../../../../../src/devcomp/infrastructure/datasources/learning-content/samples/elements/text.sample.js';
import { getVideoSample } from '../../../../../../../src/devcomp/infrastructure/datasources/learning-content/samples/elements/video.sample.js';

describe('Unit | Infrastructure | Datasources | Learning Content | Module Datasource | format validation', function () {
  it('should validate sample image structure', function () {
    // When
    const result = imageElementSchema.validate(getImageSample());

    // Then
    expect(result.error).to.equal(undefined, result.error?.details.map((error) => error.message).join('. '));
  });

  it('should validate sample qcm structure', function () {
    // When
    const result = qcmElementSchema.validate(getQcmSample());

    // Then
    expect(result.error).to.equal(undefined, result.error?.details.map((error) => error.message).join('. '));
  });

  it('should validate sample qcu structure', function () {
    // When
    const result = qcuElementSchema.validate(getQcuSample());

    // Then
    expect(result.error).to.equal(undefined, result.error?.details.map((error) => error.message).join('. '));
  });

  it('should validate sample qrocm structure', function () {
    // When
    const result = qrocmElementSchema.validate(getQrocmSample());

    // Then
    expect(result.error).to.equal(undefined, result.error?.details.map((error) => error.message).join('. '));
  });

  it('should validate sample text structure', function () {
    // When
    const result = textElementSchema.validate(getTextSample());

    // Then
    expect(result.error).to.equal(undefined, result.error?.details.map((error) => error.message).join('. '));
  });

  it('should validate sample video structure', function () {
    // When
    const result = videoElementSchema.validate(getVideoSample());

    // Then
    expect(result.error).to.equal(undefined, result.error?.details.map((error) => error.message).join('. '));
  });
});
