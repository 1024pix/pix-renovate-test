import { getElements, getElementsListAsCsv } from '../../../../scripts/modulix/get-elements-csv.js';
import { expect } from '../../../test-helper.js';

const moduleContent = {
  id: '6282925d-4775-4bca-b513-4c3009ec5886',
  slug: 'didacticiel-modulix',
  title: 'Didacticiel Modulix',
  isBeta: true,
  details: {
    image: 'https://images.pix.fr/modulix/placeholder-details.svg',
    description: '<p>Découvrez avec ce didacticiel comment fonctionne Modulix !</p>',
    duration: 5,
    level: 'Débutant',
    tabletSupport: 'inconvenient',
    objectives: ['Naviguer dans Modulix', 'Découvrir les leçons et les activités'],
  },
  transitionTexts: [
    {
      content:
        "<p>Bonjour et bienvenue dans ce didacticiel Modulix. Vous allez pouvoir facilement découvrir comment fonctionne ce nouveau produit Pix.<br>C'est partix&#8239;!</p>",
      grainId: 'f312c33d-e7c9-4a69-9ba0-913957b8f7dd',
    },
    {
      content:
        '<p>Chaque leçon a un objectif pédagogique précis.</p><p>Dans la prochaine leçon, nous vous proposons de découvrir Pix avec une courte vidéo&nbsp;<span aria-hidden="true">📺</span></p>',
      grainId: '73ac3644-7637-4cee-86d4-1a75f53f0b9c',
    },
    {
      content:
        '<p>Vous allez faire votre première activité. Les activités servent à vérifier que vous avez compris l\'essentiel des leçons.<br>Dans les activités Modulix, vous avez votre résultat immédiatement. À vous de jouer&nbsp;<span aria-hidden="true">🚀</span></p>',
      grainId: '533c69b8-a836-41be-8ffc-8d4636e31224',
    },
    {
      content:
        '<p>Vous l’aurez compris, on aime varier les plaisirs et proposer différents types d’activité, après le questionnaire à choix unique on vous laisse découvrir le QCM&#8239;!</p>',
      grainId: '0be0f5eb-4cb6-47c2-b9d3-cb2ceb4cd21c',
    },
    {
      content:
        '<p>Vous l\'avez peut-être remarqué&nbsp;: dans un module, vous pouvez voir tous les contenus en remontant la page&nbsp;<span aria-hidden="true">👆</span></p>',
      grainId: '2a77a10f-19a3-4544-80f9-8012dad6506a',
    },
    {
      content:
        '<p>Vous arrivez à la fin de ce didacticiel. Une dernière activité et vous serez prêt à explorer tous les modules que vous souhaitez&#8239;!<span aria-hidden="true">🌟</span> </p>',
      grainId: '7cf75e70-8749-4392-8081-f2c02badb0fb',
    },
  ],
  grains: [
    {
      id: 'f312c33d-e7c9-4a69-9ba0-913957b8f7dd',
      type: 'discovery',
      title: 'Voici une leçon',
      components: [
        {
          type: 'element',
          element: {
            id: '47823e8f-a4af-44d6-96f7-5b6fc7bc6b51',
            type: 'flashcards',
            instruction:
              '<p>Lisez la question, essayez de trouver la réponse puis retourner la carte en cliquant dessus.<br>Cela permet de tester votre mémoire 🎯</p>',
            title: 'Introduction à la poésie',
            introImage: {
              url: 'https://images.pix.fr/modulix/didacticiel/intro-flashcards.png',
            },
            cards: [
              {
                id: 'e1de6394-ff88-4de3-8834-a40057a50ff4',
                recto: {
                  image: {
                    url: 'https://images.pix.fr/modulix/didacticiel/icon.svg',
                  },
                  text: 'Qui a écrit « Le Dormeur du Val ? »',
                },
                verso: {
                  image: {
                    url: 'https://images.pix.fr/modulix/didacticiel/chaton.jpg',
                  },
                  text: '<p>Arthur Rimbaud</p>',
                },
              },
              {
                id: '48d0cd29-1e08-4b18-b15a-411ab83e5d3c',
                recto: {
                  text: "Comment s'appelait la fille de Victor Hugo, évoquée dans le poème « Demain dès l'aube » ?",
                },
                verso: {
                  text: '<p>Léopoldine</p>',
                },
              },
              {
                id: '2611784c-cf3f-4445-998d-d02fa568da0c',
                recto: {
                  image: {
                    url: 'https://images.pix.fr/modulix/didacticiel/icon.svg',
                  },
                  text: "Quel animal a des yeux « mêlés de métal et d'agathe » selon Charles Baudelaire ?",
                },
                verso: {
                  image: {
                    url: 'https://images.pix.fr/modulix/didacticiel/chaton.jpg',
                  },
                  text: '<p>Le chat</p>',
                },
              },
            ],
          },
        },
        {
          type: 'element',
          element: {
            id: 'e9aef60c-f18a-471e-85c7-e50b4731b86b',
            type: 'text',
            content:
              '<h3>Pour afficher mon texte sur plusieurs colonnes, je peux utiliser la classe <em>modulix-two-columns</em>.</h3>\n <p>Des noms d\'artistes de musique très sympas:</p>\n<ol class="modulix-two-columns">\n    <li>Dylan</li>\n    <li>The Beatles</li>\n    <li>The Who</li>\n    <li>Blondie</li>\n    <li>Joan Baez</li>\n    <li>Supertramp</li>\n    <li>Kraftwerk</li>\n    <li>Queen</li>\n    <li>David Bowie</li>\n    <li>Céline Dion</li>\n</ol>',
          },
        },
        {
          type: 'element',
          element: {
            id: '84726001-1665-457d-8f13-4a74dc4768ea',
            type: 'text',
            content:
              '<h3>On commence avec les leçons.<br>Les leçons sont des textes, des images ou des vidéos. Les leçons sont là pour vous expliquer des concepts ou des méthodes.</h3>',
          },
        },
        {
          type: 'element',
          element: {
            id: '048e5319-5e81-44cc-ad71-c6c0d3be611f',
            type: 'separator',
          },
        },
        {
          type: 'element',
          element: {
            id: 'a2372bf4-86a4-4ecc-a188-b51f4f98bca2',
            type: 'text',
            content:
              '<p>Voici un texte de leçon. Parfois, il y a des émojis pour aider à la lecture&nbsp;<span aria-hidden="true">📚</span>.</p>',
          },
        },
        {
          type: 'element',
          element: {
            id: '4cfd27d5-0947-47af-bfb6-52467143c38b',
            type: 'text',
            content: '<p>Et là, voici une image&#8239;!</p>',
          },
        },
        {
          type: 'element',
          element: {
            id: '8d7687c8-4a02-4d7e-bf6c-693a6d481c78',
            type: 'image',
            url: 'https://images.pix.fr/modulix/didacticiel/ordi-spatial.svg',
            alt: "Dessin détaillé dans l'alternative textuelle",
            alternativeText: "Dessin d'un ordinateur dans un univers spatial.",
          },
        },
      ],
    },
    {
      id: 'b14df125-82d5-4d55-a660-7b34cd9ea1ab',
      type: 'challenge',
      title: 'Un fichier à télécharger',
      components: [
        {
          type: 'element',
          element: {
            id: '901ccbaa-f4e6-4322-b863-8e8eab08a33a',
            type: 'download',
            files: [
              { url: 'https://dl.pix.fr/1641899675462/Pix_velos.xlsx', format: '.xlsx' },
              { url: 'https://dl.pix.fr/1641899675463/Pix_velos.ods', format: '.ods' },
            ],
          },
        },
        {
          type: 'element',
          element: {
            id: '31106aeb-8346-44a6-8ed4-ebaa2106a373',
            type: 'qcu',
            instruction: "<p>Quelle type de recette souhaite obtenir l'utilisateur dans l'image&nbsp;?</p>",
            proposals: [
              {
                id: '1',
                content: 'Des recettes de lasagne',
                feedback: '<span class="feedback__state">Incorrect.</span><p>Erreur, ce ne sont pas des lasagnes</p>',
              },
              {
                id: '2',
                content: 'Des recettes de pâté en croûte',
                feedback:
                  '<span class="feedback__state">Incorrect.</span><p>Non, ce ne sont pas des recettes de pâté en croûte</p>',
              },
              {
                id: '3',
                content: 'Des recettes végétariennes',
                feedback:
                  '<span class="feedback__state">Correct&#8239;!</span><p>Bonne réponse ! Ce sont bien des recettes végétariennes</p>',
              },
            ],
            solution: '3',
          },
        },
      ],
    },
    {
      id: '73ac3644-7637-4cee-86d4-1a75f53f0b9c',
      type: 'lesson',
      title: 'Vidéo de présentation de Pix',
      components: [
        {
          type: 'element',
          element: {
            id: '342183f7-af51-4e4e-ab4c-ebed1e195063',
            type: 'text',
            content: '<p>À la fin de cette vidéo, une question sera posée sur les compétences Pix.</p>',
          },
        },
        {
          type: 'element',
          element: {
            id: '3a9f2269-99ba-4631-b6fd-6802c88d5c26',
            type: 'video',
            title: 'Vidéo de présentation de Pix',
            url: 'https://videos.pix.fr/modulix/didacticiel/presentation.mp4',
            subtitles: '',
            transcription:
              '<p>Le numérique évolue en permanence, vos compétences aussi, pour travailler, communiquer et s\'informer, se déplacer, réaliser des démarches, un enjeu tout au long de la vie.</p><p>Sur <a href="https://pix.fr" target="blank">pix.fr</a>, testez-vous et cultivez vos compétences numériques.</p><p>Les tests Pix sont personnalisés, les questions s\'adaptent à votre niveau, réponse après réponse.</p><p>Évaluez vos connaissances et savoir-faire sur 16 compétences, dans 5 domaines, sur 5 niveaux de débutants à confirmer, avec des mises en situation ludiques, recherches en ligne, manipulation de fichiers et de données, culture numérique...</p><p>Allez à votre rythme, vous pouvez arrêter et reprendre quand vous le voulez.</p><p>Toutes les 5 questions, découvrez vos résultats et progressez grâce aux astuces et aux tutos.</p><p>En relevant les défis Pix, vous apprendrez de nouvelles choses et aurez envie d\'aller plus loin.</p><p>Vous pensez pouvoir faire mieux&#8239;?</p><p>Retentez les tests et améliorez votre score.</p><p>Faites reconnaître officiellement votre niveau en passant la certification Pix, reconnue par l\'État et le monde professionnel.</p><p>Pix&nbsp;: le service public en ligne pour évaluer, développer et certifier ses compétences numériques.</p>',
            poster: 'https://images.pix.fr/modulix/didacticiel/ordi-spatial.svg',
          },
        },
      ],
    },
    {
      id: '533c69b8-a836-41be-8ffc-8d4636e31224',
      type: 'activity',
      title: 'Voici un vrai-faux',
      components: [
        {
          type: 'stepper',
          steps: [
            {
              elements: [
                {
                  id: '71de6394-ff88-4de3-8834-a40057a50ff4',
                  type: 'qcu',
                  instruction: '<p>Pix évalue 16 compétences numériques différentes.</p>',
                  proposals: [
                    {
                      id: '1',
                      content: 'Vrai',
                    },
                    {
                      id: '2',
                      content: 'Faux',
                    },
                  ],
                  feedbacks: {
                    valid:
                      '<span class="feedback__state">Correct&#8239;!</span><p> Ces 16 compétences sont rangées dans 5 domaines.</p>',
                    invalid:
                      '<span class="feedback__state">Incorrect.</span><p> Retourner voir la vidéo si besoin&nbsp;<span aria-hidden="true">👆</span>!</p>',
                  },
                  solution: '1',
                },
              ],
            },
            {
              elements: [
                {
                  id: '79dc17f9-142b-4e19-bcbe-bfde4e170d3f',
                  type: 'qcu',
                  instruction: '<p>Pix est découpé en 6 domaines.</p>',
                  proposals: [
                    {
                      id: '1',
                      content: 'Vrai',
                    },
                    {
                      id: '2',
                      content: 'Faux',
                    },
                  ],
                  feedbacks: {
                    valid: '<span class="feedback__state">Correct&#8239;!</span><p> Bien vu !</p>',
                    invalid:
                      '<span class="feedback__state">Incorrect.</span><p> Et non ! Il y a seulement 5 domaines sur Pix.</p>',
                  },
                  solution: '2',
                },
              ],
            },
            {
              elements: [
                {
                  id: '9c73500d-abd9-4cc4-ab2d-a3876285b13c',
                  type: 'qcu',
                  instruction: '<p>Les compétences de Pix sont sur 8 niveaux.</p>',
                  proposals: [
                    {
                      id: '1',
                      content: 'Vrai',
                    },
                    {
                      id: '2',
                      content: 'Faux',
                    },
                  ],
                  feedbacks: {
                    valid:
                      '<span class="feedback__state">Correct&#8239;!</span><p> Et oui ! A noter, seulement 7 sont actifs aujourd’hui.</p>',
                    invalid:
                      '<span class="feedback__state">Incorrect.</span><p> Incorrect ! Il existe 8 niveaux par compétence.</p>',
                  },
                  solution: '1',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: '0be0f5eb-4cb6-47c2-b9d3-cb2ceb4cd21c',
      type: 'summary',
      title: 'Les 3 piliers de Pix',
      components: [
        {
          type: 'element',
          element: {
            id: '30701e93-1b4d-4da4-b018-fa756c07d53f',
            type: 'qcm',
            instruction: '<p>Quels sont les 3 piliers de Pix&#8239;?</p>',
            proposals: [
              {
                id: '1',
                content: 'Evaluer ses connaissances et savoir-faire sur 16 compétences du numérique',
              },
              {
                id: '2',
                content: 'Développer son savoir-faire sur les jeux de type TPS',
              },
              {
                id: '3',
                content: 'Développer ses compétences numériques',
              },
              {
                id: '4',
                content: 'Certifier ses compétences Pix',
              },
              {
                id: '5',
                content: 'Evaluer ses compétences de logique et compréhension mathématique',
              },
            ],
            feedbacks: {
              valid: '<span class="feedback__state">Correct&#8239;!</span><p>Vous nous avez bien cernés&nbsp;:)</p>',
              invalid:
                '<span class="feedback__state">Et non&#8239;!</span><p> Pix sert à évaluer, certifier et développer ses compétences numériques.</p>',
            },
            solutions: ['1', '3', '4'],
          },
        },
      ],
    },
    {
      id: '2a77a10f-19a3-4544-80f9-8012dad6506a',
      type: 'activity',
      title: 'Activité remonter dans la page',
      components: [
        {
          type: 'element',
          element: {
            id: '0a5e77e8-1c8e-4cb6-a41d-cf6ad7935447',
            type: 'qcu',
            instruction: '<p>Remontez la page pour trouver le premier mot de ce module.<br>Quel est ce mot&#8239;?</p>',
            proposals: [
              {
                id: '1',
                content: 'Bienvenue',
              },
              {
                id: '2',
                content: 'Bonjour',
              },
              {
                id: '3',
                content: 'Nous',
              },
            ],
            feedbacks: {
              valid: '<span class="feedback__state">Correct&#8239;!</span><p> Vous avez bien remonté la page</p>',
              invalid:
                '<span class="feedback__state">Incorrect.</span><p> Remonter la page pour retrouver le premier mot&#8239;!</p>',
            },
            solution: '2',
          },
        },
      ],
    },
    {
      id: '4ce2a31a-6584-4dae-87c6-d08b58d0f3b9',
      type: 'activity',
      title: 'Connaissez-vous bien Pix',
      components: [
        {
          type: 'element',
          element: {
            id: 'c23436d4-6261-49f1-b50d-13a547529c29',
            type: 'qrocm',
            instruction: '<p>Compléter le texte suivant :</p>',
            proposals: [
              {
                type: 'text',
                content: '<span>Pix est un</span>',
              },
              {
                input: 'pix-name',
                type: 'input',
                inputType: 'text',
                size: 10,
                display: 'inline',
                placeholder: '',
                ariaLabel: 'Mot à trouver',
                defaultValue: '',
                tolerances: ['t1', 't3'],
                solutions: ['Groupement'],
              },
              {
                type: 'text',
                content: "<span>d'intérêt public qui a été créée en</span>",
              },
              {
                input: 'pix-birth',
                type: 'input',
                inputType: 'text',
                size: 10,
                display: 'inline',
                placeholder: '',
                ariaLabel: 'Année à trouver',
                defaultValue: '',
                tolerances: [],
                solutions: ['2016'],
              },
            ],
            feedbacks: {
              valid:
                '<span class="feedback__state">Correct&#8239;!</span><p> vous nous connaissez bien&nbsp;<span aria-hidden="true">🎉</span></p>',
              invalid:
                '<span class="feedback__state">Incorrect&#8239;!</span><p> vous y arriverez la prochaine fois&#8239;!</p>',
            },
          },
        },
      ],
    },
    {
      id: '46577fb1-aadb-49ba-b3fd-721a11da8eb4',
      type: 'activity',
      title: 'Embed non-auto',
      components: [
        {
          type: 'element',
          element: {
            id: '0e3315fd-98ad-492f-9046-4aa867495d84',
            type: 'embed',
            isCompletionRequired: false,
            title: 'Simulateur de visioconférence',
            url: 'https://epreuves.pix.fr/visio.html?mode=visio3',
            instruction: '<p>Vous participez à la visioconférence ci-dessous.</p>',
            height: 600,
          },
        },
        {
          type: 'element',
          element: {
            id: '7fe0bc5f-1988-4da6-8231-a987335f2ae5',
            type: 'qrocm',
            instruction: '<p>Répondez à la question suivante</p>',
            proposals: [
              {
                type: 'text',
                content: '<span>Prénom de la personne qui est en train de parler&#8239;: </span>',
              },
              {
                input: 'qui-parle',
                type: 'input',
                inputType: 'text',
                size: 10,
                display: 'inline',
                placeholder: '',
                ariaLabel: 'Remplir le prénom de la personne qui est en train de parler dans la visioconférence',
                defaultValue: '',
                tolerances: ['t1', 't2', 't3'],
                solutions: ['Katie'],
              },
            ],
            feedbacks: {
              valid: '<span class="feedback__state">Correct&#8239;!</span>',
              invalid: '<span class="feedback__state">Incorrect&#8239;!</span>',
            },
          },
        },
      ],
    },
    {
      id: 'e8db3f90-4259-4d54-9113-1c56da726d8d',
      type: 'activity',
      title: 'Embed auto',
      components: [
        {
          type: 'element',
          element: {
            id: '0559b68c-68a5-4816-a06e-f1c743c391e3',
            type: 'embed',
            isCompletionRequired: true,
            title: 'Simulateur de visioconférence - micro ouvert',
            url: 'https://epreuves.pix.fr/visio/visio.html?mode=modulix-didacticiel',
            instruction:
              '<p>Vous participez à la visioconférence ci-dessous.</p><p>Il y a du bruit à côté de vous.</p><p>Coupez le son de votre micro pour ne pas déranger vos interlocuteurs.</p>',
            solution: 'toto',
            height: 600,
          },
        },
      ],
    },
    {
      id: '7cf75e70-8749-4392-8081-f2c02badb0fb',
      type: 'activity',
      title: 'Le nom de ce produit',
      components: [
        {
          type: 'element',
          element: {
            id: '98c51fa7-03b7-49b1-8c5e-49341d35909c',
            type: 'qrocm',
            instruction: '<p>Quel est le nom de ce nouveau produit Pix&#8239;?</p>',
            proposals: [
              {
                input: 'nom-produit',
                type: 'input',
                inputType: 'text',
                size: 10,
                display: 'block',
                placeholder: '',
                ariaLabel: 'Nom de ce produit',
                defaultValue: '',
                tolerances: ['t1'],
                solutions: ['Modulix'],
              },
            ],
            feedbacks: {
              valid:
                '<span class="feedback__state">Correct&#8239;!</span><p> Vous êtes prêt à explorer&nbsp;<span aria-hidden="true">🎉</span></p>',
              invalid:
                '<span class="feedback__state">Incorrect&#8239;!</span><p> Vous y arriverez la prochaine fois&#8239;!</p>',
            },
          },
        },
      ],
    },
  ],
};

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
"84726001-1665-457d-8f13-4a74dc4768ea"\t"text"\t2\t1\t"f312c33d-e7c9-4a69-9ba0-913957b8f7dd"\t"Voici une leçon"\t"didacticiel-modulix"
"048e5319-5e81-44cc-ad71-c6c0d3be611f"\t"separator"\t3\t1\t"f312c33d-e7c9-4a69-9ba0-913957b8f7dd"\t"Voici une leçon"\t"didacticiel-modulix"
"a2372bf4-86a4-4ecc-a188-b51f4f98bca2"\t"text"\t4\t1\t"f312c33d-e7c9-4a69-9ba0-913957b8f7dd"\t"Voici une leçon"\t"didacticiel-modulix"
"4cfd27d5-0947-47af-bfb6-52467143c38b"\t"text"\t5\t1\t"f312c33d-e7c9-4a69-9ba0-913957b8f7dd"\t"Voici une leçon"\t"didacticiel-modulix"
"8d7687c8-4a02-4d7e-bf6c-693a6d481c78"\t"image"\t6\t1\t"f312c33d-e7c9-4a69-9ba0-913957b8f7dd"\t"Voici une leçon"\t"didacticiel-modulix"
"901ccbaa-f4e6-4322-b863-8e8eab08a33a"\t"download"\t7\t2\t"b14df125-82d5-4d55-a660-7b34cd9ea1ab"\t"Un fichier à télécharger"\t"didacticiel-modulix"
"31106aeb-8346-44a6-8ed4-ebaa2106a373"\t"qcu"\t8\t2\t"b14df125-82d5-4d55-a660-7b34cd9ea1ab"\t"Un fichier à télécharger"\t"didacticiel-modulix"
"342183f7-af51-4e4e-ab4c-ebed1e195063"\t"text"\t9\t3\t"73ac3644-7637-4cee-86d4-1a75f53f0b9c"\t"Vidéo de présentation de Pix"\t"didacticiel-modulix"
"3a9f2269-99ba-4631-b6fd-6802c88d5c26"\t"video"\t10\t3\t"73ac3644-7637-4cee-86d4-1a75f53f0b9c"\t"Vidéo de présentation de Pix"\t"didacticiel-modulix"
"71de6394-ff88-4de3-8834-a40057a50ff4"\t"qcu"\t11\t4\t"533c69b8-a836-41be-8ffc-8d4636e31224"\t"Voici un vrai-faux"\t"didacticiel-modulix"
"79dc17f9-142b-4e19-bcbe-bfde4e170d3f"\t"qcu"\t12\t4\t"533c69b8-a836-41be-8ffc-8d4636e31224"\t"Voici un vrai-faux"\t"didacticiel-modulix"
"9c73500d-abd9-4cc4-ab2d-a3876285b13c"\t"qcu"\t13\t4\t"533c69b8-a836-41be-8ffc-8d4636e31224"\t"Voici un vrai-faux"\t"didacticiel-modulix"
"30701e93-1b4d-4da4-b018-fa756c07d53f"\t"qcm"\t14\t5\t"0be0f5eb-4cb6-47c2-b9d3-cb2ceb4cd21c"\t"Les 3 piliers de Pix"\t"didacticiel-modulix"
"0a5e77e8-1c8e-4cb6-a41d-cf6ad7935447"\t"qcu"\t15\t6\t"2a77a10f-19a3-4544-80f9-8012dad6506a"\t"Activité remonter dans la page"\t"didacticiel-modulix"
"c23436d4-6261-49f1-b50d-13a547529c29"\t"qrocm"\t16\t7\t"4ce2a31a-6584-4dae-87c6-d08b58d0f3b9"\t"Connaissez-vous bien Pix"\t"didacticiel-modulix"
"0e3315fd-98ad-492f-9046-4aa867495d84"\t"embed"\t17\t8\t"46577fb1-aadb-49ba-b3fd-721a11da8eb4"\t"Embed non-auto"\t"didacticiel-modulix"
"7fe0bc5f-1988-4da6-8231-a987335f2ae5"\t"qrocm"\t18\t8\t"46577fb1-aadb-49ba-b3fd-721a11da8eb4"\t"Embed non-auto"\t"didacticiel-modulix"
"0559b68c-68a5-4816-a06e-f1c743c391e3"\t"embed"\t19\t9\t"e8db3f90-4259-4d54-9113-1c56da726d8d"\t"Embed auto"\t"didacticiel-modulix"
"98c51fa7-03b7-49b1-8c5e-49341d35909c"\t"qrocm"\t20\t10\t"7cf75e70-8749-4392-8081-f2c02badb0fb"\t"Le nom de ce produit"\t"didacticiel-modulix"`);
    });
  });
});
