import { Text, View } from "react-native";
import {style} from  "./style";

export default function Header(){
 return (
 <View style={style.header}>
    <Text style={style.headerText}>
        Lista de Compras
    </Text>
 </View>)
}
