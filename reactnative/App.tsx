/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import SearchBox from './components/SearchBox';
import {Theme} from './app/Theme';
import {ResultList} from './components/ResultList';
import {Header, Overlay} from 'react-native-elements';
import {Sort} from './components/Sort';
import engine from './app/Engine';
import {
  AnalyticsActions,
  buildFacet,
  FacetValue,
  SearchActions,
  FacetState,
} from '@coveo/headless';
import {Summary} from './components/Summary';
import {Facet} from './components/Facet';
import {Facet as HeadlessFacet} from '@coveo/headless';

const styles = {
  Header: {
    color: '#fff',
  },
  Summary: {
    paddingLeft: 10,
  },
  Overlay: {
    width: '80%',
    height: '80%',
  },
};

class App extends React.Component<
  {},
  {open: boolean; facets: Record<string, FacetState>}
> {
  private facets: Record<string, HeadlessFacet> = {};
  constructor(props: {}) {
    super(props);
    this.state = {
      open: false,
      facets: {},
    };
    this.buildFacets();
  }

  render() {
    return (
      <Theme>
        <SafeAreaView>
          {this.header}
          {this.overlay}
          <SearchBox />
          <View style={styles.Summary}>
            <Summary />
          </View>
          <Sort />
          <ResultList />
        </SafeAreaView>
      </Theme>
    );
  }

  componentDidMount() {
    engine.dispatch(
      SearchActions.executeSearch(AnalyticsActions.logInterfaceLoad()) as any,
    );

    for (const [, v] of Object.entries(this.facets)) {
      v.subscribe(() => {
        this.setState({facets: this.facetStates});
      });
    }
  }

  onFacetSelect(k: string, v: FacetValue) {
    this.facets[k].toggleSelect(v);
  }

  openOverlay() {
    this.setState({open: true});
  }

  closeOverlay() {
    this.setState({open: false});
  }

  buildFacets() {
    this.facets = {
      'Object Type': buildFacet(engine, {options: {field: 'objecttype'}}),
      'File Type': buildFacet(engine, {options: {field: 'filetype'}}),
      Author: buildFacet(engine, {options: {field: 'author'}}),
    };
  }

  get header() {
    return (
      <Header
        leftComponent={{
          icon: 'filter-list',
          color: '#fff',
          onPress: () => this.openOverlay(),
        }}
        centerComponent={{
          text: 'COVEO HEADLESS DEMO',
          style: {...styles.Header},
        }}
        rightComponent={{
          icon: 'settings',
          color: '#fff',
        }}
      />
    );
  }

  get overlay() {
    return (
      <Overlay
        overlayStyle={styles.Overlay}
        isVisible={this.state.open}
        onBackdropPress={() => this.closeOverlay()}
        animationType="none">
        <ScrollView>{this.facetsOverlay}</ScrollView>
      </Overlay>
    );
  }

  get facetsOverlay() {
    const ret = [];
    for (const [k, v] of Object.entries(this.state.facets)) {
      ret.push(
        <Facet
          key={k}
          {...v}
          title={k}
          onSelect={(val) => this.onFacetSelect(k, val)}
        />,
      );
    }
    return ret;
  }

  get facetStates() {
    const states: Record<string, FacetState> = {};
    for (const [k, v] of Object.entries(this.facets)) {
      states[k] = v.state;
    }
    return states;
  }
}

export default App;
