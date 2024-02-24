import React, { useState } from "react";
import { Text, View, TextInput, Button, Alert, Modal, StyleSheet } from "react-native";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
//import { useNavigation } from '@react-navigation/native';

const NuevaTarea = ({ visible, onClose, onSubmit }) => {
    const [nombreTarea, setTarea] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tareas, setTareas] = useState([]);

    const handleOnChangeText = (text, valueFor) => {
        if (valueFor === 'nombreTarea') setTarea(text);
        if (valueFor === 'descripcion') setDescripcion(text);
    };

    const handleSumbmit = async (nombreTarea, descripcion) => {
        const Tarea = { id: Date.now(), titulo: nombreTarea, descripcion: descripcion, time: Date.now() };
        const ActualizarTarea = [...tareas, Tarea];
        setTareas(ActualizarTarea)
        await AsyncStorage.setItem('NmTarea', JSON.stringify(ActualizarTarea));
        setTarea('');
        setDescripcion('');
        onSubmit();
        onClose();
    }
    const findTarea = async (nombreTarea, descripcion) => {
        handleSumbmit(nombreTarea, descripcion);
        const result = await AsyncStorage.getItem('NmTarea');
        console.log(result);
        if (result !== null) setTarea(JSON.parse(result));

    }
    return (
        <Modal visible={visible} animationType="fade">

            <View>
                <AntDesign onPress={() =>onClose()} name="arrowleft" size={25} color="black" />
            </View>
            <View style={styles.contendorTitulo}>
                <Text style={styles.header}>Recuerdalo</Text>
            </View>
            <View style={styles.contenedorInputs}>
                <Text style={styles.nombresEntradas}>Nombre de la tarea</Text>
                <TextInput
                    style={styles.entradaTexto}
                    value={nombreTarea}
                    onChangeText={text => handleOnChangeText(text, 'nombreTarea')}
                    placeholder="Tarea" />

                <Text style={styles.nombresEntradas}>Descripcion de la tarea</Text>
                <TextInput
                    style={styles.entradaTexto}
                    value={descripcion}
                    onChangeText={text => handleOnChangeText(text, 'descripcion')}
                    placeholder="Descripcion" />

                <MaterialCommunityIcons onPress={() => findTarea(nombreTarea, descripcion)} name="content-save-check-outline" size={50} color="black" />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: { marginTop: Constants.statusBarHeight, flexGrow: 1 },
    header: {
        fontSize: 40,
        fontWeight: 'bold',
        alignContent: 'flex-start',
        justifyContent: 'left',
    },
    contendorTitulo: {
        justifyContent: 'flex-start',
        alignItems: 'left',
    },
    entradaTexto: {
        height: 30,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        padding: 5,
        paddingBottom: 1,
        borderRadius: 15,
    },
    nombresEntradas: {
        fontSize: 20,
    },
    contenedorInputs: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
export default NuevaTarea
