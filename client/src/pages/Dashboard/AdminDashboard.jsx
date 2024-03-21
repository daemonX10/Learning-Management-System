import { ArcElement, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip } from "chart.js"
import { Chart as ChartJs } from "react-chartjs-2"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

    ChartJs.register(
        ArcElement,
        Tooltip,
        Legend,
        CategoryScale,
        LinearScale,
        BarElement,
        Title
    )

const AdminDashboard = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { allUsers, subscribedUsers } = useSelector(state => state.users);

    const { allPayments, finalMonths , monthlySalesRecord } = useSelector((state) => state.razorpay);

    const userData = {
        labels: ["Registered Users", "Enrolled Users"],
        dataset : [
            {
                labet: "User Details",
                data: [ allUsersCount, subscribedUsersCount],
                backgroundColor: ["#FF6384", "#36A2EB"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB"],
                borderColor: ["#FF6384", "#36A2EB"],
                borderWidth: 1
            }
        ]
    };

    const salesData = {
        labels:[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ],
        fontColor: "white",
        datasets:[
            {
                label : "Monthly Sales",
                data: monthlySalesRecord,
                backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                borderColor: ["rgba(255, 99, 132, 1)"],
                borderWidth: 1
            }
        ]
    }



  return (
    <div>AdminDashboard</div>
  )
}

export default AdminDashboard