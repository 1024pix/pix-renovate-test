class Challenge {
  constructor({
    id,
    instruction,
    proposals,
    type,
    solution,
    t1Status,
    t2Status,
    t3Status,
    scoring,
    status,
    skillIds = [],
    skills = [],
    hasntInternetAllowed,
    timer,
    illustrationUrl,
    attachments,
    competenceId,
  }) {
    this.id = id;
    this.instruction = instruction;
    this.proposals = proposals;
    this.type = type;
    this.solution = solution;
    this.t1Status = t1Status;
    this.t2Status = t2Status;
    this.t3Status = t3Status;
    this.scoring = scoring;
    this.status = status;
    this.skillIds = skillIds;
    this.skills = skills;
    this.hasntInternetAllowed = hasntInternetAllowed;
    this.timer = timer;
    this.illustrationUrl = illustrationUrl;
    this.attachments = attachments;
    this.competenceId = competenceId;
  }

  static fromAirTableObject(airtableEpreuveObject) {

    let hasntInternetAllowed = false;
    if (airtableEpreuveObject.get('Internet et outils')) {
      hasntInternetAllowed = airtableEpreuveObject.get('Internet et outils').toUpperCase() === 'NON';
    }

    let illustrationUrl;
    if (airtableEpreuveObject.get('Illustration de la consigne')) {
      illustrationUrl = airtableEpreuveObject.get('Illustration de la consigne')[0].url;
    }

    let attachments;
    if(airtableEpreuveObject.get('Pièce jointe')) {
      attachments = airtableEpreuveObject.get('Pièce jointe').map(attachment => attachment.url).reverse();
    }

    let competenceId;
    if(airtableEpreuveObject.get('competences')) {
      competenceId = airtableEpreuveObject.get('competences')[0];
    }

    let timer;
    if(airtableEpreuveObject.get('Timer')) {
      timer = parseInt(airtableEpreuveObject.get('Timer'));
    }

    return new Challenge({
      id: airtableEpreuveObject.getId(),
      instruction: airtableEpreuveObject.get('Consigne'),
      proposals: airtableEpreuveObject.get('Propositions'),
      type: airtableEpreuveObject.get('Type d\'épreuve'),
      solution: airtableEpreuveObject.get('Bonnes réponses'),
      t1Status: airtableEpreuveObject.get('T1 - Espaces, casse & accents'),
      t2Status: airtableEpreuveObject.get('T2 - Ponctuation'),
      t3Status: airtableEpreuveObject.get('T3 - Distance d\'édition'),
      scoring: airtableEpreuveObject.get('Scoring'),
      status: airtableEpreuveObject.get('Statut'),
      skillIds: airtableEpreuveObject.get('Acquix'),
      skills: airtableEpreuveObject.get('acquis'),
      timer,
      hasntInternetAllowed,
      illustrationUrl,
      attachments,
      competenceId
    });
  }
}

module.exports = Challenge;
