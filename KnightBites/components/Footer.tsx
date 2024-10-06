import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '@/constants/Styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Footer = () => {
    return (
        <View style={styles.footerBar}>
            <TouchableOpacity onPress={() => {console.log("Hey")}}>
                <Text style={styles.footerLink}>FAQ</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Footer;