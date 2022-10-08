import {Router} from 'express';
import { IUsers, User } from '@server/libs/Users';

const router = Router();
const userInstance = new User();

router.get('/', async (_req, res)=>{
    try {
      res.json(await userInstance.getAllUser());
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({'msg': 'Error al obtener Registros'});
    }
});

router.get('/byindex/:index', async (req, res) => {
    try {
      const { index } = req.params;
      res.json(await userInstance.getUserByIndex(+index));
    } catch (error) {
      console.log("Error", error);
      res.status(500).json({'msg': 'Error al obtener Registro'});
    }
});

router.post('/new', async (req, res)=>{
    try {
      const newUser = req.body as unknown as IUsers;
      const newUserIndex = await userInstance.addUser(newUser);
      res.json({newIndex: newUserIndex});
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({'msg': 'Error al guardar Registro'});
    }
});

router.put('/update/:index', async (req, res)=>{
    try {
      const { index } = req.params;
      const userUpdate = req.body as IUsers;
      await userInstance.updateUser(+index, userUpdate);
      res.status(200).json({"msg":"Registro Actualizado"});
    } catch(error) {
        console.log("Error", error);
        res.status(500).json({'msg': 'Error al actualizar Registro'});
    }
});

router.delete('/delete/:index', (req, res)=>{
    try {
      const { index } = req.params;
      if (userInstance.deleteUser(+index)) {
        res.status(200).json({"msg": "Registro Eliminado"});
      } else {
        res.status(500).json({'msg': 'Error al eliminar Registro'});
      }
    } catch (error) {
      console.log("Error", error);
      res.status(500).json({'msg': 'Error al eliminar Registro'});
    }
  });


export default router;