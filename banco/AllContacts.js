import React, { useState } from 'react';
import { Alert, Button, FlatList, Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { create } from './Create.js';

export function AllContacts(){
    let [flatListItems, setFlatListItems] = useState([]);

    const getAllSenhas = async () => {
        try{
             db = await create();
             let allRows = await db.getAllAsync('select * from senhas2;');
             setFlatListItems(allRows);
             console.log("[LOG] Data retrieved from tables senhas2");
             if(allRows.length==0){
                 Alert.alert(
                     'Alerta',
                     'Nenhuma senha salva',
                     [
                         {
                             text: 'Ok'
                         },
                     ],
                     { cancelable: false }
                 );
             }
         } catch (error) {
             console.log(error);
         }
     
     }

    let listItemView = (item) => {
        return (
            <View
                key={item.id}
                style={{ backgroundColor: '#EEE', marginTop: 20, padding: 30, borderRadius: 10 }}>
                <Text style={styles.textheader}>Código</Text>
                <Text style={styles.textbottom}>{item.id}</Text>
                <Text style={styles.textheader}>Nome</Text>
                <Text style={styles.textbottom}>{item.usuario}</Text>  
                <Text style={styles.textheader}>Senha:</Text>
                <Text style={styles.textbottom}>{item.senha}</Text>
            </View>
        );
    };

    return (
        <View style={{ flex: 1, width: "80%", marginTop: 10, paddingTop:100}}>
            <Button title="Todas as senhas geradas" onPress={() => getAllSenhas()} />
            <View style={{ flex: 1, backgroundColor: 'white'}}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                        data={flatListItems}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => listItemView(item)}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    textheader: {
        color: '#111',
        fontSize: 12,
        fontWeight: '700',

    },
    textbottom: {
        color: '#111',
        fontSize: 18,
    },
});