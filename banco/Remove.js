import * as SQLite from 'expo-sqlite';
import { create } from './Create.js';
import { Alert, View, TextInput, Button, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useState } from 'react';

export function Remove() {
    const [name, setName] = useState('');

    const remove = async () => {

        try {
            db = await create();
            let result = await db.runAsync(`DELETE FROM senhas2 where usuario = ?;`, name);
            if (result.changes > 0) {
                Alert.alert(
                    'Success',
                    'Senha removida',
                    [
                        {
                            text: 'Ok'
                        },
                    ],
                    { cancelable: false }
                );
            } else alert('Error removendo senha gravada');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={{ flex: 1, width: "80%", marginTop: 20, width: "80%" }}>
            <TextInput
                placeholder="Entre com o Nome para apagar sua senha"
                onChangeText={
                    nome => setName(nome)
                }
                style={{ padding: 2 }}
            />
            <Button title="Deletar" onPress={() => remove()} />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});