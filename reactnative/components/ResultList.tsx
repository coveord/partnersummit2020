import React from 'react';
import {
  buildResultList,
  ResultList as HeadlessResultList,
  ResultListState,
} from '@coveo/headless';
import engine from '../app/Engine';
import {ScrollView} from 'react-native';
import {ListItem, Text} from 'react-native-elements';

const styles = {
  paddingVertical: 10,
};

export class ResultList extends React.Component<{}, ResultListState, null> {
  private headlessResultList: HeadlessResultList;
  private mounted = false;
  constructor(props: {}) {
    super(props);
    this.headlessResultList = buildResultList(engine);
    this.state = {
      isLoading: false,
      results: [],
    };
    this.headlessResultList.subscribe(() => {
      this.mounted && this.setState({...this.headlessResultList.state});
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
      <ScrollView>
        {this.state.results.map((r) => {
          return (
            <ListItem key={r.uniqueId} bottomDivider={true} topDivider={true}>
              <ListItem.Content>
                <ListItem.Title>
                  {r.title}
                  {r.raw.date}
                </ListItem.Title>
                <Text style={styles}>{r.excerpt}</Text>
              </ListItem.Content>
            </ListItem>
          );
        })}
      </ScrollView>
    );
  }
}
