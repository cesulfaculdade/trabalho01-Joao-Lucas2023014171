import React from "react";
import { StatusBar } from "expo-status-bar"
import { StyleSheet,Text, TextInput, View } from "react-native"

const EMPTYLIST_IMAGE = Image.resolveAssetSource(DefaultImage).uri;

export function Home() {
    const [products, setProducts] = useState<string[]>([]);
    const [productName, setProductName] = useState("");
    const [productConcluid, setProductConcluid] = useState<string[]>([]);


    function handleProductAdd() {
        if (products.includes(productName)) {
            return Alert.alert("Produto já cadastrado", "Já existe um produto na lista com este nome")
        }
        if( productName.length == 0){
            return Alert.alert("Digite um produto valido!")
        }
        setProducts((prevState) => [...prevState, productName]);
        setProductName('');
}
const styles = StyleSheet.create({
  container: {
      flex:  1,     
      flexDirection: "column"
  },
  secaoRoxa: {
      flex: 2,
      backgroundColor: "#7A4A9E",
      justifyContent: 'center', 
      alignItems: 'center'
  },
  input: {
    flex: 3,
    backgroundColor: "#fff",
    height: 56,
    padding: 16,
    fontSize: 18,
    borderRadius: 5,
    marginRight: 16,
    
  },
  form: {
    width: "80%",
    flexDirection: "row",
    marginTop: 18,
    marginBottom: 36,
    position: "relative",
    marginLeft: 24
  },
  secaoBranca: {
      flex: 7,
      backgroundColor: "#FFF"
  },
  title: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold"
  }
})
