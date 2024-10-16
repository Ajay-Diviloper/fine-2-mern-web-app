import EmployeeModel from '../models/employeeModel.js'; // Import the model

// Controller to handle employee creation
export const createEmployee = async (req, res) => {
  try {
    const body = req.body;

    // Check if profile image was uploaded, otherwise set it to null
    body.profileimage = req.file ? req.file.path : null;

    // Create a new Employee instance
    const emp = new EmployeeModel(body);

    // Save the new employee to the database
    await emp.save();

    // Send success response
    res.status(201).json({
      message: 'Employee created successfully',
      success: true,
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      message: 'Error creating employee',
      success: false,
      error: error.message,  // Send the error message for debugging
    });
  }
};
export const getallemp = async (req, res) => {
  try {

   let {page, limit, search}= req.query;
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 5;
      const skip = (page -1)*5;
      //page = 1 
    let searchcriteira = {}
    if(search){
      searchcriteira = {
        name : {
          $regex : search,
          $options : 'i'

        }
      }
    }
    const totalemployee = await EmployeeModel.countDocuments(searchcriteira)
  
    const emps =  await EmployeeModel.find(searchcriteira)
     .skip (skip)
     .limit(limit)
     .sort({updateAt : -1})
     const totalpages = Math.ceil(totalemployee/limit)
    res.status(201).json({
      message: 'all employees',
      success: true,
      data : {
        Employees : emps,
        pagination :{
          totalemployee,
          currentpage : page,
          totalpages,
          pagesize : limit
        }
      }
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      message: 'Error creating employee',
      success: false,
      error: error.message,  // Send the error message for debugging
    });
  }
};
export const getempbyid = async (req, res) => {
  try {
    const { id } = req.params;
    const emp =  await EmployeeModel.findOne({_id:id});

    res.status(201).json({
      message: "employee by id",
      success: true,
      data : emp
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      message: 'Error creating employee',
      success: false,
      error: error.message,  // Send the error message for debugging
    });
  }
};

export const deleteempbyid = async (req, res) => {
  try {
    const { id } = req.params;
    const emp =  await EmployeeModel.findByIdAndDelete({_id:id});

    res.status(201).json({
      message: "deleted by id",
      success: true,
      data : emp
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      message: 'Error creating employee',
      success: false,
      error: error.message,  // Send the error message for debugging
    });
  }
};

export const updateempbyid = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, email, salary } = req.body;

    // Prepare the data to be updated
    let updatedata = {
      name,
      phone,
      email,
      salary,
      updateAt: new Date()
    };

    // Check if a new profile image was uploaded
    if (req.file) {
      updatedata.profileimage = req.file.path; // Save the new image path from Cloudinary
    }

    // Update employee by ID with new data, including profile image if uploaded
    const updatedEmp = await EmployeeModel.findByIdAndUpdate(
      id,
      updatedata,
      {
        new: true, // Return the updated document
        runValidators: true, // Validate the updated data
      }
    );

    if (!updatedEmp) {
      return res.status(404).json({
        message: "Employee not found",
        success: false,
      });
    }

    // Send success response with updated data
    res.status(200).json({
      message: "Employee updated successfully",
      success: true,
      data: updatedEmp,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating employee',
      success: false,
      error: error.message,
    })
  }
};
export const getempdatabyid = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, email, salary } = req.body;

    // Prepare the data to be updated
    let updatedata = {
      name,
      phone,
      email,
      salary,
      updateAt: new Date()
    };

    // Check if a new profile image was uploaded
    if (req.file) {
      updatedata.profileimage = req.file.path; // Save the new image path from Cloudinary
    }

    // Update employee by ID with new data, including profile image if uploaded
    const updatedEmp = await EmployeeModel.findByIdAndUpdate(
      id,
      updatedata,
      {
        new: true, // Return the updated document
        runValidators: true, // Validate the updated data
      }
    );

    if (!updatedEmp) {
      return res.status(404).json({
        message: "Employee not found",
        success: false,
      });
    }

    // Send success response with updated data
    res.status(200).json({
      message: " emp detail by id",
      success: true,
      data: updatedEmp,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating employee',
      success: false,
      error: error.message,
    });
  }
};