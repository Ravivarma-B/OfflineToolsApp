import React from 'react';
import { Text, View } from 'react-native';

class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    return this.state.hasError ? <View><Text>Error occurred</Text></View> : this.props.children;
  }
}