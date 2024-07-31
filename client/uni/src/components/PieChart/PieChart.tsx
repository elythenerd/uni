import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { PieGradesInterface, pieGradesState } from '../../types/CourseParticicpants';
import { useEffect, useState } from 'react';
import { setPieGrades } from '../../store/pieGrades';
import { useDispatch, useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({courseId}:{courseId:string}) => {
  const dispatch = useDispatch()
  // const [pieData,setPieData] = useState<PieGradesInterface[]>()
  const pieGrade = useSelector((state:pieGradesState)=> state.pieGrades.value.pieGrades)
  useEffect(()=>{
    fetchPieData(courseId)
  },[])
  const fetchPieData = async(id :string)=>{
    const res =  await axios.get(`http://localhost:8000/api/cp/get/pieGrades/${id}`)
    const Data: PieGradesInterface[] =res.data
    // setPieData(Data)
    dispatch(setPieGrades(Data.filter((grade)=> grade.count!==null)))
  }
  // console.log(pieData?.map((value)=>{return  value._id}))

  const labels = pieGrade?.map((value)=>{return  value._id})
  const count = pieGrade?.map((value)=>{return  value.count})
  const color = pieGrade?.map((value)=>{return  value.color})
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
