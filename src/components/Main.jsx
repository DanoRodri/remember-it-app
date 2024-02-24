import React, { useEffect, useState } from "react";
import { Text, View, TextInput, Button, Alert, StatusBar, StyleSheet, FlatList } from "react-native";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BarraBusqueda from "./BarraBusqueda";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AntDesign } from '@expo/vector-icons';
import NuevaTarea from "./NuevaTarea";
import Tareas from "./Tareas";
//import { byPrefixAndName } from '@awesome.me/kit-KIT_CODE/icons'
//import { FaBeer } from "react-icons/fa";
//import { CgAdd } from "react-icons/cg";



const Main = () => {
    const [greet, setGreet] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const findGreet = () => {
        const hrs = new Date().getHours();
        if (hrs === 0 || hrs < 12) return setGreet('Buen Dia');
        if (hrs === 1 || hrs < 17) return setGreet('Buena Tarde');
        setGreet('Buena Noche');
    };
    const [DATA,setData] = useState([]);
    const findTarea = async () => {
       
        const result = await AsyncStorage.getItem('NmTarea');
        console.log(result);
        setData(JSON.parse(result));
       

    }

    useEffect(() => {
        findTarea();
        findGreet();
    }, []);
    return (
        <>
            <StatusBar barstyle='dark-content' />
            <View style={styles.container}>
                <View style={styles.contendorTitulo}>
                    <Text style={styles.header}>{`${greet}`}</Text>
                    <BarraBusqueda containerStyle={{ marginVertical: 15, width: '90%' }} />
                </View>
                <View style={styles.contenedorLista}>
                {modalVisible ? (
                     
                       <Text style={{ marginTop: 20, fontSize: 20 }}>Result Not Found</Text>
                       ) : (
                <FlatList
                        data={DATA}
                        numColumns={2}
                        columnWrapperStyle={{
                            justifyContent: 'space-between',
                            marginBottom: 15,
                        }}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <Tareas onPress={() => openNote(item)} item={item} />
                        )}
                    />
                    )}
                    </View>
                    <View style={styles.contenedorAgregarTarea}>
                    <Text style={styles.containerTexto}>Agregar Recordatorio</Text>
                    <AntDesign onPress={() => setModalVisible(true)} name="pluscircleo" size={50} color="black" style={styles.posicionBotonPus}/>
                    </View>
                </View>
                
            <NuevaTarea visible={modalVisible} onClose={() => setModalVisible(false)} onSubmit={findTarea}/>

        </>
    )
}

const styles = StyleSheet.create({
    container: { marginTop: Constants.statusBarHeight, flexGrow: 1,
        paddingHorizontal: 0,
        paddingTop: 0,
  
        backgroundColor: 'grey' },
    header: {
        fontSize: 40,
        fontWeight: 'bold',
        alignContent: 'center',
        justifyContent: 'center',
    },
    containerTexto: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    espacioVacio: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1,
        backgroundColor: 'grey'
    },
    contendorTitulo: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    posicionBotonPus: {
        marginVertical: '3%'
    },
    contenedorLista:{
        marginVertical: '5%',
        marginHorizontal: '2%'
    },
    contenedorAgregarTarea:{
        justifyContent: 'center',
        alignItems: 'center',
    }
});
export default Main

