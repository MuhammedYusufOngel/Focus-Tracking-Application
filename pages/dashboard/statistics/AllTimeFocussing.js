import { View, StyleSheet } from 'react-native'
import { DataTable } from 'react-native-paper'

export default function AllTimeFocussing({data}) {
    const time = data.maxTime;

    const hours = (time / 60) > 60 ? Math.floor(time / (60 * 60)) : 0
    const minutes = (time / 60) > 60 ? time % (60 * 60) : Math.floor(time / 60)

    return (
        <View style={styles.container}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={styles.title}>Tüm Zamanların Toplam Odaklanma Süresi</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                    <DataTable.Cell style={styles.title}>{hours !== 0 ? hours + " s " + minutes + " dk" : minutes + " dk"}</DataTable.Cell>
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
        justifyContent: 'center',
        color: 'red'
    }
})