class CpfCertificationResult {
  constructor({
    id,
    firstName,
    lastName,
    birthdate,
    sex,
    birthINSEECode,
    birthPostalCode,
    publishedAt,
    pixScore,
    competenceMarks,
  } = {}) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthdate = birthdate;
    this.sex = sex;
    this.birthINSEECode = birthINSEECode;
    this.birthPostalCode = birthPostalCode;
    this.publishedAt = publishedAt;
    this.pixScore = pixScore;
    this.competenceMarks = competenceMarks;
  }
}

module.exports = CpfCertificationResult;
