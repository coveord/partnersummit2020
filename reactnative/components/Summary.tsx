import React from 'react';
import {
  buildQuerySummary,
  QuerySummary,
  QuerySummaryState,
} from '@coveo/headless';
import {Text} from 'react-native';
import engine from '../app/Engine';

export class Summary extends React.Component<{}, QuerySummaryState> {
  private querySummary: QuerySummary;
  private mounted = false;
  constructor(props: {}) {
    super(props);
    this.querySummary = buildQuerySummary(engine);
    this.state = this.querySummary.state;
    this.querySummary.subscribe(() => {
      this.mounted && this.setState({...this.querySummary.state});
    });
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    if (this.state.hasResults) {
      return (
        <Text>
          Results {this.state.firstResult}-{this.state.lastResult} of{' '}
          {this.state.total}
          {this.state.hasQuery ? ` for ${this.state.query}` : ''} in{' '}
          {this.state.durationInSeconds} seconds
        </Text>
      );
    }

    return <Text>No results</Text>;
  }
}
