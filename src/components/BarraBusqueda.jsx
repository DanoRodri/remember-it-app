import React, { useEffect, useState } from "react";
import { Text, View, TextInput, Button, Alert, StatusBar, StyleSheet } from "react-native";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BarraBusqueda = ({ containerStyle, value, onClear, onChangeText }) => {
    return (
        <View style={[styles.container, { ...containerStyle }]}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                style={styles.searchBar}
                placeholder='Busca Recordatorio..' />

            {value ? (
                <AntDesign
                    name='close'
                    size={20}
                    color={colors.PRIMARY}
                    onPress={onClear}
                    style={styles.clearIcon}
                />
            ) : null}
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        borderWidth: 0.5,
        height: 40,
        borderRadius: 40,
        paddingLeft: 15,
        fontSize: 20,
    },
    container: {
        justifyContent: 'center',
    },
    clearIcon: {
        position: 'absolute',
        right: 10,
    },
});

export default BarraBusqueda