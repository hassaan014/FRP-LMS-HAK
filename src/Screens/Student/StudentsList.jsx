import React from 'react'
import DashboardProvider from '../../Components/DashboardProvider/DashboardProvider'
import { useState } from 'react'
import { useEffect } from 'react'
import EnhancedTable from '../../Components/Table'
import { db } from '../../FirebaseConfig'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'

const StudentsList = () => {
  const [studentsData,setStudentsData] = useState([])
  const [refresh,setRefresh] = useState(false)

  const getData = async () => {
    let data = await getDocs(collection(db,"Students"))
    // console.log(data)
    let arr = [];
    !data.empty ?
    data.forEach((docs)=>{
      // console.log(docs.id)
      // console.log(docs.data())
      let obj= {...docs.data(),id:docs.id}
      arr.push(obj)
      setStudentsData(arr)
    })
    : setStudentsData([])
  }
  useEffect(()=>{
    getData()
  },[refresh])

  let del =  (deleteArray) => {
    // deleteArray is array of id's of data to be deleted
    (deleteArray && deleteArray.map( async (e,i)=>{
      
      await deleteDoc(doc(db,"Students",e))
      
      i+1 == deleteArray.length ? setRefresh(!refresh) : null
    }))
    null
  }

  return (
    <DashboardProvider data={<EnhancedTable datas={studentsData} headPage='Student' delFunc={del} />} />
  )
}

export default StudentsList