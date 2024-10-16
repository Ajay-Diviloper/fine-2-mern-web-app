import express from 'express';
import { createEmployee,getallemp,getempbyid, deleteempbyid,updateempbyid,getempdatabyid } from '../controllers/employeecontroller.js';
import EmployeeModel from '../models/employeeModel.js';
import cloudnaryfileuploader from '../middlewares/fileuploader.js'; // Middleware for file uploads

const router = express.Router();

// Root route to check server status

router.get('/', getallemp);
router.post('/', cloudnaryfileuploader.single('profileimage'), createEmployee);
router.get('/:id', getempbyid);
router.delete('/:id', deleteempbyid);
router.put('/:id', cloudnaryfileuploader.single('profileimage'), updateempbyid);
router.put('/emp/:id', cloudnaryfileuploader.single('profileimage'), getempdatabyid);

export default router;
