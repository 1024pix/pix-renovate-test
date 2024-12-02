# Pix Changelog

## v4.249.0 (02/12/2024)


### :rocket: Amélioration
- [#10637](https://github.com/1024pix/pix/pull/10637) [FEATURE] Pouvoir faire une recherche exacte d'utilisateurs dans Pix Admin (PIX-9567).
- [#10632](https://github.com/1024pix/pix/pull/10632) [FEATURE] Utiliser PixIcon dans Pix App - Partie 1 (PIX-14775).
- [#10682](https://github.com/1024pix/pix/pull/10682) [FEATURE] Changement du logo sur la page d'erreur (Pix-15030).
- [#10676](https://github.com/1024pix/pix/pull/10676) [FEATURE] Ajouter un endpoint pour récuperer les statistiques par compétences au grain d'une organisation (PIX-15451).
- [#10636](https://github.com/1024pix/pix/pull/10636) [FEATURE] Ajout des règles métier pour canSelfDeleteAccount (PIX-15333).
- [#10659](https://github.com/1024pix/pix/pull/10659) [FEATURE] Empecher l'affichage des resultats d'une attestation si elle est liee a plusieurs profils cible (PIX-13828).

### :building_construction: Tech
- [#10663](https://github.com/1024pix/pix/pull/10663) [TECH] Support du format CSV pour le script de rescoring de certification (PIX-15366).
- [#10606](https://github.com/1024pix/pix/pull/10606) [TECH] Ajouter une API de suppression de compte utilisateur (PIX-14910) .
- [#10690](https://github.com/1024pix/pix/pull/10690) [TECH] Remettre l'usage de skillDatasource dans les seeds.
- [#10674](https://github.com/1024pix/pix/pull/10674) [TECH] Retirer les imports directs en dehors des repositories autorisés aux fichiers "datasources/learning-content/*" (PIX-15474).
- [#10668](https://github.com/1024pix/pix/pull/10668) [TECH] Appliquer le patch dans PG lorsque la release est patchée (PIX-15471).
- [#10664](https://github.com/1024pix/pix/pull/10664) [TECH] Correction d'un test flaky sur Certif (PIX-14960).

### :bug: Correction
- [#10673](https://github.com/1024pix/pix/pull/10673) [BUGFIX] :bug: Plus d'erreur 500 si une épreuve est à la fois répondue et signalée (PIX-15484).
- [#10688](https://github.com/1024pix/pix/pull/10688) [BUGFIX] retirer un scroll non utils sur la page d'accueil (PIX-13917).

## v4.248.0 (28/11/2024)


### :rocket: Amélioration
- [#10654](https://github.com/1024pix/pix/pull/10654) [FEATURE] Écrire le contenu pédagogique dans PG lors d'un refresh complet du cache (PIX-15469).
- [#10662](https://github.com/1024pix/pix/pull/10662) [FEATURE] Ajout d'une description à Pix Certif et autorisation du passage des google Bots (PIX-15321).
- [#10628](https://github.com/1024pix/pix/pull/10628) [FEATURE] Voir dans une Sidebar les grains accessibles (PIX-15396).
- [#10649](https://github.com/1024pix/pix/pull/10649) [FEATURE] Activer le taux de couverture à des organisations précises (PIX-15449).

### :building_construction: Tech
- [#10667](https://github.com/1024pix/pix/pull/10667) [TECH] Ecrire dans PG le contenu pédagogique lorsqu'on provoque la création d'une nouvelle release (PIX-15470).
- [#10666](https://github.com/1024pix/pix/pull/10666) [TECH] Améliorer la performance de la route de création d'organisation en masse (PIX-15486).
- [#10655](https://github.com/1024pix/pix/pull/10655) [TECH] :recycle: Utiliser un seul système de vérification d'email.
- [#10593](https://github.com/1024pix/pix/pull/10593) [TECH] Export de la liste blanche SCO.
- [#10660](https://github.com/1024pix/pix/pull/10660) [TECH] Modifier le type de la colonne "id" de la table "learningcontent.missions" (PIX-15481).
- [#10656](https://github.com/1024pix/pix/pull/10656) [TECH] Améliorer la composition de FooterLinks (PIX-15477).
- [#10647](https://github.com/1024pix/pix/pull/10647) [TECH] Creer une source de données pour l'Api Data (PIX-15450).

### :arrow_up: Montée de version
- [#10670](https://github.com/1024pix/pix/pull/10670) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.23 (admin).
- [#10646](https://github.com/1024pix/pix/pull/10646) [BUMP] Update dependency @1024pix/pix-ui to ^48.9.0 (certif).

## v4.247.0 (27/11/2024)


### :rocket: Amélioration
- [#10640](https://github.com/1024pix/pix/pull/10640) [FEATURE] Reprendre l’extract CSV pour ajouter le champ isBeta dans les infos du module (PIX-15359) (PIX-15172).

### :bug: Correction
- [#10653](https://github.com/1024pix/pix/pull/10653) [BUGFIX] Permettre de recréer un learner avec nationalStudentId lorsque l'ancien est supprimé (PIX-15467).
- [#10648](https://github.com/1024pix/pix/pull/10648) [BUGFIX] Réparer l'envoi des résultats d'une campagne à accès simplifié (PIX-15440).

## v4.246.0 (27/11/2024)


### :rocket: Amélioration
- [#10650](https://github.com/1024pix/pix/pull/10650) [FEATURE] Prendre en compte la langue depuis la payload pour le simualtor flash (PIX-15218).
- [#10626](https://github.com/1024pix/pix/pull/10626) [FEATURE] Informer les prescripteurs des informations de leurs campagnes que leurs prescrits voient [PIX-191].
- [#10639](https://github.com/1024pix/pix/pull/10639) [FEATURE] Renvoyer le nombre de challenges possibles dans le simulateur (PIX-15216).
- [#10644](https://github.com/1024pix/pix/pull/10644) [FEATURE] Modififier le texte anglais du tag d'éligibilité à la certification (PIX-15311).
- [#10618](https://github.com/1024pix/pix/pull/10618) [FEATURE] Ajout d'un paramètre de besoin d'aménagement lié à l'accessibilité dans le simulateur (PIX-15215).
- [#10611](https://github.com/1024pix/pix/pull/10611) [FEATURE] Front - statut béta (PIX-15351).
- [#10574](https://github.com/1024pix/pix/pull/10574) [FEATURE] Ajout de metriques Matomo pour la page de fin de parcours (PIX-15040).
- [#10613](https://github.com/1024pix/pix/pull/10613) [FEATURE] Ajout de la modal de suppression de compte (PIX-14908).
- [#10479](https://github.com/1024pix/pix/pull/10479) [FEATURE] Afficher de manière graphique les parcours Pix Junior.
- [#10605](https://github.com/1024pix/pix/pull/10605) [FEATURE] Ajout de la page de suppression de compte (PIX-14904) (PIX-14905).
- [#10614](https://github.com/1024pix/pix/pull/10614) [FEATURE] Déplacer la validation et l'insertion des learners SCO Csv dans un job (Pix-13790).
- [#10561](https://github.com/1024pix/pix/pull/10561) [FEATURE] Affiche les bulles une à une puis l'épreuve avec un délai (PIX-14571).
- [#10620](https://github.com/1024pix/pix/pull/10620) [FEATURE] Améliorer le style de la page de détails de parcours autonome (PIX-15401).
- [#10612](https://github.com/1024pix/pix/pull/10612) [FEATURE] Ajouter la validation des imports SUP dans un job PgBoss (Pix-13793).

### :building_construction: Tech
- [#10652](https://github.com/1024pix/pix/pull/10652) [TECH] Migrer la route GET /api/admin/certification-centers/{id} dans src (PIX-15465).
- [#10645](https://github.com/1024pix/pix/pull/10645) [TECH] Ajout d'un format compact de log pour le dev.
- [#10629](https://github.com/1024pix/pix/pull/10629) [TECH] Renommer les params `{id}` en `{campaignId}` dans les routes liées aux campagnes (PIX-15425).
- [#10635](https://github.com/1024pix/pix/pull/10635) [TECH] Ecrire le contenu pédagogique dans la base de données PG dans les tests (PIX-15439).
- [#10500](https://github.com/1024pix/pix/pull/10500) [TECH] :wrench: Configure matomo pour pix junior - Suite.
- [#10617](https://github.com/1024pix/pix/pull/10617) [TECH] Déplacer du code relatif à la gestion du cache référentiel depuis le fichier datasource vers des usecases dédiés (PIX-15389).
- [#10564](https://github.com/1024pix/pix/pull/10564) [TECH] Supprimer des événements Matomo inutiles de la vocalisation des épreuves (PIX-15187).
- [#10625](https://github.com/1024pix/pix/pull/10625) [TECH] Suppression des vieilles versions du changelog.
- [#10608](https://github.com/1024pix/pix/pull/10608) [TECH] Extraire la sélection d'épreuves lors du scoring dans un service dédié (PIX-15332).
- [#10609](https://github.com/1024pix/pix/pull/10609) [TECH] Créer des tests d'intégration pour OidcAuthenticationServiceRegistry (PIX-14173).
- [#10599](https://github.com/1024pix/pix/pull/10599) [TECH] Ajouter une API interne permettant de vérifier si un utilisateur a été un prescrit (PIX-14983).

### :bug: Correction
- [#10651](https://github.com/1024pix/pix/pull/10651) [BUGFIX] Fix mission title in list display (PIX-15395).
- [#10633](https://github.com/1024pix/pix/pull/10633) [BUGFIX] Centrer la description du formulaire d'activation d'espace Pix Orga (PIX-11564).
- [#10627](https://github.com/1024pix/pix/pull/10627) [BUGFIX] Réparer le style du pied de page de la mire de connexion (PIX-15363).
- [#10641](https://github.com/1024pix/pix/pull/10641) [BUGFIX] Améliorer la gestion des cas d'erreurs lors de la création d'un utilisateur (PIX-15393).
- [#10643](https://github.com/1024pix/pix/pull/10643) [BUGFIX] Impossible de seeder en RA (PIX-15448).
- [#10623](https://github.com/1024pix/pix/pull/10623) [BUGFIX] Ajouter une bordure de fond sur le page de résultat individuel dans PixOrga (PIX-3522).

### :arrow_up: Montée de version
- [#10634](https://github.com/1024pix/pix/pull/10634) [BUMP] Update dependency @1024pix/pix-ui to ^48.9.0 (admin).
- [#10581](https://github.com/1024pix/pix/pull/10581) [BUMP] Update dependency @1024pix/pix-ui to v48.9 (junior).
- [#10624](https://github.com/1024pix/pix/pull/10624) [BUMP] Update dependency @1024pix/pix-ui to ^48.7.1 (orga).

## v4.245.0 (22/11/2024)


### :rocket: Amélioration
- [#10616](https://github.com/1024pix/pix/pull/10616) [FEATURE] Afficher une notification lorsque aucune attestation n'est disponible (PIX-15364).
- [#10607](https://github.com/1024pix/pix/pull/10607) [FEATURE] Partager l'attestation au partage du résultat de la campagne (PIX-15365).
- [#10601](https://github.com/1024pix/pix/pull/10601) [FEATURE] Améliorer le style du footer (PIX-15363).
- [#10546](https://github.com/1024pix/pix/pull/10546) [FEATURE] Afficher le message d'erreur "adresse email invalide ou déjà utilisée" (PIX-14689).
- [#10596](https://github.com/1024pix/pix/pull/10596) [FEATURE] API - statut béta (PIX-15350).
- [#10585](https://github.com/1024pix/pix/pull/10585) [FEATURE] Permettre d'avoir un `campaignParticipationId` `NULL` dans `user-recommended-trainings` (PIX-15303).
- [#10604](https://github.com/1024pix/pix/pull/10604) [FEATURE] Correction coquille + ajout vignette video module chatgpt-parle-francais.
- [#10577](https://github.com/1024pix/pix/pull/10577) [FEATURE] Utiliser PixToast dans Pix Admin (PIX-15328).
- [#10594](https://github.com/1024pix/pix/pull/10594) [FEATURE] Ne recuperer que les attestations partagées pour le prescripteur (PIX-15336).

### :building_construction: Tech
- [#10610](https://github.com/1024pix/pix/pull/10610) [TECH] Uniformiser la sélection de challenges entre le simulateur de déroulé et la prod (PIX-15214).
- [#10602](https://github.com/1024pix/pix/pull/10602) [TECH] Création des tables de contenu pédagogique dans la base de données de l'API (PIX-15355).
- [#10404](https://github.com/1024pix/pix/pull/10404) [TECH] :recycle: Déplacement des éléments de `CertificationCourse` vers le contexte `src/certification/evaluation`.
- [#10600](https://github.com/1024pix/pix/pull/10600) [TECH] Nettoyage du simulateur PARTIE 3 (PIX-15353).
- [#10591](https://github.com/1024pix/pix/pull/10591) [TECH] Suppression de paramètres non utilisés du simulateur de déroulé (PIX-15316).
- [#10590](https://github.com/1024pix/pix/pull/10590) [TECH] Migrer la route reconciliation SCO dans son bounded Context (Pix-15335).

### :bug: Correction
- [#10621](https://github.com/1024pix/pix/pull/10621) [BUGFIX] Valider le bon externalId lorsque l'on repasse une campagne (PIX-15361).
- [#10615](https://github.com/1024pix/pix/pull/10615) [BUGFIX] Empêcher de lever une alerte sur un challenge déjà répondu (PIX-15388).
- [#10583](https://github.com/1024pix/pix/pull/10583) [BUGFIX] ✏️ Correction du titre "Objectif.s" (PIX-15326).

### :arrow_up: Montée de version
- [#10619](https://github.com/1024pix/pix/pull/10619) [BUMP] Lock file maintenance (mon-pix).

## v4.244.0 (20/11/2024)


### :rocket: Amélioration
- [#10589](https://github.com/1024pix/pix/pull/10589) [FEATURE] Ajout de la route GET /api/users/my-account (PIX-14903).
- [#10573](https://github.com/1024pix/pix/pull/10573) [FEATURE] Rendre asynchrone l'import SUP sur PixOrga (Pix-13792).
- [#10576](https://github.com/1024pix/pix/pull/10576) [FEATURE] Partager sa récompense de quête à une organisation (PIX-15314).

### :building_construction: Tech
- [#10598](https://github.com/1024pix/pix/pull/10598) [TECH] corrige le type des paramètres du script d'anonymisation d'un learner  (PIX-15360).
- [#10586](https://github.com/1024pix/pix/pull/10586) [TECH] Nouveau contexte Privacy et API (PIX-14907).
- [#10588](https://github.com/1024pix/pix/pull/10588) [TECH] ♻️ migre la route reconciliation sup (Pix-15334).
- [#10547](https://github.com/1024pix/pix/pull/10547) [TECH] ajoute un script de suppression / anonymisation d'un prescrit (pix-15254).
- [#10587](https://github.com/1024pix/pix/pull/10587) [TECH] Dans les tests utiliser l'assertion dédiée lengthOf qui est plus sémantique.
- [#10551](https://github.com/1024pix/pix/pull/10551) [TECH] Mettre à jour des tests suite à la suppression de Bookshelf (PIX-10677).

### :bug: Correction
- [#10578](https://github.com/1024pix/pix/pull/10578) [BUGFIX] Corriger l'affichage du tableau des résultats d'une campagne de collecte de profils (PIX-15329).
- [#10572](https://github.com/1024pix/pix/pull/10572) [BUGFIX] Utiliser la date de réconciliation du candidat lors du scoring de la certification en V2 (PIX-15138).
- [#10592](https://github.com/1024pix/pix/pull/10592) [BUGFIX] Afficher l'onglet Récompenses de fin de parcours uniquement sous condition (PIX-15052).

### :arrow_up: Montée de version
- [#10595](https://github.com/1024pix/pix/pull/10595) [BUMP] Update dependency @1024pix/pix-ui to ^48.7.0 (certif).
- [#10597](https://github.com/1024pix/pix/pull/10597) [BUMP] Update dependency @1024pix/pix-ui to ^48.7.0 (mon-pix).

## v4.243.0 (19/11/2024)


### :rocket: Amélioration
- [#10582](https://github.com/1024pix/pix/pull/10582) [FEATURE] Faire une passe sur l'accessibilité pour l'élément Flashcards (PIX-14427).
- [#10491](https://github.com/1024pix/pix/pull/10491) [FEATURE] Mise à jour du CTA de fin de parcours autonomes (PIX-15070).
- [#10559](https://github.com/1024pix/pix/pull/10559) [FEATURE] ajout de metrics sur les visites du détail de participations partagées (PIX-14814).
- [#10542](https://github.com/1024pix/pix/pull/10542) [FEATURE] Utiliser le composant Pix Toast dans Pix Certif (PIX-15280).
- [#10411](https://github.com/1024pix/pix/pull/10411) [FEATURE] Ajoute un encart sur les attestations sur la page de fin de parcours (PIX-13826).
- [#10549](https://github.com/1024pix/pix/pull/10549) [FEATURE] Masquer le pourcentage de progression dans la navbar Modulix (PIX-15306).
- [#10565](https://github.com/1024pix/pix/pull/10565) [FEATURE] Ajouter le profileRewardId dans le endpoint qui remonte les résultats d'une quête (PIX-15322).

### :building_construction: Tech
- [#10536](https://github.com/1024pix/pix/pull/10536) [TECH] Migrer la route POST /api/admin/certification-centers dans src (PIX-15277).
- [#10548](https://github.com/1024pix/pix/pull/10548) [TECH] Suppression de paramètres dans le simulateur de déroulé (PIX-15213).
- [#10545](https://github.com/1024pix/pix/pull/10545) [TECH] 🪓  suppression de la route  `/api/users/{userId}/campaign-participations` (Pix-15301).
- [#10560](https://github.com/1024pix/pix/pull/10560) [TECH] Déplacement du code relatif à la gestion du référentiel depuis lib vers src/shared (PIX-15315).
- [#10552](https://github.com/1024pix/pix/pull/10552) [TECH] Suppression du script d'éligibilité V2 (PIX-15191).
- [#10555](https://github.com/1024pix/pix/pull/10555) [TECH] Suppression des scripts de conversion des centres en V3 (PIX-14274).
- [#10558](https://github.com/1024pix/pix/pull/10558) [TECH] Supprimer le script permettant de retirer certaines habilitations des centres (PIX-15312).

### :bug: Correction
- [#10579](https://github.com/1024pix/pix/pull/10579) [BUGFIX] Ne pas restreindre le scoring d'une session de certification v3 aux épreuves de la locale courante (PIX-15330).
- [#10568](https://github.com/1024pix/pix/pull/10568) [BUGFIX] Utiliser la bonne couleur sur le logo d'informations des places dans PixOrga(PIX-15281).

### :arrow_up: Montée de version
- [#10580](https://github.com/1024pix/pix/pull/10580) [BUMP] Update dependency @1024pix/pix-ui to ^48.6.0 (mon-pix).
- [#10575](https://github.com/1024pix/pix/pull/10575) [BUMP] Update dependency @1024pix/pix-ui to ^48.6.0 (certif).
- [#10571](https://github.com/1024pix/pix/pull/10571) [BUMP] Update dependency @1024pix/pix-ui to ^48.6.0 (admin).
- [#10570](https://github.com/1024pix/pix/pull/10570) [BUMP] Update dependency @1024pix/pix-ui to ^48.6.0 (orga).
- [#10569](https://github.com/1024pix/pix/pull/10569) [BUMP] Update dependency @1024pix/pix-ui to ^48.5.0 (orga).
- [#10567](https://github.com/1024pix/pix/pull/10567) [BUMP] Update dependency @1024pix/pix-ui to ^48.5.0 (certif).
- [#10566](https://github.com/1024pix/pix/pull/10566) [BUMP] Update dependency @1024pix/pix-ui to ^48.5.0 (admin).
- [#10563](https://github.com/1024pix/pix/pull/10563) [BUMP] Update dependency @1024pix/pix-ui to ^48.5.0 (mon-pix).
- [#10557](https://github.com/1024pix/pix/pull/10557) [BUMP] Update dependency @1024pix/pix-ui to ^48.4.0 (mon-pix).

### :coffee: Autre
- [#10543](https://github.com/1024pix/pix/pull/10543) [REFACTOR] Améliorer les affichages conditionnels de l'en-tête de fin de parcours (PIX-15274).

## v4.242.0 (15/11/2024)


### :rocket: Amélioration
- [#10531](https://github.com/1024pix/pix/pull/10531) [FEATURE] Permettre aux prescripteurs de télécharger les attestations de leurs élèves (PIX-13827).
- [#10516](https://github.com/1024pix/pix/pull/10516) [FEATURE] écouter/stopper la lecture d’une consigne (PIX-13754).
- [#10541](https://github.com/1024pix/pix/pull/10541) [FEATURE] Afficher le nombre de partages de profils dans les résultats d'un campagne collecte de profils (PIX-15266).
- [#10544](https://github.com/1024pix/pix/pull/10544) [FEATURE] Bloquer le scoring des certifications Pix+ seule (PIX-14716).
- [#10508](https://github.com/1024pix/pix/pull/10508) [FEATURE] Ne pas afficher la mention professionnalisante sur le PDF de l'attestation d'une certification v3 (PIX-15163).
- [#10533](https://github.com/1024pix/pix/pull/10533) [FEATURE] API verifiant si un utilisateur a été candidat de certif (PIX-14984).
- [#10509](https://github.com/1024pix/pix/pull/10509) [FEATURE] Envoi de l'email de creation de compte en asynchrone (PIX-15112).

### :building_construction: Tech
- [#10554](https://github.com/1024pix/pix/pull/10554) [TECH] Supprimer le précédent score et sa date de partage dans la réponse de l'API pour les résultats d'une campagne de collecte de profils (PIX-15267).
- [#10521](https://github.com/1024pix/pix/pull/10521) [TECH] Permettre de supprimer une liste de learners de l'orga (PIX-15244).
- [#10532](https://github.com/1024pix/pix/pull/10532) [TECH] Migrer la route `GET /api/users/{userId}/campaigns/{campaignId}/campaign-participations` vers son BC (PIX-15278).
- [#10506](https://github.com/1024pix/pix/pull/10506) [TECH] Migrer la route POST /api/admin/users/{id}/anonymize dans src (PIX-15212).
- [#10530](https://github.com/1024pix/pix/pull/10530) [TECH] Ajouter le template d'email pour la suppression de compte (PIX-14902).
- [#10520](https://github.com/1024pix/pix/pull/10520) [TECH] Migrer le script de création de comptes en masse (PIX-15276).
- [#10535](https://github.com/1024pix/pix/pull/10535) [TECH] Définir la locale a FRENCH dans le cas des attestations (PIX-14836).

### :bug: Correction
- [#10550](https://github.com/1024pix/pix/pull/10550) [BUGFIX] Ne pas afficher l'encart attestation pour les participations a des campagnes sans lien avec les quêtes (PIX-15308).
- [#10537](https://github.com/1024pix/pix/pull/10537) [BUGFIX] Corriger l'inscription en local sur la double mire SCO (PIX-15290).
- [#10527](https://github.com/1024pix/pix/pull/10527) [BUGFIX] Ne pas permettre de partager une campagne STARTED (PIX-15151).
- [#10538](https://github.com/1024pix/pix/pull/10538) [BUGFIX] Ne pas tenir compte de la locale lors de la séléction du prochain challenge de certification (PIX-15008).
- [#10539](https://github.com/1024pix/pix/pull/10539) [BUGFIX] Réparer le usecase récupérant les étapes de présentation de parcours (PIX-15283).
- [#10534](https://github.com/1024pix/pix/pull/10534) [BUGFIX] Empêcher un candidat de répondre à un challenge si celui-ci dispose d'une alerte validée (PIX-15263).
- [#10529](https://github.com/1024pix/pix/pull/10529) [BUGFIX] Répare la finalisation de session quand une épreuve a été exclue de la calibration (PIX-15226).

### :arrow_up: Montée de version
- [#10556](https://github.com/1024pix/pix/pull/10556) [BUMP] Update dependency @1024pix/pix-ui to ^48.4.0 (certif).
- [#10553](https://github.com/1024pix/pix/pull/10553) [BUMP] Update dependency @1024pix/pix-ui to ^48.4.0 (admin).
- [#10507](https://github.com/1024pix/pix/pull/10507) [BUMP] Update dependency @1024pix/pix-ui to v48 (admin).

## v4.241.0 (12/11/2024)


### :rocket: Amélioration
- [#10526](https://github.com/1024pix/pix/pull/10526) [FEATURE] Ajout de traductions pour les pages de fin de parcours (PIX-15259).
- [#10525](https://github.com/1024pix/pix/pull/10525) [FEATURE] Barre de navigation : Afficher la barre d'avancement (PIX-14865).
- [#10503](https://github.com/1024pix/pix/pull/10503) [FEATURE] Envoyer en un batch les alertes Joi pour le métier (PIX-15124).
- [#10382](https://github.com/1024pix/pix/pull/10382) [FEATURE] Active ou désactive l'oralisation pour un élève  (PIX-14939).
- [#10496](https://github.com/1024pix/pix/pull/10496) [FEATURE] Afficher l'évolution des participants sur la page des résultats à une campagne collecte de profils (PIX-14807).
- [#10499](https://github.com/1024pix/pix/pull/10499) [FEATURE] Supprime la phrase sur les 120 pix professionalisants sur les certificats v3 (PIX-15161).
- [#10450](https://github.com/1024pix/pix/pull/10450) [FEATURE] Transcription vidéo finale - MODC-101.
- [#10502](https://github.com/1024pix/pix/pull/10502) [FEATURE] Ajuster le wording et le design des pages d'authentification (PIX-15198).

### :building_construction: Tech
- [#10501](https://github.com/1024pix/pix/pull/10501) [TECH] Isoler la configuration du module i18n de l'api.
- [#10528](https://github.com/1024pix/pix/pull/10528) [TECH] Changer les dates du bandeau SCO dans Pix Certif (PIX-15268).
- [#10524](https://github.com/1024pix/pix/pull/10524) [TECH] Changer le nombre de retry du job ParticipationResultCalculationJob (PIX-15258).
- [#10514](https://github.com/1024pix/pix/pull/10514) [TECH] Migration de la route GET /api/certification-centers/{certificationCenterId}/members dans src (pix-15219).
- [#10519](https://github.com/1024pix/pix/pull/10519) [TECH] Suppression du script de backfill d'anonymisation.
- [#10510](https://github.com/1024pix/pix/pull/10510) [TECH] Migrer la mise à jour d'un profile cible dans son bounded context (PIX-15243).

### :bug: Correction
- [#10497](https://github.com/1024pix/pix/pull/10497) [BUGFIX] Utiliser la locale sur la demande de reset de password (PIX-15065).

### :arrow_up: Montée de version
- [#10522](https://github.com/1024pix/pix/pull/10522) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.22 (orga).
- [#10518](https://github.com/1024pix/pix/pull/10518) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.22 (mon-pix).
- [#10517](https://github.com/1024pix/pix/pull/10517) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.22 (junior).
- [#10515](https://github.com/1024pix/pix/pull/10515) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.22 (certif).
- [#10513](https://github.com/1024pix/pix/pull/10513) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.22 (admin).
- [#10512](https://github.com/1024pix/pix/pull/10512) [BUMP] Update dependency @1024pix/pix-ui to ^48.0.4 (mon-pix).
- [#10511](https://github.com/1024pix/pix/pull/10511) [BUMP] Update dependency @1024pix/pix-ui to ^48.0.4 (certif).
- [#10462](https://github.com/1024pix/pix/pull/10462) [BUMP] Update dependency @1024pix/pix-ui to v48 (mon-pix).
- [#10480](https://github.com/1024pix/pix/pull/10480) [BUMP] Update dependency @1024pix/pix-ui to ^48.0.3 (certif).

## v4.240.0 (07/11/2024)


### :rocket: Amélioration
- [#10489](https://github.com/1024pix/pix/pull/10489) [FEATURE] Ajouter la barre de navigation Modulix (PIX-14864).

### :building_construction: Tech
- [#10495](https://github.com/1024pix/pix/pull/10495) [TECH] Migrer la route campaign-participations-overview dans son BC (PIX-15202).
- [#10464](https://github.com/1024pix/pix/pull/10464) [TECH] Rendre les seeds de learners déterministes (PIX-15156).
- [#10468](https://github.com/1024pix/pix/pull/10468) [TECH] Suppression du feature toggle FT_ENABLE_V3_ELIGIBILITY_CHECK (PIX-15054).
- [#10487](https://github.com/1024pix/pix/pull/10487) [TECH] Redimensionner les colonnes du tableau des candidats sur Pix Certif.
- [#10414](https://github.com/1024pix/pix/pull/10414) [TECH] Migration de PixAdmin vers PixIcon / Partie Certif (PIX-14772).

### :bug: Correction
- [#10505](https://github.com/1024pix/pix/pull/10505) [BUGFIX] Ajouter des paramètres dans l'URL du lien custom de fin de parcours (PIX-15184).
- [#10504](https://github.com/1024pix/pix/pull/10504) [BUGFIX] Corriger le chevauchement d'affichage des écrans focus et timer lors de la certification sur Pix App (PIX-14970).
- [#10498](https://github.com/1024pix/pix/pull/10498) [BUGFIX] Flaky validation de contenu des modules (PIX-15205).

## v4.239.0 (06/11/2024)


### :rocket: Amélioration
- [#10478](https://github.com/1024pix/pix/pull/10478) [FEATURE] Traduction ES & NL : mire de connexion & inscription (PIX-15189).
- [#10439](https://github.com/1024pix/pix/pull/10439) [FEATURE] Informer l'utilisateur si la demande de réinitialisation de mot de passe est expirée ou déjà utilisée (PIX-15061).

### :building_construction: Tech
- [#10486](https://github.com/1024pix/pix/pull/10486) [TECH] Réduire la latence lors de scale massif de containers ou de mise en production en chargeant le référentiel et en initialisant la connexion à la base de données avant de démarrer l'API.
- [#10470](https://github.com/1024pix/pix/pull/10470) [TECH] Migrer la route GET /api/admin/users/{id} dans src (PIX-15170).
- [#10485](https://github.com/1024pix/pix/pull/10485) [TECH] Migrer la route des resultats d'une participation dans son Bounded Context (PIX-15193).
- [#10469](https://github.com/1024pix/pix/pull/10469) [TECH] Corriger un test flaky sur le tri des prescrits d'une organisation (PIX-15165).
- [#10465](https://github.com/1024pix/pix/pull/10465) [TECH] Ajouter un feature toggle pour la suppression en autonomie du compte utilisateur (PIX-14909).

### :bug: Correction
- [#10471](https://github.com/1024pix/pix/pull/10471) [BUGFIX] Corrige le problème de finalisation de session pour les sessions à cheval sur 2 calibrations (PIX-15005).
- [#10472](https://github.com/1024pix/pix/pull/10472) [BUGFIX] Réparer l'affichage du contenu spécifique de l'écran de fin de parcours (PIX-15109).
- [#10482](https://github.com/1024pix/pix/pull/10482) [BUGFIX] Positionner à gauche le logo sur la page de code école de Pix Junior.

## v4.238.0 (05/11/2024)


### :building_construction: Tech
- [#10483](https://github.com/1024pix/pix/pull/10483) [TECH] Logger et prévenir le crash de container lorsque la création de release est en échec.
- [#10484](https://github.com/1024pix/pix/pull/10484) [TECH] Filtrer sur les organizations ayant la feature places management pour la remontée des statistiques de places pour l'API pix-data (PIX-15155).
- [#10492](https://github.com/1024pix/pix/pull/10492) [TECH] Limite la taille mémoire utilisée par node lors du seed de la base de données.
- [#10441](https://github.com/1024pix/pix/pull/10441) [TECH] Ajouter des index sur les tables pg.

### :arrow_up: Montée de version
- [#10493](https://github.com/1024pix/pix/pull/10493) [BUMP] Update dependency @1024pix/pix-ui to ^48.0.4 (orga).

## v4.237.0 (05/11/2024)


### :rocket: Amélioration
- [#10473](https://github.com/1024pix/pix/pull/10473) [FEATURE] Bloquer la finalisation de session selon certaines conditions sur Pix Certif (PIX-14717).
- [#10466](https://github.com/1024pix/pix/pull/10466) [FEATURE] Supprimer le lien de la documentation v3 sur Pix Certif (PIX-15150).
- [#10475](https://github.com/1024pix/pix/pull/10475) [FEATURE] Supprimer les colonnes "Identifiant externe" et "tarification part Pix" de la liste des candidats Pix Certif (PIX-15160).
- [#10454](https://github.com/1024pix/pix/pull/10454) [FEATURE] Utiliser la nouvelle page de fin de parcours sans FT (PIX-15125).
- [#10442](https://github.com/1024pix/pix/pull/10442) [FEATURE] :lipstick: Ajoute un tootltip sur un entête de colonne pour préciser un titre (PIX-15016).
- [#10437](https://github.com/1024pix/pix/pull/10437) [FEATURE] :art: Ajout d'un bouton dans la liste des missions pour aller sur la page de détail d'une mission (PIX-14992).

### :building_construction: Tech
- [#10477](https://github.com/1024pix/pix/pull/10477) [TECH] Retirer le loader avant la page de fin de parcours (PIX-15178).

### :arrow_up: Montée de version
- [#10476](https://github.com/1024pix/pix/pull/10476) [BUMP] Update dependency @1024pix/pix-ui to ^48.0.2 (certif).
- [#10420](https://github.com/1024pix/pix/pull/10420) [BUMP] Lock file maintenance (certif).
- [#10422](https://github.com/1024pix/pix/pull/10422) [BUMP] Lock file maintenance (orga).
- [#10421](https://github.com/1024pix/pix/pull/10421) [BUMP] Lock file maintenance (mon-pix).

## v4.236.0 (04/11/2024)


### :rocket: Amélioration
- [#10458](https://github.com/1024pix/pix/pull/10458) [FEATURE] Nouvelle catégorisation des grains (PIX-14867).
- [#10453](https://github.com/1024pix/pix/pull/10453) [FEATURE] Renvoyer les infos du précédent pixScore, sa date de partage et l'évolution dans la route résultats d'une campagne de collecte de profils (PIX-14805).
- [#10457](https://github.com/1024pix/pix/pull/10457) [FEATURE] Créer la page de vérification d'extension Pix Companion (PIX-15113).

### :building_construction: Tech
- [#10446](https://github.com/1024pix/pix/pull/10446) [TECH] :wrench: Configure matomo pour pix junior (PIX-14824).
- [#10372](https://github.com/1024pix/pix/pull/10372) [TECH] :package: mise à jour des dépendances de paquet utilisé chez pix junior (PIX-14976).
- [#10451](https://github.com/1024pix/pix/pull/10451) [TECH] Suppression du FT_ENABLE_PIX_PLUS_LOWER_LEVEL (PIX-15053).
- [#10461](https://github.com/1024pix/pix/pull/10461) [TECH] Amélioration et nettoyage des tests du scoring v3.

### :bug: Correction
- [#10455](https://github.com/1024pix/pix/pull/10455) [BUGFIX] Corriger l'affichage de la page Participant External Id (PIX-15141).
- [#10459](https://github.com/1024pix/pix/pull/10459) [BUGFIX] Corriger la couleur de l'icone sur le lien se déconnecter dans PixOrga (PIX-14146).

## v4.235.0 (04/11/2024)


### :rocket: Amélioration
- [#10433](https://github.com/1024pix/pix/pull/10433) [FEATURE] Gestion des boutons et erreurs dans les formulaires d'authentification (PIX-15058).
- [#10452](https://github.com/1024pix/pix/pull/10452) [FEATURE] Modifier le ton et la voix des pages d'authentification (PIX-15062).
- [#10435](https://github.com/1024pix/pix/pull/10435) [FEATURE] Ajustements sur les mires d'inscription/connexion (pix-15056).

### :building_construction: Tech
- [#10447](https://github.com/1024pix/pix/pull/10447) [TECH] Documenter la variable d'env `SEEDS_CONTEXT`.

## v4.234.0 (31/10/2024)


### :rocket: Amélioration
- [#10445](https://github.com/1024pix/pix/pull/10445) [FEATURE] Ne pas contraindre les formats d'image (PIX-14861).
- [#10427](https://github.com/1024pix/pix/pull/10427) [FEATURE] Ajuster les boutons utilisés dans les pages d'authentification (PIX-15057).
- [#10408](https://github.com/1024pix/pix/pull/10408) [FEATURE] Afficher une icône de progression pour les 2 dernières participations d'un prescrit à une campagne d'évaluation sur Pix Orga (PIX-14808).
- [#10434](https://github.com/1024pix/pix/pull/10434) [FEATURE] Mettre fichiers SCSS dans le même dossier que son composant (PIX-14945).
- [#10431](https://github.com/1024pix/pix/pull/10431) [FEATURE] Séparer les schémas d'éléments acceptés dans le stepper par rapport au component element (PIX-15063) .
- [#10430](https://github.com/1024pix/pix/pull/10430) [FEATURE] - Traductions manquantes NL et ES Pix App (PIX-14193).
- [#10438](https://github.com/1024pix/pix/pull/10438) [FEATURE] Unifier les dossiers module/modulix dans l'appli (PIX-15028).

### :building_construction: Tech
- [#10444](https://github.com/1024pix/pix/pull/10444) [TECH] Lancer la CI des PRs au statut draft.
- [#10426](https://github.com/1024pix/pix/pull/10426) [TECH] Passer les FaIcon en PixIcon sur PixOrga (PIX-15064).
- [#10424](https://github.com/1024pix/pix/pull/10424) [TECH] Montée de version de Pix UI sur Certif (PIX-15059).
- [#10429](https://github.com/1024pix/pix/pull/10429) [TECH] Rattrapage des dates de reconciliation (PIX-15026).
- [#10273](https://github.com/1024pix/pix/pull/10273) [TECH] Standardisation des scripts nodejs.
- [#10407](https://github.com/1024pix/pix/pull/10407) [TECH] Forcer le HTTPS sur les environnements non dev .

### :bug: Correction
- [#10448](https://github.com/1024pix/pix/pull/10448) [BUGFIX] Resoudre le souci de crash de la page de fin de parcours (PIX-15093).
- [#10449](https://github.com/1024pix/pix/pull/10449) [BUGFIX].Rendre réactif le partage de résultat depuis l'onglet formations (PIX-15069).
- [#10436](https://github.com/1024pix/pix/pull/10436) [BUGFIX] Corriger le lien de renvoi d'email dans la page de réinitialisation de mot de passe (PIX-15060).
- [#10413](https://github.com/1024pix/pix/pull/10413) [BUGFIX] Rendre plus résistant le changement de mot de passe d'un utilisateur côté API, pour ne plus renvoyer d’erreur 500 (PIX-14971).

### :arrow_up: Montée de version
- [#10456](https://github.com/1024pix/pix/pull/10456) [BUMP] Update dependency ember-resolver to v13 (mon-pix).
- [#10428](https://github.com/1024pix/pix/pull/10428) [BUMP] Update dependency ember-resolver to v12 (mon-pix).

## v4.233.0 (29/10/2024)


### :rocket: Amélioration
- [#10417](https://github.com/1024pix/pix/pull/10417) [FEATURE] Afficher la consigne au-dessus des Flashcards (PIX-15035).
- [#10416](https://github.com/1024pix/pix/pull/10416) [FEATURE] Ajouter une validation sur les emails saisies en identifiant externe lorsque ce champ est défini comme email (Pix-13814).
- [#10412](https://github.com/1024pix/pix/pull/10412) [FEATURE] Afficher les flashcards à plat dans la preview (PIX-14316).
- [#10346](https://github.com/1024pix/pix/pull/10346) [FEATURE] Configuration de l'oralisation par élève pour les écoles (PIX-13753).
- [#10405](https://github.com/1024pix/pix/pull/10405) [FEATURE] Afficher la carte de conclusion des flashcards et gérer le score (PIX-14312).

### :building_construction: Tech
- [#10371](https://github.com/1024pix/pix/pull/10371) [TECH] Migrer la route FT qui permet de récupérer les participations aux campagnes FT (PIX-14942).
- [#10389](https://github.com/1024pix/pix/pull/10389) [TECH] Migration du endpoint /api/users/{userId}/campaigns/{campaignId}/profile dans src (Pix-14707).
- [#10415](https://github.com/1024pix/pix/pull/10415) [TECH] Insérer l'acquisition du palier zéro en base lors du seed d'une campagne (PIX-15037).
- [#10394](https://github.com/1024pix/pix/pull/10394) [TECH] ♻️  migration de la route `/api/admin/target-profile/{id}` (Pix-14968).

### :arrow_up: Montée de version
- [#10418](https://github.com/1024pix/pix/pull/10418) [BUMP] Update dependency npm-run-all2 to v6.2.4 (e2e).
- [#10419](https://github.com/1024pix/pix/pull/10419) [BUMP] Lock file maintenance (admin).

## v4.232.0 (25/10/2024)


### :rocket: Amélioration
- [#10401](https://github.com/1024pix/pix/pull/10401) [FEATURE] Générer un test de certification v2 avec des questions du référentiel Pix+ seul (PIX-14715).
- [#10410](https://github.com/1024pix/pix/pull/10410) [FEATURE] Modification des roles de la page de reset de password (PIX-14114).
- [#10406](https://github.com/1024pix/pix/pull/10406) [FEATURE] Ajout de la confirmation de reset de mot de passe (PIX-14114).
- [#10380](https://github.com/1024pix/pix/pull/10380) [FEATURE] Ajoute une page de loader avant les résultats de fin de parcours (PIX-14944).

### :bug: Correction
- [#10373](https://github.com/1024pix/pix/pull/10373) [BUGFIX] Cacher la tooltip lorsque le palier ne contient pas de description (PIX-14756).

### :coffee: Autre
- [#10397](https://github.com/1024pix/pix/pull/10397) [DOC] ADR 56: Standardisation de l'exécution des scripts.

## v4.231.0 (24/10/2024)


### :building_construction: Tech
- [#10288](https://github.com/1024pix/pix/pull/10288) [TECH] Utiliser la date de reconciliation dans le scoring (PIX-14540).

### :bug: Correction
- [#10403](https://github.com/1024pix/pix/pull/10403) [BUGFIX] Gérer une épreuve qui est périmée en cours de test de certification (PIX-14819).

## v4.230.0 (24/10/2024)


### :rocket: Amélioration
- [#10402](https://github.com/1024pix/pix/pull/10402) [FEATURE] Afficher la bonne réception de demande de réinitialisation de mot de passe (PIX-14112).
- [#10370](https://github.com/1024pix/pix/pull/10370) [FEATURE] Ajouter le nouveau design du formulaire de réinitialisation de mot de passe (PIX-14113).
- [#10364](https://github.com/1024pix/pix/pull/10364) [FEATURE]: Afficher l'onglet Formations au clic sur "Voir les formations" de la bannière (PIX-14803).
- [#10352](https://github.com/1024pix/pix/pull/10352) [FEATURE] Ajout d'une route pour récupérer les infos de début de parcours (PIX-14813).
- [#10375](https://github.com/1024pix/pix/pull/10375) [FEATURE] Ajouter un feature toggle pour la nouvelle page de présentation des campagnes (PIX-14946).
- [#10354](https://github.com/1024pix/pix/pull/10354) [FEATURE] Enregistrer l'auto-évaluation de l'utilisateur dans Matomo (PIX-14313).
- [#10383](https://github.com/1024pix/pix/pull/10383) [FEATURE] Mise à jour du wording des écrans d'instruction (PIX-14884).

### :building_construction: Tech
- [#10400](https://github.com/1024pix/pix/pull/10400) [TECH] Suppression temporaire des habilitations aux complementaires sauf CLEA (PIX-14881).
- [#10385](https://github.com/1024pix/pix/pull/10385) [TECH] Ajout d'une instruction comment dans le template de migration BDD.
- [#10398](https://github.com/1024pix/pix/pull/10398) [TECH] Renommage + déplacement de mass-create-user-account (PIX-14974).

### :bug: Correction
- [#10391](https://github.com/1024pix/pix/pull/10391) [BUGFIX] Pouvoir valider les écrans d'instructions uniquement sur la dernière page (PIX-14474).
- [#10387](https://github.com/1024pix/pix/pull/10387) [BUGFIX] N'afficher que les RT non-acquis qui sont en lacune (PIX-14969).

## v4.229.1 (23/10/2024)


### :building_construction: Tech
- [#10381](https://github.com/1024pix/pix/pull/10381) [TECH] Ajouter un index manquant sur la table supervisor-accesses.

### :bug: Correction
- [#10379](https://github.com/1024pix/pix/pull/10379) [BUGFIX] Rafraîchir la page lorsque le candidat clique sur le bouton lors d'un signalement en certification (PIX-14959).

### :arrow_up: Montée de version
- [#10396](https://github.com/1024pix/pix/pull/10396) [BUMP] Update dependency @1024pix/pix-ui to ^47.2.0 (admin).
- [#10393](https://github.com/1024pix/pix/pull/10393) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.21 (orga).

## v4.229.0 (22/10/2024)


### :rocket: Amélioration
- [#10365](https://github.com/1024pix/pix/pull/10365) [FEATURE] Tagguer les certif Pix+ seules en V2 (PIX-14714).
- [#10355](https://github.com/1024pix/pix/pull/10355) [FEATURE] Ajouter un nouveau composant formulaire de demande de réinitialisation de mot de passe (PIX-14111).
- [#10377](https://github.com/1024pix/pix/pull/10377) [FEATURE] Update attestation template PDF (PIX-13825).
- [#10342](https://github.com/1024pix/pix/pull/10342) [FEATURE] Convertir les sessions et les centres de certification à la version 3 (PIX-14429).
- [#10020](https://github.com/1024pix/pix/pull/10020) [FEATURE] Amélioration continue mdl adresse-ip-publique-et-vous - dette MVP (MODC-5).
- [#10368](https://github.com/1024pix/pix/pull/10368) [FEATURE] Déclencher le job "AnswerJob" lorsqu'un utilisateur répond à une question (PIX-13817).

### :bug: Correction
- [#10376](https://github.com/1024pix/pix/pull/10376) [BUGFIX] Corriger la taille des boutons sur les Flashcards (PIX-14955).
- [#10378](https://github.com/1024pix/pix/pull/10378) [BUGFIX] Ne pas retourner une erreur 500 lors de la vérification de l'éligibilité d'un utilisateur sans badges (PIX-14764).
- [#10374](https://github.com/1024pix/pix/pull/10374) [BUGFIX] Ajuster la grille des badges de la bannière de fin de parcours (PIX-14931).

### :arrow_up: Montée de version
- [#10392](https://github.com/1024pix/pix/pull/10392) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.21 (mon-pix).
- [#10390](https://github.com/1024pix/pix/pull/10390) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.21 (junior).
- [#10386](https://github.com/1024pix/pix/pull/10386) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.21 (certif).
- [#10384](https://github.com/1024pix/pix/pull/10384) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.21 (admin).
- [#10329](https://github.com/1024pix/pix/pull/10329) [BUMP] Update dependency @1024pix/pix-ui to v47 (orga) (PIX-14842).

## v4.228.0 (21/10/2024)


### :rocket: Amélioration
- [#10363](https://github.com/1024pix/pix/pull/10363) [FEATURE] Améliorer le design des flashcards (PIX-14929).
- [#10343](https://github.com/1024pix/pix/pull/10343) [FEATURE] Ajouter une propriété "evolution" dans la réponse de l'API pour les résultats d'une campagne Évaluation (PIX-14806).
- [#10332](https://github.com/1024pix/pix/pull/10332) [FEATURE] Ajoute un endpoint pour récupérer les résultats de quêtes dans le cadre d'une campagne (PIX-14837).
- [#10366](https://github.com/1024pix/pix/pull/10366) [FEATURE] Afficher un bandeau d'information concernant l'extension Companion dans la page du surveillant sur Pix Certif (PIX-12779).

### :building_construction: Tech
- [#10367](https://github.com/1024pix/pix/pull/10367) [TECH] Ajouter les méthodes increment et decrement dans la méthode withPrefix de Redis (PIX-14936).
- [#10369](https://github.com/1024pix/pix/pull/10369) [TECH] Feat add back translations lint.

## v4.227.0 (18/10/2024)


### :rocket: Amélioration
- [#10330](https://github.com/1024pix/pix/pull/10330) [FEATURE] :art: Légère reprise d'une phrase de fin de mission (pix-14822).
- [#10348](https://github.com/1024pix/pix/pull/10348) [FEATURE] Bloquer le candidat pendant la certification si une alerte d'extension existe (PIX-14732).
- [#10362](https://github.com/1024pix/pix/pull/10362) [FEATURE] Ajouter une icône de rafraîchissement sur le bouton de l'écran d'extension.
- [#10357](https://github.com/1024pix/pix/pull/10357) [FEATURE] Compléter la page de non détection de l'extension (PIX-14726).
- [#10337](https://github.com/1024pix/pix/pull/10337) [FEATURE] Permettre au surveillant de traiter un signalement d'extension sur Pix Certif (PIX-14820).
- [#10353](https://github.com/1024pix/pix/pull/10353) [FEATURE] Ajoute le suivi du nombre d'answer jobs par utilisateur dans redis (PIX-14878).
- [#10327](https://github.com/1024pix/pix/pull/10327) [FEATURE] Afficher un menu Élèves personnalisé pour les écoles (PIX-13536).
- [#10307](https://github.com/1024pix/pix/pull/10307) [FEATURE] Ajout de la nouvelle page d'inscription Pix App (PIX-14154).
- [#10351](https://github.com/1024pix/pix/pull/10351) [FEATURE] Afficher dans le bandeau "Certification" l'éligibilité au niveau N-1 (PIX-14870).

### :building_construction: Tech
- [#10356](https://github.com/1024pix/pix/pull/10356) [TECH] Migrer la route  `createTargetProfile` dans le BC Prescription Target Profile (PIX-14918).
- [#10331](https://github.com/1024pix/pix/pull/10331) [TECH] Mise à jour de webpack et un plugin babel (pix-14825).

### :bug: Correction
- [#10361](https://github.com/1024pix/pix/pull/10361) [BUGFIX] valide que le code campagne ne contient pas de caractère utf8 bizarre (pix-14718).
- [#10291](https://github.com/1024pix/pix/pull/10291) [BUGFIX] Rendre plus résistante la gestion d'erreur de la création de comptes côté API (PIX-14736).
- [#10350](https://github.com/1024pix/pix/pull/10350) [BUGFIX] Éviter la création mutltiple de lot de place lors du clique sur le bouton valider (PIX-14821).

## v4.226.0 (17/10/2024)


### :rocket: Amélioration
- [#10313](https://github.com/1024pix/pix/pull/10313) [FEATURE] Afficher un signalement d'extension de Companion dans l’espace surveillant (PIX-14731).
- [#10230](https://github.com/1024pix/pix/pull/10230) [FEATURE] Ajouter la bannière de la nouvelle page de fin de parcours (PIX-12987).
- [#10298](https://github.com/1024pix/pix/pull/10298) [FEATURE] maj lien et nom LANGUIA MODC-285.

### :building_construction: Tech
- [#10349](https://github.com/1024pix/pix/pull/10349) [TECH]  insere les idPixLabel dans la table campaign-features lors des seed (pix-14874).
- [#10345](https://github.com/1024pix/pix/pull/10345) [TECH] Mis à jour de package PixOrga (PIX-14872).
- [#10293](https://github.com/1024pix/pix/pull/10293) [TECH] :recycle: Déplace les routes à propos de `CertificationIssueReport`.
- [#10312](https://github.com/1024pix/pix/pull/10312) [TECH] Recuperer le templateName depuis la base de données plutôt qu'en dur dans le code (PIX-14786) .

### :bug: Correction
- [#10347](https://github.com/1024pix/pix/pull/10347) [BUGFIX] récupère le idpixlabel depuis la feature avant de démarrer une participation (pix-14873).

### :arrow_up: Montée de version
- [#10321](https://github.com/1024pix/pix/pull/10321) [BUMP] Update dependency @1024pix/pix-ui to v47 (admin).

## v4.225.0 (15/10/2024)


### :rocket: Amélioration
- [#10303](https://github.com/1024pix/pix/pull/10303) [FEATURE] Créer une alerte en cas de non détection de l'extension Companion lors de la certification sur Pix App (PIX-14727).
- [#10268](https://github.com/1024pix/pix/pull/10268) [FEATURE] Ajoute un endpoint pour télécharger un zip des attestations pour une organisation (PIX-13824).
- [#10264](https://github.com/1024pix/pix/pull/10264) [FEATURE] Ajout d'un bouton d'actualisation sur la page école de Pix Junior (PIX-14587).
- [#10274](https://github.com/1024pix/pix/pull/10274) [FEATURE] Mise à jour de l'url de support dans le formulaire de récupération d'espace (PIX-14682).
- [#10269](https://github.com/1024pix/pix/pull/10269) [FEATURE] :art: Afficher une image spécifique pour chaque mission (PIX-14589).
- [#10263](https://github.com/1024pix/pix/pull/10263) [FEATURE] Permettre de filtrer sur les category des Profil Cible sur PixAdmin(PIX-14651).
- [#10302](https://github.com/1024pix/pix/pull/10302) [FEATURE] Afficher les boutons de réponse des Flashcards Modulix (PIX-14309).
- [#10236](https://github.com/1024pix/pix/pull/10236) [FEATURE] Migration vers PixIcon sur Junior (Pix-14628).
- [#10296](https://github.com/1024pix/pix/pull/10296) [FEATURE] :sparkles: filtre les élèves par status de mission assessment (PIX-13382).
- [#10294](https://github.com/1024pix/pix/pull/10294) [FEATURE] MAJ wording bandeau SCO .
- [#10254](https://github.com/1024pix/pix/pull/10254) [FEATURE] permet la creation de feature de campagne (Pix-#14661).
- [#10275](https://github.com/1024pix/pix/pull/10275) [FEATURE] Créer le composant des autres moyens de connexion/inscription (PIX-14159).

### :building_construction: Tech
- [#10170](https://github.com/1024pix/pix/pull/10170) [TECH] Amender l'ADR sur le EventDispatcher.
- [#10295](https://github.com/1024pix/pix/pull/10295) [TECH] Corriger le test flaky sur le usecase on `get-user-details-by-id-usecase` (PIX-14779).
- [#10287](https://github.com/1024pix/pix/pull/10287) [TECH] Correction du tests Flaky sur le usecase `get-data-organizations-places-statistics` (PIX-14739).

### :bug: Correction
- [#10292](https://github.com/1024pix/pix/pull/10292) [BUGFIX] Vérifier l'éligibilité de l'utilisateur en fonction du profil cible du badge acquis (PIX-14763).
- [#10297](https://github.com/1024pix/pix/pull/10297) [BUGFIX] Couper le nom de la campagne même si elle ne contient pas d'espace dans les tableaux PixAdmin (PIX-11535).

### :arrow_up: Montée de version
- [#10326](https://github.com/1024pix/pix/pull/10326) [BUMP] Update dependency sinon to v19 (junior).
- [#10325](https://github.com/1024pix/pix/pull/10325) [BUMP] Update dependency sinon to v19 (certif).
- [#10323](https://github.com/1024pix/pix/pull/10323) [BUMP] Update dependency sinon to v19 (admin).
- [#10322](https://github.com/1024pix/pix/pull/10322) [BUMP] Update dependency ember-resolver to v13 (orga).
- [#10320](https://github.com/1024pix/pix/pull/10320) [BUMP] Update node.
- [#10316](https://github.com/1024pix/pix/pull/10316) [BUMP] Update dependency @1024pix/pix-ui to ^46.15.2 (orga).
- [#10317](https://github.com/1024pix/pix/pull/10317) [BUMP] Update dependency ember-source to ~5.12.0 (junior).
- [#10314](https://github.com/1024pix/pix/pull/10314) [BUMP] Update adobe/s3mock Docker tag to v3.11.0 (dossier racine).
- [#10315](https://github.com/1024pix/pix/pull/10315) [BUMP] Update dependency @1024pix/pix-ui to ^46.15.2 (mon-pix).
- [#10309](https://github.com/1024pix/pix/pull/10309) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.20 (junior).
- [#10311](https://github.com/1024pix/pix/pull/10311) [BUMP] Update nginx Docker tag to v1.27.2.
- [#10310](https://github.com/1024pix/pix/pull/10310) [BUMP] Update adobe/s3mock Docker tag to v3.11.0 (docker).
- [#10278](https://github.com/1024pix/pix/pull/10278) [BUMP] Update adobe/s3mock Docker tag to v3.11.0 (.circleci).
- [#10308](https://github.com/1024pix/pix/pull/10308) [BUMP] Update dependency @1024pix/pix-ui to ^46.15.2 (junior).
- [#10306](https://github.com/1024pix/pix/pull/10306) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.20 (orga).
- [#10305](https://github.com/1024pix/pix/pull/10305) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.20 (mon-pix).
- [#10304](https://github.com/1024pix/pix/pull/10304) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.20 (junior).
- [#10301](https://github.com/1024pix/pix/pull/10301) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.20 (certif).
- [#10300](https://github.com/1024pix/pix/pull/10300) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.20 (admin).
- [#10299](https://github.com/1024pix/pix/pull/10299) [BUMP] Update dependency @1024pix/pix-ui to ^46.15.2 (certif).
- [#10209](https://github.com/1024pix/pix/pull/10209) [BUMP] Update dependency npm-run-all2 to v6.2.3 (e2e).
- [#10289](https://github.com/1024pix/pix/pull/10289) [BUMP] Update dependency sinon to v19 (orga).
- [#10029](https://github.com/1024pix/pix/pull/10029) [BUMP] Update dependency ember-source to ~5.11.0 (junior).

### :coffee: Autre
- [#10280](https://github.com/1024pix/pix/pull/10280) [REFACTOR] Améliorer l'ergonomie de la liste des RT dans Admin (PIX-14711).

## v4.224.0 (10/10/2024)


### :rocket: Amélioration
- [#10261](https://github.com/1024pix/pix/pull/10261) [FEATURE] Récupérer les inscriptions candidats après réconciliation (v3 uniquement) (PIX-14209).
- [#10281](https://github.com/1024pix/pix/pull/10281) [FEATURE] Lister les RT certifiants des campagnes en premier (PIX-14560).
- [#10271](https://github.com/1024pix/pix/pull/10271) [FEATURE] Permettre la prévisualisation depuis Modulix Editor (PIX-14709).
- [#10262](https://github.com/1024pix/pix/pull/10262) [FEATURE] Afficher la carte d'intro dans les flashcards Modulix (PIX-14311).
- [#10246](https://github.com/1024pix/pix/pull/10246) [FEATURE] Désafficher la bannière d'ouverture du niveau 7 (PIX-14495).
- [#10276](https://github.com/1024pix/pix/pull/10276) [FEATURE] Bloquer le test de certif si l’extension n’est pas détectée (PIX-12780).
- [#10255](https://github.com/1024pix/pix/pull/10255) [FEATURE] Ajoute un endpoint qui permet de télécharger le pdf d'une attestation pour un utilisateur (PIX-13823).
- [#10258](https://github.com/1024pix/pix/pull/10258) [FEATURE] Mise à jour du wording lors du défocus pour candidats avec besoins d'ajustements (PIX-14428).
- [#10272](https://github.com/1024pix/pix/pull/10272) [FEATURE] Voir le nombre de sujets évalués lors de la consultation d'un PC sur Pix Admin (PIX-9042).
- [#10207](https://github.com/1024pix/pix/pull/10207) [FEATURE] Vérifier l'éligibilité complémentaire lors de la réconciliation V3 (PIX-14207).

### :building_construction: Tech
- [#10282](https://github.com/1024pix/pix/pull/10282) [TECH] Créer le feature toggle FT_PIX_COMPANION_ENABLED (PIX-14733).
- [#10259](https://github.com/1024pix/pix/pull/10259) [TECH] Ajouter un composant local de gestion des règles de mot de passe (PIX-14149).
- [#10267](https://github.com/1024pix/pix/pull/10267) [TECH] Fix sur des tests flaky (PIX-14702).
- [#10270](https://github.com/1024pix/pix/pull/10270) [TECH] Migrer les derniers composants du dossier campaign de PixOrga vers GJS (PIX-14708).
- [#10245](https://github.com/1024pix/pix/pull/10245) [TECH] Permettre la désactivation des CRON liés au CPF (PIX-14388).
- [#10249](https://github.com/1024pix/pix/pull/10249) [TECH] Empêcher l'autocompletion sur les adresses email dans la modale d'ajout de candidat sur Pix Certif (PIX-13937).
- [#10248](https://github.com/1024pix/pix/pull/10248) [TECH] Affichage d'une erreur spécifique à l'enregistrement d'un candidat lorsque la session est finalisée (PIX-13862).
- [#10250](https://github.com/1024pix/pix/pull/10250) [TECH] Suppression du FT pour les écrans d'instruction certif v3 (PIX-12908).

### :bug: Correction
- [#10235](https://github.com/1024pix/pix/pull/10235) [BUGFIX] Conversion des centres restants (PIX-14581).
- [#10253](https://github.com/1024pix/pix/pull/10253) [BUGFIX] Supporter les descriptions de parcours autonomes en markdown (PIX-14214).

### :arrow_up: Montée de version
- [#10285](https://github.com/1024pix/pix/pull/10285) [BUMP] Update dependency ember-load-initializers to v3 (junior).
- [#10286](https://github.com/1024pix/pix/pull/10286) [BUMP] Update dependency ember-load-initializers to v3 (orga).
- [#10283](https://github.com/1024pix/pix/pull/10283) [BUMP] Update dependency ember-load-initializers to v3 (admin).
- [#10284](https://github.com/1024pix/pix/pull/10284) [BUMP] Update dependency ember-load-initializers to v3 (certif).
- [#10231](https://github.com/1024pix/pix/pull/10231) [BUMP] Update dependency @1024pix/pix-ui to ^46.14.0 (junior).
- [#10277](https://github.com/1024pix/pix/pull/10277) [BUMP] Update dependency @1024pix/pix-ui to ^46.15.0 (certif).

## v4.223.0 (08/10/2024)


### :rocket: Amélioration
- [#10233](https://github.com/1024pix/pix/pull/10233) [FEATURE] Ajout d'un nouvel ordre de mission (Pix-14469).
- [#10260](https://github.com/1024pix/pix/pull/10260) [FEATURE] ajoute la feature de campagne external-id(Pix-14659).
- [#10232](https://github.com/1024pix/pix/pull/10232) [FEATURE] Ajoute une API interne pour générer un zip avec les attestations d'une liste d'utilisateurs (PIX-13822).
- [#10239](https://github.com/1024pix/pix/pull/10239) [FEATURE] Journaliser le changement d'email par le support (PIX-14363).
- [#10225](https://github.com/1024pix/pix/pull/10225) [FEATURE] ✨ Affichage des instructions des challenges sur plusieurs bulles (PIX-14536) .
- [#10257](https://github.com/1024pix/pix/pull/10257) [FEATURE] Mettre à jour l'url vers la politique de protection des données à caractère personnel des élèves (PIX-14460).
- [#10241](https://github.com/1024pix/pix/pull/10241) [FEATURE] Rattacher les profil cible public aux organisation les utilisants (Pix-14625).
- [#10234](https://github.com/1024pix/pix/pull/10234) [FEATURE] Ajouter une API interne pour récupérer les infos d'utilisateurs (PIX-14624).
- [#10252](https://github.com/1024pix/pix/pull/10252) [FEATURE] Trier les participations aux campagnes par date de début sur Pix Admin (PIX-14621).
- [#10168](https://github.com/1024pix/pix/pull/10168) [FEATURE] Utiliser le composant PixIcon dans Pix Certif (PIX-14461).
- [#10176](https://github.com/1024pix/pix/pull/10176) [FEATURE] Rendre autonome le métier pour gérer la liste blanche des centres de certification fermés.

### :building_construction: Tech
- [#10181](https://github.com/1024pix/pix/pull/10181) [TECH] Suppression de Bookshelf.
- [#10251](https://github.com/1024pix/pix/pull/10251) [TECH] Supprimer la colonne isPublic de `target-profiles` (PIX-14626).

### :arrow_up: Montée de version
- [#10266](https://github.com/1024pix/pix/pull/10266) [BUMP] Update dependency sinon to v19 (mon-pix).
- [#10265](https://github.com/1024pix/pix/pull/10265) [BUMP] Update dependency ember-load-initializers to v3 (mon-pix).

## v4.221.0 (04/10/2024)


### :rocket: Amélioration
- [#10247](https://github.com/1024pix/pix/pull/10247) [FEATURE] Afficher plusieurs cartes d'un deck de flashcards Modulix (PIX-14307).
- [#10240](https://github.com/1024pix/pix/pull/10240) [FEATURE] Rendre obligatoire le champs propriétaire lors de la création de campagne en masse sur Pix Admin (PIX-12577).
- [#10226](https://github.com/1024pix/pix/pull/10226) [FEATURE] Créer la page de sélection de SSO (PIX-14160).

### :building_construction: Tech
- [#10214](https://github.com/1024pix/pix/pull/10214) [TECH] Supprimer les usages des key dans la configuration des imports à format (PIX-14622).
- [#10238](https://github.com/1024pix/pix/pull/10238) [TECH] Migration de PATCH /api/admin/users/{id} (PIX-14631).

### :arrow_up: Montée de version
- [#10243](https://github.com/1024pix/pix/pull/10243) [BUMP] Update dependency ember-keyboard to v9 (certif).

## v4.220.0 (02/10/2024)


### :rocket: Amélioration
- [#10202](https://github.com/1024pix/pix/pull/10202) [FEATURE] Permettre la modification d'import à format via PixAdmin (PIX-14541).
- [#10213](https://github.com/1024pix/pix/pull/10213) [FEATURE] Créer un générateur de pdf avec formulaire à partir d'un template (pix-13821).
- [#10216](https://github.com/1024pix/pix/pull/10216) [FEATURE] Bloquer l'utilisateur si on ne détecte pas l'extension et qu'il se trouve sur l'écran de démarrage (PIX-14501).

### :building_construction: Tech
- [#10134](https://github.com/1024pix/pix/pull/10134) [TECH] Suppression de scripts dépréciés ou inutilisés.
- [#10221](https://github.com/1024pix/pix/pull/10221) [TECH] :recycle: Déplace le modèle `OrganizationInvitedUser` dans le context `team`.
- [#10212](https://github.com/1024pix/pix/pull/10212) [TECH] :recycle: Suppression du model `BadgeAcquisition`.

### :bug: Correction
- [#10229](https://github.com/1024pix/pix/pull/10229) [BUGFIX] Pouvoir rafraîchir les pages d’instructions et d'entrée en session (PIX-14590).
- [#10218](https://github.com/1024pix/pix/pull/10218) [BUGFIX] mets à jours les clefs de trad nl / en.

### :arrow_up: Montée de version
- [#10228](https://github.com/1024pix/pix/pull/10228) [BUMP] Update dependency @1024pix/pix-ui to ^46.14.0 (certif).
- [#10227](https://github.com/1024pix/pix/pull/10227) [BUMP] Update dependency @1024pix/pix-ui to ^46.14.0 (admin).
- [#10224](https://github.com/1024pix/pix/pull/10224) [BUMP] Update dependency @1024pix/pix-ui to ^46.13.4 (mon-pix).

## v4.219.0 (01/10/2024)


### :rocket: Amélioration
- [#10206](https://github.com/1024pix/pix/pull/10206) [FEATURE] Créer un composant local pour la sélection des OidcProvider (PIX-14134).
- [#10201](https://github.com/1024pix/pix/pull/10201) [FEATURE] Utiliser la date de réconciliation du candidat dans le service Placement Profile (PIX-14402).
- [#10211](https://github.com/1024pix/pix/pull/10211) [FEATURE] Enregistrer comme correcte une réponse focused out si le candidat a un besoin d'aménagement (PIX-14242).
- [#10184](https://github.com/1024pix/pix/pull/10184) [FEATURE] Ajout du nouveau formulaire de connexion Pix App (PIX-14002).
- [#10197](https://github.com/1024pix/pix/pull/10197) [FEATURE] Ajouter une page de blocage pour Pix Companion (PIX-14538).
- [#10200](https://github.com/1024pix/pix/pull/10200) [FEATURE] Filtre sur les résultats dans le détail d'une mission sur Pix Orga (PIX-13377).
- [#10198](https://github.com/1024pix/pix/pull/10198) [FEATURE] Ajouter des titres explicites aux éléments de tableaux lors de l'export du schema Modulix (PIX-14544).
- [#10164](https://github.com/1024pix/pix/pull/10164) [FEATURE] Afficher une carte question / réponse (PIX-14306).
- [#10191](https://github.com/1024pix/pix/pull/10191) [FEATURE] Pix Companion: Émettre des CustomEvents pour démarrage/fin de certification (PIX-14522).

### :building_construction: Tech
- [#10178](https://github.com/1024pix/pix/pull/10178) [TECH] Supprimer l'ancienne route de génération d'identifiants et mots de passe en masse (PIX-14498).
- [#10208](https://github.com/1024pix/pix/pull/10208) [TECH] :recycle: Déplacement du modèle `UserDetailsForAdmin` dans le bon context.
- [#10199](https://github.com/1024pix/pix/pull/10199) [TECH] Retirer les logs de débug de l'import SIECLE (PIX-14529).
- [#10177](https://github.com/1024pix/pix/pull/10177) [TECH] :recycle: Déplace un model dans son context.
- [#10173](https://github.com/1024pix/pix/pull/10173) [TECH] Migrer la route User Has Seen New Dashboard (PIX-14451).
- [#10169](https://github.com/1024pix/pix/pull/10169) [TECH] Conserver un seul fichier de constantes pour le repertoire src/shared/infrastructures (PIX-14462).
- [#10192](https://github.com/1024pix/pix/pull/10192) [TECH] Changer le code http de l'erreur AnswerEvaluationError (PIX-14519).

### :bug: Correction
- [#10219](https://github.com/1024pix/pix/pull/10219) [BUGFIX] Ne pas déclencher une erreur 503 quand l'email est invalide lors de l'envoi d'email transactionnel (PIX-14315).
- [#10217](https://github.com/1024pix/pix/pull/10217) [BUGFIX] Purge de traduction non utilisé .

### :arrow_up: Montée de version
- [#10223](https://github.com/1024pix/pix/pull/10223) [BUMP] Update dependency @1024pix/pix-ui to ^46.13.4 (junior).
- [#10222](https://github.com/1024pix/pix/pull/10222) [BUMP] Update dependency @1024pix/pix-ui to ^46.13.4 (certif).
- [#10220](https://github.com/1024pix/pix/pull/10220) [BUMP] Update dependency @1024pix/pix-ui to ^46.13.4 (admin).
- [#10024](https://github.com/1024pix/pix/pull/10024) [BUMP] Update dependency @xmldom/xmldom to ^0.9.0 (api).
- [#10196](https://github.com/1024pix/pix/pull/10196) [BUMP] Update adobe/s3mock Docker tag to v3.10.1 (dossier racine).
- [#10195](https://github.com/1024pix/pix/pull/10195) [BUMP] Update adobe/s3mock Docker tag to v3.10.1 (docker).
- [#10194](https://github.com/1024pix/pix/pull/10194) [BUMP] Update adobe/s3mock Docker tag to v3.10.1 (.circleci).
- [#10193](https://github.com/1024pix/pix/pull/10193) [BUMP] Update dependency @1024pix/pix-ui to ^46.13.4 (orga).

### :coffee: Autre
- [#10132](https://github.com/1024pix/pix/pull/10132) [DOC] Corriger des erreurs dans l'ADR 51.

## v4.218.0 (26/09/2024)


### :rocket: Amélioration
- [#10187](https://github.com/1024pix/pix/pull/10187) [FEATURE] affiche la date de naissance et la classe pour les prescrits venant d'un import à format (Pix-13984).
- [#10145](https://github.com/1024pix/pix/pull/10145) [FEATURE] exporte les champs supplémentaires fourni lors de l'import (PIX-13695).
- [#10140](https://github.com/1024pix/pix/pull/10140) [FEATURE] Préparer le template de layout pour la nouvelle mire d'authentification (PIX-13996).
- [#10180](https://github.com/1024pix/pix/pull/10180) [FEATURE] Supprimer l’info companion actif sur la page de supervision (PIX-14479).
- [#10174](https://github.com/1024pix/pix/pull/10174) [FEATURE] Supprimer le endpoint de ping Companion dans l’API (PIX-14478).
- [#10007](https://github.com/1024pix/pix/pull/10007) [FEATURE] Ajouter le contenu de l'onglet Formations (PIX-12986).

### :building_construction: Tech
- [#10175](https://github.com/1024pix/pix/pull/10175) [TECH] Replace des tests unitaires de composants par des tests d'intégration (PIX-14496).
- [#10161](https://github.com/1024pix/pix/pull/10161) [TECH] Permettre la suppression de cronJob lorsque l'on change son nom (PIX-14453).
- [#10188](https://github.com/1024pix/pix/pull/10188) [TECH] Prendre en compte la date de réconciliation dans les cas qui vérifie la réconciliation (PIX-14515).
- [#10179](https://github.com/1024pix/pix/pull/10179) [TECH] Migration du endpoint target-profile-summaries (PIX-14475).
- [#10190](https://github.com/1024pix/pix/pull/10190) [TECH] Remplit la colonne `reconciledAt` pour les anciennes certifications (PIX-14403).
- [#10154](https://github.com/1024pix/pix/pull/10154) [TECH] Améliorer le mot de passe surveillant (PIX-13007).
- [#10172](https://github.com/1024pix/pix/pull/10172) [TECH] migrate /api/admin/target-profiles/{id}/badges route (PIX-14465).

### :bug: Correction
- [#10185](https://github.com/1024pix/pix/pull/10185) [BUGFIX] Passer la bonne information en paramètre de la Pagination sur PixAdmin (Pix-14499).
- [#10186](https://github.com/1024pix/pix/pull/10186) [BUGFIX] Ne pas proposer d'épreuves inaccessibles à un candidat de certification nécessitant un test aménagé (PIX-14517).

## v4.217.0 (25/09/2024)


### :rocket: Amélioration
- [#10142](https://github.com/1024pix/pix/pull/10142) [FEATURE] Supprimer le support des anciens messages d’embed (PIX-14118).
- [#10096](https://github.com/1024pix/pix/pull/10096) [FEATURE] Générer les identifiants en masse pour les élèves (PIX-12975).
- [#10163](https://github.com/1024pix/pix/pull/10163) [FEATURE] Séparation bulle message sur la page error (Pix-13558).
- [#10162](https://github.com/1024pix/pix/pull/10162) [FEATURE] Suppression du check de certificabilité à la création de la certification (PIX-14206).
- [#10137](https://github.com/1024pix/pix/pull/10137) [FEATURE] Journaliser le changement d'adresse email (PIX-14360).
- [#10165](https://github.com/1024pix/pix/pull/10165) [FEATURE] Sauvegarder la date de reconciliation (PIX-14392).
- [#10155](https://github.com/1024pix/pix/pull/10155) [FEATURE] Masquer le champ "Code de prépaiement" tant que l'option "Prépayée" n'est pas cochée (PIX-13932).
- [#10144](https://github.com/1024pix/pix/pull/10144) [FEATURE] Sélection des acquis accessibles pour proposer un test aménagé (PIX-14241).
- [#10108](https://github.com/1024pix/pix/pull/10108) [FEATURE] Ecoute les évènements questions répondue et détermine si une quête est validée (PIX-13819).
- [#10077](https://github.com/1024pix/pix/pull/10077) [FEATURE] Amélioration continue chatgpt-parle-francais (MODC-100).
- [#9926](https://github.com/1024pix/pix/pull/9926) [FEATURE] Ajouter le contenu de l'onglet Détails des résultats (PIX-12985).

### :building_construction: Tech
- [#10166](https://github.com/1024pix/pix/pull/10166) [TECH] Migration de la route /api/users/{id}/profile (PIX-14454).
- [#10093](https://github.com/1024pix/pix/pull/10093) [TECH] Ajout de OpenFeature et PixEnvVarProvider.
- [#10167](https://github.com/1024pix/pix/pull/10167) [TECH] Suppression d'un script de rescoring N-1 (PIX-13544).
- [#10133](https://github.com/1024pix/pix/pull/10133) [TECH] Essai de déclenchement de la CI via une Github Action, uniquement pour les Pull Requests.
- [#10147](https://github.com/1024pix/pix/pull/10147) [TECH] Migrer le composant enrolled-candidates.hbs présent dans Pix Certif au format gjs (PIX-13810).

### :bug: Correction
- [#10157](https://github.com/1024pix/pix/pull/10157) [BUGFIX]  Ajout d'espace dans le bouton de la page de fin de mission (Pix-14165).
- [#10143](https://github.com/1024pix/pix/pull/10143) [BUGFIX] Supprimer l'initialisation en lang fr par défaut de l'application (PIX-14387).
- [#10158](https://github.com/1024pix/pix/pull/10158) [BUGFIX] Correction de l'alignement des titres dans les cartes mission (Pix-14420).
- [#10159](https://github.com/1024pix/pix/pull/10159) [BUGFIX] renomme les clés de traduction dans les fichier nl / en sur la table des lots de places (PIX-14452).

### :arrow_up: Montée de version
- [#10160](https://github.com/1024pix/pix/pull/10160) [BUMP] Update dependency @1024pix/pix-ui to ^46.13.2 (orga).

## v4.216.0 (23/09/2024)


### :rocket: Amélioration
- [#10153](https://github.com/1024pix/pix/pull/10153) [FEATURE] Ajout d'une bulle info lors de la selection des classes (pix-13987).
- [#10146](https://github.com/1024pix/pix/pull/10146) [FEATURE] Changement du logo PixJunior / blob / label Béta (pix-13628).
- [#10136](https://github.com/1024pix/pix/pull/10136) [FEATURE] :sparkles: Affiche le détail de résultat par mission et par élève pour les enseignants dans pixOrga (PIX-13848).
- [#10131](https://github.com/1024pix/pix/pull/10131) [FEATURE] Retourner un élément de type Flashcards dans l'API (PIX-14305).

### :building_construction: Tech
- [#10141](https://github.com/1024pix/pix/pull/10141) [TECH] Ajout d'une colonne pour enregistrer la reconciliation candidat (PIX-14391).

### :bug: Correction
- [#10123](https://github.com/1024pix/pix/pull/10123) [BUGFIX] Ne pas afficher un indice lorsque la traduction n'est pas dispo (PIX-14227).

## v4.215.0 (19/09/2024)


### :rocket: Amélioration
- [#10100](https://github.com/1024pix/pix/pull/10100) [FEATURE] Faire la vérification d'éligibilité Coeur lors de la réconciliation sur Pix App (PIX-14204).
- [#10139](https://github.com/1024pix/pix/pull/10139) [FEATURE] simplifie les bannière d'info sur orga (PIX-13968).
- [#10115](https://github.com/1024pix/pix/pull/10115) [FEATURE] Tenir compte de la condition sur l'obligation d'avoir une certification pix délivrée et validée avec un score minimum requis dans le bandeau V3 (PIX-14236).
- [#10121](https://github.com/1024pix/pix/pull/10121) [FEATURE] Mettre à jour la bannière de certification sur PixOrga (PIX-13969).
- [#10130](https://github.com/1024pix/pix/pull/10130) [FEATURE] Ajout de données l'audit logger pour le changement d'email (PIX-14362).
- [#10101](https://github.com/1024pix/pix/pull/10101) [FEATURE] Déconnecter l'utilisateur s'il utilise un refresh token avec un scope incorrect.
- [#10106](https://github.com/1024pix/pix/pull/10106) [FEATURE] affiche une alerte d'expiration des lots de places (PIX-14008).

### :building_construction: Tech
- [#10128](https://github.com/1024pix/pix/pull/10128) [TECH] Rediriger les routes de sessions "list" vers "index".
- [#10087](https://github.com/1024pix/pix/pull/10087) [TECH] Refactorer le RefreshToken service (PIX-13913).
- [#9963](https://github.com/1024pix/pix/pull/9963) [TECH] Migration de la route de la mise à jour du bandeau niveau 7 dans le contexte évaluation (PIX-13671).

### :bug: Correction
- [#10118](https://github.com/1024pix/pix/pull/10118) [BUGFIX] Ne pas retourner de 500 dans le cas d'un filtre sur la certificabilité mal défini (PIX-14300).
- [#10135](https://github.com/1024pix/pix/pull/10135) [BUGFIX] Eviter de remonter une 500 lors de l'erreur sur l'upload du fichier (PIX-14384).
- [#10138](https://github.com/1024pix/pix/pull/10138) [BUGFIX] Mise à jour du lien de téléchargement de PV d'incident (PIX-14406).

## v4.214.0 (18/09/2024)


### :rocket: Amélioration
- [#10103](https://github.com/1024pix/pix/pull/10103) [FEATURE] affiche les lots de place dans orga (PIX-14009).
- [#10097](https://github.com/1024pix/pix/pull/10097) [FEATURE] Afficher des feedback spécifiques aux QCU (PIX-14202) (PIX-13405).

### :building_construction: Tech
- [#10080](https://github.com/1024pix/pix/pull/10080) [TECH] Passage en v3 des centres de certif de type SCO (hors whitelist) (PIX-14098).
- [#10099](https://github.com/1024pix/pix/pull/10099) [TECH] Changer le system de Redis lock et supprimer Bluebird.
- [#10114](https://github.com/1024pix/pix/pull/10114) [TECH] Remonter les organisations ayant des lots de places illimités pour data (PIX-14247).
- [#10120](https://github.com/1024pix/pix/pull/10120) [TECH] Remplacer le logger error par juste un warn dans le cas des erreurs connues (PIX-14314).
- [#10088](https://github.com/1024pix/pix/pull/10088) [TECH] Sauvegarder l'état de l'import dans tous les cas (PIX-14200).
- [#10104](https://github.com/1024pix/pix/pull/10104) [TECH] Retirer l'étagère à bouquins du répertoire des centres de certification.
- [#10091](https://github.com/1024pix/pix/pull/10091) [TECH] :recycle: Déplacement d'un modèle de domaine évaluation de `src/shared` vers `src/evaluation`.

### :bug: Correction
- [#10116](https://github.com/1024pix/pix/pull/10116) [BUGFIX] Corriger l'affichage des listes à puces dans les indices (PIX-9987).
- [#10122](https://github.com/1024pix/pix/pull/10122) [BUGFIX] Corriger l'affichage des onglets sessions V3 sur la barre de navigation de Pix Admin (PIX-14349).
- [#10117](https://github.com/1024pix/pix/pull/10117) [BUGFIX] Correction de l'affichage du temps de certification (PIX-14318).

### :arrow_up: Montée de version
- [#10127](https://github.com/1024pix/pix/pull/10127) [BUMP] Update dependency sinon-chai to v4 (api).
- [#10126](https://github.com/1024pix/pix/pull/10126) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.27 (orga).
- [#10125](https://github.com/1024pix/pix/pull/10125) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.27 (mon-pix).
- [#10124](https://github.com/1024pix/pix/pull/10124) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.27 (junior).
- [#10113](https://github.com/1024pix/pix/pull/10113) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.27 (certif).

## v4.213.0 (13/09/2024)


### :rocket: Amélioration
- [#10105](https://github.com/1024pix/pix/pull/10105) [FEATURE] Adapter le bandeau des éligibilités aux nouvelles conditions V3 (PIX-14235).
- [#10037](https://github.com/1024pix/pix/pull/10037) [FEATURE] Support du message d’initialisation d’embed (PIX-14116).

### :building_construction: Tech
- [#10078](https://github.com/1024pix/pix/pull/10078) [TECH] Migration fichiers js vers gjs (PIX-14145).
- [#10094](https://github.com/1024pix/pix/pull/10094) [TECH] migre la route `/api/admin/organizations/{id}/target-profile-summaries` (PIX-14223).
- [#10109](https://github.com/1024pix/pix/pull/10109) [TECH] Ajouter l'import du service manquant.
- [#10004](https://github.com/1024pix/pix/pull/10004) [TECH] Ajout d'un composant Breadcrumb sur pix-admin (PIX-14070).

### :bug: Correction
- [#10111](https://github.com/1024pix/pix/pull/10111) [BUGFIX] Utiliser le bon usecase pour l'envoi d'information lors du démarrage d'une campagne (PIX-14279).

### :arrow_up: Montée de version
- [#10112](https://github.com/1024pix/pix/pull/10112) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.27 (admin).
- [#10030](https://github.com/1024pix/pix/pull/10030) [BUMP] Update dependency postgres to v15.8.

## v4.212.0 (12/09/2024)


### :coffee: Autre
- [#10110](https://github.com/1024pix/pix/pull/10110) Revert "[BUMP] Lock file maintenance".

## v4.211.0 (12/09/2024)


### :rocket: Amélioration
- [#10006](https://github.com/1024pix/pix/pull/10006) [FEATURE] Pouvoir consulter les informations prescrits plus facilement sur Pix Admin (PIX-12646).
- [#10071](https://github.com/1024pix/pix/pull/10071) [FEATURE] Expliciter le nom des paramètres présents dans l'URL des routes du contexte certification (PIX-14176).

### :building_construction: Tech
- [#10102](https://github.com/1024pix/pix/pull/10102) [TECH] Uniformiser le nom de la propriété des participations aux campagnes dans l'API interne (PIX-14239).
- [#9900](https://github.com/1024pix/pix/pull/9900) [TECH] Retirer les member actions de Pix Admin (PIX-13946).
- [#10092](https://github.com/1024pix/pix/pull/10092) [TECH] :recycle: Déplace `ResultCompetence` vers son domain d'utilisation.
- [#9890](https://github.com/1024pix/pix/pull/9890) [TECH] Ajouter les nouvelles tables Quests, Attestations et ProfileRewards(PIX-13818).

### :bug: Correction
- [#10090](https://github.com/1024pix/pix/pull/10090) [BUGFIX] Désactiver complètement le push FT.
- [#10086](https://github.com/1024pix/pix/pull/10086) [BUGFIX] supprime la validation du model PlaceStatistics (Pix-14195).
- [#10069](https://github.com/1024pix/pix/pull/10069) [BUGFIX] Verifier les noms de famille et prénoms dans le fichier d'import siecle pendant la validation de celui ci (PIX-14147).

### :arrow_up: Montée de version
- [#10107](https://github.com/1024pix/pix/pull/10107) [BUMP] Lock file maintenance.

### :coffee: Autre
- [#10098](https://github.com/1024pix/pix/pull/10098) Revert "[TECH] Ajouter les infos de corrélation à chaque log via le logger".

## v4.210.1 (10/09/2024)

### :bug: Correction
- [#10098](https://github.com/1024pix/pix/pull/10098) Revert "[TECH] Ajouter les infos de corrélation à chaque log via le logger"

## v4.210.0 (10/09/2024)


### :rocket: Amélioration
- [#10075](https://github.com/1024pix/pix/pull/10075) [FEATURE] Permettre de modifier une configuration d'import sans migration (PIX-14151).
- [#10052](https://github.com/1024pix/pix/pull/10052) [FEATURE] Création d'un endpoint pour remonter les lots de places (PIX-14006).
- [#10064](https://github.com/1024pix/pix/pull/10064) [FEATURE] Utiliser les correspondances des claims en base de données (PIX-13766).
- [#10079](https://github.com/1024pix/pix/pull/10079) [FEATURE] Updated translations from Phrase (PIX-14182).
- [#10039](https://github.com/1024pix/pix/pull/10039) [FEATURE] Utiliser le scope dans les refresh tokens (PIX-13911).

### :building_construction: Tech
- [#10073](https://github.com/1024pix/pix/pull/10073) [TECH] Ajout d'une variable d'environnement pour la gestion d'évènements asynchrones (PIX-14177).
- [#10043](https://github.com/1024pix/pix/pull/10043) [TECH] Remplacer l'usage de `memberAction` par un appel à des adapters (PIX-14093).
- [#10053](https://github.com/1024pix/pix/pull/10053) [TECH] Migrer la route GET /api/organizations/{id}/memberships dans src (PIX-14162).
- [#10081](https://github.com/1024pix/pix/pull/10081) [TECH] Migrer la route POST /api/certification-center-invitations/{id}/accept vers src/team (PIX-14138).
- [#10076](https://github.com/1024pix/pix/pull/10076) [TECH] Ajouter un feature toggle pour les nouvelles pages d'authentification (PIX-14001).
- [#10049](https://github.com/1024pix/pix/pull/10049) [TECH] Migrer la route GET /api/admin/users dans src (PIX-14130).
- [#10044](https://github.com/1024pix/pix/pull/10044) [TECH] Ajouter les infos de corrélation à chaque log via le logger.
- [#9993](https://github.com/1024pix/pix/pull/9993) [TECH] Revue de la gestion des erreurs du domaine Modulix (PIX-14043).
- [#10056](https://github.com/1024pix/pix/pull/10056) [TECH] Déplacement de la route is-certifiable vers le contexte enrolment de certification (PIX-13809).
- [#10068](https://github.com/1024pix/pix/pull/10068) [TECH] Permettre l'ajout d'une configuration avec peu de retry sur les job (PIX-14169).

### :bug: Correction
- [#10074](https://github.com/1024pix/pix/pull/10074) [BUGFIX] La liste déroulante pour choisir la méthode facturation entre deux inscriptions de candidats n'est pas réinitialisée sur PixCertif (PIX-14178).
- [#10072](https://github.com/1024pix/pix/pull/10072) [BUGFIX] Régression sur la pagination des sessions côté Pix Certif (PIX-13334).
- [#10051](https://github.com/1024pix/pix/pull/10051) [BUGFIX] Corriger l'affichage de la durée d'une certification dans pix-admin  (PIX-14153).

## v4.209.0 (05/09/2024)


### :rocket: Amélioration
- [#10027](https://github.com/1024pix/pix/pull/10027) [FEATURE] Ajouter un lien vers Modulix Editor dans la page de preview des modules (PIX-14095).
- [#10066](https://github.com/1024pix/pix/pull/10066) [FEATURE] Updated translations from Phrase.

### :building_construction: Tech
- [#10063](https://github.com/1024pix/pix/pull/10063) [TECH] Mettre à jour le README et les versions en v4.208.1.

### :bug: Correction
- [#10033](https://github.com/1024pix/pix/pull/10033) [BUGFIX] Afficher les tubes sélectionnés lors de l'édition d'un Profil Cible sur PixAdmin (PIX-14092).

## v4.208.1 (04/09/2024)

### :bug: Correction
- [#10062](https://github.com/1024pix/pix/pull/10062) Revert "[FEATURE] Utiliser les correspondances des claims en base de données (PIX-13766)"


## v4.208.0 (04/09/2024)

### :rocket: Amélioration
- [#10025](https://github.com/1024pix/pix/pull/10025) [FEATURE] Passer le nom de l'application (le scope) à l'authentification de manière standardisée (PIX-13910).
- [#10042](https://github.com/1024pix/pix/pull/10042) [FEATURE] Junior - Séparer l'activité et les résultats d'une mission en 2 onglets (PIX-13846).
- [#9790](https://github.com/1024pix/pix/pull/9790) [FEATURE] Réaligner le design des cartes de participation.
- [#10028](https://github.com/1024pix/pix/pull/10028) [FEATURE] Personnaliser le message de fin de mission en fonction des résultats (Pix-13845).
- [#10031](https://github.com/1024pix/pix/pull/10031) [FEATURE] Remettre dans leur état initial les participations ayant eu leurs campaignId supprimé (PIX-14054).
- [#9969](https://github.com/1024pix/pix/pull/9969) [FEATURE] Utiliser les correspondances des claims en base de données (PIX-13766).

### :building_construction: Tech
- [#10035](https://github.com/1024pix/pix/pull/10035) [TECH] Ajouter le participation id sur le log des jobs des état de participation (PIX-14106).
- [#10040](https://github.com/1024pix/pix/pull/10040) [TECH] Monter de version ember-source en 5.9.0 (PIX-14126).
- [#10001](https://github.com/1024pix/pix/pull/10001) [TECH] Remplacer le `request_id` d'Hapi par celui de Scalingo.
- [#9836](https://github.com/1024pix/pix/pull/9836) [TECH] :recycle: Déménagement de `monitoring_tools` vers `src/shared`.

### :bug: Correction
- [#10048](https://github.com/1024pix/pix/pull/10048) [BUGFIX] Encapsule les erreurs venant du client S3 et les log (PIX-14109).
- [#10045](https://github.com/1024pix/pix/pull/10045) [BUGFIX] Remettre le numéro des questions sur la page de détails des certifs V3 (PIX-14142).
- [#10036](https://github.com/1024pix/pix/pull/10036) [BUGFIX] Changer la couleur pour corriger le contraste sur la page de code candidat sur Pix App (PIX-14123).
- [#10032](https://github.com/1024pix/pix/pull/10032) [BUGFIX] Empêche le job d'import d'échouer lorsqu'il y a une erreur du domain (PIX-14108).

### :arrow_up: Montée de version
- [#10046](https://github.com/1024pix/pix/pull/10046) [BUMP] Update node.
- [#9785](https://github.com/1024pix/pix/pull/9785) [BUMP] Update dependency ember-intl to v7 (mon-pix).

## v4.207.0 (03/09/2024)


### :rocket: Amélioration
- [#9916](https://github.com/1024pix/pix/pull/9916) [FEATURE] Ajoute la gestion des filtres dans les imports à format (PIX-13509).
- [#9995](https://github.com/1024pix/pix/pull/9995) [FEATURE] : Traduction du message d'avertissement.
- [#10009](https://github.com/1024pix/pix/pull/10009) [FEATURE] Mise à jour de la clé de traduction NL de la bannière d'infos (PIX-14091).
- [#9874](https://github.com/1024pix/pix/pull/9874) [FEATURE] Ajout d'une modale d'édition de candidat pour les ajustements d'a11y en certif (PIX-13683).
- [#9958](https://github.com/1024pix/pix/pull/9958) [FEATURE] Améliorer l'affichage des erreurs dans l'import en masse sur Pix Certif (PIX-10155).

### :building_construction: Tech
- [#10017](https://github.com/1024pix/pix/pull/10017) [TECH] Corriger les seeds Acces d'élèves (PIX-14101).
- [#9959](https://github.com/1024pix/pix/pull/9959) [TECH] Remplacer Bluebird mapSeries par des fonctions natives.
- [#9919](https://github.com/1024pix/pix/pull/9919) [TECH] Migration hors event handler maison de AutoJuryDone (PIX-13977).
- [#9912](https://github.com/1024pix/pix/pull/9912) [TECH] Gestion des schedule jobs (PIX-13971).
- [#9955](https://github.com/1024pix/pix/pull/9955) [TECH] Simplification du code de la page Parcours autonomes (PIX-14003).
- [#9950](https://github.com/1024pix/pix/pull/9950) [TECH] Ajout d'un layout pour les composants PixAdmin (PIX-13988).
- [#9992](https://github.com/1024pix/pix/pull/9992) [TECH] : bouger le fichier nav.scss du dossier globals vers le dossier composants.

### :bug: Correction
- [#10000](https://github.com/1024pix/pix/pull/10000) [BUGFIX] Consigne : retour ligne pour les très long mots (PIX-13836).
- [#10023](https://github.com/1024pix/pix/pull/10023) [BUGFIX] Empêcher d'appeler la route de récupération d'une campagne par son code SANS code (PIX-14090).
- [#10008](https://github.com/1024pix/pix/pull/10008) [BUGFIX] Utiliser la même icône de suppression dans Pix-Certif (PIX-14086).
- [#9984](https://github.com/1024pix/pix/pull/9984) [BUGFIX] Améliorer la lisibilité de la solution d'un input de QROC(M) (PIX-14045).
- [#10005](https://github.com/1024pix/pix/pull/10005) [BUGFIX] Corriger un test flaky dans 'Integration | Component | Team::MembersListItem' (PIX-14084).

### :arrow_up: Montée de version
- [#10022](https://github.com/1024pix/pix/pull/10022) [BUMP] Update nginx Docker tag to v1.27.1.
- [#10021](https://github.com/1024pix/pix/pull/10021) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.26 (orga).
- [#10018](https://github.com/1024pix/pix/pull/10018) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.26 (admin).
- [#10019](https://github.com/1024pix/pix/pull/10019) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.26 (mon-pix).
- [#10011](https://github.com/1024pix/pix/pull/10011) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.25 (admin).
- [#10016](https://github.com/1024pix/pix/pull/10016) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.19 (certif).
- [#10015](https://github.com/1024pix/pix/pull/10015) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.26 (junior).
- [#10014](https://github.com/1024pix/pix/pull/10014) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.26 (certif).
- [#10013](https://github.com/1024pix/pix/pull/10013) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.25 (junior).
- [#10012](https://github.com/1024pix/pix/pull/10012) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.25 (certif).
- [#9939](https://github.com/1024pix/pix/pull/9939) [BUMP] Update dependency micromatch to v4.0.8 [SECURITY].
- [#9980](https://github.com/1024pix/pix/pull/9980) [BUMP] Update dependency webpack to v5.94.0 [SECURITY].
- [#9981](https://github.com/1024pix/pix/pull/9981) [BUMP] Update dependency webpack to v5.94.0 [SECURITY].
- [#9982](https://github.com/1024pix/pix/pull/9982) [BUMP] Update dependency webpack to v5.94.0 [SECURITY].
- [#9978](https://github.com/1024pix/pix/pull/9978) [BUMP] Update dependency webpack to v5.94.0 [SECURITY].

## v4.206.0 (30/08/2024)


### :rocket: Amélioration
- [#9997](https://github.com/1024pix/pix/pull/9997) [FEATURE] Ajouter un lien pour accéder à la documentation d'une mission (Pix-13775).
- [#9954](https://github.com/1024pix/pix/pull/9954) [FEATURE] Ajout des stepper-step sur les modules du MVP.
- [#9996](https://github.com/1024pix/pix/pull/9996) [FEATURE] Changement des couleurs de fonds Modulix (PIX-14066).

### :building_construction: Tech
- [#10002](https://github.com/1024pix/pix/pull/10002) [TECH] Suppression de scripts certification plus utilisés (PIX-14069).

### :bug: Correction
- [#10003](https://github.com/1024pix/pix/pull/10003) [BUGFIX] Vérifier si l'utilisateur est membre de l'orga pour accéder aux stats de places (PIX-14083).
- [#9967](https://github.com/1024pix/pix/pull/9967) [BUGFIX] Tentative de reduction des erreurs 500 a la creation du certification course (PIX-13997).

## v4.205.0 (29/08/2024)


### :rocket: Amélioration
- [#9970](https://github.com/1024pix/pix/pull/9970) [FEATURE] Ajoute le support des éléments "Separator" dans Modulix (PIX-14013).
- [#9971](https://github.com/1024pix/pix/pull/9971) [FEATURE] Transforme le paragraphe de description du module en `div` (PIX-14011).
- [#9968](https://github.com/1024pix/pix/pull/9968) [FEATURE] Créer une migration pour stocker les correspondance des claims en base de données (PIX-14039).

### :building_construction: Tech
- [#9989](https://github.com/1024pix/pix/pull/9989) [TECH] Ajouter des logs pour aider le debug des timeouts des jobs d'import SIECLE (PIX-14055).
- [#9988](https://github.com/1024pix/pix/pull/9988) [TECH] Optimiser les requêtes sur organization-learners (PIX-14068).
- [#9991](https://github.com/1024pix/pix/pull/9991) [TECH] Ajouter le `deletedBy` en condition de la vue des organisation learners actif (PIX-14071).
- [#9965](https://github.com/1024pix/pix/pull/9965) [TECH] Ajouter une configuration de retry pour les jobs d'import (PIX-14023).
- [#9972](https://github.com/1024pix/pix/pull/9972) [TECH] ♻️ migration de la route `/api/sco-organization-learners/association/auto` vers src/prescription.
- [#9964](https://github.com/1024pix/pix/pull/9964) [TECH] ♻️ migration de la route `/api/organizations/{id}/divisions` vers src/prescription (PIX-14030) .

### :bug: Correction
- [#9974](https://github.com/1024pix/pix/pull/9974) [BUGFIX] Ajout d'un prehandler sur le endpoint place-statistics.

### :arrow_up: Montée de version
- [#9979](https://github.com/1024pix/pix/pull/9979) [BUMP] Update dependency webpack to v5.94.0 [SECURITY].

## v4.204.0 (28/08/2024)


### :rocket: Amélioration
- [#9956](https://github.com/1024pix/pix/pull/9956) [FEATURE] Ajouter une clé de traduction nl pour le bandeau d'avertissement à l'invitation d'un nouveau membre (PIX-13992).
- [#9973](https://github.com/1024pix/pix/pull/9973) [FEATURE] Optimiser le script d'anonymisation (PIX-14044).
- [#9951](https://github.com/1024pix/pix/pull/9951) [FEATURE] Gérer l'affichage conditionnel de l'onglet Formations (PIX-13986).
- [#9949](https://github.com/1024pix/pix/pull/9949) [FEATURE] Changer le format de date en NL sur la page de réconciliation (PIX-13985).
- [#9952](https://github.com/1024pix/pix/pull/9952) [FEATURE] Modulix - Déplier les steppers dans la preview (PIX-13075).

### :building_construction: Tech
- [#9960](https://github.com/1024pix/pix/pull/9960) [TECH] Remplacer les erreurs génériques par des `DomainError` dans le contexte Modulix (PIX-14015).
- [#9957](https://github.com/1024pix/pix/pull/9957) [TECH] Utiliser des PixInput pour les champs de recherche des tables de l'administration.
- [#9911](https://github.com/1024pix/pix/pull/9911) [TECH] Supprimer l'utilisation des "render-modifiers" dans l'admin.
- [#9921](https://github.com/1024pix/pix/pull/9921) [TECH] Mettre les clés de traduction sur les boutons d'actions  (PIX-13970).

### :bug: Correction
- [#9962](https://github.com/1024pix/pix/pull/9962) [BUGFIX] Corriger la couleur du descriptif des parcours thématiques autonomes (PIX-14032).
- [#9953](https://github.com/1024pix/pix/pull/9953) [BUGFIX] Utiliser les styles par défaut du navigateur sur les liens hypertexte des contenus Modulix (PIX-13989).

### :arrow_up: Montée de version
- [#9689](https://github.com/1024pix/pix/pull/9689) [BUMP] Update dependency ember-intl to v7 (admin).

### :coffee: Autre
- [#9966](https://github.com/1024pix/pix/pull/9966) [DOC] Corriger des fautes dans la doc pour tester la CI.
- [#9961](https://github.com/1024pix/pix/pull/9961) [DOC] Corriger une erreur de frappe dans la doc. .

## v4.203.0 (26/08/2024)


### :rocket: Amélioration
- [#9915](https://github.com/1024pix/pix/pull/9915) [FEATURE] Améliorer le formulaire d'entrée en certification sur Pix App (PIX-13948).

### :building_construction: Tech
- [#9931](https://github.com/1024pix/pix/pull/9931) [TECH] Améliorer les performances pour la récupération des stats de places de toutes les organisations via un endpoint (PIX-13983).
- [#9928](https://github.com/1024pix/pix/pull/9928) [TECH] Ajouter un legacyName afin de pouvoir renommer un Job (PIX-13982).

### :bug: Correction
- [#9924](https://github.com/1024pix/pix/pull/9924) [BUGFIX] Fixer le problème de contraste dans l'écran de fin de test sur Pix App (PIX-13951).

### :arrow_up: Montée de version
- [#9948](https://github.com/1024pix/pix/pull/9948) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.8 (load-testing).
- [#9947](https://github.com/1024pix/pix/pull/9947) [BUMP] Update dependency @1024pix/ember-testing-library to ^3.0.6 (admin).
- [#9945](https://github.com/1024pix/pix/pull/9945) [BUMP] Update dependency @1024pix/ember-testing-library to ^3.0.6 (certif).
- [#9944](https://github.com/1024pix/pix/pull/9944) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.19 (mon-pix).
- [#9943](https://github.com/1024pix/pix/pull/9943) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.19 (junior).
- [#9942](https://github.com/1024pix/pix/pull/9942) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.19 (admin).
- [#9941](https://github.com/1024pix/pix/pull/9941) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.23 (junior).
- [#9940](https://github.com/1024pix/pix/pull/9940) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.23 (orga).
- [#9938](https://github.com/1024pix/pix/pull/9938) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.23 (mon-pix).
- [#9937](https://github.com/1024pix/pix/pull/9937) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.23 (admin).
- [#9935](https://github.com/1024pix/pix/pull/9935) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.8 (orga).
- [#9934](https://github.com/1024pix/pix/pull/9934) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.8 (junior).
- [#9933](https://github.com/1024pix/pix/pull/9933) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.8 (certif).
- [#9932](https://github.com/1024pix/pix/pull/9932) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.19 (orga).
- [#9813](https://github.com/1024pix/pix/pull/9813) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.8 (audit-logger).
- [#9930](https://github.com/1024pix/pix/pull/9930) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.8 (dossier racine).

## v4.202.0 (23/08/2024)


### :rocket: Amélioration
- [#9922](https://github.com/1024pix/pix/pull/9922) [FEATURE] Permettre l'usage d'HTML sur davantage de champs (PIX-13907).
- [#9907](https://github.com/1024pix/pix/pull/9907) [FEATURE] Réduire la taille du textarea de la Preview Modulix (PIX-13955).

### :building_construction: Tech
- [#9923](https://github.com/1024pix/pix/pull/9923) [TECH] Retirer le retry sur les Job d'état de participation (PIX-13979).
- [#9910](https://github.com/1024pix/pix/pull/9910) [TECH] Améliorer la page administration/common (PIX-13962).
- [#9920](https://github.com/1024pix/pix/pull/9920) [TECH] Logger les id de transaction et erreurs des requêtes d'insertion de certification-courses et certification-challenges.
- [#9906](https://github.com/1024pix/pix/pull/9906) [TECH] Migration des tests d’intégration admin en GJS.

## v4.201.0 (22/08/2024)


### :rocket: Amélioration
- [#9893](https://github.com/1024pix/pix/pull/9893) [FEATURE] Accompagner l'utilisateur mobile si son expérience risque d'être dégradée (PIX-13746).
- [#9902](https://github.com/1024pix/pix/pull/9902) [FEATURE] Rendre la création de sessions en masse fonctionnel avec la compatibilité coeur/complémentaire (PIX-13654).
- [#9882](https://github.com/1024pix/pix/pull/9882) [FEATURE] Réorganiser la page Administration en créant 2 nouveaux onglets et déplacer les fonctionnalités.
- [#9876](https://github.com/1024pix/pix/pull/9876) [FEATURE] Le script d'anonymisation ne necessite pas d'admin pour anonymiser (PIX-13798).
- [#9897](https://github.com/1024pix/pix/pull/9897) [FEATURE] Update clés de trad pour réconciliation SCO FWB (PIX-13943).
- [#9892](https://github.com/1024pix/pix/pull/9892) [FEATURE] Afficher une image ou vidéo d'introduction (Pix-13631).
- [#9866](https://github.com/1024pix/pix/pull/9866) [FEATURE] Ajouter un avertissement dans la page d'invitation des membres (PIX-12917).
- [#9822](https://github.com/1024pix/pix/pull/9822) [FEATURE] Afficher le besoin d'une certification aménagée dans les détails des candidats (PIX-13294).
- [#9841](https://github.com/1024pix/pix/pull/9841) [FEATURE] Ajout d'une API interne pour récupérer les prescrits et leurs participations (PIX-13815).

### :building_construction: Tech
- [#9913](https://github.com/1024pix/pix/pull/9913) [TECH] Ajouter une liste de configuration définit pour les retry et expireIn (PIX-13965).
- [#9909](https://github.com/1024pix/pix/pull/9909) [TECH] Surcharger les propriétés teamConcurrency et teamSize (PIX-13964).
- [#9879](https://github.com/1024pix/pix/pull/9879) [TECH] Revue de la gestion de l'evenement SessionFinalized (PIX-13922).
- [#9847](https://github.com/1024pix/pix/pull/9847) [TECH] Utiliser le nouveau format de config ESLint sur mon-pix.
- [#9820](https://github.com/1024pix/pix/pull/9820) [TECH] Suppression de polyfills Intl (PIX-13595).
- [#9887](https://github.com/1024pix/pix/pull/9887) [TECH] Renommer le job de l'état shared d'une participation à Pole Emploi pour être ISO par rapport aux autres job (PIX-13938).
- [#9904](https://github.com/1024pix/pix/pull/9904) [TECH] Ajout d'un mécanisme de regroupement des jobs (PIX-13954).
- [#9899](https://github.com/1024pix/pix/pull/9899) [TECH] Enregistrement automatique des Jobs dans le worker.js (PIX-13944).
- [#9860](https://github.com/1024pix/pix/pull/9860) [TECH] Migration du usecase permettant d'associer un utilisateur à un candidat inscrit en certification (PIX-13808).
- [#9885](https://github.com/1024pix/pix/pull/9885) [TECH] Migrer les fichiers de test des components "target profiles" en GJS.
- [#9901](https://github.com/1024pix/pix/pull/9901) [TECH] Migrer les fichiers de test des components "users" en GJS.
- [#9889](https://github.com/1024pix/pix/pull/9889) [TECH] Migrer le composant list-items en gjs (PIX-13902).
- [#9872](https://github.com/1024pix/pix/pull/9872) [TECH] PixAdmin - Composants Certifications sous gjs (PIX-13892).
- [#9878](https://github.com/1024pix/pix/pull/9878) [TECH] PixAdmin - Composant complementary-certifications sous gjs (PIX-13893).
- [#9898](https://github.com/1024pix/pix/pull/9898) [TECH] Retirer le tag deprecated de la route d'inscription de candidat.
- [#9880](https://github.com/1024pix/pix/pull/9880) [TECH] Migrer le dossier admin/team en gjs (PIX-13919).
- [#9884](https://github.com/1024pix/pix/pull/9884) [TECH] Migrer les composants du dossier sessions en gjs (PIX-13895).
- [#9886](https://github.com/1024pix/pix/pull/9886) [TECH] PixAdmin - Composants Stages sous gjs (PIX-13892).
- [#9888](https://github.com/1024pix/pix/pull/9888) [TECH] PixAdmin - Composants tools sous gjs (PIX-13903).
- [#9883](https://github.com/1024pix/pix/pull/9883) [TECH] Migration du dossier certification-centers en gjs (PIX-13890).
- [#9852](https://github.com/1024pix/pix/pull/9852) [TECH] Remove Bookshelf from membership repository.
- [#9881](https://github.com/1024pix/pix/pull/9881) [TECH] Migrate admin organizations components to gjs.

### :bug: Correction
- [#9914](https://github.com/1024pix/pix/pull/9914) [BUGFIX] Empêche les jobs de validation d'échouer pour des erreurs métiers (PIX-13956).
- [#9908](https://github.com/1024pix/pix/pull/9908) [BUGFIX] Jeter une erreur si le candidat n'existe pas lors de la suppression de ce dernier sur Pix Certif (PIX-13961).
- [#9903](https://github.com/1024pix/pix/pull/9903) [BUGFIX] Un candidat inscrit en certification dans une session, dont le centre est isV3Pilot et complementaryAlone mais sans habilitations, est en échec (PIX-13950).

### :arrow_up: Montée de version
- [#9894](https://github.com/1024pix/pix/pull/9894) [BUMP] Update adobe/s3mock Docker tag to v3.10.0 (.circleci).
- [#9896](https://github.com/1024pix/pix/pull/9896) [BUMP] Update adobe/s3mock Docker tag to v3.10.0 (dossier racine).
- [#9895](https://github.com/1024pix/pix/pull/9895) [BUMP] Update adobe/s3mock Docker tag to v3.10.0 (docker).

## v4.200.0 (20/08/2024)


### :rocket: Amélioration
- [#9829](https://github.com/1024pix/pix/pull/9829) [FEATURE] Permettre l'inscription individuelle d'un candidat en respectant les nouvelles règles d'inscription en certification (compatibilité coeur/complémentaire) (PIX-11903).
- [#9868](https://github.com/1024pix/pix/pull/9868) [FEATURE] Ajouter le champ `tabletSupport` dans les métadonnées d'un modue (PIX-13908).

### :building_construction: Tech
- [#9863](https://github.com/1024pix/pix/pull/9863) [TECH] Supprimer l'événement AssessmentCompleted (PIX-13926).
- [#9875](https://github.com/1024pix/pix/pull/9875) [TECH] Migrer les composants du dossier admin/campaigns en gjs (PIX-13889).
- [#9871](https://github.com/1024pix/pix/pull/9871) [TECH] Déplacer l'évènement démarrage d'une campagne Pole Emploi dans pgboss (PIX-13916).
- [#9877](https://github.com/1024pix/pix/pull/9877) [TECH] migrate admin target profiles folder to gjs.
- [#9858](https://github.com/1024pix/pix/pull/9858) [TECH] N'avoir qu'un seul repository pgboss (PIX-13881).
- [#9843](https://github.com/1024pix/pix/pull/9843) [TECH] Migrer les jobs PgBoss vers la nouvelle nomenclature (PIX-13869).
- [#9861](https://github.com/1024pix/pix/pull/9861) [TECH] PixAdmin - Composant Admin sous gjs (PIX-13882).
- [#9873](https://github.com/1024pix/pix/pull/9873) [TECH] Passer des components admin en GJS.
- [#9857](https://github.com/1024pix/pix/pull/9857) [TECH]  Ajout du tooling pour les tests des Jobs (PIX-13879).
- [#9840](https://github.com/1024pix/pix/pull/9840) [TECH] Utiliser directement les Jobs lors du partage des résultats de participation (PIX-13866).
- [#9855](https://github.com/1024pix/pix/pull/9855) [TECH] Mettre les fichiers css au même endroit que les fichiers de composants (PIX-13307).
- [#9848](https://github.com/1024pix/pix/pull/9848) [TECH] Pouvoir définir la priorité dans les jobs PgBoss .

## v4.199.0 (19/08/2024)


### :rocket: Amélioration
- [#9856](https://github.com/1024pix/pix/pull/9856) [FEATURE] Avoir les blocs réponses en vert ou rouge sur les QCM (PIX-13878) (PIX-13832).
- [#9854](https://github.com/1024pix/pix/pull/9854) [FEATURE] Avoir les blocs réponses en vert ou rouge sur les QCU (PIX-13876).
- [#9835](https://github.com/1024pix/pix/pull/9835) [FEATURE] Afficher les éléments "Download" dans Modulix (PIX-12501).
- [#9827](https://github.com/1024pix/pix/pull/9827) [FEATURE] prend en compte la feature d'import pour la dissociation (PIX-13617).

### :building_construction: Tech
- [#9839](https://github.com/1024pix/pix/pull/9839) [TECH] Passage de la page de connexion en gjs sur certif (PIX-13855).
- [#9846](https://github.com/1024pix/pix/pull/9846) [TECH] Amélioration autour du bounded-context "certification/enrolment".
- [#9844](https://github.com/1024pix/pix/pull/9844) [TECH] Remove bookshelf from certification-report-repository.
- [#9788](https://github.com/1024pix/pix/pull/9788) [TECH] Migrer la duplication des target profiles vers le sous-domaine target-profile (PIX-12951).
- [#9830](https://github.com/1024pix/pix/pull/9830) [TECH] Refacto sur quelques repositories du contexte certification/enrolment (PIX-13856).
- [#9833](https://github.com/1024pix/pix/pull/9833) [TECH] Simplifier l'utilisation / création d'un job Pgboss (PIX-13854).
- [#9838](https://github.com/1024pix/pix/pull/9838) [TECH] Remplacer notre parser de query string par une alternative plus légère.

### :bug: Correction
- [#9853](https://github.com/1024pix/pix/pull/9853) [BUGFIX] Affichage d'un deuxième onglet lors du téléchargement d'un document depuis un iPad/iPhone (PIX-13737).
- [#9849](https://github.com/1024pix/pix/pull/9849) [BUGFIX] Ajout d'une traduction pour le message d'erreur lors de l'inscription à plusieurs certifications complémentaires (PIX-13867).
- [#9821](https://github.com/1024pix/pix/pull/9821) [BUGFIX] Les erreurs de runtime sur le downgrade de capacite ne remonte pas dans le monitoring (PIX-13660).

### :arrow_up: Montée de version
- [#9859](https://github.com/1024pix/pix/pull/9859) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.21 (mon-pix).
- [#9845](https://github.com/1024pix/pix/pull/9845) [BUMP] Update dependency axios to v1.7.4 [SECURITY].

## v4.198.0 (13/08/2024)


### :rocket: Amélioration
- [#9815](https://github.com/1024pix/pix/pull/9815) [FEATURE] Ajout de la colonne relative au besoin d'une certification aménagée dans la table certification-candidates (PIX-13293).

### :building_construction: Tech
- [#9837](https://github.com/1024pix/pix/pull/9837) [TECH] Remplacer un plugin eslint par une alternative plus légère.

## v4.197.0 (12/08/2024)


### :rocket: Amélioration
- [#9834](https://github.com/1024pix/pix/pull/9834) [FEATURE] Revue de design Modulix (PIX-13842).
- [#9819](https://github.com/1024pix/pix/pull/9819) [FEATURE] Supporte des petits différences dans le nom / prénom lors de la réconciliation (PIX-13626).
- [#9831](https://github.com/1024pix/pix/pull/9831) [FEATURE] Add style and content for timed out answer correction (PIX-13830).
- [#9825](https://github.com/1024pix/pix/pull/9825) [FEATURE] Permettre l'inscription "compatibilité coeur / complémentaire" via l'ODS (PIX-13616).
- [#9828](https://github.com/1024pix/pix/pull/9828) [FEATURE] Remonter les éléments Downloads dans un module (PIX-13768).
- [#9806](https://github.com/1024pix/pix/pull/9806) [FEATURE] Mise en place du SSO pour Agent Connect (PIX-13741).
- [#9807](https://github.com/1024pix/pix/pull/9807) [FEATURE] Ajoute un script pour convertir le schema Joi des Modulix en JSON Schema (PIX-13620) (PIX-13781).
- [#9818](https://github.com/1024pix/pix/pull/9818) [FEATURE] Modifier l'affichage des inscriptions en certification pour gérer la compatibilité coeur/complémentaire (PIX-11899).

### :building_construction: Tech
- [#9758](https://github.com/1024pix/pix/pull/9758) [TECH] :recycle: Suppression du fichier `http-errors.js` présent dans `lib/application`.

### :bug: Correction
- [#9816](https://github.com/1024pix/pix/pull/9816) [BUGFIX] Sauvegarder le statut de l'import en erreur si la publication de l'evenement ne fonctionne pas (PIX-13796).

## v4.196.0 (08/08/2024)


### :rocket: Amélioration
- [#9824](https://github.com/1024pix/pix/pull/9824) [FEATURE] add competence description to assessment result (PIX-13804).
- [#9780](https://github.com/1024pix/pix/pull/9780) [FEATURE] Ajouter le contenu de l'onglet Récompenses (PIX-12984).
- [#9817](https://github.com/1024pix/pix/pull/9817) [FEATURE] Passe directement à la dernière épreuves à jouer d'une mission déjà démarré depuis la page de liste des mission (PIX-13625).
- [#9804](https://github.com/1024pix/pix/pull/9804) [FEATURE] Afficher la carte d'une mission avec un statut 'En cours' (Pix-13624).

### :bug: Correction
- [#9823](https://github.com/1024pix/pix/pull/9823) [BUGFIX] corrige le format d'import sco fwb (PIX-13807).

## v4.195.0 (07/08/2024)


### :rocket: Amélioration
- [#9713](https://github.com/1024pix/pix/pull/9713) [FEATURE] Ne pas afficher la possibilité d'activer la gestion des élèves lorsque l'import à format est actif (PIX-13618).
- [#9803](https://github.com/1024pix/pix/pull/9803) [FEATURE] Ajouter un élément "download" dans le didacticiel modulix (PIX-12501).
- [#9700](https://github.com/1024pix/pix/pull/9700) [FEATURE] Permettre la saisie au format Utilisateurs de la date (PIX-13569).
- [#9698](https://github.com/1024pix/pix/pull/9698) [FEATURE] Script de reprise de données des utilisateurs anonymisés (PIX-4218).

### :building_construction: Tech
- [#9786](https://github.com/1024pix/pix/pull/9786) [TECH] Utiliser le modèle Enrolment/Candidate sur les usecases d'écriture du bounded-context d'inscription + préparer le terrain pour les subscriptions (PIX-13732).
- [#9751](https://github.com/1024pix/pix/pull/9751) [TECH] Utiliser le modèle "EnrolledCandidate" partout dans le bounded-context "enrolment" dans des cas de lecture (PIX-13656).
- [#9805](https://github.com/1024pix/pix/pull/9805) [TECH] Réparer les seeds de la team évaluation (PIX-13755).
- [#9764](https://github.com/1024pix/pix/pull/9764) [TECH] Remplacer bluebird.map (avec concurrence) par des fonctions natives.
- [#9497](https://github.com/1024pix/pix/pull/9497) [TECH] Suppression du contexte certification/courses (PIX-13396).
- [#9770](https://github.com/1024pix/pix/pull/9770) [TECH] Refactoriser le test `module-instantiation_test` et la factory de `Module` (PIX-13229).

### :bug: Correction
- [#9814](https://github.com/1024pix/pix/pull/9814) [BUGFIX] Continuer la mission si la dernière des 3 tentatives à été réussie (Pix-13764).
- [#9811](https://github.com/1024pix/pix/pull/9811) [BUGFIX] corrige le wording d'affichage de la fonctionnalité d'import sur les orgas  (PIX-13795).

### :arrow_up: Montée de version
- [#9812](https://github.com/1024pix/pix/pull/9812) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.8 (admin).
- [#9810](https://github.com/1024pix/pix/pull/9810) [BUMP] Update dependency @1024pix/ember-testing-library to ^3.0.6 (orga).
- [#9809](https://github.com/1024pix/pix/pull/9809) [BUMP] Update dependency @1024pix/ember-testing-library to ^3.0.6 (mon-pix).
- [#9808](https://github.com/1024pix/pix/pull/9808) [BUMP] Update dependency @1024pix/ember-testing-library to ^3.0.6 (junior).
- [#9791](https://github.com/1024pix/pix/pull/9791) [BUMP] Update dependency ember-resolver to v12 (admin).
- [#9783](https://github.com/1024pix/pix/pull/9783) [BUMP] Update Node.js to ^20.16.0.
- [#9782](https://github.com/1024pix/pix/pull/9782) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.18 (orga).
- [#9801](https://github.com/1024pix/pix/pull/9801) [BUMP] Update dependency node to v20.16.0.

## v4.194.0 (05/08/2024)


### :rocket: Amélioration
- [#9736](https://github.com/1024pix/pix/pull/9736) [FEATURE] Afficher un QCU Image en web component sur Pix Junior TECH DAYS (Pix-13740).
- [#9794](https://github.com/1024pix/pix/pull/9794) [FEATURE] Changement du design des cartes mission dans Pix Junior (Pix-13623).
- [#9769](https://github.com/1024pix/pix/pull/9769) [FEATURE] Intégrer des composants Pix UI sur l'accueil de Pix App.

### :building_construction: Tech
- [#9762](https://github.com/1024pix/pix/pull/9762) [TECH] Arrêter d'utiliser des variables dépréciées de Pix UI dans mon-pix.
- [#9763](https://github.com/1024pix/pix/pull/9763) [TECH] Migrer le helper CSV et ls serializer CSV vers la nouvelle arborescence (PIX-13673).
- [#9787](https://github.com/1024pix/pix/pull/9787) [TECH] Déplacer les validateurs dans le scope évaluation (PIX-13733).
- [#9789](https://github.com/1024pix/pix/pull/9789) [TECH] Augmenter le timeout de 2 tests longs (flakies).
- [#9773](https://github.com/1024pix/pix/pull/9773) [TECH] Utiliser les nouvelles variables pour les espacements sur Pix Certif (PIX-13708).

### :bug: Correction
- [#9795](https://github.com/1024pix/pix/pull/9795) [BUGFIX] Corriger la réinitialisation d'un QCM Modulix lors du clic sur le bouton Réessayer.
- [#9774](https://github.com/1024pix/pix/pull/9774) [BUGFIX] Import tags: gestion d'erreur pour une orga inexistante (PIX-13680).

### :arrow_up: Montée de version
- [#9784](https://github.com/1024pix/pix/pull/9784) [BUMP] Update dependency ember-intl to v7 (certif).

### :coffee: Autre
- [#9798](https://github.com/1024pix/pix/pull/9798) [FIX] Dupliquer la categorie du profil cible (PIX-13525) .

## v4.193.0 (02/08/2024)


### :rocket: Amélioration
- [#9768](https://github.com/1024pix/pix/pull/9768) [FEATURE] Ajout d'événements Matomo sur Modulix (PIX-13403).

### :building_construction: Tech
- [#9767](https://github.com/1024pix/pix/pull/9767) [TECH] Ajouter des tests d'intégration concernant le refreshTokenService (PIX-13665).
- [#9547](https://github.com/1024pix/pix/pull/9547) [TECH] GJS arrive chez Junior !!!!.

### :bug: Correction
- [#9775](https://github.com/1024pix/pix/pull/9775) [BUGFIX] Corriger l'utilisation du taux de capage dans le choix des épreuves (PIX-13712).

### :arrow_up: Montée de version
- [#9781](https://github.com/1024pix/pix/pull/9781) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.18 (mon-pix).
- [#9778](https://github.com/1024pix/pix/pull/9778) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.18 (certif).
- [#9779](https://github.com/1024pix/pix/pull/9779) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.18 (junior).
- [#9777](https://github.com/1024pix/pix/pull/9777) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.18 (admin).
- [#9776](https://github.com/1024pix/pix/pull/9776) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.17 (mon-pix).

## v4.192.0 (01/08/2024)


### :rocket: Amélioration
- [#9771](https://github.com/1024pix/pix/pull/9771) [FEATURE] Initialiser la nouvelle page de résultats de fin de parcours (PIX-13672).
- [#9739](https://github.com/1024pix/pix/pull/9739) [FEATURE] Retourner la lucrativite des acquis dans le simulateur (PIX-13591).
- [#9712](https://github.com/1024pix/pix/pull/9712) [FEATURE] Revue de la formulation des fonctionnalités pilotes sur Pix Admin (PIX-13531).

### :building_construction: Tech
- [#9753](https://github.com/1024pix/pix/pull/9753) [TECH] Mise à jour des dépendances d'audit logger (PIX-13684).
- [#9759](https://github.com/1024pix/pix/pull/9759) [TECH] Migration de la route d'invitation à rejoindre une orga sur Pix Admin vers le contexte team (PIX-13666).
- [#9709](https://github.com/1024pix/pix/pull/9709) [TECH] Migration de fichiers vers des contextes identifiés (PIX-13614).
- [#9757](https://github.com/1024pix/pix/pull/9757) [TECH] Remplacer Bluebird : all, filter, each par des fonctions natives.

### :bug: Correction
- [#9772](https://github.com/1024pix/pix/pull/9772) [BUGFIX] Corrige un test flaky qui empêche la CI de passer sur PixOrga (PIX-13707).
- [#9756](https://github.com/1024pix/pix/pull/9756) [BUGFIX] Rendre accessible le texte de la tooltip en mode focus sur les épreuves (PIX-8075).

## v4.191.0 (31/07/2024)


### :rocket: Amélioration
- [#9755](https://github.com/1024pix/pix/pull/9755) [FEATURE] Permettre la personnalisation de l'image avant le chargement d'une vidéo (PIX-12170).
- [#9754](https://github.com/1024pix/pix/pull/9754) [FEATURE] Ajout d'un feature toggle pour conditionner l'affichage des missions expérimentales (Pix-13585).
- [#9732](https://github.com/1024pix/pix/pull/9732) [FEATURE] Afficher le bouton `Continuer` ou `Passer` avec les Embeds auto (PIX-13640).
- [#9727](https://github.com/1024pix/pix/pull/9727) [FEATURE] Ne pas pouvoir anonymiser un agent Pix (PIX-12137).
- [#9485](https://github.com/1024pix/pix/pull/9485) [FEATURE] Ajouter un composant Tabs (PIX-12982).
- [#9706](https://github.com/1024pix/pix/pull/9706) [FEATURE] Ne plus garder les infos de type TIMESTAMP OBLIGATOIRE lors de la suppression d'un utilisateur (généralisation) (PIX-11582).

### :building_construction: Tech
- [#9641](https://github.com/1024pix/pix/pull/9641) [TECH] Ajouter de la configuration pour un token pix data (PIX-13547).
- [#9740](https://github.com/1024pix/pix/pull/9740) [TECH] Use deep.members instead of deep.equal to avoid a flacky result (PIX-13663).

### :bug: Correction
- [#9725](https://github.com/1024pix/pix/pull/9725) [BUGFIX] Renommer other de la clé par miscellaneous (PIX-13606).
- [#9766](https://github.com/1024pix/pix/pull/9766) [BUGFIX] Réparer l'affichage des réponses au rechargement d'un écran intermédiaire (PIX-13688).

## v4.190.0 (30/07/2024)


### :building_construction: Tech
- [#9741](https://github.com/1024pix/pix/pull/9741) [TECH] Renomme les fichiers de tests des applications front en "-test.js".
- [#9720](https://github.com/1024pix/pix/pull/9720) [TECH] Migration des routes pour modifier le rôle d'un membre d'une organisation dans le contexte team (PIX-13641).
- [#9730](https://github.com/1024pix/pix/pull/9730) [TECH] Ajout de trace d'erreur pour le simulateur de certification (PIX-13575).

### :bug: Correction
- [#9718](https://github.com/1024pix/pix/pull/9718) [BUGFIX] Empêcher l'accès au contenu d'un embed au lecteur d'écran avant de cliquer sur le bouton "Commencer".

### :arrow_up: Montée de version
- [#9746](https://github.com/1024pix/pix/pull/9746) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.15 (orga).
- [#9745](https://github.com/1024pix/pix/pull/9745) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.15 (mon-pix).
- [#9744](https://github.com/1024pix/pix/pull/9744) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.15 (junior).
- [#9743](https://github.com/1024pix/pix/pull/9743) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.15 (certif).
- [#9742](https://github.com/1024pix/pix/pull/9742) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.15 (admin).
- [#9737](https://github.com/1024pix/pix/pull/9737) [BUMP] Update dependency @1024pix/ember-testing-library to ^3.0.3 (mon-pix).
- [#9738](https://github.com/1024pix/pix/pull/9738) [BUMP] Update dependency @1024pix/ember-testing-library to ^3.0.3 (orga).
- [#9735](https://github.com/1024pix/pix/pull/9735) [BUMP] Update dependency @1024pix/ember-testing-library to ^3.0.3 (junior).
- [#9734](https://github.com/1024pix/pix/pull/9734) [BUMP] Update dependency @1024pix/ember-testing-library to ^3.0.3 (certif).
- [#9733](https://github.com/1024pix/pix/pull/9733) [BUMP] Update dependency @1024pix/ember-testing-library to ^3.0.3 (admin).
- [#9731](https://github.com/1024pix/pix/pull/9731) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.14 (mon-pix) (PIX-13529).
- [#9723](https://github.com/1024pix/pix/pull/9723) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.14 (certif).

## v4.189.0 (29/07/2024)


### :rocket: Amélioration
- [#9715](https://github.com/1024pix/pix/pull/9715) [FEATURE] Mettre en retrait certains boutons de Modulix (PIX-13635) (PIX-13200).
- [#9559](https://github.com/1024pix/pix/pull/9559) [FEATURE] Ajout d'un feature toggle pour la nouvelle page de fin de parcours.
- [#9719](https://github.com/1024pix/pix/pull/9719) [FEATURE] Informer l'API qu'un embed auto a été réussi dans un module (PIX-13096).
- [#9609](https://github.com/1024pix/pix/pull/9609) [FEATURE] [Pix Admin] Ajouter en masse des tags d'organisations (PIX-13456).
- [#9701](https://github.com/1024pix/pix/pull/9701) [FEATURE] Modifier le verbe valider par vérifier dans l'e-mail de création de compte (PIX-13612).
- [#9544](https://github.com/1024pix/pix/pull/9544) [FEATURE] Traduction en anglais du processus de récupération d'un compte SCO (PIX-13277).
- [#9702](https://github.com/1024pix/pix/pull/9702) [FEATURE] Changement de wording dans la bannière info sur Pix Orga avec les orga SCO-1D (Pix-13533).
- [#9714](https://github.com/1024pix/pix/pull/9714) [FEATURE] Changement de wording sur l'envoi multiple à la création de campagne  (PIX-13605).
- [#9705](https://github.com/1024pix/pix/pull/9705) [FEATURE] Ajout d'un faicon pour Pix Junior (Pix-13615).
- [#9628](https://github.com/1024pix/pix/pull/9628) [FEATURE] Afficher les colonnes custom des imports générique (PIX-13508).

### :building_construction: Tech
- [#9669](https://github.com/1024pix/pix/pull/9669) [TECH] Supprimer tous les arguments de transactions inutiles (PIX-13581).
- [#9717](https://github.com/1024pix/pix/pull/9717) [TECH] Déplace les `orm-models` vers `src`.
- [#9711](https://github.com/1024pix/pix/pull/9711) [TECH] Mise en place de scripts `npm run dev` pour lancer les environnement de développement.
- [#9710](https://github.com/1024pix/pix/pull/9710) [TECH] Déplace les `lib/application/usecases` vers `src/shared/application`.
- [#9703](https://github.com/1024pix/pix/pull/9703) [TECH] Migration de la route /api/admin/certifications/:id vers src (PIX-13608).
- [#9707](https://github.com/1024pix/pix/pull/9707) [TECH] déplace le répertoire `open-api-doc` vers `src/shared/infrastructure/`.
- [#9588](https://github.com/1024pix/pix/pull/9588) [TECH] Migration de la route LSU/LSL vers src/results (PIX-13500).
- [#9697](https://github.com/1024pix/pix/pull/9697) [TECH] Déplace l'ensemble des `models` et `read-models` restant dans `lib/` vers `src/shared/`.
- [#9650](https://github.com/1024pix/pix/pull/9650) [TECH] Script temporaire de rescoring de complementaire (PIX-10340).

### :bug: Correction
- [#9726](https://github.com/1024pix/pix/pull/9726) [BUGFIX] Ne pas mettre a jour le champ campaignId quand on met a jour la campagn-participations (PIX-13644).
- [#9696](https://github.com/1024pix/pix/pull/9696) [BUGFIX] Épreuves timées : traduction du temps imparti (PIX-13514).

### :arrow_up: Montée de version
- [#9724](https://github.com/1024pix/pix/pull/9724) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.13 (junior).
- [#9722](https://github.com/1024pix/pix/pull/9722) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.13 (admin).
- [#9721](https://github.com/1024pix/pix/pull/9721) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.12 (mon-pix).
- [#9693](https://github.com/1024pix/pix/pull/9693) [BUMP] Lock file maintenance (mon-pix).
- [#9695](https://github.com/1024pix/pix/pull/9695) [BUMP] Lock file maintenance (e2e).

## v4.188.0 (25/07/2024)


### :rocket: Amélioration
- [#9660](https://github.com/1024pix/pix/pull/9660) [FEATURE] Enregistrer les retours d'embed dans l'api pour Modulix (PIX-13094) (PIX-13095).
- [#9690](https://github.com/1024pix/pix/pull/9690) [FEATURE] Modification du wording accès sans compte (PIX-13603).
- [#9678](https://github.com/1024pix/pix/pull/9678) [FEATURE] Ajout d'un onglet support dans le menu de gauche pour une organization SCO-1D (Pix-13142).
- [#9629](https://github.com/1024pix/pix/pull/9629) [FEATURE] Ajouter les CGU sur Pix Orga en NL (PIX-13241).
- [#9675](https://github.com/1024pix/pix/pull/9675) [FEATURE] Anonymiser les info user login d'un utilisateur (PIX-11569).

### :building_construction: Tech
- [#9658](https://github.com/1024pix/pix/pull/9658) [TECH] Migrer le dossier temporary storage vers src/shared (PIX-13577).
- [#9676](https://github.com/1024pix/pix/pull/9676) [TECH] Sauvegarder en même temps les knowledge elements reset dans le cadre d'une remise à zéro.
- [#9686](https://github.com/1024pix/pix/pull/9686) [TECH] Migration de la route POST /api/organization-invitations/{id}/response vers src/team (pix-13592).
- [#9684](https://github.com/1024pix/pix/pull/9684) [TECH] Migration de la route api/admin/certification-courses/{certificationCourseId} vers session-management (PIX-13596).
- [#9685](https://github.com/1024pix/pix/pull/9685) [TECH] Migration de la route /api/admin/certification-courses/:id/uncancel vers src (PIX-13600).
- [#9624](https://github.com/1024pix/pix/pull/9624) [TECH] Migrer les fichiers de gestion des caches dans le dossier src/shared (PIX-13521).
- [#9682](https://github.com/1024pix/pix/pull/9682) [TECH] Migration de la route /api/admin/certification-courses/:id/cancel vers src (PIX-13594).
- [#9626](https://github.com/1024pix/pix/pull/9626) [TECH] Déplace le fichier `lib/domain/errors.js` vers `src/shared/domain/`.
- [#9683](https://github.com/1024pix/pix/pull/9683) [TECH] Renommer les variables d'environnement du sondages PixOrga (PIX-13599).
- [#9666](https://github.com/1024pix/pix/pull/9666) [TECH] Déménagement des « jobs » vers `src`.
- [#9679](https://github.com/1024pix/pix/pull/9679) [TECH] Migration de la route /api/sessions/download-all-results/{token} vers certification/results (PIX-13578).
- [#9655](https://github.com/1024pix/pix/pull/9655) [TECH] Migration de la route /api/certification-candidates/{id}/end-assessment-by-supervisor vers session-management (PIX-13568).
- [#9635](https://github.com/1024pix/pix/pull/9635) [TECH] Migrer la route Admin Get Certification Centers (PIX-13561).

### :bug: Correction
- [#9699](https://github.com/1024pix/pix/pull/9699) [BUGFIX] Corriger les routes PATCH memberships/:id admin et non admin (PIX-13609).
- [#9659](https://github.com/1024pix/pix/pull/9659) [BUGFIX] Certains évenements de tracking Modulix renvoient `undefined` (PIX-13579).
- [#9687](https://github.com/1024pix/pix/pull/9687) [BUGFIX] Permettre le rechargement du bon model lors du changement d'organisation (PIX-13573).

### :arrow_up: Montée de version
- [#9694](https://github.com/1024pix/pix/pull/9694) [BUMP] Lock file maintenance (admin).
- [#9692](https://github.com/1024pix/pix/pull/9692) [BUMP] Lock file maintenance (api).
- [#9688](https://github.com/1024pix/pix/pull/9688) [BUMP] Update dependency ember-cli-deprecation-workflow to v3 (mon-pix).
- [#9681](https://github.com/1024pix/pix/pull/9681) [BUMP] Update dependency ember-cli-deprecation-workflow to v3 (certif).

## v4.187.0 (24/07/2024)


### :rocket: Amélioration
- [#9642](https://github.com/1024pix/pix/pull/9642) [FEATURE] MGO chatgpt finalisation.
- [#9663](https://github.com/1024pix/pix/pull/9663) [FEATURE] Afficher les noms de classes sur 2 lignes avec ellipse.
- [#9634](https://github.com/1024pix/pix/pull/9634) [FEATURE] Ajouter un espacement entre les différents banners sur PixOrga (PIX-13560).
- [#9569](https://github.com/1024pix/pix/pull/9569) [FEATURE] Mentionner les places occupées par des apprenants "anonyme" (PIX-13417).

### :building_construction: Tech
- [#9672](https://github.com/1024pix/pix/pull/9672) [TECH] Migration de la route POST /api/admin/memberships  (PIX-13570).
- [#9643](https://github.com/1024pix/pix/pull/9643) [TECH] Migration de la route /api/sessions/download-results/{token} vers certification/results (PIX-13562).
- [#9621](https://github.com/1024pix/pix/pull/9621) [TECH] Migration de la route /api/admin/certifications/{id}/details (PIX-13540).
- [#9654](https://github.com/1024pix/pix/pull/9654) [TECH] Migration de la route /api/certification-candidates/{id}/authorize-to-resume vers certification/session-management (PIX-13567).
- [#9638](https://github.com/1024pix/pix/pull/9638) [TECH] Migration de la route /api/sessions/{id}/certified-clea-candidate-data vers certification/results (PIX-13562).
- [#9649](https://github.com/1024pix/pix/pull/9649) [TECH] Migration de la route PATCH /api/admin/organizations/{id} (PIX-13559).
- [#9600](https://github.com/1024pix/pix/pull/9600) [TECH] Migration de la route /api/admin/complementary-certification-course-results vers src (PIX-13519).

### :arrow_up: Montée de version
- [#9680](https://github.com/1024pix/pix/pull/9680) [BUMP] Update dependency chai-as-promised to v8 (api).
- [#9677](https://github.com/1024pix/pix/pull/9677) [BUMP] Update dependency @formatjs/intl-locale to v4 (mon-pix).
- [#9664](https://github.com/1024pix/pix/pull/9664) [BUMP] Update dependency ember-eslint-parser to ^0.5.0 (orga).
- [#9652](https://github.com/1024pix/pix/pull/9652) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.11 (mon-pix).
- [#9661](https://github.com/1024pix/pix/pull/9661) [BUMP] Update dependency ember-eslint-parser to ^0.5.0 (admin).
- [#9662](https://github.com/1024pix/pix/pull/9662) [BUMP] Update dependency ember-eslint-parser to ^0.5.0 (certif).
- [#9653](https://github.com/1024pix/pix/pull/9653) [BUMP] Update node.
- [#9648](https://github.com/1024pix/pix/pull/9648) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.11 (junior).
- [#9647](https://github.com/1024pix/pix/pull/9647) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.11 (certif).
- [#9646](https://github.com/1024pix/pix/pull/9646) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.11 (admin).
- [#9645](https://github.com/1024pix/pix/pull/9645) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.7 (audit-logger).
- [#9639](https://github.com/1024pix/pix/pull/9639) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.11 (orga).
- [#9636](https://github.com/1024pix/pix/pull/9636) [BUMP] Update dependency @1024pix/ember-testing-library to ^3.0.2 (mon-pix).
- [#9637](https://github.com/1024pix/pix/pull/9637) [BUMP] Update dependency @1024pix/ember-testing-library to ^3.0.2 (orga).

## v4.186.0 (23/07/2024)


### :rocket: Amélioration
- [#9611](https://github.com/1024pix/pix/pull/9611) [FEATURE] Découper l'import FREGATA en trois (PIX-11946).
- [#9627](https://github.com/1024pix/pix/pull/9627) [FEATURE] Ne pas afficher le bandeau de téléchargement pour les Import Onde (PIX-13539).
- [#9625](https://github.com/1024pix/pix/pull/9625) [FEATURE] Ajouter un message d'alerte quand l'utilisateur ne saisit qu'une réponse dans un QCM. (Pix-13380).
- [#9623](https://github.com/1024pix/pix/pull/9623) [FEATURE] Ajouter dans le didacticiel un simulateur avec auto-complétion (PIX-13093).
- [#9580](https://github.com/1024pix/pix/pull/9580) [FEATURE] Supprimer les demandes de resets de password à l'anoymisation (PIX-11580).
- [#9488](https://github.com/1024pix/pix/pull/9488) [FEATURE] Afficher un simulateur dans Modulix (PIX-13092).
- [#9608](https://github.com/1024pix/pix/pull/9608) [FEATURE] Ajout de 2 catégories aux Profiles Cibles (PIX-13511).

### :building_construction: Tech
- [#9619](https://github.com/1024pix/pix/pull/9619) [TECH] Migrer la route POST /api/organizations/{id}/invitations dans src/team (PIX-13527).
- [#9617](https://github.com/1024pix/pix/pull/9617) [TECH] Migration de la route /api/sessions/{id}/candidates-import-sheet vers certification/enrolment (PIX-13532).
- [#9618](https://github.com/1024pix/pix/pull/9618) [TECH] Migrer la route PATCH admin-members/:id/deactivate (PIX-13541).
- [#9586](https://github.com/1024pix/pix/pull/9586) [TECH] Déplacement de plusieurs erreurs concernant l'utilisateur vers `src`.
- [#9601](https://github.com/1024pix/pix/pull/9601) [TECH] Migrer la route POST /api/certification-candidates/{id}/authorize-to-start (PIX-13520).
- [#9603](https://github.com/1024pix/pix/pull/9603) [TECH] Migrer la route PATCH  /api/admin/admin-members/{id} (PIX-13515 ).
- [#9605](https://github.com/1024pix/pix/pull/9605) [TECH] Migration de la route /api/admin/sessions/{id} vers certification/session-management (PIX-13526).
- [#9604](https://github.com/1024pix/pix/pull/9604) [TECH] Migration de la route admin/sessions vers /certification/session-management (PIX-13526).
- [#9598](https://github.com/1024pix/pix/pull/9598) [TECH] Planifier des rescoring de certifications (PIX-13444).
- [#9599](https://github.com/1024pix/pix/pull/9599) [TECH] Déplacer des fichiers isolés vers src/shared (PIX-13516).
- [#9584](https://github.com/1024pix/pix/pull/9584) [TECH] Déplace `YamlParsingError` vers les erreurs partagées de `src`.

### :arrow_up: Montée de version
- [#9633](https://github.com/1024pix/pix/pull/9633) [BUMP] Update dependency @1024pix/ember-testing-library to ^3.0.2 (certif).
- [#9632](https://github.com/1024pix/pix/pull/9632) [BUMP] Update dependency @1024pix/ember-testing-library to ^3.0.2 (admin).
- [#9630](https://github.com/1024pix/pix/pull/9630) [BUMP] Update dependency @1024pix/ember-testing-library to ^3.0.2 (junior).
- [#9622](https://github.com/1024pix/pix/pull/9622) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.10 (admin).
- [#9615](https://github.com/1024pix/pix/pull/9615) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.10 (mon-pix).
- [#9614](https://github.com/1024pix/pix/pull/9614) [BUMP] Update dependency ember-eslint-parser to ^0.5.0 (mon-pix).
- [#9612](https://github.com/1024pix/pix/pull/9612) [BUMP] Update dependency @1024pix/ember-testing-library to v3 (mon-pix).
- [#9610](https://github.com/1024pix/pix/pull/9610) [BUMP] Update dependency @1024pix/ember-testing-library to v3 (certif).
- [#9607](https://github.com/1024pix/pix/pull/9607) [BUMP] Update dependency @1024pix/ember-testing-library to v3 (orga).
- [#9606](https://github.com/1024pix/pix/pull/9606) [BUMP] Update dependency @1024pix/ember-testing-library to v3 (junior).

## v4.185.0 (19/07/2024)


### :rocket: Amélioration
- [#9215](https://github.com/1024pix/pix/pull/9215) [FEATURE] Création du module ChatGPT parle-t-il vraiment français ?.
- [#9581](https://github.com/1024pix/pix/pull/9581) [FEATURE] Ajout de la bannière d'enquête utilisateur (pix-12693).
- [#9590](https://github.com/1024pix/pix/pull/9590) [FEATURE] Corrections de traductions ES (PIX-13523).
- [#9576](https://github.com/1024pix/pix/pull/9576) [FEATURE] Effacer l'email quand un utilisateur est anonymisé (PIX-4219).
- [#9593](https://github.com/1024pix/pix/pull/9593) [FEATURE] Changement de robot sur la page d'erreur lors d'une session inactive (Pix-13498).
- [#9578](https://github.com/1024pix/pix/pull/9578) [FEATURE] Remplacement du wording coté orga, sur la page missions (Pix-13492).
- [#9585](https://github.com/1024pix/pix/pull/9585) [FEATURE] Ajoute un temps minimal à l'import pour que l'utilisateur voit le loader (PIX-13437).

### :building_construction: Tech
- [#9574](https://github.com/1024pix/pix/pull/9574) [TECH] Enregistrer des jobs lors du lancement de script de scoring (PIX-13443).
- [#9583](https://github.com/1024pix/pix/pull/9583) [TECH] Déplace `UserNotFoundError` vers `src`.
- [#9594](https://github.com/1024pix/pix/pull/9594) [TECH] Migration de la route /api/admin/sessions/with-required-action vers src (PIX-13503).
- [#9591](https://github.com/1024pix/pix/pull/9591) [TECH] Déplacer les appels LCMS dans le dossier src/shared (PIX-13510).
- [#9597](https://github.com/1024pix/pix/pull/9597) [TECH] Migrer la route POST /api/users/{id}/update-email vers src.
- [#9566](https://github.com/1024pix/pix/pull/9566) [TECH] Migration de la route GET subscriptions vers le contexte enrolment (PIX-13491).
- [#9582](https://github.com/1024pix/pix/pull/9582) [TECH] Migration de la route /api/admin/sessions/to-publish vers src (PIX-13497).

### :bug: Correction
- [#9589](https://github.com/1024pix/pix/pull/9589) [BUGFIX] Utiliser "acceptedFormat" pour le message d'erreur de la date quand celui-ci est founi (PIX-13507).

### :arrow_up: Montée de version
- [#9564](https://github.com/1024pix/pix/pull/9564) [BUMP] Update dependency qs to v6.12.3 (api).
- [#9602](https://github.com/1024pix/pix/pull/9602) [BUMP] Update dependency @1024pix/ember-testing-library to v3 (admin).
- [#9596](https://github.com/1024pix/pix/pull/9596) [BUMP] Update dependency @1024pix/ember-testing-library to ^2.0.8 (junior).
- [#9571](https://github.com/1024pix/pix/pull/9571) [BUMP] Update dependency ember-source to ~5.10.0 (junior).
- [#9587](https://github.com/1024pix/pix/pull/9587) [BUMP] Update dependency @1024pix/ember-testing-library to v2 (mon-pix).
- [#9302](https://github.com/1024pix/pix/pull/9302) [BUMP] Update dependency @1024pix/ember-testing-library to v2 (admin).

## v4.184.0 (18/07/2024)


### :rocket: Amélioration
- [#9490](https://github.com/1024pix/pix/pull/9490) [FEATURE] Création d'un mécanisme de correspondance des claims OIDC (PIX-13167).
- [#9511](https://github.com/1024pix/pix/pull/9511) [FEATURE] Permettre de télécharger le template de fichier d'import depuis PixOrga (PIX-13410).
- [#9509](https://github.com/1024pix/pix/pull/9509) [FEATURE] Ajout d'un FT pour la déclaration d'un besoin d'aménagement pour un candidat (PIX-13292).

### :building_construction: Tech
- [#9575](https://github.com/1024pix/pix/pull/9575) [TECH] Remplacer la dépendance `oppsy` par notre fork.
- [#9525](https://github.com/1024pix/pix/pull/9525) [TECH] Migration du preHandler `user-existence-verification` vers `src` (PIX-13445).
- [#9537](https://github.com/1024pix/pix/pull/9537) [TECH] migrer la route api/admin/admin-members/me dans src (PIX-13455).
- [#9570](https://github.com/1024pix/pix/pull/9570) [TECH] Déplacer les utilitaires vers src/shared (PIX-13489).
- [#9567](https://github.com/1024pix/pix/pull/9567) [TECH] Migration de la route api/shared-certifications (PIX-13487).
- [#9542](https://github.com/1024pix/pix/pull/9542) [TECH] Migration de la route /api/sessions/{id}/enrol-students-to-session vers certification/enrolment (PIX-13460).
- [#9560](https://github.com/1024pix/pix/pull/9560) [TECH] Migrer healthcheck vers le dossier src shared (PIX-13484).
- [#9573](https://github.com/1024pix/pix/pull/9573) [TECH] Migrer la route PUT api/users/{id}/email/verification-code (PIX-13470).
- [#9541](https://github.com/1024pix/pix/pull/9541) [TECH] Migrer la route GET /api/admin/organizations/{id} (PIX-13461).
- [#9543](https://github.com/1024pix/pix/pull/9543) [TECH] Migration de la route api/certifications/:id vers src (PIX-13468).
- [#9538](https://github.com/1024pix/pix/pull/9538) [TECH] Remplacer la locale "en-gb" obsolète par "en" (PIX-13458).

### :bug: Correction
- [#9539](https://github.com/1024pix/pix/pull/9539) [BUGFIX] Corrige un bug empêchant de modifier les organisations ayant la feature d'import (PIX-13457).
- [#9562](https://github.com/1024pix/pix/pull/9562) [BUGFIX] Mettre à jour la date de fin de la session lors de sa prolongation (PIX-13412).

### :arrow_up: Montée de version
- [#9579](https://github.com/1024pix/pix/pull/9579) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.6 (mon-pix).
- [#9577](https://github.com/1024pix/pix/pull/9577) [BUMP] Update dependency @1024pix/eslint-plugin to ^1.3.1 (api).

### :coffee: Autre
- [#9565](https://github.com/1024pix/pix/pull/9565) [FEATURES] Ajout de la bannière informative (Pix-13379).

## v4.183.0 (17/07/2024)


### :rocket: Amélioration
- [#9503](https://github.com/1024pix/pix/pull/9503) [FEATURE] Mise à jour de la formule de scoring V3 (PIX-13399).
- [#9513](https://github.com/1024pix/pix/pull/9513) [FEATURE] Ne plus inclure le user id dans les champs NOM et PRENOM lors de l'anonymisation d'un utilisateur.
- [#9533](https://github.com/1024pix/pix/pull/9533) [FEATURE] Utiliser un timestamp pour la clé du badge dupliqué (PIX-13453).

### :building_construction: Tech
- [#9540](https://github.com/1024pix/pix/pull/9540) [TECH] Migrer la route GET api/admin/certification-center/{id}/invitations dans src (PIX-13459).
- [#9529](https://github.com/1024pix/pix/pull/9529) [TECH] Migration de la route /api/certifications vers src (PIX-13427).
- [#9536](https://github.com/1024pix/pix/pull/9536) [TECH] Ajout d'un tri sur la liste des formats acceptés pour mettre en valeur l'utf-8 (Pix-13454).
- [#9546](https://github.com/1024pix/pix/pull/9546) [TECH] Migrer le prehandler d'autorisation d'accès aux certifications dans le contexte certification (PIX-13463).
- [#9512](https://github.com/1024pix/pix/pull/9512) [TECH] Passer le layout en .gjs (PIX-13414).
- [#9469](https://github.com/1024pix/pix/pull/9469) [TECH] Passer la page de connexion à l'espace surveillant en .gjs (PIX-13332).
- [#9535](https://github.com/1024pix/pix/pull/9535) [TECH] Migration de la route /api/countries vers /certification/enrolment (PIX-13450).
- [#9545](https://github.com/1024pix/pix/pull/9545) [TECH] Mettre a jour les droits d'acces sur le simulateur (PIX-13473).

### :bug: Correction
- [#9524](https://github.com/1024pix/pix/pull/9524) [BUGFIX] Rediriger vers la mire d'inscription pour les imports générique de type SCO (PIX-13446).
- [#9556](https://github.com/1024pix/pix/pull/9556) [BUGFIX] Corriger l'initializer custom-inflector-rules dans Pix Admin.

### :arrow_up: Montée de version
- [#9563](https://github.com/1024pix/pix/pull/9563) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.6 (orga).
- [#9561](https://github.com/1024pix/pix/pull/9561) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.7 (orga).
- [#9558](https://github.com/1024pix/pix/pull/9558) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.7 (mon-pix).
- [#9557](https://github.com/1024pix/pix/pull/9557) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.7 (load-testing).
- [#9555](https://github.com/1024pix/pix/pull/9555) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.7 (dossier racine).
- [#9554](https://github.com/1024pix/pix/pull/9554) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.7 (certif).
- [#9553](https://github.com/1024pix/pix/pull/9553) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.7 (admin).
- [#9552](https://github.com/1024pix/pix/pull/9552) [BUMP] Update dependency @1024pix/ember-testing-library to ^2.0.7 (orga).
- [#9551](https://github.com/1024pix/pix/pull/9551) [BUMP] Update dependency @1024pix/ember-testing-library to ^2.0.7 (certif).
- [#9534](https://github.com/1024pix/pix/pull/9534) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.6 (certif).
- [#9549](https://github.com/1024pix/pix/pull/9549) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.7 (junior).
- [#9531](https://github.com/1024pix/pix/pull/9531) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.6 (admin).
- [#9550](https://github.com/1024pix/pix/pull/9550) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.6 (junior).
- [#9548](https://github.com/1024pix/pix/pull/9548) [BUMP] Update dependency @1024pix/ember-testing-library to ^2.0.7 (junior).

## v4.182.0 (16/07/2024)


### :rocket: Amélioration
- [#9478](https://github.com/1024pix/pix/pull/9478) [FEATURE] Finaliser l'ajout des traduction en NL dans Pix Orga (PIX-13240).
- [#9505](https://github.com/1024pix/pix/pull/9505) [FEATURE] Ajout d'une description à PixOrga et autorisation du passage des google Bots (PIX-12633).
- [#9476](https://github.com/1024pix/pix/pull/9476) [FEATURE] Copier les badges, leurs critères et les paliers d'un profil cible lors de la duplication (PIX-13233).

### :building_construction: Tech
- [#9528](https://github.com/1024pix/pix/pull/9528) [TECH] Ne pas lever d'exception lors du lancement des seeds si le référentiel contient un acquis sans épreuve fr-fr validée (PIX-13451).
- [#9516](https://github.com/1024pix/pix/pull/9516) [TECH] Migrer la route "get course" dans le dossier shared (PIX-13424).
- [#9522](https://github.com/1024pix/pix/pull/9522) [TECH] Migrer le prehandler assessment authorization (PIX-13442).
- [#9521](https://github.com/1024pix/pix/pull/9521) [TECH] Correctifs de problèmes mineurs constatés lors de la migration Bounded Context (PIX-13441).
- [#9523](https://github.com/1024pix/pix/pull/9523) [TECH] Migrer la route /api/admin/complementary-certifications/attachable-target-profiles vers configuration (PIX-13438).
- [#9517](https://github.com/1024pix/pix/pull/9517) [TECH] Créer le context configuration et migrer la route api/admin/complementary-certifications (PIX-13415).
- [#9526](https://github.com/1024pix/pix/pull/9526) [TECH] Migrer GET /api/certification-centers/{certificationCenterId}/invitations vers src/team (PIX-13440).
- [#9519](https://github.com/1024pix/pix/pull/9519) [TECH] Migrer la route GET api/admin/admin-members (PIX-13420).
- [#9520](https://github.com/1024pix/pix/pull/9520) [TECH] Mise à jour de la doc prescription.
- [#9527](https://github.com/1024pix/pix/pull/9527) [TECH] Migrer le dossier feature toggles et le fichier config (PIX-13447).
- [#9530](https://github.com/1024pix/pix/pull/9530) [TECH] Supprime des messages d'avertissements d'obsolescence dans Pix Admin.

### :bug: Correction
- [#9532](https://github.com/1024pix/pix/pull/9532) [BUGFIX] Placer la meta description dans la balise head.
- [#9510](https://github.com/1024pix/pix/pull/9510) [BUGFIX] PixCompanion : Le ping n’est pas enregistré sur le bon CertificationCandidate (PIX-13341).
- [#9515](https://github.com/1024pix/pix/pull/9515) [BUGFIX] Ajouter la clef oubliée de traduction pour le label de réinitialisation du simulateur (PIX-13425).

### :arrow_up: Montée de version
- [#9495](https://github.com/1024pix/pix/pull/9495) [BUMP] Update dependency ember-intl to v7 (orga) (PIX-13407).
- [#9338](https://github.com/1024pix/pix/pull/9338) [BUMP] Lock file maintenance (admin).

## v4.181.0 (15/07/2024)


### :rocket: Amélioration
- [#9518](https://github.com/1024pix/pix/pull/9518) [FEATURE] Autoriser l'import d'élèves depuis ONDE uniquement pour les élèves du 3ème cycle et dont le niveau est CM1 ou CM2 (PIX-13123).
- [#9514](https://github.com/1024pix/pix/pull/9514) [FEATURE] MAJ des trads NL suite au contrôle de l'agence (PIX-13418).
- [#9486](https://github.com/1024pix/pix/pull/9486) [FEATURE] Migrer la route POST api/admin-members dans src/team (PIX-13366).
- [#9447](https://github.com/1024pix/pix/pull/9447) [FEATURE] Migrer la route GET /api/password-reset-demands/{temporaryKey} vers src/identity-access-management (PIX-12749).
- [#9496](https://github.com/1024pix/pix/pull/9496) [FEATURE] Ajout de filtre sur les Prénom/Nom des élèves d'une mission (Pix-11917).

### :building_construction: Tech
- [#9499](https://github.com/1024pix/pix/pull/9499) [TECH] Reprendre quelques points du code de l'anonymisation GAR (PIX-13175).
- [#9489](https://github.com/1024pix/pix/pull/9489) [TECH] Création du contexte certification/results (PIX-13072).
- [#9465](https://github.com/1024pix/pix/pull/9465) [TECH] Rendre accessible les écrans d'instruction (PIX-11847).
- [#9482](https://github.com/1024pix/pix/pull/9482) [TECH] Migration GET /api/organizations/{id}/invitations (PIX-13368) .
- [#9395](https://github.com/1024pix/pix/pull/9395) [TECH] Seuls les pilotes V3 pourront être pilotes séparation Pix/Pix+ (PIX-13171).

### :bug: Correction
- [#9508](https://github.com/1024pix/pix/pull/9508) [BUGFIX] Remplacer la balise `a` par le composant de routing `LinkTo` (PIX-13283).
- [#9479](https://github.com/1024pix/pix/pull/9479) [BUGFIX] Corriger l'ajout de plusieurs candidats à la certif complémentaire par la modale (PIX-13286).

### :arrow_up: Montée de version
- [#9506](https://github.com/1024pix/pix/pull/9506) [BUMP] Update dependency qs to v6.12.2 (api).

## v4.180.0 (12/07/2024)


### :bug: Correction
- [#9504](https://github.com/1024pix/pix/pull/9504) [BUGFIX] Afficher le propriétaire seulement dans la page `all-campaigns` (PIX-13402).
- [#9498](https://github.com/1024pix/pix/pull/9498) [BUGFIX] Ajout d'une icône manquante sur l'espace surveillant sur Pix Certif.

### :arrow_up: Montée de version
- [#9507](https://github.com/1024pix/pix/pull/9507) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.1 (certif).
- [#9501](https://github.com/1024pix/pix/pull/9501) [BUMP] Update dependency redis to v7.2.5.

## v4.179.0 (12/07/2024)


### :rocket: Amélioration
- [#9463](https://github.com/1024pix/pix/pull/9463) [FEATURE] Permet la suppression de campagnes depuis PixOrga (PIX-13226).
- [#9417](https://github.com/1024pix/pix/pull/9417) [FEATURE] Mettre à jour le contenu de l'email "Création de compte" (PIX-12924).
- [#9473](https://github.com/1024pix/pix/pull/9473) [FEATURE] Corrections dans le footer de Pix-App (pix-13335).
- [#9487](https://github.com/1024pix/pix/pull/9487) [FEATURE] Renomme le bouton "Je passe" en "Je ne sais pas" (PIX-13381).
- [#9470](https://github.com/1024pix/pix/pull/9470) [FEATURE] ajoute la configuration de l'import sco fwb (Pix-12759).
- [#9483](https://github.com/1024pix/pix/pull/9483) [FEATURE] Redirection sur la page d'accueil si l'utilisateur est en mode Preview (pix-13147).
- [#9480](https://github.com/1024pix/pix/pull/9480) [FEATURE] Permettre de récupérer un espace Pix Orga pour une orga de type SCO 1D (Pix-13141).
- [#9481](https://github.com/1024pix/pix/pull/9481) [FEATURE] Pouvoir consommer des éléments `embed` sans complétion requise (PIX-13090).
- [#9477](https://github.com/1024pix/pix/pull/9477) [FEATURE] Enlever les 20px supplémentaires sur la hauteur auto d'embed (PIX-13354).
- [#9455](https://github.com/1024pix/pix/pull/9455) [FEATURE] Ajouter l'auto-scroll au `Stepper` (PIX-13201).
- [#9475](https://github.com/1024pix/pix/pull/9475) [FEATURE] Changement des seeds pour permettre de developper en local sans activer la session (Pix-13342).

### :building_construction: Tech
- [#9453](https://github.com/1024pix/pix/pull/9453) [TECH] Éviter la purge de la table certification-center-features lors de l'éxécution du script d'ajout de centre pilote pour la séparation (PIX-13280).

### :bug: Correction
- [#9484](https://github.com/1024pix/pix/pull/9484) [BUGFIX] Aficher les catégories de profiles cibles lors de la duplication d'une campagne (PIX-13265).
- [#9422](https://github.com/1024pix/pix/pull/9422) [BUGFIX] Rafraichir le cache LCMS en asynchrone (pgboss).

### :arrow_up: Montée de version
- [#9502](https://github.com/1024pix/pix/pull/9502) [BUMP] Update Node.js to v20.15.0.
- [#9500](https://github.com/1024pix/pix/pull/9500) [BUMP] Update dependency npm-run-all2 to v6.2.2 (e2e).
- [#9494](https://github.com/1024pix/pix/pull/9494) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.16 (orga).
- [#9493](https://github.com/1024pix/pix/pull/9493) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.16 (mon-pix).
- [#9492](https://github.com/1024pix/pix/pull/9492) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.16 (certif).
- [#9491](https://github.com/1024pix/pix/pull/9491) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.16 (admin).
- [#9352](https://github.com/1024pix/pix/pull/9352) [BUMP] Update dependency @1024pix/pix-ui to ^46.11.7 (orga).

## v4.178.0 (09/07/2024)


### :rocket: Amélioration
- [#9464](https://github.com/1024pix/pix/pull/9464) [FEATURE] Ajouter le pied de page avec les mentions légales et les mentions de protection des données des élèves sur Pix Junior (PIX-13137).
- [#9468](https://github.com/1024pix/pix/pull/9468) [FEATURE] Updated translations from Phrase (PIX-13331).
- [#9385](https://github.com/1024pix/pix/pull/9385) [FEATURE] Ajout d'un formulaire pour la création d'une configuration de déroulé V3 (PIX-13065).
- [#9445](https://github.com/1024pix/pix/pull/9445) [FEATURE] Ajouter dans le didacticiel un embed sans complétion requise (PIX-13091).
- [#9458](https://github.com/1024pix/pix/pull/9458) [FEATURE] Ajout d'une bordure à gauche des feedbacks (PIX-13261).

### :building_construction: Tech
- [#9474](https://github.com/1024pix/pix/pull/9474) [TECH] Ajout des locales es et nl dans la config i18n de l'API.
- [#9444](https://github.com/1024pix/pix/pull/9444) [TECH] Migrer la route DELETE /api/organizations/{id}/invitations/{organizationInvitationId} et /api/admin/organizations/{id}/invitations/{organizationInvitationId} dans src/team (PIX-13262).

### :bug: Correction
- [#9466](https://github.com/1024pix/pix/pull/9466) [BUGFIX] Ajouter les validations Joi sur les routes pour lesquelles il en manquait.
- [#9467](https://github.com/1024pix/pix/pull/9467) [BUGFIX] Correction de la configuration de l'import onde (pix-13324).

### :arrow_up: Montée de version
- [#9471](https://github.com/1024pix/pix/pull/9471) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.6 (orga).

## v4.177.0 (08/07/2024)


### :rocket: Amélioration
- [#9456](https://github.com/1024pix/pix/pull/9456) [FEATURE] Autoriser l'accès à Pix Junior seulement si une session est active.
- [#9406](https://github.com/1024pix/pix/pull/9406) [FEATURE] Lancement et hauteur automatiques d'embed (PIX-13211).
- [#9449](https://github.com/1024pix/pix/pull/9449) [FEATURE] Ajouter la fonctionnalité d'import ONDE aux organisations ajoutées depuis le script de création en masse (PIX-12563).
- [#9443](https://github.com/1024pix/pix/pull/9443) [FEATURE] Enregistrer la confirmation de lecture des écrans d'instructions sur Pix App (PIX-12907).
- [#9342](https://github.com/1024pix/pix/pull/9342) [FEATURE] [FRONT] Permettre de se réconcilier à une organization ayant l'import générique (PIX-12559).
- [#9414](https://github.com/1024pix/pix/pull/9414) [FEATURE][BACK] Exposer les meta données pour la reconciliation des imports à format (PIX-13234).
- [#9359](https://github.com/1024pix/pix/pull/9359) [FEATURE] Suppression de l'utilisation du composant "Tag compact" (PIX-11127).
- [#9326](https://github.com/1024pix/pix/pull/9326) [FEATURE] Afficher les erreurs front lors d'un probleme d'acces à une certification (PIX-13218).
- [#9383](https://github.com/1024pix/pix/pull/9383) [FEATURE] Ajoute un endpoint pour supprimer des campagnes d'une organisation (PIX-12689).
- [#8714](https://github.com/1024pix/pix/pull/8714) [FEATURE] Afficher dans le portail surveillant les appels sur /api/companion/ping (PIX-12028).
- [#9415](https://github.com/1024pix/pix/pull/9415) [FEATURE] Mise à jour du style des QCU et QCM dans Pix Junior (Pix-12913).
- [#9389](https://github.com/1024pix/pix/pull/9389) [FEATURE] Permettre de valider l'adresse e-mail d'un compte utilisateur lors de son inscription via un lien de validation (PIX-11653).

### :building_construction: Tech
- [#9426](https://github.com/1024pix/pix/pull/9426) [TECH] Passer la page de détails d'une session en .gjs (PIX-13251).
- [#9416](https://github.com/1024pix/pix/pull/9416) [TECH] Améliorer le parsing et la validation des query parameters côté API.
- [#9448](https://github.com/1024pix/pix/pull/9448) [TECH] Création d'un centre de certification v3 pilote de la séparation pix/pix+ (PIX-13172).
- [#9446](https://github.com/1024pix/pix/pull/9446) [TECH] Utilisation de crypto.randomBytes de manière asynchrone.
- [#9452](https://github.com/1024pix/pix/pull/9452) [TECH] Creer un composant modale de suppression générique (PIX-13284).
- [#8649](https://github.com/1024pix/pix/pull/8649) [TECH] Envoyer un postMessage au demarrage d'une certification (PIX-12115).
- [#9340](https://github.com/1024pix/pix/pull/9340) [TECH] Revoir la méthode pour créer/mettre à jour des organization-learners lors de l'import (PIX-13242).
- [#9424](https://github.com/1024pix/pix/pull/9424) [TECH] Sortie des pods pour Pix Junior (Pix-13255).
- [#9337](https://github.com/1024pix/pix/pull/9337) [TECH] Créer la route pour enregistrer la confirmation de lecture des écrans d'instructions (PIX-12901).
- [#9423](https://github.com/1024pix/pix/pull/9423) [TECH] Ajoute la domainTransaction dans le AsyncLocalStorage (PIX-13257).

### :arrow_up: Montée de version
- [#9462](https://github.com/1024pix/pix/pull/9462) [BUMP] Lock file maintenance (api).
- [#9461](https://github.com/1024pix/pix/pull/9461) [BUMP] Update dependency @1024pix/ember-testing-library to ^2.0.6 (orga).
- [#9460](https://github.com/1024pix/pix/pull/9460) [BUMP] Update dependency @1024pix/ember-testing-library to ^2.0.6 (junior).
- [#9459](https://github.com/1024pix/pix/pull/9459) [BUMP] Update dependency @1024pix/ember-testing-library to ^2.0.6 (certif).
- [#9441](https://github.com/1024pix/pix/pull/9441) [BUMP] Update dependency @1024pix/pix-ui to ^46.12.1 (junior).

## v4.176.0 (04/07/2024)


### :rocket: Amélioration
- [#9432](https://github.com/1024pix/pix/pull/9432) [FEATURE] Ajout des prétrads NL sur PixOrga (PIX-12921).
- [#9433](https://github.com/1024pix/pix/pull/9433) [FEATURE] Ajout de la traduction en anglais pour les écrans d'instruction (PIX-13214).
- [#9409](https://github.com/1024pix/pix/pull/9409) [FEATURE] Traduction en EN de la page de réconcilation SSO.

### :building_construction: Tech
- [#9419](https://github.com/1024pix/pix/pull/9419) [TECH] Passer la page des mentions légales en .gjs [PIX-13246].
- [#9427](https://github.com/1024pix/pix/pull/9427) [TECH] Migrer plusieurs composants de PixOrga vers GJS (PIX-13250).
- [#9413](https://github.com/1024pix/pix/pull/9413) [TECH] Utiliser des `factory` pour les `Modules` et les `Elements` répondables (PIX-12457).

### :arrow_up: Montée de version
- [#9442](https://github.com/1024pix/pix/pull/9442) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.16 (junior).
- [#9440](https://github.com/1024pix/pix/pull/9440) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.6 (mon-pix).
- [#9439](https://github.com/1024pix/pix/pull/9439) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.6 (load-testing).
- [#9438](https://github.com/1024pix/pix/pull/9438) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.6 (junior).
- [#9437](https://github.com/1024pix/pix/pull/9437) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.6 (dossier racine).
- [#9436](https://github.com/1024pix/pix/pull/9436) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.6 (certif).
- [#9435](https://github.com/1024pix/pix/pull/9435) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.6 (audit-logger).
- [#9434](https://github.com/1024pix/pix/pull/9434) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.6 (admin).

## v4.175.0 (03/07/2024)


### :rocket: Amélioration
- [#9392](https://github.com/1024pix/pix/pull/9392) [FEATURE] Autoriser les centres V3 comme pilote de séparation Pix/Pix+ (PIX-13170).
- [#9401](https://github.com/1024pix/pix/pull/9401) [FEATURE] Traduction du message "E-mail vérifié" dans Mon Compte (PIX-13109).
- [#9397](https://github.com/1024pix/pix/pull/9397) [FEATURE] Modification du lien de contact support sur la page de récupération du compte (PIX-13145).

### :building_construction: Tech
- [#9420](https://github.com/1024pix/pix/pull/9420) [TECH] Monter à la version 46.10.8 de pix-ui (PIX-13247).
- [#9408](https://github.com/1024pix/pix/pull/9408) [TECH] Supprimer les warnings des dépréciations pour la v6.0 de Ember-Data (PIX-13216).

### :arrow_up: Montée de version
- [#9431](https://github.com/1024pix/pix/pull/9431) [BUMP] Update dependency @1024pix/ember-testing-library to ^2.0.5 (orga).
- [#9430](https://github.com/1024pix/pix/pull/9430) [BUMP] Update dependency @1024pix/ember-testing-library to ^2.0.5 (junior).
- [#9429](https://github.com/1024pix/pix/pull/9429) [BUMP] Update dependency @1024pix/ember-testing-library to ^2.0.5 (certif).
- [#9428](https://github.com/1024pix/pix/pull/9428) [BUMP] Update dependency @1024pix/pix-ui to ^46.11.7 (PIX-13220).
- [#9421](https://github.com/1024pix/pix/pull/9421) [BUMP] Update dependency node to v20.15.0.

### :coffee: Autre
- [#9393](https://github.com/1024pix/pix/pull/9393) Updated translations from Phrase.

## v4.174.0 (01/07/2024)


### :rocket: Amélioration
- [#9277](https://github.com/1024pix/pix/pull/9277) [FEATURE] Permettre la duplication de profils cible dans admin (PIX-12949).
- [#9410](https://github.com/1024pix/pix/pull/9410) [FEATURE] Afficher les résultats dernier passage terminé, et s'il n'y en a pas, alors afficher le statut du passage en cours (Pix-13144).
- [#9358](https://github.com/1024pix/pix/pull/9358) [FEATURE] Ajouter un filtre sur les classes (Pix-11916).
- [#9407](https://github.com/1024pix/pix/pull/9407) [FEATURE] Update le texte informatif sur le repasser/RAZ en fin de parcours .

### :building_construction: Tech
- [#9343](https://github.com/1024pix/pix/pull/9343) [TECH] Déplacer les étapes du tutoriel de campagne dans un composant spécifique (PIX-12447).
- [#9375](https://github.com/1024pix/pix/pull/9375) [TECH] Conversion de la modale d'ajout de candidat dans le format template tag (PIX-13168).
- [#9403](https://github.com/1024pix/pix/pull/9403) [TECH] Retirer les placeholders des champs de connexion sur Pix Admin (PIX-13209).
- [#9391](https://github.com/1024pix/pix/pull/9391) [TECH] Passer la page d'affichage de la liste des sessions en .gjs (PIX-13149).
- [#9396](https://github.com/1024pix/pix/pull/9396) [TECH] Remove now unused scripts (PIX-12979).

### :bug: Correction
- [#9388](https://github.com/1024pix/pix/pull/9388) [BUGFIX] Retourner une erreur lorsqu'on tente de modifier une clé de badge par une clé existante (PIX-13191).
- [#9308](https://github.com/1024pix/pix/pull/9308) [BUGFIX] Correction du script de configuration.

### :arrow_up: Montée de version
- [#9404](https://github.com/1024pix/pix/pull/9404) [BUMP] Update dependency @1024pix/ember-testing-library to ^2.0.4 (certif).
- [#9399](https://github.com/1024pix/pix/pull/9399) [BUMP] Update dependency ember-resolver to v12 (certif).

## v4.173.0 (28/06/2024)


### :rocket: Amélioration
- [#9400](https://github.com/1024pix/pix/pull/9400) [FEATURE] Augmentation de la taille maximale de la payload pour la route /api/audit-log (PIX-13204).
- [#9390](https://github.com/1024pix/pix/pull/9390) [FEATURE] Améliorer l'accéssibilité du Stepper dans Modulix (PIX-12866).

### :building_construction: Tech
- [#9377](https://github.com/1024pix/pix/pull/9377) [TECH] Migrer la route POST /api/revoke vers src/identity-access-management (PIX-13121).
- [#9368](https://github.com/1024pix/pix/pull/9368) [TECH] Migrer la route PATCH /api/users/{id}/has-seen-last-data-protection-policy-information vers src/identity-access-management (PIX-13120).
- [#9364](https://github.com/1024pix/pix/pull/9364) [TECH] Migrer la route PATCH /api/users/{id}/lang/{lang} vers src/identity-access-management (PIX-13119).
- [#9367](https://github.com/1024pix/pix/pull/9367) [TECH] Migrer la route DELETE /api/certification-center-invitations/{certificationCenterInvitationId} vers team (PIX-13160)(PIX-13085).

### :bug: Correction
- [#9387](https://github.com/1024pix/pix/pull/9387) [BUGFIX] Ajouter la notion de pilote à la séparation pix / pix+ dans les accès autorisés d'un centre de certification (PIX-13169).
- [#9394](https://github.com/1024pix/pix/pull/9394) [BUGFIX] Corriger le clignotement sur le bouton `Continuer` des grains (PIX-13097)(PIX-12362).

## v4.172.0 (27/06/2024)


### :rocket: Amélioration
- [#9386](https://github.com/1024pix/pix/pull/9386) [FEATURE] Ajouter les règles de validation du Stepper (PIX-13143).
- [#9380](https://github.com/1024pix/pix/pull/9380) [FEATURE] Ajout de filtre dans organization-learner-api (Pix-13162).
- [#9384](https://github.com/1024pix/pix/pull/9384) [FEATURE] Spanish and Dutch translation from Phrase (PIX-13056).
- [#9379](https://github.com/1024pix/pix/pull/9379) [FEATURE] Enregistrer le click sur le bouton suivant dans un Stepper sur Matomo (PIX-12857).
- [#9363](https://github.com/1024pix/pix/pull/9363) [FEATURE] Appeler l'Audit-logger lors de l'anonymisation GAR (PIX-12807).
- [#9339](https://github.com/1024pix/pix/pull/9339) [FEATURE] CSS review pour les Stepper (PIX-12838).

### :building_construction: Tech
- [#9378](https://github.com/1024pix/pix/pull/9378) [TECH] Corrige un test flaky dans Certif (PIX-13179).
- [#9288](https://github.com/1024pix/pix/pull/9288) [TECH] Corrige le code pour suivre la règle de lint no-builtin-form-components.
- [#9366](https://github.com/1024pix/pix/pull/9366) [TECH] Mutualise les règles métier de la campagne dans l'API (PIX-13154).
- [#9362](https://github.com/1024pix/pix/pull/9362) [TECH] Migrer la route PATCH /api/users/{id}/pix-certif-terms-of-service-acceptance vers src/identity-access-management (PIX-13085).

### :bug: Correction
- [#9382](https://github.com/1024pix/pix/pull/9382) [BUGFIX] Retirer la taille minimum pour le champ idPixLabel (PIX-13178).
- [#9323](https://github.com/1024pix/pix/pull/9323) [BUGFIX] Reparer l'affichage des habilitations des centres (PIX-12909).

### :arrow_up: Montée de version
- [#9372](https://github.com/1024pix/pix/pull/9372) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.5 (junior).
- [#9370](https://github.com/1024pix/pix/pull/9370) [BUMP] Update dependency ember-intl to v7 (junior).
- [#9373](https://github.com/1024pix/pix/pull/9373) [BUMP] Update dependency @1024pix/pix-ui to ^46.11.1 (junior).
- [#9369](https://github.com/1024pix/pix/pull/9369) [BUMP] Update dependency @1024pix/ember-testing-library to v2 (junior).
- [#9371](https://github.com/1024pix/pix/pull/9371) [BUMP] Update dependency ember-resolver to v12 (junior).
- [#9353](https://github.com/1024pix/pix/pull/9353) [BUMP] Update dependency @1024pix/ember-testing-library to v2 (orga).

## v4.171.0 (25/06/2024)


### :rocket: Amélioration
- [#9344](https://github.com/1024pix/pix/pull/9344) [FEATURE] Add API context to get organization membership (PIX-13074).
- [#9332](https://github.com/1024pix/pix/pull/9332) [FEATURE] Créer une navigation et déplacer la config sur la page administration sur Pix Admin (PIX-13066).
- [#9327](https://github.com/1024pix/pix/pull/9327) [FEATURE] Utiliser les tokens de texte sur la page d'erreur surveillant sur Pix Certif (PIX-11587).
- [#9280](https://github.com/1024pix/pix/pull/9280) [FEATURE] Empêche un prescrit de partager une participation à une campagne supprimée (PIX-12691).
- [#9324](https://github.com/1024pix/pix/pull/9324) [FEATURE] Afficher le positionnement de chaque élève sur une mission donnée dans Pix Orga (PIX-11869).
- [#9287](https://github.com/1024pix/pix/pull/9287) [FEATURE] Duplication de la route d'ajout de candidat de certification (PIX-12977).
- [#9329](https://github.com/1024pix/pix/pull/9329) [FEATURE] Anonymize GAR import (PIX-12809).

### :building_construction: Tech
- [#9365](https://github.com/1024pix/pix/pull/9365) [TECH] Mettre à jour des textes de l'écran d'épreuve focus (PIX-12746).
- [#9357](https://github.com/1024pix/pix/pull/9357) [TECH] Migrer la route PATCH /api/users/{id}/pix-orga-terms-of-service-acceptance vers src/identity-access-management (PIX-13084).
- [#9356](https://github.com/1024pix/pix/pull/9356) [TECH] Migrer la route PATCH /api/users/{id}/pix-terms-of-service-acceptance vers src/identity-access-management (PIX-13083).
- [#9355](https://github.com/1024pix/pix/pull/9355) [TECH] Migrer la route GET /api/users/{id}/authentication-methods vers src/identity-access-management (PIX-13082).
- [#9346](https://github.com/1024pix/pix/pull/9346) [TECH] Migrer la route GET /api/users/me vers src/identity-access-management (PIX-12822).
- [#9264](https://github.com/1024pix/pix/pull/9264) [TECH] Améliorer la structure des écrans d'instruction (PIX-12902).

### :bug: Correction
- [#9360](https://github.com/1024pix/pix/pull/9360) [BUGFIX] Force l'encodage UTF-8 pour la maj d'organisations en masse (PIX-13053).
- [#9334](https://github.com/1024pix/pix/pull/9334) [BUGFIX] Corriger les infos renvoyées pour les analyses de campagne (PIX-13021).

### :arrow_up: Montée de version
- [#9313](https://github.com/1024pix/pix/pull/9313) [BUMP] Update dependency @1024pix/ember-testing-library to v2 (certif).
- [#9272](https://github.com/1024pix/pix/pull/9272) [BUMP] Update dependency ember-source to ~5.9.0 (junior).
- [#9351](https://github.com/1024pix/pix/pull/9351) [BUMP] Update dependency ember-cli-app-version to v7 (orga).
- [#9347](https://github.com/1024pix/pix/pull/9347) [BUMP] Update dependency ember-cli-app-version to v7 (admin).
- [#9348](https://github.com/1024pix/pix/pull/9348) [BUMP] Update dependency ember-cli-app-version to v7 (certif).
- [#9349](https://github.com/1024pix/pix/pull/9349) [BUMP] Update dependency ember-cli-app-version to v7 (junior).
- [#9350](https://github.com/1024pix/pix/pull/9350) [BUMP] Update dependency ember-cli-app-version to v7 (mon-pix).
- [#9354](https://github.com/1024pix/pix/pull/9354) [BUMP] Update dependency ember-resolver to v12 (orga).

## v4.170.0 (24/06/2024)


### :rocket: Amélioration
- [#9315](https://github.com/1024pix/pix/pull/9315) [FEATURE] Afficher le statut de la dernière mission pour chaque élève dans Pix Orga (PIX-11200).
- [#9273](https://github.com/1024pix/pix/pull/9273) [FEATURE] Ajouter une route de duplication des profils cibles (PIX-11828).
- [#9145](https://github.com/1024pix/pix/pull/9145) [FEATURE] Rendre inscription CORE optionnel (PIX-12213).
- [#9249](https://github.com/1024pix/pix/pull/9249) [FEATURE] Permettre la reconciliation d'un organization learner en fonction des paramètre de reconcialitaion prédéfini (PIX-12556).
- [#9330](https://github.com/1024pix/pix/pull/9330) [FEATURE] Mettre à jour le lien d'aide des épreuves avec téléchargement (PIX-13078).
- [#9336](https://github.com/1024pix/pix/pull/9336) [FEATURE] Mettre à jour les URLs de la page d'accueil du support utilisateur.

### :building_construction: Tech
- [#9321](https://github.com/1024pix/pix/pull/9321) [TECH] Migrer la route POST /api/account-recovery vers src/identity-access-management (PIX-12740).
- [#9322](https://github.com/1024pix/pix/pull/9322) [TECH] Migrer la route GET /api/account-recovery/{temporaryKey} vers src/identity-access-management (PIX-12525).
- [#9309](https://github.com/1024pix/pix/pull/9309) [TECH] Migrer la route PATCH /api/account-recovery vers src/identity-access-management (PIX-12761).

### :bug: Correction
- [#9341](https://github.com/1024pix/pix/pull/9341) [BUGFIX] Correction du variant pix button des boutons Modifier et Dupliquer une campagne (PIX-13102).
- [#9335](https://github.com/1024pix/pix/pull/9335) [BUGFIX] Correction wording participation supprimée dans PixAdmin (PIX-13081).
- [#9333](https://github.com/1024pix/pix/pull/9333) [BUGFIX] Corriger la création de campagne en masse via PixAdmin (PIX-13071).

## v4.169.0 (20/06/2024)


### :rocket: Amélioration
- [#9325](https://github.com/1024pix/pix/pull/9325) [FEATURE] Gestion des actions du Grain (PIX-12927).
- [#9318](https://github.com/1024pix/pix/pull/9318) [FEATURE] Affiche la date de suppression d'une campagne sur PixAdmin (13054).
- [#9211](https://github.com/1024pix/pix/pull/9211) [FEATURE] Ajouter une route pour anonymiser en masse les données du GAR.
- [#9317](https://github.com/1024pix/pix/pull/9317) [FEATURE] Cache les campagnes supprimées sur PixOrga (PIX-13019).
- [#9190](https://github.com/1024pix/pix/pull/9190) [FEATURE] Permettre la pérénité des `organization-learners` via l'import générique d'un import à l'autre (PIX-12788).
- [#9304](https://github.com/1024pix/pix/pull/9304) [FEATURE][MON-PIX] Afficher une bannière informative lorsque l'adresse e-mail du compte est vérifiée (PIX-11710).

## v4.168.0 (20/06/2024)


### :building_construction: Tech
- [#9312](https://github.com/1024pix/pix/pull/9312) [TECH] Ajout d'un index sur la table `certification-subscriptions` (PIX-13028).

## v4.167.0 (19/06/2024)


### :rocket: Amélioration
- [#9261](https://github.com/1024pix/pix/pull/9261) [FEATURE] Ajouter un script pour récupérer tous les éléments d'un module en CSV (PIX-12952).

### :building_construction: Tech
- [#9319](https://github.com/1024pix/pix/pull/9319) [TECH] Flaky sur database-builder test.
- [#9310](https://github.com/1024pix/pix/pull/9310) [TECH] Ajout de la configuration pour .gjs sur Pix Certif (PIX-13024).
- [#9314](https://github.com/1024pix/pix/pull/9314) [TECH] Supprimer les warnings des dépréciations pour la futur v6.0 de Ember-Data (PIX-13018).
- [#9281](https://github.com/1024pix/pix/pull/9281) [TECH] Migrer la route `/api/admin/target-profiles/{targetProfileId}/organizations` vers son BC (PIX-12970).
- [#9311](https://github.com/1024pix/pix/pull/9311) [TECH] Migrer la route `/api/organization-learners` Vers le BC organization-learner (PIX-13026).

### :bug: Correction
- [#9291](https://github.com/1024pix/pix/pull/9291) [BUGFIX] Modification de la valeur CORE en BDD (PIX-12981).
- [#9306](https://github.com/1024pix/pix/pull/9306) [BUGFIX] Réparer les caractères de balises HTML incorrects (PIX-13036).
- [#9282](https://github.com/1024pix/pix/pull/9282) [BUGFIX][MON-PIX] Prendre en compte le choix de la langue lors de la création d'un compte via un SSO (PIX-12860).

### :arrow_up: Montée de version
- [#9320](https://github.com/1024pix/pix/pull/9320) [BUMP] Update dependency postgres to v15.
- [#9316](https://github.com/1024pix/pix/pull/9316) [BUMP] Update dependency @1024pix/pix-ui to ^46.10.3 (orga).

## v4.166.0 (18/06/2024)


### :rocket: Amélioration
- [#9232](https://github.com/1024pix/pix/pull/9232) [FEATURE] Améliorer l'UX de sélection de sujet d'un profil cible (PIX-11910).

### :building_construction: Tech
- [#9283](https://github.com/1024pix/pix/pull/9283) [TECH] Mettre a jour ember-source en 5.8.0 sur PixAdmin (PIX-12963).

### :bug: Correction
- [#9284](https://github.com/1024pix/pix/pull/9284) [BUGFIX] Adapter la hauteur de l'embed en fonction de la hauteur de l'écran (Pix-12973).

### :arrow_up: Montée de version
- [#8957](https://github.com/1024pix/pix/pull/8957) [BUMP] Update dependency ember-template-lint to v6 (certif) (PIX-12573).

## v4.165.0 (18/06/2024)


### :rocket: Amélioration
- [#9285](https://github.com/1024pix/pix/pull/9285) [FEATURE][ORGA] Ne pas afficher le bouton pour copier le code de campagne pour les organisations rattachées au GAR (PIX-12916).

### :building_construction: Tech
- [#9303](https://github.com/1024pix/pix/pull/9303) [TECH] Suppression d'avertissements liés à des dépréciations à venir d'Ember data.
- [#9270](https://github.com/1024pix/pix/pull/9270) [TECH] Mettre en place la configuration pour faire des composants GJS sur PixAdmin (PIX-12956).

### :bug: Correction
- [#9305](https://github.com/1024pix/pix/pull/9305) [BUGFIX] Corriger l'affichage des places dans le Header Et sur la pages des Places sur PixOrga (PIX-13017).
- [#9286](https://github.com/1024pix/pix/pull/9286) [BUGFIX] Erreur lors du reset de mot de passe (PIX-12935).

### :arrow_up: Montée de version
- [#9301](https://github.com/1024pix/pix/pull/9301) [BUMP] Update dependency @1024pix/pix-ui to ^46.10.2 (orga).
- [#9300](https://github.com/1024pix/pix/pull/9300) [BUMP] Update dependency @1024pix/pix-ui to ^46.10.2 (mon-pix).
- [#9299](https://github.com/1024pix/pix/pull/9299) [BUMP] Update dependency @1024pix/pix-ui to ^46.10.2 (junior).
- [#9298](https://github.com/1024pix/pix/pull/9298) [BUMP] Update dependency @1024pix/pix-ui to ^46.10.2 (admin).
- [#9297](https://github.com/1024pix/pix/pull/9297) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.4 (orga).
- [#9296](https://github.com/1024pix/pix/pull/9296) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.4 (mon-pix).
- [#9295](https://github.com/1024pix/pix/pull/9295) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.4 (load-testing).
- [#9294](https://github.com/1024pix/pix/pull/9294) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.4 (junior).
- [#9293](https://github.com/1024pix/pix/pull/9293) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.4 (dossier racine).
- [#9292](https://github.com/1024pix/pix/pull/9292) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.4 (certif).
- [#9290](https://github.com/1024pix/pix/pull/9290) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.4 (audit-logger).
- [#9289](https://github.com/1024pix/pix/pull/9289) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.4 (admin).

## v4.164.0 (17/06/2024)


### :rocket: Amélioration
- [#9278](https://github.com/1024pix/pix/pull/9278) [FEATURE] Ajouter un cadre autour des média des épreuves (Pix-12894) .
- [#9274](https://github.com/1024pix/pix/pull/9274) [FEATURE] Changement de traduction pour informer de l'activation de session (Pix-12728).
- [#9279](https://github.com/1024pix/pix/pull/9279) [FEATURE] Afficher une étiquette "Version Bêta" sur la page d'accueil de Pix Junior (PIX-12954).
- [#9241](https://github.com/1024pix/pix/pull/9241) [FEATURE] Utiliser la langue de l'épreuve en cas d'absence de langue utilisateur (PIX-12862).
- [#9243](https://github.com/1024pix/pix/pull/9243) [FEATURE] Signaler si la campagne n'existe pas dans le simulateur (PIX-12892).
- [#9233](https://github.com/1024pix/pix/pull/9233) [FEATURE] Affichage du statut de session d'école dans Pix Orga (PIX-12725).

### :building_construction: Tech
- [#9228](https://github.com/1024pix/pix/pull/9228) [TECH] Creer une souscription "Coeur" pour chaque candidat existant (PIX-12526).
- [#9229](https://github.com/1024pix/pix/pull/9229) [TECH] :broom: suppression des fichiers inutilisés.
- [#9235](https://github.com/1024pix/pix/pull/9235) [TECH] Mettre à jour le fichier CODEOWNERS.
- [#9253](https://github.com/1024pix/pix/pull/9253) [TECH] Corriger un test flaky sur PixAdmin (PIX-12942).
- [#9114](https://github.com/1024pix/pix/pull/9114) [TECH] Améliorer l'accessibilité sur l'affichage des compétences (PIX-12360).
- [#9266](https://github.com/1024pix/pix/pull/9266) [TECH] Monter de version ember-data en 5.3.3 sur PixAdmin (PIX-12950).

### :bug: Correction
- [#9267](https://github.com/1024pix/pix/pull/9267) [BUGFIX] Fix transaction et updateAt dans le repo organization-for-admin.
- [#9275](https://github.com/1024pix/pix/pull/9275) [BUGFIX] Corrige un flaky sur l'import d'OIDC provider.
- [#9238](https://github.com/1024pix/pix/pull/9238) [BUGFIX] Afficher une connexion externe par ligne sur l'écran de rattachement d'un compte externe à un compte Pix (PIX-12858).

### :arrow_up: Montée de version
- [#9269](https://github.com/1024pix/pix/pull/9269) [BUMP] Update dependency @1024pix/pix-ui to ^46.9.4 (orga).
- [#9268](https://github.com/1024pix/pix/pull/9268) [BUMP] Update dependency @1024pix/pix-ui to ^46.9.4 (mon-pix).
- [#9265](https://github.com/1024pix/pix/pull/9265) [BUMP] Update dependency @1024pix/pix-ui to ^46.9.4 (junior).

## v4.163.0 (13/06/2024)


### :rocket: Amélioration
- [#9120](https://github.com/1024pix/pix/pull/9120) [FEATURE] Empêche un prescrit de démarrer une participation à une campagne supprimée (PIX-12692).
- [#9247](https://github.com/1024pix/pix/pull/9247) [FEATURE] Afficher un Stepper dans un Grain (PIX-12840).
- [#9227](https://github.com/1024pix/pix/pull/9227) [FEATURE] Afficher la dernière page des écrans d'instructions sur Pix App (PIX-12900).
- [#9122](https://github.com/1024pix/pix/pull/9122) [FEATURE] Accepter un id de campagne dans l'url du simulateur (PIX-12760).
- [#9220](https://github.com/1024pix/pix/pull/9220) [FEATURE] Valider l'e-mail d'un compte utilisateur après réinitialisation du mot de passe (PIX-11122).

### :building_construction: Tech
- [#9218](https://github.com/1024pix/pix/pull/9218) [TECH] migration de la route `/api/campaigns/{id}/analyses`  (Pix-12829).
- [#9214](https://github.com/1024pix/pix/pull/9214) [TECH] Renommage de la table complementary-certification-subscriptions (PIX-12210).
- [#9248](https://github.com/1024pix/pix/pull/9248) [TECH] check autonomous course id presence (PIX-12938).

### :bug: Correction
- [#9255](https://github.com/1024pix/pix/pull/9255) [BUGFIX] Tourner sur les déclinaisons entre 2 passages d'une épreuve.
- [#9250](https://github.com/1024pix/pix/pull/9250) [BUGFIX] Afficher un message d'erreur lorsqu'une donnée n'est pas unique (Pix-12936).
- [#9237](https://github.com/1024pix/pix/pull/9237) [BUGFIX] Améliorer le design (Pix-12910).
- [#9222](https://github.com/1024pix/pix/pull/9222) [BUGFIX] Corriger l'affichage des methodes de connexion dans Mon Compte.

### :arrow_up: Montée de version
- [#9263](https://github.com/1024pix/pix/pull/9263) [BUMP] Update dependency @1024pix/pix-ui to ^46.9.4 (admin).
- [#9262](https://github.com/1024pix/pix/pull/9262) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.3 (orga).
- [#9260](https://github.com/1024pix/pix/pull/9260) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.3 (mon-pix).
- [#9259](https://github.com/1024pix/pix/pull/9259) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.3 (load-testing).
- [#9258](https://github.com/1024pix/pix/pull/9258) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.3 (junior).
- [#9257](https://github.com/1024pix/pix/pull/9257) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.3 (dossier racine).
- [#9256](https://github.com/1024pix/pix/pull/9256) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.3 (certif).
- [#9254](https://github.com/1024pix/pix/pull/9254) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.3 (audit-logger).
- [#9252](https://github.com/1024pix/pix/pull/9252) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.3 (admin).
- [#9207](https://github.com/1024pix/pix/pull/9207) [BUMP] Update dependency @getbrevo/brevo to v2 (api) (PIX-12911).

## v4.162.0 (13/06/2024)


### :rocket: Amélioration
- [#9187](https://github.com/1024pix/pix/pull/9187) [FEATURE] Ajouter le contenu de plusieurs écrans d'instruction sur Pix App (PIX-12841).

### :bug: Correction
- [#9180](https://github.com/1024pix/pix/pull/9180) [BUGFIX] Créer un script afin de recréer des données manquantes sur les états des participations à une campagne définit (PIX-12837).

## v4.161.0 (12/06/2024)


### :rocket: Amélioration
- [#8850](https://github.com/1024pix/pix/pull/8850) [FEATURE] Ajouter la page de modification d'infos et référentiel d'un profil cible (PIX-12442).
- [#9226](https://github.com/1024pix/pix/pull/9226) [FEATURE] Gérer l'affichage du bouton "Suivant" avec des éléments répondables (PIX-12856).
- [#9223](https://github.com/1024pix/pix/pull/9223) [FEATURE] Add a link to smart random simulator (PIX-12889).
- [#9212](https://github.com/1024pix/pix/pull/9212) [FEATURE] Audit logger peut log des events en masse (PIX-12808).

### :building_construction: Tech
- [#9152](https://github.com/1024pix/pix/pull/9152) [TECH] Migrer la route POST /api/password-reset-demands vers src/identity-access-management (PIX-12748).
- [#9245](https://github.com/1024pix/pix/pull/9245) [TECH] ajoute la configuration pour activer les synchros de traduction dans orga (pix-12923).
- [#9234](https://github.com/1024pix/pix/pull/9234) [TECH] MAJ du thème QUnit pour les tests certifs.

### :bug: Correction
- [#9242](https://github.com/1024pix/pix/pull/9242) [BUGFIX] Corriger le tag 'POLE EMPLOI' dans les seeds (PIX-12919).
- [#9194](https://github.com/1024pix/pix/pull/9194) [BUGFIX] Revert la migration des Job/handler PE (PIX-12850).

## v4.160.0 (12/06/2024)


### :rocket: Amélioration
- [#9208](https://github.com/1024pix/pix/pull/9208) [FEATURE] Gestion des erreurs dans mise à jour d'orga par CSV (PIX-12034).
- [#9072](https://github.com/1024pix/pix/pull/9072) [FEATURE] Montée de version ember-data en 5.0 sur PixAdmin (PIX-12557).
- [#9192](https://github.com/1024pix/pix/pull/9192) [FEATURE] Ouverture de session d'école Pix Junior depuis Orga (PIX-12724).
- [#9209](https://github.com/1024pix/pix/pull/9209) [FEATURE] Afficher les étapes de sélection de l'algorithme après que l'évaluation soit terminée (PIX-12763) .
- [#9150](https://github.com/1024pix/pix/pull/9150) [FEATURE] Ne pas afficher le bouton pour copier le code de campagne pour les organisations rattachées au GAR (PIX-5974).
- [#9126](https://github.com/1024pix/pix/pull/9126) [FEATURE] Afficher le nombre max de caractères du champ nom interne d'un parcours autonome (PIX-12778).
- [#9138](https://github.com/1024pix/pix/pull/9138) [FEATURE] Rendre dynamique le carousel des écrans d'instruction pour la certification V3 sur Pix App (PIX-12757).
- [#9060](https://github.com/1024pix/pix/pull/9060) [FEATURE] Découper les feedbacks de constat et de diagnostique - v0 (PIX-9783).
- [#9151](https://github.com/1024pix/pix/pull/9151) [FEATURE] Suppression de l'aléatoire dans le choix de questions pour la dégradation (PIX-12811).
- [#9178](https://github.com/1024pix/pix/pull/9178) [FEATURE] Ajouter le bouton `suivant` dans le stepper (PIX-12839).
- [#9206](https://github.com/1024pix/pix/pull/9206) [FEATURE] Rendre séléctionnable toute la zone de réponse QCU/QCM Modulix (PIX-12851).

### :building_construction: Tech
- [#9158](https://github.com/1024pix/pix/pull/9158) [TECH] Permettre de contextualiser les seeds (PIX-12833).
- [#9221](https://github.com/1024pix/pix/pull/9221) [TECH] Accélerer le `lint` local de l'API.
- [#9217](https://github.com/1024pix/pix/pull/9217) [TECH] déplace les fichiers de `lib/infrastructure/plugins` vers `src/shared`.
- [#9148](https://github.com/1024pix/pix/pull/9148) [TECH] Supprime un workflow github qui ne sert à rien.
- [#9216](https://github.com/1024pix/pix/pull/9216) [TECH] migration du fichier `Tag.js` vers `src/organizational-entities`.
- [#9155](https://github.com/1024pix/pix/pull/9155) [TECH] Ajouter un serveur SMTP pour le développement local.
- [#8212](https://github.com/1024pix/pix/pull/8212) [TECH] Faciliter le build des seeds en base de données avec JSDoc.
- [#9176](https://github.com/1024pix/pix/pull/9176) [TECH] Migrer la route GET /api/organization-invitation vers src/team (pix-12825).
- [#9161](https://github.com/1024pix/pix/pull/9161) [TECH] Migrer la route POST /api/token/anonymous vers src/identity-access-management (PIX-12826).

### :bug: Correction
- [#9230](https://github.com/1024pix/pix/pull/9230) [BUGFIX] Permettre de focus sur les propositions de QCU/QCM/QROCM une fois répondu (PIX-12906).
- [#9219](https://github.com/1024pix/pix/pull/9219) [BUGFIX] Missing EN translation of SSO reconciliation page (PIX-12821).
- [#9213](https://github.com/1024pix/pix/pull/9213) [BUGFIX] Régression sur l'affichage des données DPO (PIX-12868).
- [#9210](https://github.com/1024pix/pix/pull/9210) [BUGFIX] Prendre en compte uniquement les organisations actives lors de la recherche par UAI (PIX-5677).
- [#9186](https://github.com/1024pix/pix/pull/9186) [BUGFIX] Empecher d'accéder à la page mission si l'utilisateur n'appartient pas à une orga SCO-1D (PIX-12853).

### :arrow_up: Montée de version
- [#9224](https://github.com/1024pix/pix/pull/9224) [BUMP] Update dependency @1024pix/pix-ui to ^46.9.3 (mon-pix).
- [#9200](https://github.com/1024pix/pix/pull/9200) [BUMP] Lock file maintenance (mon-pix).
- [#9203](https://github.com/1024pix/pix/pull/9203) [BUMP] Lock file maintenance (e2e).

## v4.159.0 (10/06/2024)


### :rocket: Amélioration
- [#9099](https://github.com/1024pix/pix/pull/9099) [FEATURE] Ajouter le chargement d'une campagne dans le simulateur Smart Random (PIX-12731).
- [#9185](https://github.com/1024pix/pix/pull/9185) [FEATURE] Ouvre Pix Junior depuis Pix Orga dans un nouvel onglet.

### :building_construction: Tech
- [#9127](https://github.com/1024pix/pix/pull/9127) [TECH] Montée de version ember pix-certif (PIX-12776).
- [#9189](https://github.com/1024pix/pix/pull/9189) [TECH] Migrer la route `/api/admin/users/{id}/participations` vers src (Pix-12849).
- [#9160](https://github.com/1024pix/pix/pull/9160) [TECH] Réorganisation des tests de scoring-certification-service.js (PIX-12827).
- [#9159](https://github.com/1024pix/pix/pull/9159) [TECH] Migrer `/api/frameworks/for-target-profile-submission` vers le context target profile (PIX-12832).
- [#9156](https://github.com/1024pix/pix/pull/9156) [TECH] Arrêter d'utiliser les Ember Pods sur Modulix (PIX-12699).
- [#9056](https://github.com/1024pix/pix/pull/9056) [TECH] Migrer supervising vers session-management (PIX-12676).

### :bug: Correction
- [#9181](https://github.com/1024pix/pix/pull/9181) [BUGFIX] Blob rouge de page d'erreur tronqué.
- [#9153](https://github.com/1024pix/pix/pull/9153) [BUGFIX] Corriger l'absence de langue à utiliser pour les épreuves de preview (PIX-12813).
- [#9182](https://github.com/1024pix/pix/pull/9182) [BUGFIX] Ignore la casse du code école dans l'URL d'accès direct (PIX-12852).
- [#9184](https://github.com/1024pix/pix/pull/9184) [BUGFIX] Ajoute le point d'exclamation dans le bouton de démarrage de mission sur Pix Junior.
- [#9179](https://github.com/1024pix/pix/pull/9179) [BUGFIX] Ne pas afficher les boutons de vocalisation si la fonctionnalité a été désactivée sur le navigateur (PIX-12831).

### :arrow_up: Montée de version
- [#9204](https://github.com/1024pix/pix/pull/9204) [BUMP] Lock file maintenance (load-testing).
- [#9202](https://github.com/1024pix/pix/pull/9202) [BUMP] Lock file maintenance (dossier racine).
- [#9201](https://github.com/1024pix/pix/pull/9201) [BUMP] Lock file maintenance (api).
- [#9199](https://github.com/1024pix/pix/pull/9199) [BUMP] Update nginx Docker tag to v1.27.0.
- [#9198](https://github.com/1024pix/pix/pull/9198) [BUMP] Update dependency @1024pix/pix-ui to ^46.9.0 (orga).
- [#9197](https://github.com/1024pix/pix/pull/9197) [BUMP] Update dependency @1024pix/pix-ui to ^46.9.0 (junior).
- [#9177](https://github.com/1024pix/pix/pull/9177) [BUMP] Update adobe/s3mock Docker tag to v3.9.1 (.circleci).
- [#9196](https://github.com/1024pix/pix/pull/9196) [BUMP] Update dependency @1024pix/pix-ui to ^46.9.0 (admin).
- [#9195](https://github.com/1024pix/pix/pull/9195) [BUMP] Update adobe/s3mock Docker tag to v3.9.1 (dossier racine).
- [#9183](https://github.com/1024pix/pix/pull/9183) [BUMP] Update adobe/s3mock Docker tag to v3.9.1 (docker).
- [#9193](https://github.com/1024pix/pix/pull/9193) [BUMP] Update dependency @1024pix/pix-ui to ^46.9.0 (mon-pix).

## v4.158.0 (05/06/2024)


### :rocket: Amélioration
- [#9173](https://github.com/1024pix/pix/pull/9173) [FEATURE] Amélioration wording et logo.
- [#9134](https://github.com/1024pix/pix/pull/9134) [FEATURE] Ajouter un sélecteur de langue sur la double mire OIDC (PIX-12151).

### :building_construction: Tech
- [#9132](https://github.com/1024pix/pix/pull/9132) [TECH] Migrer la route POST /api/organization-invitations/sco vers src/team (pix-12628).
- [#9170](https://github.com/1024pix/pix/pull/9170) [TECH] Ajouter les montées de version Node.js des dockerfiles au groupement Renovate.
- [#9175](https://github.com/1024pix/pix/pull/9175) [TECH] Supprimer Pix UI de la racine du monorepo.

### :bug: Correction
- [#9174](https://github.com/1024pix/pix/pull/9174) [BUGFIX] Ignorer la casse lors de la détermination des noms d'élèves à afficher (PIX-12800).
- [#9125](https://github.com/1024pix/pix/pull/9125) [BUGFIX] Améliorer le design pour les tablettes (Pix-11931).

### :arrow_up: Montée de version
- [#9172](https://github.com/1024pix/pix/pull/9172) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.15 (orga).
- [#9171](https://github.com/1024pix/pix/pull/9171) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.15 (mon-pix).
- [#9169](https://github.com/1024pix/pix/pull/9169) [BUMP] Update Node.js to v20.14.0.
- [#9168](https://github.com/1024pix/pix/pull/9168) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.15 (junior).
- [#9167](https://github.com/1024pix/pix/pull/9167) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.15 (certif).
- [#9166](https://github.com/1024pix/pix/pull/9166) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.15 (admin).
- [#9165](https://github.com/1024pix/pix/pull/9165) [BUMP] Update dependency @1024pix/pix-ui to ^46.6.4 (mon-pix).
- [#9154](https://github.com/1024pix/pix/pull/9154) [BUMP] Update dependency @1024pix/pix-ui to ^46.6.4 (dossier racine).
- [#9163](https://github.com/1024pix/pix/pull/9163) [BUMP] Update dependency node to v20.14.0.
- [#9149](https://github.com/1024pix/pix/pull/9149) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.2 (orga).

## v4.157.0 (04/06/2024)


### :rocket: Amélioration
- [#9135](https://github.com/1024pix/pix/pull/9135) [FEATURE] Ajout d'une section étape dans un module (PIX-12790).
- [#9097](https://github.com/1024pix/pix/pull/9097) [FEATURE] Récupération de la version de la session après réconciliation (PIX-11842).
- [#9076](https://github.com/1024pix/pix/pull/9076) [FEATURE] Ajouter l'import générique sur la page des participants d'une Organisation (Pix-12554).

### :building_construction: Tech
- [#9128](https://github.com/1024pix/pix/pull/9128) [TECH] Mise en place des composants `Element` & `Step` (PIX-12622).

### :bug: Correction
- [#9147](https://github.com/1024pix/pix/pull/9147) [BUGFIX] Corriger l'injection de dépendance manquante sur pole emploi notifier (PIX-12812).
- [#9146](https://github.com/1024pix/pix/pull/9146) [BUGFIX] Mettre à jour la colonne `updatedAt` de la table `assessments` lors de la mise à jour d'un assessment (PIX-11293).
- [#9136](https://github.com/1024pix/pix/pull/9136) [BUGFIX] Gérer le cas où le paramètre tubes est vide à la création de déclencheurs de contenus formatifs (PIX-12738).
- [#9133](https://github.com/1024pix/pix/pull/9133) [BUGFIX] Afficher la bonne langue dans le Language Switcher (PIX-10753).

### :arrow_up: Montée de version
- [#9144](https://github.com/1024pix/pix/pull/9144) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.2 (mon-pix).
- [#9143](https://github.com/1024pix/pix/pull/9143) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.2 (load-testing).
- [#9142](https://github.com/1024pix/pix/pull/9142) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.2 (junior).
- [#9141](https://github.com/1024pix/pix/pull/9141) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.2 (dossier racine).
- [#9140](https://github.com/1024pix/pix/pull/9140) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.2 (certif).
- [#9139](https://github.com/1024pix/pix/pull/9139) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.2 (audit-logger).
- [#9137](https://github.com/1024pix/pix/pull/9137) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.2 (admin).
- [#9082](https://github.com/1024pix/pix/pull/9082) [BUMP] Update dependency @1024pix/pix-ui to ^46.6.2 (orga).

## v4.156.0 (03/06/2024)


### :rocket: Amélioration
- [#9081](https://github.com/1024pix/pix/pull/9081) [FEATURE] Permettre la vocalisation des consignes des épreuves (PIX-11050).
- [#9121](https://github.com/1024pix/pix/pull/9121) [FEATURE] Ajouter le suffixe "%" pour les paliers par seuil (PIX-11911).
- [#9118](https://github.com/1024pix/pix/pull/9118) [FEATURE] Ajouter les nouvelles couleurs (Pix-11932).

### :building_construction: Tech
- [#9079](https://github.com/1024pix/pix/pull/9079) [TECH] Migration de prescriber-management de src/shared vers src/team (PIX-12697).
- [#9115](https://github.com/1024pix/pix/pull/9115) [TECH] Migrer la route POST /api/admin/oidc/user/reconcile vers src/identity-access-management (PIX-12661).
- [#9123](https://github.com/1024pix/pix/pull/9123) [TECH] Utiliser notre action de lint des titres de PR .

### :bug: Correction
- [#9124](https://github.com/1024pix/pix/pull/9124) [BUGFIX] Echec du job sendSharedParticipationResults... (Pix-12762).

### :arrow_up: Montée de version
- [#9112](https://github.com/1024pix/pix/pull/9112) [BUMP] Update dependency @sentry/ember to v8 (mon-pix).
- [#9131](https://github.com/1024pix/pix/pull/9131) [BUMP] Update dependency @1024pix/pix-ui to ^46.6.0 (mon-pix).
- [#9129](https://github.com/1024pix/pix/pull/9129) [BUMP] Update dependency @1024pix/pix-ui to ^46.6.0 (mon-pix).

### :coffee: Autre
- [#9130](https://github.com/1024pix/pix/pull/9130) Revert "[BUMP] Update dependency @1024pix/pix-ui to ^46.6.0 (mon-pix)".

## v4.155.0 (31/05/2024)


### :rocket: Amélioration
- [#9075](https://github.com/1024pix/pix/pull/9075) [FEATURE][ADMIN] Permettre la copie de l'adresse e-mail et de l'identifiant via un bouton (PIX-12636).
- [#9113](https://github.com/1024pix/pix/pull/9113) [FEATURE] Ajoute les colonnes deletedBy et deletedAt sur la table campaigns (PIX-12688).

### :building_construction: Tech
- [#9077](https://github.com/1024pix/pix/pull/9077) [TECH] configuration pour le TMS Phrase.
- [#9048](https://github.com/1024pix/pix/pull/9048) [TECH] Deplacer PickChallengeService vers Evaluation (PIX-12657).
- [#9078](https://github.com/1024pix/pix/pull/9078) [TECH] Regrouper la gestion des centres (PIX-12462).
- [#9117](https://github.com/1024pix/pix/pull/9117) [TECH] Migre les composants des pages de campagnes activité et analyse vers GJS (PIX-12755).
- [#9030](https://github.com/1024pix/pix/pull/9030) [TECH] Move smart random services in evaluation context (PIX-12625).

### :bug: Correction
- [#9119](https://github.com/1024pix/pix/pull/9119) [BUGFIX] Rediriger vers la bonne participation depuis l'activité d'une campagne et le détail d'un participant (PIX-12673).
- [#9100](https://github.com/1024pix/pix/pull/9100) [BUGFIX] Ne pas prendre en compte les learner supprimés lors de la réconciliation SUP (PIX-12734).
- [#9116](https://github.com/1024pix/pix/pull/9116) [BUGFIX] Permettre d'inscrire un candidat à Pix Santé via l'ODS (PIX-12718).
- [#9085](https://github.com/1024pix/pix/pull/9085) [BUGFIX] Renseigner le bon emitter lors d'un rescoring de certification v3 (PIX-12520).

## v4.154.0 (30/05/2024)


### :rocket: Amélioration
- [#8842](https://github.com/1024pix/pix/pull/8842) [FEATURE] Permettre la modification des sujets d'un profil cible non relié à une campagne (PIX-12436).

### :building_construction: Tech
- [#9095](https://github.com/1024pix/pix/pull/9095) [TECH] Corrige un test flaky sur le comportement QROCM (PIX-12730).
- [#9104](https://github.com/1024pix/pix/pull/9104) [TECH] Monter la version d'`eslint` minimum du dossier racine.

### :bug: Correction
- [#9091](https://github.com/1024pix/pix/pull/9091) [BUGFIX] Interdire les actions utilisateurs pendant la transition entre épreuves (PIX-12658).
- [#9083](https://github.com/1024pix/pix/pull/9083) [BUGFIX] Numéroter les participations dans le bon ordre dans le selecteur de participation (pix-12713).
- [#9096](https://github.com/1024pix/pix/pull/9096) [BUGFIX] Import en masse de session KO pour l'inscription aux complémentaires (PIX-12718).

### :arrow_up: Montée de version
- [#9111](https://github.com/1024pix/pix/pull/9111) [BUMP] Update dependency pino to v9 (api).
- [#9110](https://github.com/1024pix/pix/pull/9110) [BUMP] Update dependency eslint-plugin-unicorn to v53 (api).
- [#9109](https://github.com/1024pix/pix/pull/9109) [BUMP] Update dependency eslint-plugin-unicorn to v52 (api).
- [#9108](https://github.com/1024pix/pix/pull/9108) [BUMP] Update dependency @1024pix/pix-ui to ^46.5.2 (mon-pix).
- [#9106](https://github.com/1024pix/pix/pull/9106) [BUMP] Update dependency sinon to v18 (certif).
- [#9105](https://github.com/1024pix/pix/pull/9105) [BUMP] Update dependency sinon to v18 (mon-pix).
- [#9103](https://github.com/1024pix/pix/pull/9103) [BUMP] Update dependency sinon to v18 (load-testing).
- [#9102](https://github.com/1024pix/pix/pull/9102) [BUMP] Update dependency sinon to v18 (junior).
- [#9101](https://github.com/1024pix/pix/pull/9101) [BUMP] Update dependency sinon to v18 (admin).

## v4.153.0 (29/05/2024)


### :rocket: Amélioration
- [#9011](https://github.com/1024pix/pix/pull/9011) [FEATURE] déprécie le push de donnés FT (Pix-12561).
- [#8993](https://github.com/1024pix/pix/pull/8993) [FEATURE] Englober les signalements dans la zone de focus (PIX-12025).
- [#9065](https://github.com/1024pix/pix/pull/9065) [FEATURE] Permettre d'extraire les contenus des modules en format "tableur" (PIX-12285).

### :building_construction: Tech
- [#9080](https://github.com/1024pix/pix/pull/9080) [TECH] Ajout d'un feature toggle pour les écrans d'informations de certif V3 (PIX-11844).
- [#8995](https://github.com/1024pix/pix/pull/8995) [TECH] Utiliser le nouveau format de config ESLint sur l'API.
- [#9073](https://github.com/1024pix/pix/pull/9073) [TECH] Migrer la route DELETE /api/admin/certification-centers/{id}/invitations/{certificationCenterInvitationId} (PIX-12623).
- [#9059](https://github.com/1024pix/pix/pull/9059) [TECH] Migrer la route POST /api/oidc/user/reconcile vers src/identity-access-management (PIX-12660).

### :bug: Correction
- [#9074](https://github.com/1024pix/pix/pull/9074) [BUGFIX] Correctif de l'affichage des boutons de challenges.

### :arrow_up: Montée de version
- [#9093](https://github.com/1024pix/pix/pull/9093) [BUMP] Update dependency @1024pix/eslint-plugin to ^1.2.1 (api).
- [#9092](https://github.com/1024pix/pix/pull/9092) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.1 (orga).
- [#9090](https://github.com/1024pix/pix/pull/9090) [BUMP] Update dependency sinon to v18 (api).
- [#9089](https://github.com/1024pix/pix/pull/9089) [BUMP] Update dependency eslint-plugin-n to v17 (orga).
- [#9088](https://github.com/1024pix/pix/pull/9088) [BUMP] Update dependency eslint-plugin-n to v17 (junior).
- [#9087](https://github.com/1024pix/pix/pull/9087) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.1 (mon-pix).
- [#9086](https://github.com/1024pix/pix/pull/9086) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.1 (load-testing).
- [#9071](https://github.com/1024pix/pix/pull/9071) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.1 (junior).

## v4.152.0 (28/05/2024)


### :rocket: Amélioration
- [#8939](https://github.com/1024pix/pix/pull/8939) [FEATURE] Gérer l'inscription à une certification coeur pour un candidat en certif V2 (PIX-12212).

### :building_construction: Tech
- [#9063](https://github.com/1024pix/pix/pull/9063) [TECH] Récupération de la version de certification dans le modèle (PIX-11689).
- [#9057](https://github.com/1024pix/pix/pull/9057) [TECH] Déplacer l'archivage et l'accès simplifié d'un profile cible dans son BC (PIX-12677).

### :bug: Correction
- [#9046](https://github.com/1024pix/pix/pull/9046) [BUGFIX] recharge les places  lorsque le prescrit change d'organisation (PIX-12653).
- [#9064](https://github.com/1024pix/pix/pull/9064) [BUGFIX] Afficher les puces adéquates dans l'instruction d'épreuve (PIX-12578).

### :arrow_up: Montée de version
- [#9070](https://github.com/1024pix/pix/pull/9070) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.1 (dossier racine).
- [#9069](https://github.com/1024pix/pix/pull/9069) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.1 (certif).
- [#9068](https://github.com/1024pix/pix/pull/9068) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.1 (audit-logger).
- [#9067](https://github.com/1024pix/pix/pull/9067) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.1 (api).
- [#9066](https://github.com/1024pix/pix/pull/9066) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.1 (admin).
- [#9029](https://github.com/1024pix/pix/pull/9029) [BUMP] Update dependency @embroider/webpack to v4 (admin).

### :coffee: Autre
- [#9061](https://github.com/1024pix/pix/pull/9061) [FEATURES] Ajout d'un label informatif pour les QCU / QCM (Pix-12592).

## v4.151.0 (27/05/2024)


### :rocket: Amélioration
- [#9010](https://github.com/1024pix/pix/pull/9010) [FEATURE] Ajouter une API interne pour récupérer la liste des features d'une organisation (PIX-12558).
- [#9044](https://github.com/1024pix/pix/pull/9044) [FEATURE][ADMIN] Ajouter une section dans l'onglet Administration pour la modification en masse d'organisations (PIX-12033).
- [#9039](https://github.com/1024pix/pix/pull/9039) [FEATURE][API] Ajouter une nouvelle route pour importer un fichier CSV pour modifier les informations d'une liste d'organisations (PIX-12032).
- [#9050](https://github.com/1024pix/pix/pull/9050) [FEATURE] Vérifier l'accessibilité des pages de Modulix (PIX-12521).
- [#9043](https://github.com/1024pix/pix/pull/9043) [FEATURE] Envoyer le composant stepper vers le client (PIX-12621).

### :building_construction: Tech
- [#9062](https://github.com/1024pix/pix/pull/9062) [TECH] Remettre la version 14.11 de postgres.

### :arrow_up: Montée de version
- [#9040](https://github.com/1024pix/pix/pull/9040) [BUMP] Update dependency @formatjs/intl-locale to v4 (orga).
- [#9054](https://github.com/1024pix/pix/pull/9054) [BUMP] Update dependency eslint-plugin-cypress to v3 (e2e).
- [#9034](https://github.com/1024pix/pix/pull/9034) [BUMP] Update dependency @embroider/webpack to v4 (mon-pix).

## v4.150.0 (27/05/2024)


### :rocket: Amélioration
- [#8998](https://github.com/1024pix/pix/pull/8998) [FEATURE] Afficher un sélecteur de participation (PIX-11643).
- [#9045](https://github.com/1024pix/pix/pull/9045) [FEATURE] Modification du wording de la modale lors du remplacement à l’import SUP (PIX-10092).

### :building_construction: Tech
- [#9035](https://github.com/1024pix/pix/pull/9035) [TECH] Éviter l'existance constante d'une raison d'abandon dans la gestion du scoring V3 (PIX-12629).

### :bug: Correction
- [#9047](https://github.com/1024pix/pix/pull/9047) [BUGFIX] Chercher les certification-challenges par date de création pour le scoring V3 (PIX-12671).
- [#9058](https://github.com/1024pix/pix/pull/9058) [BUGFIX] Corriger l'envoi de signalement depuis la correction d'une épreuve.
- [#9038](https://github.com/1024pix/pix/pull/9038) [BUGFIX] [Admin] Gérer le cas des imports OIDC Providers suivants qui produisent des 500 (PIX-12333).
- [#9049](https://github.com/1024pix/pix/pull/9049) [BUGFIX] Retire l'icône de suppression de signalement effectué en live lors d'une certif V3 (PIX-12655).

### :arrow_up: Montée de version
- [#9053](https://github.com/1024pix/pix/pull/9053) [BUMP] Update dependency npm-run-all2 to v6.2.0 (e2e).
- [#9055](https://github.com/1024pix/pix/pull/9055) [BUMP] Lock file maintenance (orga).

### :coffee: Autre
- [#9041](https://github.com/1024pix/pix/pull/9041) [FEATURES] Avoir uniquement un bouton "Je continue" pour les activités "leçon".

## v4.149.0 (24/05/2024)


### :rocket: Amélioration
- [#8992](https://github.com/1024pix/pix/pull/8992) [FEATURE] Updated translations from Phrase.
- [#9032](https://github.com/1024pix/pix/pull/9032) [FEATURE] Ajouter les modèles liés au Stepper (PIX-12620).
- [#8821](https://github.com/1024pix/pix/pull/8821) [FEATURE] Dégradation du score d'une certification non terminée (PIX-12315).
- [#9007](https://github.com/1024pix/pix/pull/9007) [FEATURE] Ajouter un stepper dans le referentiel de Modulix (PIX-12619).

### :building_construction: Tech
- [#9033](https://github.com/1024pix/pix/pull/9033) [TECH] Passe les composants de cartes et de graphiques au format GJS sur PixOrga (PIX-12647).
- [#9008](https://github.com/1024pix/pix/pull/9008) [TECH] Migrer la route POST /api/oidc/user/check-reconciliation vers src/identity-access-management (PIX-12618).
- [#8913](https://github.com/1024pix/pix/pull/8913) [TECH] Supprimer les constantes spécifiques des fournisseurs d'identité OIDC (PIX-12428).
- [#9006](https://github.com/1024pix/pix/pull/9006) [TECH] Migrer le modèle Organization.js dans src/organizational-entities/ (PIX-12606).

### :bug: Correction
- [#9001](https://github.com/1024pix/pix/pull/9001) [BUGFIX] Unifier les status et score sur la page de détails admin pour les certif v3 (PIX-12061).
- [#9000](https://github.com/1024pix/pix/pull/9000) [BUGFIX] met à jour la date dans la banniere d'info sur orga (Pix-12533).

### :arrow_up: Montée de version
- [#9031](https://github.com/1024pix/pix/pull/9031) [BUMP] Update dependency @embroider/webpack to v4 (certif).
- [#9022](https://github.com/1024pix/pix/pull/9022) [BUMP] Update dependency @1024pix/pix-ui to ^46.4.0 (admin).
- [#9027](https://github.com/1024pix/pix/pull/9027) [BUMP] Lock file maintenance (orga).

## v4.148.0 (23/05/2024)


### :rocket: Amélioration
- [#9005](https://github.com/1024pix/pix/pull/9005) [FEATURE] Passe le défi si un didactiel a été vu dans une des missions (PIX-12593).
- [#9004](https://github.com/1024pix/pix/pull/9004) [FEATURE] Ne pas jouer deux fois le didacticiel (PIX-12571).
- [#8989](https://github.com/1024pix/pix/pull/8989) [FEATURE] Montée de version ember de 4.12 à 5.8.0 (Pix-12432).
- [#8976](https://github.com/1024pix/pix/pull/8976) [FEATURE] Enchainer les activités après le didacticiel (PIX-12566).
- [#8945](https://github.com/1024pix/pix/pull/8945) [FEATURE] Permettre de rattacher un profil cible à une certification complementaire (PIX-12404).

### :building_construction: Tech
- [#8990](https://github.com/1024pix/pix/pull/8990) [TECH] Migrer les routes statistiques d'une campagne par jour / taux de réussite dans son BoundedContext (Pix-12604).
- [#8766](https://github.com/1024pix/pix/pull/8766) [TECH] Mise à jour des contextes certif (PIX-12321).
- [#8937](https://github.com/1024pix/pix/pull/8937) [TECH] Supprimer toutes les références au statut "partially" (PIX-11417).
- [#8926](https://github.com/1024pix/pix/pull/8926) [TECH] Migrer la route POST /api/oidc/token vers src/identity-access-management (PIX-12524).
- [#8967](https://github.com/1024pix/pix/pull/8967) [TECH] Ajouter des configurations pour exécuter les tests sur Webstorm.
- [#8975](https://github.com/1024pix/pix/pull/8975) [TECH] Améliorer l'orchestration du usecase `verifyAndSaveAnswer` (PIX-12456).
- [#8896](https://github.com/1024pix/pix/pull/8896) [TECH] Convertit les composants du dossier banner sur PixOrga au format GJS (PIX-12532).

### :bug: Correction
- [#8835](https://github.com/1024pix/pix/pull/8835) [BUGFIX] Réordonnancement des `fieldset` `legend` de Modulix (PIX-12382).
- [#8971](https://github.com/1024pix/pix/pull/8971) [BUGFIX] Corriger l'affichage des inputs dans la modale de gestion du compte de l'élève sur Pix Orga (PIX-12469).
- [#8954](https://github.com/1024pix/pix/pull/8954) [BUGFIX] Le InMemoryTemporaryStorage ne suit pas la TemporaryStorage API et est utilisé à tort dans les tests d'intégration (PIX-12551).
- [#8962](https://github.com/1024pix/pix/pull/8962) [BUGFIX] Ne plus envoyer de 500 lors d'une recherche par ID invalide sur 2 pages PixAdmin (PIX-12576).

### :arrow_up: Montée de version
- [#9025](https://github.com/1024pix/pix/pull/9025) [BUMP] Update dependency @embroider/webpack to v4 (orga).
- [#9026](https://github.com/1024pix/pix/pull/9026) [BUMP] Update dependency sinon to v18 (orga).
- [#9024](https://github.com/1024pix/pix/pull/9024) [BUMP] Update dependency postgres to v14.12.
- [#9023](https://github.com/1024pix/pix/pull/9023) [BUMP] Update dependency @1024pix/pix-ui to ^46.4.0 (certif).
- [#9021](https://github.com/1024pix/pix/pull/9021) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.0 (orga).
- [#9020](https://github.com/1024pix/pix/pull/9020) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.0 (load-testing).
- [#9019](https://github.com/1024pix/pix/pull/9019) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.0 (junior).
- [#9018](https://github.com/1024pix/pix/pull/9018) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.0 (dossier racine).
- [#9017](https://github.com/1024pix/pix/pull/9017) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.0 (audit-logger).
- [#9015](https://github.com/1024pix/pix/pull/9015) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.0 (api).
- [#9014](https://github.com/1024pix/pix/pull/9014) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.0 (admin).
- [#9013](https://github.com/1024pix/pix/pull/9013) [BUMP] Update adobe/s3mock Docker tag to v3.8.0 (dossier racine).
- [#9012](https://github.com/1024pix/pix/pull/9012) [BUMP] Update adobe/s3mock Docker tag to v3.8.0 (docker).
- [#9009](https://github.com/1024pix/pix/pull/9009) [BUMP] Update adobe/s3mock Docker tag to v3.8.0 (.circleci).
- [#8965](https://github.com/1024pix/pix/pull/8965) [BUMP] Update dependency @1024pix/pix-ui to v46 (junior).
- [#8978](https://github.com/1024pix/pix/pull/8978) [BUMP] Update dependency @1024pix/pix-ui to ^46.3.1 (PIX-12609).
- [#9002](https://github.com/1024pix/pix/pull/9002) [BUMP] Update dependency @1024pix/pix-ui to ^46.4.0 (mon-pix).
- [#9003](https://github.com/1024pix/pix/pull/9003) [BUMP] Update dependency @1024pix/pix-ui to ^46.4.0 (orga).
- [#8973](https://github.com/1024pix/pix/pull/8973) [BUMP] Update dependency @embroider/webpack to v4 (junior).
- [#8999](https://github.com/1024pix/pix/pull/8999) [BUMP] Update dependency eslint-plugin-n to v17 (admin).
- [#8997](https://github.com/1024pix/pix/pull/8997) [BUMP] Update dependency @1024pix/pix-ui to ^46.3.1 (orga).
- [#8996](https://github.com/1024pix/pix/pull/8996) [BUMP] Update dependency @1024pix/pix-ui to ^46.3.1 (mon-pix).
- [#8994](https://github.com/1024pix/pix/pull/8994) [BUMP] Update dependency eslint-plugin-n to v17 (mon-pix).
- [#8991](https://github.com/1024pix/pix/pull/8991) [BUMP] Update Node.js to v20.13.1.
- [#8982](https://github.com/1024pix/pix/pull/8982) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.0 (certif).
- [#8985](https://github.com/1024pix/pix/pull/8985) [BUMP] Update dependency @1024pix/eslint-config to ^1.3.0 (mon-pix).
- [#8987](https://github.com/1024pix/pix/pull/8987) [BUMP] Update dependency @1024pix/pix-ui to ^46.2.2 (mon-pix).
- [#8988](https://github.com/1024pix/pix/pull/8988) [BUMP] Update dependency @1024pix/pix-ui to ^46.2.2 (orga).
- [#8979](https://github.com/1024pix/pix/pull/8979) [BUMP] Update dependency @1024pix/eslint-config to ^1.2.13 (admin).
- [#8984](https://github.com/1024pix/pix/pull/8984) [BUMP] Update dependency @1024pix/eslint-config to ^1.2.13 (load-testing).
- [#8983](https://github.com/1024pix/pix/pull/8983) [BUMP] Update dependency @1024pix/eslint-config to ^1.2.13 (dossier racine).
- [#8981](https://github.com/1024pix/pix/pull/8981) [BUMP] Update dependency @1024pix/eslint-config to ^1.2.13 (audit-logger).
- [#8980](https://github.com/1024pix/pix/pull/8980) [BUMP] Update dependency @1024pix/eslint-config to ^1.2.13 (api).
- [#8986](https://github.com/1024pix/pix/pull/8986) [BUMP] Update dependency @1024pix/eslint-config to ^1.2.13 (orga).
- [#8970](https://github.com/1024pix/pix/pull/8970) [BUMP] Monter Ember.js en version 5 sur Pix App (PIX-12596).

## v4.147.0 (21/05/2024)


### :rocket: Amélioration
- [#8974](https://github.com/1024pix/pix/pull/8974) [FEATURE] Ajout de titre aux pages de junior.
- [#8938](https://github.com/1024pix/pix/pull/8938) [FEATURE] Active l'import élève pour les établissement scolaire du premier degré (PIX-12338).
- [#8966](https://github.com/1024pix/pix/pull/8966) [FEATURE]  Changement de style dans des page resume/result des missions (Pix-12568).
- [#8935](https://github.com/1024pix/pix/pull/8935) [FEATURE] Supprimer la colonne "grainId" de la table "element-answers" (PIX-12459).
- [#8941](https://github.com/1024pix/pix/pull/8941) [FEATURE] Rattrapage de la feature "LEARNER_IMPORT" pour les organisation sco-1d (PIX-12339).

### :building_construction: Tech
- [#8906](https://github.com/1024pix/pix/pull/8906) [TECH] Migrer la route POST /api/oidc/users vers src/identity-access-management (PIX-12503).
- [#8921](https://github.com/1024pix/pix/pull/8921) [TECH] Utiliser le composant Pixtoggle pour filtrer les campagnes que l'on souhaite voir (PIX-10467).

### :bug: Correction
- [#8947](https://github.com/1024pix/pix/pull/8947) [BUGFIX] utilise un nouveau composant pour afficher le markdown (pix-12552).
- [#8958](https://github.com/1024pix/pix/pull/8958) [BUGFIX] Le codeEcole ne s'actualise pas correctement lors des choix d'oragnisations (Pix-12569).

### :arrow_up: Montée de version
- [#8956](https://github.com/1024pix/pix/pull/8956) [BUMP] Update dependency @1024pix/pix-ui to v46 (admin).
- [#8972](https://github.com/1024pix/pix/pull/8972) [BUMP] Update dependency @1024pix/eslint-config to ^1.2.13 (junior).
- [#8969](https://github.com/1024pix/pix/pull/8969) [BUMP] Update dependency @1024pix/pix-ui to ^46.2.0 (orga).
- [#8968](https://github.com/1024pix/pix/pull/8968) [BUMP] Update dependency @1024pix/pix-ui to ^46.2.0 (mon-pix).
- [#8961](https://github.com/1024pix/pix/pull/8961) [BUMP] Update dependency @1024pix/pix-ui to ^46.0.3 (certif).
- [#8960](https://github.com/1024pix/pix/pull/8960) [BUMP] Lock file maintenance (dossier racine).
- [#8936](https://github.com/1024pix/pix/pull/8936) [BUMP] Update dependency @1024pix/pix-ui to v46 (certif) (PIX-12547).
- [#8955](https://github.com/1024pix/pix/pull/8955) [BUMP] Update dependency ember-data to v4.12.8 (certif) (PIX-12572).
- [#8934](https://github.com/1024pix/pix/pull/8934) [BUMP] Update dependency @1024pix/pix-ui to v46 (mon-pix).
- [#8953](https://github.com/1024pix/pix/pull/8953) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.14 (orga).
- [#8952](https://github.com/1024pix/pix/pull/8952) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.14 (mon-pix).
- [#8951](https://github.com/1024pix/pix/pull/8951) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.14 (junior).
- [#8949](https://github.com/1024pix/pix/pull/8949) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.14 (certif).
- [#8948](https://github.com/1024pix/pix/pull/8948) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.14 (admin).
- [#8946](https://github.com/1024pix/pix/pull/8946) [BUMP] Update dependency @1024pix/pix-ui to ^46.0.3 (orga).

## v4.146.0 (16/05/2024)


### :rocket: Amélioration
- [#8930](https://github.com/1024pix/pix/pull/8930) [FEATURE] Ajout du support de Typescript sur PixOrga (PIX-12474).

### :building_construction: Tech
- [#8511](https://github.com/1024pix/pix/pull/8511) [TECH] Ajoute un ADR sur la communication entre bounded contexts.
- [#8931](https://github.com/1024pix/pix/pull/8931) [TECH] sépare le usecase de remplacement des learner (Pix-12529).
- [#8918](https://github.com/1024pix/pix/pull/8918) [TECH] découpe le use case d'import de learner sup (Pix-11942).
- [#8827](https://github.com/1024pix/pix/pull/8827) [TECH] Petit refacto du mail-service pour la gestion de la langue (PIX-12193).

### :bug: Correction
- [#8943](https://github.com/1024pix/pix/pull/8943) [BUGFIX] Passer à l'étape suivante même lorsque le didacticiel a été joué (Pix-12548).
- [#8917](https://github.com/1024pix/pix/pull/8917) [BUGFIX] Enchainement effectif des étapes d'une mission (PIX-12489).

### :arrow_up: Montée de version
- [#8927](https://github.com/1024pix/pix/pull/8927) [BUMP] Update dependency node to v20.13.1.
- [#8933](https://github.com/1024pix/pix/pull/8933) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.13 (orga).
- [#8929](https://github.com/1024pix/pix/pull/8929) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.13 (mon-pix).
- [#8928](https://github.com/1024pix/pix/pull/8928) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.13 (junior).
- [#8923](https://github.com/1024pix/pix/pull/8923) [BUMP] Lock file maintenance (mon-pix).
- [#8924](https://github.com/1024pix/pix/pull/8924) [BUMP] Lock file maintenance (api).

### :coffee: Autre
- [#8932](https://github.com/1024pix/pix/pull/8932) [FEATURES] Renommage de pix 1d en Pix Junior dans le front de l'application.

## v4.145.0 (15/05/2024)


### :rocket: Amélioration
- [#8848](https://github.com/1024pix/pix/pull/8848) [FEATURE] Afficher si le centre de certification est pilote certification seule dans Pix Admin (PIX-12441).
- [#8907](https://github.com/1024pix/pix/pull/8907) [FEATURE] Ajouter une nouvelle categorie pour les Profil Cible Pix+ (PIX-12429).
- [#8792](https://github.com/1024pix/pix/pull/8792) [FEATURE] Amélioration de la formule de score pour simulateurs (PIX-12316).
- [#8880](https://github.com/1024pix/pix/pull/8880) [FEATURE] Pix App : Arrêt du support des Elements dans les modules (PIX-12455).
- [#8887](https://github.com/1024pix/pix/pull/8887) [FEATURE] Ajout d'une bannière avec le code Mission dans Pix Orga (Pix-12444).

### :building_construction: Tech
- [#8916](https://github.com/1024pix/pix/pull/8916) [TECH] Corrige la parallélisation des tests front sur la CI.
- [#8914](https://github.com/1024pix/pix/pull/8914) [TECH] Migrer la route /api/campaigns/{id}/divisions dans son Bounded Context (Pix-12517).
- [#8919](https://github.com/1024pix/pix/pull/8919) [TECH] Parallélise l'exécution des tests d'acceptance de l'API sur la CI.
- [#8915](https://github.com/1024pix/pix/pull/8915) [TECH] :recycle: Construit l'URL pour pix junior depuis l'URL courante plutôt qu'une variable .
- [#8845](https://github.com/1024pix/pix/pull/8845) [TECH] Ajouter une valeur par défaut pour LOG_ENABLED.

### :bug: Correction
- [#8909](https://github.com/1024pix/pix/pull/8909) [BUGFIX] Ne plus envoyer le hasComplementaryReferential lors de l'ajout d'un candidat avec certification complémentaire sur Pix Certif (PIX-12491).

### :arrow_up: Montée de version
- [#8925](https://github.com/1024pix/pix/pull/8925) [BUMP] Update Node.js to v20.13.0.
- [#8819](https://github.com/1024pix/pix/pull/8819) [BUMP] Update dependency ember-data to v4.12.7 (certif).
- [#8922](https://github.com/1024pix/pix/pull/8922) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.13 (certif).
- [#8920](https://github.com/1024pix/pix/pull/8920) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.13 (admin).
- [#8904](https://github.com/1024pix/pix/pull/8904) [BUMP] Update dependency @1024pix/pix-ui to v46 (orga) (PIX-12492).
- [#8911](https://github.com/1024pix/pix/pull/8911) [BUMP] Update dependency @1024pix/pix-ui to ^45.5.2 (junior).
- [#8912](https://github.com/1024pix/pix/pull/8912) [BUMP] Update dependency @1024pix/pix-ui to ^45.5.2 (orga).
- [#8908](https://github.com/1024pix/pix/pull/8908) [BUMP] Update nginx Docker tag to v1.26.0.

## v4.144.0 (14/05/2024)


### :rocket: Amélioration
- [#8871](https://github.com/1024pix/pix/pull/8871) [FEATURE] Permettre l'activation de fonctionnalité en masse sur les organisations (PIX-12413).
- [#8882](https://github.com/1024pix/pix/pull/8882) [FEATURE] Utiliser l'attribut `isDisabled` des PixCheckbox et PixRadioButton (PIX-12471).

### :building_construction: Tech
- [#8910](https://github.com/1024pix/pix/pull/8910) [TECH] [Admin] Ne pas exécuter un test flaky de "Integration | Component | administration/organizations-import".

### :bug: Correction
- [#8843](https://github.com/1024pix/pix/pull/8843) [BUGFIX] Réparer l'alignement des labels des épreuves (PIX-12438).
- [#8898](https://github.com/1024pix/pix/pull/8898) [BUGFIX] Rendre visible les checkboxs dont le label est masqué sur Pix Certif (PIX-12482).

### :arrow_up: Montée de version
- [#8905](https://github.com/1024pix/pix/pull/8905) [BUMP] Update dependency node to v20.13.0.
- [#8903](https://github.com/1024pix/pix/pull/8903) [BUMP] Update adobe/s3mock Docker tag to v3.7.3 (dossier racine).
- [#8894](https://github.com/1024pix/pix/pull/8894) [BUMP] Update dependency @1024pix/eslint-config to ^1.2.12 (dossier racine).
- [#8901](https://github.com/1024pix/pix/pull/8901) [BUMP] Update dependency @1024pix/pix-ui to ^45.5.2 (admin).
- [#8900](https://github.com/1024pix/pix/pull/8900) [BUMP] Update dependency @1024pix/eslint-config to ^1.2.12 (orga).

## v4.143.0 (13/05/2024)


### :rocket: Amélioration
- [#8670](https://github.com/1024pix/pix/pull/8670) [FEATURE] Afficher les étapes de Smart Random® dans le simulateur (PIX-11562).
- [#8831](https://github.com/1024pix/pix/pull/8831) [FEATURE] Mettre à jour le lien de redirection vers le centre d'aide sur Pix Certif (PIX-12405).
- [#8829](https://github.com/1024pix/pix/pull/8829) [FEATURE] Conditionner l'affichage du bloc en fonction de si la complémentaire sélectionnée possède un référentiel externe (PIX-12215).
- [#8861](https://github.com/1024pix/pix/pull/8861) [FEATURE] Désactiver les champs de réponses et les embed après avoir répondu (Pix-12425).
- [#8837](https://github.com/1024pix/pix/pull/8837) [FEATURE] Arrêt du support des Elements et migration vers Components dans les modules (PIX-12454).

### :building_construction: Tech
- [#8868](https://github.com/1024pix/pix/pull/8868) [TECH] Renomme le répertoire 1d en junior (PIX-12326).
- [#8863](https://github.com/1024pix/pix/pull/8863) [TECH] Migrer la route GET /api/oidc/authorization-url vers src/identity-access-management (PIX-12452).
- [#8864](https://github.com/1024pix/pix/pull/8864) [TECH] Construit l'application 1d dans le répertoire junior.
- [#8859](https://github.com/1024pix/pix/pull/8859) [TECH] Migrer la route GET /api/oidc/redirect-logout-url vers src/identity-access-management (PIX-12450).
- [#8620](https://github.com/1024pix/pix/pull/8620) [TECH] Protège de commit sur la branche dev via Husky.
- [#8858](https://github.com/1024pix/pix/pull/8858) [TECH] Migrer la route GET /api/oidc/identity-providers vers src/identity-access-management (PIX-12446).
- [#8851](https://github.com/1024pix/pix/pull/8851) [TECH] Migrer la route GET /api/admin/oidc/identity-providers vers src/identity-access-management (PIX-12435).
- [#8857](https://github.com/1024pix/pix/pull/8857) [TECH] Montée de version de ember-source et ember-data en 5+ (PIX-12408).
- [#8852](https://github.com/1024pix/pix/pull/8852) [TECH] Renommer la variable emitOpsEventEachSeconds.
- [#8836](https://github.com/1024pix/pix/pull/8836) [TECH] Déplacer la route /api/campaign/{campaignId}/divisions dans son BC (PIX-12423).
- [#8754](https://github.com/1024pix/pix/pull/8754) [TECH] Ajoute la certification complementaire PRO_SANTE (PIX-12284).
- [#8697](https://github.com/1024pix/pix/pull/8697) [TECH] Remise à jour de la config `docker compose`.
- [#8844](https://github.com/1024pix/pix/pull/8844) [TECH] Supprimer les propriétés de configuration des SSO OIDC devenues inutiles (PIX-12439).
- [#8833](https://github.com/1024pix/pix/pull/8833) [TECH] Utiliser le service générique pour les services OIDC non-spécifiques (PIX-10193).

### :bug: Correction
- [#8895](https://github.com/1024pix/pix/pull/8895) [BUGFIX] Le texte alternatif des épreuves ne s'affichait pas si c'était null (PIX-12479).
- [#8849](https://github.com/1024pix/pix/pull/8849) [BUGFIX] Corriger l'alignement de la tooltip des crédits (PIX-12443).

### :arrow_up: Montée de version
- [#8899](https://github.com/1024pix/pix/pull/8899) [BUMP] Update dependency @1024pix/eslint-config to ^1.2.12 (mon-pix).
- [#8897](https://github.com/1024pix/pix/pull/8897) [BUMP] Update dependency @1024pix/eslint-config to ^1.2.12 (load-testing).
- [#8893](https://github.com/1024pix/pix/pull/8893) [BUMP] Update dependency @1024pix/eslint-config to ^1.2.12 (certif).
- [#8889](https://github.com/1024pix/pix/pull/8889) [BUMP] Update dependency @1024pix/eslint-config to ^1.2.12 (api).
- [#8890](https://github.com/1024pix/pix/pull/8890) [BUMP] Update dependency @1024pix/eslint-config to ^1.2.12 (audit-logger).
- [#8883](https://github.com/1024pix/pix/pull/8883) [BUMP] Update adobe/s3mock Docker tag to v3.7.3 (.circleci).
- [#8886](https://github.com/1024pix/pix/pull/8886) [BUMP] Update dependency @1024pix/eslint-config to ^1.2.12 (admin).
- [#8885](https://github.com/1024pix/pix/pull/8885) [BUMP] Update dependency @1024pix/eslint-config to ^1.2.12 (1d).
- [#8884](https://github.com/1024pix/pix/pull/8884) [BUMP] Update adobe/s3mock Docker tag to v3.7.3 (docker).
- [#8879](https://github.com/1024pix/pix/pull/8879) [BUMP] Update adobe/s3mock Docker tag to v3.7.2 (docker).
- [#8878](https://github.com/1024pix/pix/pull/8878) [BUMP] Update adobe/s3mock Docker tag to v3.7.2 (.circleci).
- [#8877](https://github.com/1024pix/pix/pull/8877) [BUMP] Update dependency redis to v7.2.4.
- [#8876](https://github.com/1024pix/pix/pull/8876) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.12 (orga).
- [#8873](https://github.com/1024pix/pix/pull/8873) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.12 (admin).
- [#8875](https://github.com/1024pix/pix/pull/8875) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.12 (mon-pix).
- [#8874](https://github.com/1024pix/pix/pull/8874) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.12 (certif).
- [#8870](https://github.com/1024pix/pix/pull/8870) [BUMP] Update dependency @1024pix/pix-ui to ^45.5.0 (admin).
- [#8872](https://github.com/1024pix/pix/pull/8872) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.12 (1d).
- [#8869](https://github.com/1024pix/pix/pull/8869) [BUMP] Update dependency @1024pix/pix-ui to ^45.4.4 (1d).
- [#8867](https://github.com/1024pix/pix/pull/8867) [BUMP] Update dependency @1024pix/eslint-config to ^1.2.11 (orga).
- [#8853](https://github.com/1024pix/pix/pull/8853) [BUMP] Update dependency @1024pix/eslint-config to ^1.2.11 (api).
- [#8866](https://github.com/1024pix/pix/pull/8866) [BUMP] Update dependency @1024pix/eslint-config to ^1.2.11 (mon-pix).
- [#8865](https://github.com/1024pix/pix/pull/8865) [BUMP] Update dependency @1024pix/eslint-config to ^1.2.11 (load-testing).
- [#8856](https://github.com/1024pix/pix/pull/8856) [BUMP] Update dependency @1024pix/eslint-config to ^1.2.11 (dossier racine).
- [#8860](https://github.com/1024pix/pix/pull/8860) [BUMP] Update dependency @1024pix/pix-ui to ^45.4.2 (1d).
- [#8855](https://github.com/1024pix/pix/pull/8855) [BUMP] Update dependency @1024pix/eslint-config to ^1.2.11 (certif).
- [#8854](https://github.com/1024pix/pix/pull/8854) [BUMP] Update dependency @1024pix/eslint-config to ^1.2.11 (audit-logger).
- [#8847](https://github.com/1024pix/pix/pull/8847) [BUMP] Update dependency @1024pix/eslint-config to ^1.2.11 (admin).
- [#8846](https://github.com/1024pix/pix/pull/8846) [BUMP] Update dependency @1024pix/eslint-config to ^1.2.11 (1d).
- [#8839](https://github.com/1024pix/pix/pull/8839) [BUMP] Update dependency @1024pix/pix-ui to ^45.4.1 (admin).
- [#8526](https://github.com/1024pix/pix/pull/8526) [BUMP] Update dependency @1024pix/pix-ui to v45 (1d) (PIX-12415).

### :coffee: Autre
- [#8888](https://github.com/1024pix/pix/pull/8888) [TYPO] Correction d'une petite typo dans la page de création d'une orga.

## v4.142.0 (06/05/2024)


### :rocket: Amélioration
- [#8798](https://github.com/1024pix/pix/pull/8798) [FEATURE] Conditionner l'affichage de la séparation pix/pix+ dans la modale d'ajout de candidat sur Pix Certif (PIX-12214).
- [#8828](https://github.com/1024pix/pix/pull/8828) [FEATURE] ajoute une route pour récupérer les participations d'un prescrit à une campagne (PIX-11638).
- [#8832](https://github.com/1024pix/pix/pull/8832) [FEATURE] Retirer l'enquête Sco dans le bandeau du dashboard (PIX-12345).
- [#8826](https://github.com/1024pix/pix/pull/8826) [FEATURE] Affiche les épreuves contenant des illustrations/embed et un formulaire sur 2 colonnes (PIX-11513).
- [#8823](https://github.com/1024pix/pix/pull/8823) [FEATURE] Supporter l'affichage des `components` (PIX-12364) (PIX-12023).

### :building_construction: Tech
- [#8830](https://github.com/1024pix/pix/pull/8830) [TECH] Ajouter un test manquant sur les custom required claims (PIX-12401).
- [#8834](https://github.com/1024pix/pix/pull/8834) [TECH] Déplacer la route `/api/admin/target-profiles/{id}/detach-organizations` dans son BC (Pix-12422).
- [#8742](https://github.com/1024pix/pix/pull/8742) [TECH] Migrer les erreurs du domaine Evaluation (PIX-12295).
- [#8793](https://github.com/1024pix/pix/pull/8793) [TECH] Monter la version de pix-ui.
- [#8751](https://github.com/1024pix/pix/pull/8751) [TECH] Ajout de la colonne de typage des souscriptions à une certification (PIX-1221).

### :bug: Correction
- [#8807](https://github.com/1024pix/pix/pull/8807) [BUGFIX][MON-PIX] Modifier l'URL du bandeau de politique de protection des données en néerlandais qui s'affiche lorsqu'elle a été modifié (PIX-11707).
- [#8824](https://github.com/1024pix/pix/pull/8824) [BUGFIX] Permettre de contribuer des CFs anglophone (PIX-12348).

### :arrow_up: Montée de version
- [#8840](https://github.com/1024pix/pix/pull/8840) [BUMP] Update dependency @1024pix/pix-ui to ^45.4.1 (certif).
- [#8838](https://github.com/1024pix/pix/pull/8838) [BUMP] Update dependency @1024pix/pix-ui to ^45.4.1 (mon-pix).

### :coffee: Autre
- [#8803](https://github.com/1024pix/pix/pull/8803) [ORGA] Afficher le décompte des places dans le header de l'application (PIX-12246).

## v4.141.0 (02/05/2024)


### :rocket: Amélioration
- [#8822](https://github.com/1024pix/pix/pull/8822) [FEATURE] Corrections de mise en forme et de traductions de "compétences" (PIX-12407).
- [#8756](https://github.com/1024pix/pix/pull/8756) [FEATURE] Masquer les indices dans l'activité finale qroc. Module bien-ecrire-son-adresse-mail (MODC-83).
- [#8796](https://github.com/1024pix/pix/pull/8796) [FEATURE] Ajouter components à notre Module Serializer (PIX-12300).
- [#8789](https://github.com/1024pix/pix/pull/8789) [FEATURE][ADMIN] Ajouter l'espagnol dans la liste des langues disponibles (PIX-12196).

### :building_construction: Tech
- [#8825](https://github.com/1024pix/pix/pull/8825) [TECH] Fusion des domaines UserAccount et Authentication en IdentityAccessManagement (PIX-12399).
- [#8777](https://github.com/1024pix/pix/pull/8777) [TECH] Migrer tous les services OIDC vers src/authentication (PIX-10194).
- [#8811](https://github.com/1024pix/pix/pull/8811) [TECH] migrer la route `/api/admin/target-profiles/{id}/attach-organizations` dans le BC prescription (PIX-12379).
- [#8804](https://github.com/1024pix/pix/pull/8804) [TECH] Corriger l'unicité des requiredClaims (PIX-12368).
- [#8799](https://github.com/1024pix/pix/pull/8799) [TECH] Migrer la liste des campagnes dans PixAdmin dans le Bounded context Prescription  (PIX-12358).
- [#8808](https://github.com/1024pix/pix/pull/8808) [TECH] Migrer `/api/admin/organizations/{id}/attach-target-profiles` dans le BC Prescription (PIX-12369).
- [#8630](https://github.com/1024pix/pix/pull/8630) [TECH] :recycle: Déplacement des fichiers utilitaires pour `ODS` vers `src/shared`.
- [#8761](https://github.com/1024pix/pix/pull/8761) [TECH] Supprimer l'utilisation du custom logoutUrlTemporaryStorage (PIX-12119).
- [#8683](https://github.com/1024pix/pix/pull/8683) [TECH] Utiliser l'API interne pour récupérer les organization-learners (Pix-12134).
- [#8505](https://github.com/1024pix/pix/pull/8505) [TECH] :recycle:  Déplacement du model `Organization` vers `src/shared`.

### :bug: Correction
- [#8755](https://github.com/1024pix/pix/pull/8755) [BUGFIX] Afficher le message d'erreur correct pour un utilisateur qui s'inscrit sur PixOrga avec un email déjà connu (PIX-11342).
- [#8752](https://github.com/1024pix/pix/pull/8752) [BUGFIX] Vérifier la présence d'un doublon de session uniquement dans le centre de certification courant lors de l'import en masse sur Pix Certif (PIX-11930).

### :arrow_up: Montée de version
- [#8818](https://github.com/1024pix/pix/pull/8818) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.10 (orga).
- [#8817](https://github.com/1024pix/pix/pull/8817) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.10 (mon-pix).
- [#8816](https://github.com/1024pix/pix/pull/8816) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.10 (certif).
- [#8815](https://github.com/1024pix/pix/pull/8815) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.10 (admin).
- [#8814](https://github.com/1024pix/pix/pull/8814) [BUMP] Update dependency @1024pix/stylelint-config to ^5.1.10 (1d).
- [#8812](https://github.com/1024pix/pix/pull/8812) [BUMP] Update dependency @1024pix/eslint-config to ^1.2.10 (mon-pix).
- [#8813](https://github.com/1024pix/pix/pull/8813) [BUMP] Update dependency @1024pix/eslint-config to ^1.2.10 (orga).
- [#8810](https://github.com/1024pix/pix/pull/8810) [BUMP] Update dependency @1024pix/eslint-config to ^1.2.10 (load-testing).    
- [#8809](https://github.com/1024pix/pix/pull/8809) [BUMP] Update dependency @1024pix/eslint-config to ^1.2.10 (dossier racine).
- [#8806](https://github.com/1024pix/pix/pull/8806) [BUMP] Update dependency @1024pix/eslint-config to ^1.2.10 (certif).
- [#8805](https://github.com/1024pix/pix/pull/8805) [BUMP] Update dependency @1024pix/eslint-config to ^1.2.10 (audit-logger).
- [#8802](https://github.com/1024pix/pix/pull/8802) [BUMP] Update dependency @1024pix/eslint-config to ^1.2.10 (api).


## Anciennes versions

Nous avons retiré de notre changelog les versions < v4.141.0. Elles sont disponibles en remontant dans l'historique du fichier jusqu'au 25 novembre 2024.
