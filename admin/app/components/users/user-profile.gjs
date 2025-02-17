<template>
  <h2 class="page-section__title">Profil utilisateur</h2>

  <div class="user-profile-total-pix">
    <p class="user-profile-total-pix__score">{{@profile.pixScore}}</p>
    <p>Total pix obtenu</p>
  </div>

  <div class="user-profile-table">
    <table class="table-admin">
      <caption class="screen-reader-only">Pix et niveau obtenus en fonction des compétences</caption>
      <thead>
        <tr>
          <th scope="col">Compétences</th>
          <th scope="col">Pix</th>
          <th scope="col">Niveau</th>
        </tr>
      </thead>
      <tbody>
        {{#each @profile.scorecards as |scorecard|}}
          <tr>
            <td>{{scorecard.name}}</td>
            <td>{{scorecard.earnedPix}}</td>
            <td>{{scorecard.level}}</td>
          </tr>
        {{else}}
          <tr>
            <td colspan="10" class="table-admin-empty">Aucun résultat</td>
          </tr>
        {{/each}}
      </tbody>
    </table>
  </div>
</template>
