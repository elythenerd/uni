import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { PieGradesInterface } from '../../types/CourseParticicpants';
import { useEffect, useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({courseId}:{courseId:string}) => {
  const [pieData,setPieData] = useState<PieGradesInterface[]>()
  useEffect(()=>{
    fetchPieData(courseId)
  },[])
  const fetchPieData = async(id :string)=>{
    const res =  await axios.get(`http://localhost:8000/api/cp/get/pieGrades/${id}`)
    const Data: PieGradesInterface[] =res.data
    setPieData(Data)
  }
  // console.log(pieData?.map((value)=>{return  value._id}))
  const labels = pieData?.map((value)=>{return  value._id})
  const count = pieData?.map((value)=>{return  value.count})
  const color = pieData?.map((value)=>{return  value.color})
  const data = {
    labels: labels,
    datasets: [
      {
        data: count,
        backgroundColor:color,
        borderWidth: 1,
      },
    ],
  };

  return (
    <Pie data={data} />
  )
}

export default PieChart