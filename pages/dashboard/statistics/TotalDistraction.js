import { View, StyleSheet } from 'react-native'
import { DataTable } from 'react-native-paper'

export default function TotalDistraction() {
    return (
        <View style={styles.container}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={styles.title}>Bugün Toplam Dikkat Dağınıklığı Sayısı</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                    <DataTable.Cell style={styles.title}>15</DataTable.Cell>
                </DataTable.Row>
            </DataTable>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 15,
    },
    title: {
        fontSize: 24,
        justifyContent: 'center',
        color: 'red'
    },
    subtitle: {
        fontSize: 18
    }
})