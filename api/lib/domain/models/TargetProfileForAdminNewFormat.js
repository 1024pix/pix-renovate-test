class TargetProfileForAdminNewFormat {
  constructor({
    id,
    name,
    outdated,
    isPublic,
    createdAt,
    ownerOrganizationId,
    description,
    comment,
    imageUrl,
    category,
    isSimplifiedAccess,
    areas = [],
    competences = [],
    thematics = [],
    tubes = [],
  } = {}) {
    this.isNewFormat = true;
    this.id = id;
    this.name = name;
    this.outdated = outdated;
    this.isPublic = isPublic;
    this.createdAt = createdAt;
    this.ownerOrganizationId = ownerOrganizationId;
    this.description = description;
    this.comment = comment;
    this.imageUrl = imageUrl;
    this.category = category;
    this.isSimplifiedAccess = isSimplifiedAccess;
    this.areas = areas.map(
      (area) =>
        new TP_Area({
          id: area.id,
          title: area.title,
          code: area.code,
          color: area.color,
          competences,
          thematics,
          tubes,
        })
    );
  }

  getContentAsJson() {
    const cappedTubes = this.areas.flatMap((area) => area.getCappedTubes());
    return JSON.stringify(cappedTubes);
  }
}

class TP_Area {
  constructor({ id, title, code, color, competences, thematics, tubes }) {
    this.id = id;
    this.title = title;
    this.code = code;
    this.color = color;
    this.competences = competences
      .filter((competence) => competence.areaId === id)
      .map(
        (competence) =>
          new TP_Competence({
            id: competence.id,
            name: competence.name,
            index: competence.index,
            thematics,
            tubes,
          })
      );
  }

  getCappedTubes() {
    return this.competences.flatMap((competence) => competence.getCappedTubes());
  }
}

class TP_Competence {
  constructor({ id, name, index, thematics, tubes }) {
    this.id = id;
    this.name = name;
    this.index = index;
    this.thematics = thematics
      .filter((thematic) => thematic.competenceId === id)
      .map(
        (thematic) =>
          new TP_Thematic({
            id: thematic.id,
            name: thematic.name,
            index: thematic.index,
            tubes,
          })
      );
  }

  getCappedTubes() {
    return this.thematics.flatMap((thematic) => thematic.getCappedTubes());
  }
}

class TP_Thematic {
  constructor({ id, name, index, tubes }) {
    this.id = id;
    this.name = name;
    this.index = index;
    this.tubes = tubes
      .filter((tube) => tube.thematicId === id)
      .map(
        (tube) =>
          new TP_Tube({
            id: tube.id,
            name: tube.name,
            practicalTitle: tube.practicalTitle,
            level: tube.level,
            mobile: tube.mobile,
            tablet: tube.tablet,
          })
      );
  }

  getCappedTubes() {
    return this.tubes.map((tube) => tube.asCappedTubeDTO());
  }
}

class TP_Tube {
  constructor({ id, name, practicalTitle, level, mobile, tablet }) {
    this.id = id;
    this.name = name;
    this.practicalTitle = practicalTitle;
    this.level = level;
    this.mobile = mobile;
    this.tablet = tablet;
  }

  asCappedTubeDTO() {
    return {
      id: this.id,
      level: this.level,
    };
  }
}

module.exports = TargetProfileForAdminNewFormat;
