import { Alert, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";
import { useState } from "react";
import Feather from '@expo/vector-icons/Feather';
import ListLayout from "../components/ListLayout";
import Product from "../components/Product";
import ProductFinalized from "../components/ProductFinalized";
import DefaultImage from '../images/shopping_list.png';

const EMPTYLIST_IMAGE = Image.resolveAssetSource(DefaultImage).uri;

export function Home() {
    const [products, setProducts] = useState<string[]>([]);
    const [productName, setProductName] = useState("");
    const [completedProducts, setCompletedProducts] = useState<string[]>([]);

    function addProduct() {
        if (products.includes(productName)) {
            return Alert.alert("Produto já cadastrado", "Já existe um produto na lista com este nome");
        }
        if (productName.trim().length === 0) {
            return Alert.alert("Digite um produto válido!");
        }
        setProducts(prevState => [...prevState, productName]);
        setProductName('');
    }

    function finalizeProduct(name: string) {
        Alert.alert("Finalizar", `Quer finalizar o item ${name}?`, [
            { text: "Sim", onPress: () => setCompletedProducts(prevState => [...prevState, name]) },
            { text: "Não", style: "cancel" }
        ]);
    }

    function removeCompletedProduct(name: string) {
        Alert.alert("Apagar", `Quer apagar o ${name}?`, [
            { text: "Sim", onPress: () => {
                setCompletedProducts(prevState => prevState.filter(product => product !== name));
                setProducts(prevState => prevState.filter(product => product !== name));
            }},
            { text: "Não", style: "cancel" }
        ]);
    }

    function removeProduct(name: string) {
        Alert.alert("Remover", `Deseja remover o produto ${name}?`, [
            { text: "Sim", onPress: () => setProducts(prevState => prevState.filter(product => product !== name)) },
            { text: "Não", style: "cancel" }
        ]);
    }

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Adicione um novo produto"
                    placeholderTextColor='#BDBABA'
                    onChangeText={setProductName}
                    value={productName}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={addProduct}
                >
                    <Feather style={styles.buttonText} name="plus-circle" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.listContainer}>
                <ListLayout
                    name="Produtos"
                    color="#31C667"
                    count={products.length}
                />
                <ListLayout
                    name="Finalizados"
                    color="#7A4A9E"
                    count={completedProducts.length}
                />
            </View>
            <FlatList
                data={products}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    completedProducts.includes(item) ? (
                        <ProductFinalized
                            name={item}
                            removeItem={() => removeCompletedProduct(item)}
                        />
                    ) : (
                        <Product
                            name={item}
                            removeItem={() => removeProduct(item)}
                            finalize={() => finalizeProduct(item)}
                        />
                    )
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={products.length === 0 && styles.emptyList}
                ListEmptyComponent={() => (
                    <View style={styles.emptyListContainer}>
                        <Image
                            style={styles.emptyImage}
                            source={{ uri: EMPTYLIST_IMAGE }}
                        />
                        <Text style={styles.emptyTextBold}>
                            Você ainda não tem produtos na lista de compra
                        </Text>
                        <Text>
                            Adicione produtos e organize sua lista de compras
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
    },
    input: {
        padding: 16,
        textAlign: "center",
        borderRadius: 6,
        borderColor: "#808080",
        borderWidth: 1,
        backgroundColor: "#F2F2F2",
        width: "85%"
    },
    button: {
        borderRadius: 6,
        backgroundColor: "#31C667",
        height: 52,
        width: 52,
        marginLeft: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: "#fff"
    },
    inputContainer: {
        flexDirection: 'row',
        height: 54,
        padding: 24,
        alignItems: 'center',
    },
    listContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: "10%",
        marginBottom: 20,
    },
    emptyImage: {
        width: 56,
        height: 56,
    },
    emptyListContainer: {
        flex: 1,
        marginHorizontal: "5%",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        borderTopColor: "#D9D9D9",
        borderTopWidth: 1,
        paddingVertical: 48,
        paddingHorizontal: 20,
    },
    emptyTextBold: {
        color: "#808080",
        textAlign: "center",
        fontSize: 14,
        fontWeight: "700",
    },
    emptyList: {
        flexGrow: 1,
        justifyContent: 'center',
    }
});
