import PixBannerAlert from '@1024pix/pix-ui/components/pix-banner-alert';
import { t } from 'ember-intl';

<template>
  <PixBannerAlert @type="communication">
    {{t "pages.modulix.beta-banner"}}
  </PixBannerAlert>
</template>
