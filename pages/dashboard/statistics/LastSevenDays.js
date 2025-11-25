import { View, StyleSheet, Text, Dimensions, Platform } from 'react-native'
import { BarChart } from 'react-native-chart-kit';
// import { DataTable } from 'react-native-paper'

export default function LastSevenDays({data}) {
    
    let labels = []
    let dataDate = []

    data.forEach(taylor => {
        labels.push(taylor[1])
        dataDate.push(taylor[0] / 60)
    });

    const datas = {
        labels: labels,
        datasets: [
            {
            data: dataDate
            }
        ]
    };

    return (
        <View style={styles.container}>
            {/* <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={styles.title}>Bugün Toplam Dikkat Dağınıklığı Sayısı</DataTable.Title>
                </DataTable.Header>

            {data.map(element =>(
                <DataTable.Row>
                    <DataTable.Cell style={styles.title}>{element[0]}</DataTable.Cell>
                    <DataTable.Cell style={styles.title}>{element[1]}</DataTable.Cell>
                </DataTable.Row>
            ))}

            </DataTable> */}
            
            <Text style={styles.subtitle}>Son Bir Haftadaki Odaklanma Süresi</Text>

            <BarChart
                style={styles.graphStyle}
                data={datas}
                width={Dimensions.get('window').width}
                height={300}
                chartConfig={{
                    backgroundColor: "#fff",
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
                verticalLabelRotation={30}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        justifyContent: 'center',
        color: 'red'
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 15,
        borderBottomWidth: 1,
    },
    graphStyle: {
        justifyContent: "center"
    }
})