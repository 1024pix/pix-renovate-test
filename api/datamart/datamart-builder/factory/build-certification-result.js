import { datamartBuffer } from '../datamart-buffer.js';

const buildCertificationResult = function ({
  nationalStudentId,
  organizationUai,
  lastName,
  firstName,
  birthdate,
  status,
  pixScore,
  certificationDate,
  competenceId,
  competenceLevel,
} = {}) {
  const values = {
    national_student_id: nationalStudentId,
    organization_uai: organizationUai,
    last_name: lastName,
    first_name: firstName,
    birthdate,
    status,
    pix_score: pixScore,
    certification_date: certificationDate,
    competence_id: competenceId,
    competence_level: competenceLevel,
  };

  datamartBuffer.pushInsertable({
    tableName: 'data_export_parcoursup_certif_result',
    values,
  });

  return {
    nationalStudentId,
  };
};

export { buildCertificationResult };
