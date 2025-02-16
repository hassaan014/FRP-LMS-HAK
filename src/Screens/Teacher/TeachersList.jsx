import React from 'react'
import DashboardProvider from '../../Components/DashboardProvider/DashboardProvider'
import EnhancedTable from '../../Components/Table'
import { useState } from 'react'
import { useEffect } from 'react'
import { db } from '../../FirebaseConfig'
// import axios from 'axios'
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'

const TeachersList = () => {
  // const [teacherData,setTeacherData] = useState(null)
  // const [refresh,setRefresh] = useState(false)
  // const getData = async () => {
  //   await axios.get('http://localhost:3000/teachers/').then((res)=>setTeacherData(res.data))
  // }
  // useEffect(()=>{
  //   getData()
  // },[refresh])

  // let del =  (id) => {
  //   (id && id.map( async (e,i)=>{
  //     await axios.delete(`http://localhost:3000/teachers/${e}`)
      
  //     i+1 == id.length ? await axios.get(`http://localhost:3000/teachers/`).then((res)=>setRefresh(!refresh)) : null
      
  //   }))
  // }
  const [teachersData,setTeachersData] = useState([])
  const [refresh,setRefresh] = useState(false)

  const getData = async () => {
    let data = await getDocs(collection(db,"Teachers"))
    // console.log(data)
    let arr = [];
    !data.empty ?
    data.forEach((docs)=>{
      // console.log(docs.id)
      // console.log(docs.data())
      let obj= {...docs.data(),id:docs.id}
      arr.push(obj)
      setTeachersData(arr)
    })
    : setTeachersData([])
  }
  useEffect(()=>{
    getData()
  },[refresh])

  let del =  (deleteArray) => {
    // deleteArray is array of id's of data to be deleted
    (deleteArray && deleteArray.map( async (e,i)=>{
      
      await deleteDoc(doc(db,"Teachers",e))
      
      i+1 == deleteArray.length ? setRefresh(!refresh) : null
    }))
    null
  }
  return (
    <DashboardProvider data={<EnhancedTable datas={teachersData} headPage='Teacher' delFunc={del} />} />
  )
}

export default TeachersList