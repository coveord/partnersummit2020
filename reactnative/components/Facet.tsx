import {FacetState, FacetValue} from '@coveo/headless';
import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  TouchableHighlight,
  View,
  ViewStyle,
} from 'react-native';
import {Card, CheckBox, ListItem, Text} from 'react-native-elements';

export type FacetProps = FacetState & {
  title: string;
  onSelect: (v: FacetValue) => void;
};

const styles: {
  View: StyleProp<ViewStyle>;
  ListItem: StyleProp<ViewStyle>;
  Card: StyleProp<ViewStyle>;
  CardTitle: StyleProp<ViewStyle>;
  ActivityIndicator: StyleProp<ViewStyle>;
} = {
  View: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'flex-start',
  },
  ListItem: {
    overflow: 'hidden',
    padding: 0,
  },
  Card: {
    paddingHorizontal: 10,
  },
  CardTitle: {
    alignItems: 'center',
  },
  ActivityIndicator: {
    marginLeft: 10,
  },
};

export const Facet: React.FunctionComponent<FacetProps> = (props) => {
  return (
    <Card containerStyle={styles.Card}>
      <Card.Title style={styles.CardTitle}>
        {props.title}
        <ActivityIndicator
          style={styles.ActivityIndicator}
          animating={props.isLoading}
        />
      </Card.Title>
      <Card.Divider />
      {props.values.length === 0 ? <Text>No Values</Text> : null}
      {props.values.map((v) => {
        return (
          <ListItem
            key={v.value}
            containerStyle={styles.ListItem}
            style={styles.ListItem}
            bottomDivider>
            <TouchableHighlight onPress={() => props.onSelect(v)}>
              <View style={styles.View}>
                <CheckBox checked={v.state === 'selected'} />
                <Text>
                  {v.value} ({v.numberOfResults})
                </Text>
              </View>
            </TouchableHighlight>
          </ListItem>
        );
      })}
    </Card>
  );
};
