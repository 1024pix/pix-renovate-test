import PixBackgroundHeader from '@1024pix/pix-ui/components/pix-background-header';
import PixBlock from '@1024pix/pix-ui/components/pix-block';

import CertificationStarter from '../certification-starter';
import CompanionBlocker from '../companion/blocker';
import AppLayout from '../global/app-layout';

<template>
  <AppLayout>
    <CompanionBlocker>
      <main class="main" role="main">
        <PixBackgroundHeader id="main">
          <PixBlock @shadow="heavy" class="certification-start-page__block">
            <CertificationStarter @certificationCandidateSubscription={{@certificationCandidateSubscription}} />
          </PixBlock>
        </PixBackgroundHeader>
      </main>
    </CompanionBlocker>
  </AppLayout>
</template>
