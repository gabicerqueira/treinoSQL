import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, TextInput, Alert, FlatList, ImageBackground, Text } from 'react-native';
import { usarBD } from './hooks/usarBD';
import { Produto } from './components/produto';

export function Index() {
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [pesquisa, setPesquisa] = useState('');
    const [produtos, setProdutos] = useState([]);

    const produtosBD = usarBD();

    async function create() {
        if (isNaN(quantidade)) {
            return Alert.alert('Quantidade', 'A quantidade precisa ser um número!');
        }
        try {
            const item = await produtosBD.create({
                nome,
                quantidade: Number(quantidade),
            });
            Alert.alert('Exercicio cadastrado com o ID: ' + item.idProduto);
            setId(item.idProduto);
            listar();
        } catch (error) {
            console.log(error);
        }
    }

    async function listar() {
        try {
            const captura = await produtosBD.read(pesquisa);
            setProdutos(captura);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listar();
    }, [pesquisa]);

    const remove = async (id) => {
        try {
            await produtosBD.remove(id);
            await listar();
        } catch (error) {
            console.log(error);
        }
    };

    async function zeraCampos() {
        setId('');
        setNome('');
        setQuantidade('');
        await listar();
    }

    function detalhes(item) {
        setId(item.id);
        setNome(item.nome);
        setQuantidade(String(item.quantidade));
    }

    async function salvar() {
        if (id) {
            await atualizar();
        } else {
            await create();
        }

        await zeraCampos();
    }

    async function atualizar() {
        if (isNaN(quantidade)) {
            return Alert.alert('Quantidade', 'A quantidade precisa ser um número!');
        }
        try {
            await produtosBD.update({
                id,
                nome,
                quantidade,
            });
            Alert.alert('Exercício atualizado!');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ImageBackground source={require('./assets/fundo.png')} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.titulo}>Lista de Exercícios</Text>
                <TextInput
                    style={styles.texto}
                    placeholder="Nome do exercício"
                    placeholderTextColor="#939393"
                    onChangeText={setNome}
                    value={nome}
                />
                <TextInput
                    style={styles.texto}
                    placeholder="Quantidade de séries"
                    placeholderTextColor="#939393"
                    onChangeText={setQuantidade}
                    value={quantidade}
                    keyboardType="numeric"
                />
                <Button title="Salvar" onPress={salvar} color="#5C9E8B" />
                <TextInput
                    style={styles.texto2}
                    placeholder="Pesquisar exercício"
                    placeholderTextColor="#939393"
                    onChangeText={setPesquisa}
                />
                <FlatList
                    contentContainerStyle={styles.listContent}
                    data={produtos}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <Produto
                            data={item}
                            cor={item.nome === nome ? "#5C9E8B" : "#CECECE"}
                            onDelete={() => remove(item.id)}
                            onPress={item.nome === nome ? zeraCampos : () => detalhes(item)}
                        />
                    )}
                />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 32,
        gap: 16,
        borderRadius: 10,
        margin: 16,
        marginTop: 50
    },
    titulo:{
        fontSize: 26,
        textAlign: 'center',
        color: 'white',
        marginTop: 20,
        marginBottom: 20,
        fontWeight: '700'
    },
    texto: {
        height: 54,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: "#3f3f3f",
        paddingHorizontal: 16,
        backgroundColor: 'white',
        marginBottom: 8,
        color: '#000000'
    },
    texto2: {
        height: 54,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: "#3f3f3f",
        paddingHorizontal: 16,
        backgroundColor: 'white',
        marginBottom: 50,
        color: '#000000'
    },
    listContent: {
        gap: 16,
    },
});
