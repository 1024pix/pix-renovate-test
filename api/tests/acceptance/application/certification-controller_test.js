const {
  expect, generateValidRequestAuhorizationHeader, cleanupUsersAndPixRolesTables,
  insertUserWithRolePixMaster, insertUserWithStandardRole, knex
} = require('../../test-helper');
const server = require('../../../server');

describe('Acceptance | API | Certifications', () => {

  describe('GET /api/certifications', () => {

    let options;
    const authenticatedUserID = 1234;
    let certificationId;

    const session = {
      certificationCenter: 'Université du Pix',
      address: '1 rue de l\'educ',
      room: 'Salle Benjamin Marteau',
      examiner: '',
      date: '14/08',
      time: '11:00',
      description: '',
      accessCode: 'PIX123'
    };

    const certificationCourse = {
      userId: authenticatedUserID,
      completedAt: '2018-02-15T15:15:52.504Z',
      firstName: 'Bro',
      lastName: 'Ther',
      birthdate: '14/08/1993',
      birthplace: 'Asnières IZI'
    };

    const assessment = {
      userId: authenticatedUserID,
      type: 'CERTIFICATION',
      state: 'completed'
    };

    beforeEach(() => {
      return knex('sessions').insert(session)
        .then((sessionId) => {
          certificationCourse.sessionId = sessionId[0];
          return knex('certification-courses').insert(certificationCourse);
        })
        .then((certificationCourseId) => {
          certificationId = certificationCourseId[0];
          assessment.courseId = certificationCourseId[0];
          return knex('assessments').insert(assessment);
        });
    });

    afterEach(() => {
      return Promise.all([
        knex('sessions').delete(),
        knex('assessments').delete(),
        knex('certification-courses').delete()
      ]);
    });

    it('should return 200 HTTP status code', () => {
      options = {
        method: 'GET',
        url: '/api/certifications',
        headers: { authorization: generateValidRequestAuhorizationHeader() }
      };
      // when
      const promise = server.inject(options);

      // then
      return promise.then((response) => {
        expect(response.statusCode).to.equal(200);
        expect(response.result.data).to.deep.equal([{
          type: 'certifications',
          id: certificationId,
          attributes: {
            'certification-center': 'Université du Pix',
            'date': '2018-02-15T15:15:52.504Z'
          }
        }]);
      });
    });

    it('should return 401 HTTP status code if user is not authenticated', () => {
      // given
      const options = {
        method: 'GET',
        url: '/api/certifications'
      };

      // when
      const promise = server.inject(options);

      // then
      return promise.then((response) => {
        expect(response.statusCode).to.equal(401);
      });
    });
  });

  describe('PATCH /api/certifications/:id', () => {

    let options;

    const JOHN_USERID = 1;
    const JOHN_CERTIFICATION_ID = 2;

    const john_certificationCourse = {
      id: JOHN_CERTIFICATION_ID,
      userId: JOHN_USERID,
      firstName: 'John',
      lastName: 'Doe',
      birthplace: 'Earth',
      birthdate: '24/10/1989',
      completedAt: '01/02/2003',
      sessionId: 1,
      isPublished: false
    };
    const john_completedAssessment = {
      courseId: JOHN_CERTIFICATION_ID,
      userId: JOHN_USERID,
      type: 'CERTIFICATION',
      state: 'completed'
    };

    const session = {
      id: 1,
      certificationCenter: 'Université du Pix',
      address: '137 avenue de Bercy',
      room: 'La grande',
      examiner: 'Serge le Mala',
      date: '24/10/1989',
      time: '21:30',
      accessCode: 'ABCD12'
    };

    beforeEach(() => {
      return knex('sessions').insert(session)
        .then(() => knex('certification-courses').insert([john_certificationCourse]))
        .then(() => knex('assessments').insert([john_completedAssessment]))
        .then(insertUserWithRolePixMaster)
        .then(insertUserWithStandardRole);
    });

    afterEach(() => {
      return Promise.all([
        knex('sessions').delete(),
        knex('assessments').delete(),
        knex('certification-courses').delete(),
        cleanupUsersAndPixRolesTables()
      ]);
    });

    it('should return 204 HTTP status code', () => {
      // given
      options = {
        method: 'PATCH',
        url: `/api/certifications/${JOHN_CERTIFICATION_ID}`,
        headers: { authorization: generateValidRequestAuhorizationHeader(1234) },
        payload: {
          data: {
            type: 'certification',
            id: JOHN_CERTIFICATION_ID,
            attributes: {
              isPublished: true
            }
          }
        }
      };

      // when
      const promise = server.inject(options);

      // then
      return promise
        .then((response) => expect(response.statusCode).to.equal(204))
        .then(() => knex('certification-courses').where('id', JOHN_CERTIFICATION_ID))
        .then((foundCertification) => expect(foundCertification[0].isPublished).to.be.equal(1));
    });

    it('should return unauthorized 403 HTTP status code when user is not pixMaster', () => {
      // given
      options = {
        method: 'PATCH',
        url: `/api/certifications/${JOHN_CERTIFICATION_ID}`,
        headers: { authorization: generateValidRequestAuhorizationHeader(4444) },
        payload: {
          data: {
            attributes: {
              isPublished: true
            }
          }
        }
      };

      // when
      const promise = server.inject(options);

      // then
      return promise
        .then((response) => expect(response.statusCode).to.equal(403))
        .then(() => knex('certification-courses').where('id', JOHN_CERTIFICATION_ID))
        .then((certifications) => expect(certifications[0].isPublished).to.equal(0));
    });
  });
});
