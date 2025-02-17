const getCommonIcons = require('@1024pix/pix-ui/config/icons.js');
const commonIcons = getCommonIcons();

module.exports = () => ({
  'free-brands-svg-icons': ['facebook-f', 'linkedin-in', 'twitter'],
  'free-solid-svg-icons': [
    ...commonIcons['free-solid-svg-icons'],
    'arrow-down',
    'arrow-left',
    'arrows-rotate',
    'arrow-up',
    'arrow-up-right-from-square',
    'bars',
    'bookmark',
    'circle-stop',
    'circle-user',
    'circle-xmark',
    'clock',
    'copy',
    'flag',
    'globe',
    'hourglass-end',
    'image',
    'link',
    'lock',
    'minus',
    'pen',
    'power-off',
    'right-from-bracket',
    'right-long',
    'rotate-right',
    'signal',
    'stopwatch',
    'times-circle',
    'thumbs-up',
    'volume-high',
    'volume-xmark',
  ],
  'free-regular-svg-icons': ['bookmark', 'copy', 'thumbs-up'],
});
