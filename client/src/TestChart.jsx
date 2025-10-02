// Test Chart.js setup
import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
    CategoryScale,
    Legend,
    LinearScale,
    Title,
    Tooltip
} from "chart.js";

console.log("ChartJS object:", ChartJS);
console.log("ChartJS.register function:", ChartJS.register);

try {
    ChartJS.register(
        ArcElement,
        BarElement,
        CategoryScale,
        Legend,
        LinearScale,
        Title,
        Tooltip
    );
    console.log("Chart.js registration successful!");
} catch (error) {
    console.error("Chart.js registration error:", error);
}

export default function TestChart() {
    return <div>Chart.js test component</div>;
}