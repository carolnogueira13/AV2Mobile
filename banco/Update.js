import * as SQLite from 'expo-sqlite';
import { create } from './Create.js';
import { Alert, View, TextInput, Button, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useState } from 'react';

export function Update() {
    const [name, setName] = useState('');
    const [senha, setSenha] = useState('');


    function gerarSenhaAleatoria() {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let senha = '';
        for (let i = 0; i < 8; i++) {
            const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
            senha += caracteres.charAt(indiceAleatorio);
        }  
        setSenha(senha);
        return senha;
    }

    const atualizar = async () => {

        try {
            db = await create();
            let senha = gerarSenhaAleatoria();
            let result = await db.runAsync(`UPDATE senhas2 SET senha = ? where usuario = ?;`, senha, name);
            if (result.changes > 0) {
                Alert.alert(
                    'Success',
                    `Senha atualizada para o usuario ${name} com sucesso e salva no banco de dados: ${senha}`,
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
        <View style={{ flex: 1, marginTop:20, width: "80%" }}>
            <TextInput
                placeholder="Entre com o Nome para modificar sua senha"
                onChangeText={
                    nome => setName(nome)
                }
                style={{ padding: 2 }}
            />
            <Button title="Atualizar" onPress={() => atualizar()} />
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