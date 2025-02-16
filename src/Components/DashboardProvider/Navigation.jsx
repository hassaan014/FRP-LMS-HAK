import { FaUserGraduate } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { FaSchool } from "react-icons/fa6";
import { RiFileList3Line } from "react-icons/ri";
import { SiGoogleclassroom } from "react-icons/si";
import { MdPayments } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { MdPersonAdd } from "react-icons/md";
import { PiExamFill } from "react-icons/pi";
import { FaBook } from "react-icons/fa";
import { FaBookMedical } from "react-icons/fa6";
import { PiTreeStructureFill } from "react-icons/pi";
import { MdOutlineRequestPage } from "react-icons/md";


const NAVIGATION = [
    {
        kind: 'header',
        title: 'LMS',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <MdDashboard />,
    },
    {
        kind: 'header',
        title: 'Academic Block'
    },
    // Student
    {
        segment: 'students',
        title: 'Students',
        icon: <FaUserGraduate />,
        children: [
            {
                segment: 'students_list',
                title: 'Students List',
                icon: <RiFileList3Line />,
            },
            {
                segment: 'add_student',
                title: 'Add Student',
                icon: <MdPersonAdd />,
            },
            // {
            //     segment: 'update_student',
            //     title: 'Update Student',
            //     icon: <MdPersonAdd />,
            // },
        ],
    },
    // Exam
    {
        segment: 'examination',
        title: 'Examination',
        icon: <PiExamFill />,
        children: [
            {
                segment: 'examination_schedule',
                title: 'Examination Schedule',
                icon: <RiFileList3Line />,
            },
            {
                segment: 'results',
                title: 'Results',
                icon: <MdPersonAdd />,
            },
        ],
    },
    // Syllabus
    {
        segment: 'syllabus',
        title: 'Syllabus',
        icon: <RiFileList3Line />,
        children: [
            {
                segment: 'syllabus_form',
                title: 'Syllabus Form',
                icon: <RiFileList3Line />,
            },
            {
                segment: 'syllabus_list',
                title: 'Syllabus List',
                icon: <RiFileList3Line />,
            },
        ],
    },
    // Classes
    {
        segment: 'classes',
        title: 'Classes',
        icon: <SiGoogleclassroom />,
        children: [
            {
                segment: 'class_list',
                title: 'Class List',
                icon: <RiFileList3Line />,
            },
            {
                segment: 'class_form',
                title: 'Class Form',
                icon: <RiFileList3Line />,
            },
        ],
    },
    // Subject
    {
        segment: 'subjects',
        title: 'Subjects',
        icon: <FaBook />,
        children: [
            {
                segment: 'subject_list',
                title: 'Subjects List',
                icon: <RiFileList3Line />,
            },
            {
                segment: 'add_subject',
                title: 'Add Subject',
                icon: <FaBookMedical />,
            },
        ],
    },
    {
        kind: 'header',
        title: 'Admin Block'
    },
    // Teacher
    {
        segment: 'teachers',
        title: 'Teachers',
        icon: <FaUserTie />,
        children: [
            {
                segment: 'teachers_list',
                title: 'Teachers List',
                icon: <RiFileList3Line />,
            },
            {
                segment: 'add_teacher',
                title: 'Add Teacher',
                icon: <MdPersonAdd />,
            },
        ],
    },
    // School
    {
        segment: 'schools',
        title: 'Schools',
        icon: <FaSchool />,
        children: [
            {
                segment: 'register_school',
                title: 'Registration',
                icon: <RiFileList3Line />,
            },
        ],
    },
    // Fee
    {
        segment: 'fee',
        title: 'Fee',
        icon: <MdPayments />,
        children: [
            {
                segment: 'fee_structure',
                title: 'Fee Structure',
                icon: <PiTreeStructureFill />,
            },
            {
                segment: 'fee_payment',
                title: 'Pay Fee',
                icon: <MdPayments />,
            },
            {
                segment: 'fee_voucher',
                title: 'Fee Voucher',
                icon: <MdOutlineRequestPage />,
            },
        ],
    },
    // Admission
    {
        segment: 'admissions',
        title: 'Admissions',
        icon: <MdPersonAdd />,
        children: [
            {
                segment: 'new_admission',
                title: 'New Admission',
                icon: <MdPersonAdd />,
            },
        ],
    },
];

export default NAVIGATION