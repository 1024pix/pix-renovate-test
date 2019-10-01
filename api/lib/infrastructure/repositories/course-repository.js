const Course = require('../../domain/models/Course');
const courseDatasource = require('../datasources/airtable/course-datasource');
const _ = require('lodash');
const { NotFoundError } = require('../../domain/errors');

function _toDomain(courseDataObject) {
  return new Course({
    id: courseDataObject.id,
    type: courseDataObject.adaptive ? 'PLACEMENT' : 'DEMO',
    name: courseDataObject.name,
    description: courseDataObject.description,
    imageUrl: courseDataObject.imageUrl,
    challenges: _.reverse(courseDataObject.challenges),
    competences: courseDataObject.competences,
  });
}

module.exports = {

  getAdaptiveCourses() {
    return courseDatasource.getAdaptiveCourses().then((courseDataObjects) => {
      return courseDataObjects.map(_toDomain);
    });
  },

  get(id) {
    return courseDatasource.get(id).then(_toDomain);
  },

  getCourseName(id) {
    return this.get(id)
      .then((course) => {
        return course.name;
      })
      .catch(() => {
        throw new NotFoundError('Le test demandé n\'existe pas');
      });
  }
};
