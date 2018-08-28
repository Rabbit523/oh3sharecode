
import { Chart } from "chart.js"
export class CreateChartBase {
    getChart(data: any, context: any) {
        return new Chart(context.nativeElement, data);
    }
}

