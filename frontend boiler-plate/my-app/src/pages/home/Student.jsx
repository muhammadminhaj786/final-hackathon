import React, { useEffect, useState } from 'react';
import { IoMdPerson, IoIosCalendar } from 'react-icons/io';
import { BaseUrl } from '../../config';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ConsoleLogEntry } from 'selenium-webdriver/bidi/logEntries';

const Admin = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('Students');
  const [imageFile, setImageFile] = useState(null)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rollNo, setRollNo] = useState("")
  const token = localStorage.getItem("token")
  const attendence = localStorage.getItem("attendence")
  const navigate = useNavigate() 
  const [formData, setFormData] = useState({
    rollNO: '',
    file: null,
  });
  const [data,setData] = useState([])
  const [temp, setTemp] = useState([])
  const [attendenceData,setAttendenceData]=useState([])
    
  const id = localStorage.getItem("ID")
    console.log(id)


  //logout function
  const logoutFunc =()=>{
    localStorage.removeItem("ID")
    localStorage.removeItem("token")
    localStorage.removeItem("accessToken")
    localStorage.removeItem("userType")
    localStorage.removeItem("attendence")
    navigate("login")

  }


  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    // Reset the form data on modal close
    setFormData({
      rollNo: '',
      file: null,
    });
  };

  // Define the icons for Student and Attendance
  const studentIcon = <IoMdPerson className="text-green-400rounded-full bg-blue-100 mx-3" />;
  const attendanceIcon = <IoIosCalendar className="text-green-400rounded-full bg-blue-100 mx-3" />;

  // Handle input changes in the modal
  // const handleInputChange = (e) => {
  //   const { name, value, files } = e.target;
  //   // If the input is a file input, use the first file from the selected files
  //   const file = name === 'file' ? files[0] : null;
    
  //   setFormData({
  //     ...formData,
  //     [name]: name === 'file' ? file : value,
  //   });
  // };
  // Handle form submission (you can customize this according to your needs)
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    try {
      e.preventDefault();

      if (!imageFile) {
        console.log("Please select an image");
        alert("Please select an image")
        return;
      }

      if (!rollNo ) {
        alert("please fill all the filled")
        return
      }

     const formData = new FormData;

     formData.append("image",imageFile)
    //  formData.append("fullName",fullName)
    //  formData.append("email",email)
    //  formData.append("password",password)
     formData.append("rollNo",rollNo)
     formData.append("id",id)
     formData.append("fullName",fullName)

      const response = await axios.post(`${BaseUrl}/api/checkin`, formData,{
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
      );
      localStorage.setItem("token",response.data.data.token)
      localStorage.setItem("attendence",response.data.data.attendence)
      fetchAtt()
      console.log(response.data.data)
    }
    catch (error) {
      console.log(error);
    }
    // Add your logic for form submission (e.g., API call)
    closeModal();
  };


  //get single user
  const singleUser =async ()=>{
    
    const response = await axios.get(`${BaseUrl}/api/user/${id}`)
    console.log(response.data.data)
    setFullName(response.data.data.full_Name)
    setData(response.data.data)
    setTemp((prevData)=>[...prevData, ...Object.values(response.data.data)])
  }
  console.log(temp)

  useEffect(()=>{
    singleUser()
  },[])
console.log(data)

const fetchAtt = async ()=>{
  const response = await axios.get(`${BaseUrl}/api/attendence`)
  console.log(response.data.data)
  setAttendenceData([...response.data.data])
}

useEffect(()=>{
  fetchAtt()
},[])
  return (
    <div className="flex h-[100%]  ">
      {/* Left Sidebar */}
      <div className="w-1/5 text-black p-6 flex flex-col justify-between">
        <div>
          <div className="mb-8">
            <h1 className="font-bold text-lg text-green-400">Attendance App</h1>
          </div>
          <div
            className={`flex items-center cursor-pointer mb-4 ${currentPage === 'Students' ? 'font-bold' : ''}`}
            onClick={() => setCurrentPage('Students')}
          >
            {studentIcon}
            {/* <Link to="myprofile" >My Profile</Link> */}
            My Profile
          </div>
          <div
            className={`flex items-center cursor-pointer mb-4 ${currentPage === 'Attendance' ? 'font-bold' : ''}`}
            onClick={() => setCurrentPage('Attendance')}
          >
            {attendanceIcon}
            Attendance
          </div>
          <div className="mt-3 cursor-pointer"><button onClick={logoutFunc} className='w-[140px] h-[50px] bg-green-400 rounded-[20px] '>Logout</button></div>
        </div>
        
      </div>

      {/* Right Content */}
      <div className="w-4/5 p-6 bg-gray-100">
        {/* Page Title */}
        <div className="text-2xl font-bold mb-6 flex items-center">
          {currentPage}
          <span className="ml-2 flex text-green-400 mt-2">
            {currentPage === 'Students' ? studentIcon : attendanceIcon}
          </span>
        </div>

        {/* Add Button */}
        <div className="flex justify-between mb-6 items-center">
          <div></div>
          {console.log(token)}
          {
            
            !token || !attendence ? <button onClick={openModal} className="p-2 bg-green-400 text-white rounded-full">
            Check In
          </button> : <button>Checked</button>
          }
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 max-w-md rounded-md">
              <h2 className="text-2xl font-bold mb-6">Add {currentPage}</h2>
              <form onSubmit={handleSubmit}>
                {/* Inputs for Full Name, Email, Password, File, Phone Number, and Course Name */}
                <div className="mb-4">
                  <label htmlFor="rollNo" className="block text-sm font-medium text-gray-700">
                    Roll NO
                  </label>
                  <input
                    type="text"
                    id="rollNO"
                    name="rollNo"
                    onChange={(e)=>setRollNo(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                    File
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept='image/*' onChange={(e)=>{setImageFile(e.target.files[0])}}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                {/* <div className="mb-4">
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">
                    Course Name
                  </label>
                  <input
                    type="text"
                    id="courseName"
                    name="courseName"
                    value={formData.courseName}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div> */}
                <div className="flex justify-end">
                  <button type="button" onClick={closeModal} className="mr-2 bg-green-400  p-2 text-white rounded-full">
                    Close
                  </button>
                  <button type="submit" className="bg-green-400 text-white rounded-full p-2">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div>
          {/* Table-like Section */}
        <div className=" mt-5 mb-6 h-[100%] border-blue-100">
          <h2 className="text-xl font-bold mb-2">
            {currentPage === 'Students' ? 'Student Information' : 'Attendance Information'}
          </h2>
          

            {currentPage === 'Students' ? (
              <></>
            ) : (
              <>
                <div className="flex  bg-green-400 p-3 rounded-lg">
              <div className="w-1/6">ID</div>
              <div className="w-1/6">Profile Img</div>
              <div className="w-1/6">Roll No</div>
              <div className="w-1/6 ml-5">Full Name</div>
              </div>
              </>
            )}
          {/* Placeholder data (replace with actual data) */}
          {
            currentPage === 'Students' ?(
              <div className='w-[550px] h-[450px] mx-auto '>
                <div  className='w-[40%] mx-auto  rounded-[55%] h-[50%]'>
                  <img className='w-[100%] h-[100%] rounded-[55%]' src={temp[4]} alt="" />
                </div>
                <div className=' pl-[38%] '>
                  <div className='mt-7 text-2xl'>{temp[1]}</div>
                  <div className='mt-4 text-2xl'>{temp[2]}</div>
                  <div className='mt-4 text-2xl'>Computer Science</div>
                </div>
              </div>
            ):(
              attendenceData.map((att,i)=>{
                return att.id==id && (
                  <div key={i} className="flex  py-2">
              <div className="w-1/6">{i+1}</div>
              <div className="pl-2 h-[70px] w-[80px] rounded-[35px] ml-2"><img className='w-[100%] h-[100%] rounded-[35px]' src={att.imageUrl} alt="" /></div>

              <div className="w-1/6 ml-[9%] font-bold mt-4">{att.roll_No}</div>
              <div className="w-1/6 ml-[3%] font-bold mt-4">{att.full_Name}</div>
              </div>
                )
              })
            )
            
          }
          
        </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
