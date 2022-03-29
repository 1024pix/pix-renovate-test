import Component from '@glimmer/component';

export default class TubeCells extends Component {
  levelOptions = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 3,
      label: '3',
    },
    {
      value: 4,
      label: '4',
    },
    {
      value: 5,
      label: '5',
    },
    {
      value: 6,
      label: '6',
    },
    {
      value: 7,
      label: '7',
    },
    {
      value: 8,
      label: '8',
    },
  ];

  get isNotSelected() {
    const tubeId = this.args.tube.id;
    const tubesSelected = this.args.tubesSelected;

    return !tubesSelected.find((tube) => tube === tubeId);
  }
}
