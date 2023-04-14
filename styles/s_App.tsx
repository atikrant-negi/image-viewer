import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    
    // ---------- containers

    primaryContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    titleContainer: {
        backgroundColor: 'rgb(18, 36, 46)',
        flex: 0.1,
        justifyContent: 'center',
        borderBottomColor: 'rgb(215, 220, 230)',
        borderBottomWidth: 3
    },
    imageContainer: {
        backgroundColor: '#111',
        flex: 0.8,
        display: 'flex',
        flexDirection: 'column',
        padding: 5
    },
    controlContainer: {
        backgroundColor: 'rgb(18, 36, 46)',
        display: 'flex',
        flexDirection: 'row',
        flex: 0.1,
        borderColor: 'rgb(215, 220, 230)',
        borderTopWidth: 3,
        borderBottomWidth: 3
    },

    // ---------- components

    titleText: {
        color: 'rgb(215, 220, 230)',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    image: {
        flex: 1,
        resizeMode: 'contain'
    },
    buttonLeft: {
        flex: 0.2,
        marginLeft: 10,
        alignSelf: 'center',
    },
    buttonMiddle: {
        flex: 0.6,
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    buttonRight: {
        flex: 0.2,
        marginRight: 10,
        alignSelf: 'center',
    },
    loader: {
        flex: 1,
        justifyContent: 'center'
    }
    
});

export default styles;