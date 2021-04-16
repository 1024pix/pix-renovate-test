class CertificationChallenge {
  constructor({
    id,
    associatedSkillName,
    associatedSkillId,
    challengeId,
    courseId,
    competenceId,
    isNeutralized,
    certifiableBadgeKey,
  } = {}) {
    this.id = id;
    this.associatedSkillName = associatedSkillName;
    this.associatedSkillId = associatedSkillId;
    this.challengeId = challengeId;
    this.competenceId = competenceId;
    this.courseId = courseId;
    this.isNeutralized = isNeutralized;
    this.certifiableBadgeKey = certifiableBadgeKey;
  }

  static create({
    associatedSkillName,
    associatedSkillId,
    challengeId,
    competenceId,
  }) {
    return new CertificationChallenge({
      id: undefined,
      courseId: undefined,
      associatedSkillName,
      associatedSkillId,
      challengeId,
      competenceId,
      isNeutralized: false,
      certifiableBadgeKey: null,
    });
  }

  neutralize() {
    this.isNeutralized = true;
  }
}

module.exports = CertificationChallenge;
