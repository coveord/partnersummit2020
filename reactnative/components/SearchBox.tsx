import {buildSearchBox, SearchBoxState} from '@coveo/headless';
import React from 'react';
import {SearchBar} from 'react-native-elements';
import {SearchBox as HeadlessSearchbox} from '@coveo/headless';
import engine from '../app/Engine';

class SearchBox extends React.Component<
  {},
  Pick<SearchBoxState, 'suggestions' | 'value' | 'isLoading'>
> {
  private searchbox: HeadlessSearchbox;
  private mounted = false;
  constructor(props: {}) {
    super(props);
    this.state = {
      suggestions: [],
      value: '',
      isLoading: false,
    };
    this.searchbox = buildSearchBox(engine);
    this.searchbox.subscribe(() => {
      this.mounted && this.setState({...this.searchbox.state});
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
      <SearchBar
        value={this.state.value}
        onChangeText={(t) => this.onChangeText(t)}
        onClear={() => this.onClear()}
        onEndEditing={() => this.onSubmit()}
        showLoading={this.state.isLoading}
      />
    );
  }

  onChangeText(t: string) {
    this.searchbox.updateText(t);
  }

  onClear() {
    this.searchbox.clear();
  }

  onSubmit() {
    this.searchbox.submit();
  }
}

export default SearchBox;
