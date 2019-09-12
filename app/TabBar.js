import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {BottomTabBar} from 'react-navigation';

export default class TabBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            offset: new Animated.Value(0),
        };
    }

    componentWillReceiveProps(props){
        const oldState = this.props.navigation.state;
        const oldRoute = oldState.routes[oldState.index];
        const oldParams = oldRoute.params;
        const wasVisible = !oldParams || oldParams.showTabBar;
        const newState = props.navigation.state;
        const newRoute = newState.routes[newState.index];
        const newParams = newRoute.params;
        const isVisible = !newParams || newParams.showTabBar;
    }

    render(){
        return(
            <Animated.View style={[styles.container, {bottom: this.state.offset}]}>
                <BottomTabBar {...this.props}/>
            </Animated.View>
        );
    }
}

const styles=StyleSheet.create({
    container:{

    }
})