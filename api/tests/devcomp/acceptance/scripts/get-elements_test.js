import { getElements, getElementsListAsCsv } from '../../../../scripts/modulix/get-elements-csv.js';
import { expect } from '../../../test-helper.js';
import moduleContent from './test-module.json' with { type: 'json' };

describe('Acceptance | Script | Get Elements as CSV', function () {
  let modulesListAsJs;

  beforeEach(async function () {
    modulesListAsJs = [moduleContent];
  });

  describe('#getElements', function () {
    it('should filter out elements that are not activities', async function () {
      // When
      const elementsListAsJs = await getElements(modulesListAsJs);

      // Then
      expect(elementsListAsJs).to.be.an('array');
      expect(
        elementsListAsJs.every((element) =>
          ['download', 'embed', 'image', 'qcm', 'qcu', 'qrocm', 'separator', 'text', 'video'].includes(element.type),
        ),
      ).to.be.true;
    });

    it('should add some meta info to elements', async function () {
      // When
      const elementsListAsJs = await getElements(modulesListAsJs);

      // Then
      expect(elementsListAsJs).to.be.an('array');
      expect(elementsListAsJs.every((element) => element.moduleSlug !== undefined)).to.be.true;
      expect(elementsListAsJs.every((element) => element.elementPosition !== undefined)).to.be.true;
      expect(elementsListAsJs.every((element) => element.grainPosition !== undefined)).to.be.true;
      expect(elementsListAsJs.every((element) => element.grainId !== undefined)).to.be.true;
      expect(elementsListAsJs.every((element) => element.grainTitle !== undefined)).to.be.true;
    });
  });

  describe('#getElementsListAsCsv', function () {
    it(`should return elements list as CSV`, async function () {
      // When
      const elementsListAsCsv = await getElementsListAsCsv(modulesListAsJs);

      // Then
      expect(elementsListAsCsv).to.be.a('string');
      expect(elementsListAsCsv).to
        .equal(`\ufeff"ElementId"\t"ElementType"\t"ElementPosition"\t"ElementGrainPosition"\t"ElementGrainId"\t"ElementGrainTitle"\t"ElementModuleSlug"
"e9aef60c-f18a-471e-85c7-e50b4731b86b"\t"text"\t1\t1\t"f312c33d-e7c9-4a69-9ba0-913957b8f7dd"\t"Voici une leçon"\t"didacticiel-modulix"
"048e5319-5e81-44cc-ad71-c6c0d3be611f"\t"separator"\t2\t1\t"f312c33d-e7c9-4a69-9ba0-913957b8f7dd"\t"Voici une leçon"\t"didacticiel-modulix"
"8d7687c8-4a02-4d7e-bf6c-693a6d481c78"\t"image"\t3\t1\t"f312c33d-e7c9-4a69-9ba0-913957b8f7dd"\t"Voici une leçon"\t"didacticiel-modulix"
"901ccbaa-f4e6-4322-b863-8e8eab08a33a"\t"download"\t4\t2\t"b14df125-82d5-4d55-a660-7b34cd9ea1ab"\t"Un fichier à télécharger"\t"didacticiel-modulix"
"31106aeb-8346-44a6-8ed4-ebaa2106a373"\t"qcu"\t5\t2\t"b14df125-82d5-4d55-a660-7b34cd9ea1ab"\t"Un fichier à télécharger"\t"didacticiel-modulix"
"3a9f2269-99ba-4631-b6fd-6802c88d5c26"\t"video"\t6\t3\t"73ac3644-7637-4cee-86d4-1a75f53f0b9c"\t"Vidéo de présentation de Pix"\t"didacticiel-modulix"
"71de6394-ff88-4de3-8834-a40057a50ff4"\t"qcu"\t7\t4\t"533c69b8-a836-41be-8ffc-8d4636e31224"\t"Voici un vrai-faux"\t"didacticiel-modulix"
"79dc17f9-142b-4e19-bcbe-bfde4e170d3f"\t"qcu"\t8\t4\t"533c69b8-a836-41be-8ffc-8d4636e31224"\t"Voici un vrai-faux"\t"didacticiel-modulix"
"30701e93-1b4d-4da4-b018-fa756c07d53f"\t"qcm"\t9\t5\t"0be0f5eb-4cb6-47c2-b9d3-cb2ceb4cd21c"\t"Les 3 piliers de Pix"\t"didacticiel-modulix"
"c23436d4-6261-49f1-b50d-13a547529c29"\t"qrocm"\t10\t6\t"4ce2a31a-6584-4dae-87c6-d08b58d0f3b9"\t"Connaissez-vous bien Pix"\t"didacticiel-modulix"
"0e3315fd-98ad-492f-9046-4aa867495d84"\t"embed"\t11\t7\t"46577fb1-aadb-49ba-b3fd-721a11da8eb4"\t"Embed non-auto"\t"didacticiel-modulix"`);
    });
  });
});
