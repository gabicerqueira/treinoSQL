import { Pressable, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export function Produto({ cor, data, onDelete, onPress }) {
    return (
        <Pressable onPress={onPress} style={[{ borderColor: cor , borderWidth:5,}, styles.container]} >
            <Text style={styles.text}>
                {data.quantidade} - {data.nome}
            </Text>
            <TouchableOpacity onPress={onDelete} >
                <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
        </Pressable>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 18,
        borderRadius: 10,
        gap: 12,
        flexDirection: "row",
    },
    text: {
        flex: 1,
        fontSize: 17
    },
});
