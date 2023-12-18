// @packages
import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native'; 
import {Ionicons} from '@expo/vector-icons'; 
// @scripts
import Colors from '../../constants/Colors';


const OutlinedButton = ({onPress, icon, children}) => {
    return <Pressable onPress={onPress} style={({pressed}) => [styles.button, pressed && styles.pressed]}>
        <Ionicons name={icon} size={18} color={Colors.primary} style={styles.icon}/>
        <Text style={styles.text}>{children}</Text>
    </Pressable>
}

export default OutlinedButton; 

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12, 
        paddingVertical: 6, 
        margin: 4, 
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center', 
        borderWidth: 1, 
        borderColor: Colors.primary, 
    }, 
    pressed: {
        opacity: 0.7, 
    }, 
    icon: {
        marginRight: 6,
    }, 
    text: {
        color: Colors.primary
    }, 
}); 