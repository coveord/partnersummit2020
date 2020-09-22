import {
  SortState,
  Sort as HeadlessSort,
  buildSort,
  SortCriterion,
  buildRelevanceSortCriterion,
  buildDateSortCriterion,
} from '@coveo/headless';
import React from 'react';
import {ButtonGroup} from 'react-native-elements';
import engine from '../app/Engine';

export class Sort extends React.Component<{}, SortState> {
  private headlessSort: HeadlessSort;
  private sortByRelevance: SortCriterion;
  private sortByDate: SortCriterion;
  private mounted = false;
  constructor(props: {}) {
    super(props);
    this.headlessSort = buildSort(engine);
    this.sortByRelevance = buildRelevanceSortCriterion();
    this.sortByDate = buildDateSortCriterion('descending');
    this.state = {
      sortCriteria: this.sortByRelevance.expression,
    };
    this.headlessSort.subscribe(() => {
      this.mounted && this.setState({...this.headlessSort.state});
    });
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <ButtonGroup
        buttons={this.buttons}
        onPress={(i) => this.onSortSelected(i)}
        selectedIndex={this.selectedIndex}
      />
    );
  }

  private get buttons() {
    return ['Relevance', 'Date'];
  }

  private get selectedIndex() {
    return this.state.sortCriteria === this.sortByRelevance.expression ? 0 : 1;
  }

  onSortSelected(idx: number) {
    idx === 0
      ? this.headlessSort.sortBy(this.sortByRelevance)
      : this.headlessSort.sortBy(this.sortByDate);
  }
}
