import { View, StyleSheet, Dimensions, Text } from "react-native"
import { PieChart } from 'react-native-chart-kit';

export default function AccordingToCategory({Categories}) {

    let datas = []
    let counter = 50
    let sumTime = 0

    Categories.forEach(element => {
        sumTime += element[0]
    })

    Categories.forEach(element => {
        const data = {}

        data.time = Math.floor((element[0] / sumTime) * 100)
        data.name = element[1]
        data.color = `rgba(${counter}, ${counter}, 255, 1)`
        data.legendFontColor = "#000"
        data.legendFontSize = 15

        counter += 50
        datas.push(data)
    });

    return (
        <View style={styles.container}>

            <Text style={styles.subtitle}>Odaklanma Sürelerinin Kategorilere Göre Dağılımı</Text>

            <PieChart
            style={styles.pie}
            data={datas}
            width={Dimensions.get('window').width}
            height={220}
            chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                }
            }}
            accessor={"time"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            center={[10  , 1]}
            absolute
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    subtitle: {
        fontSize: 17,
        marginBottom: 15,
        borderBottomWidth: 1,
    },
})